import { NextResponse } from "next/server";
import { validateCsrf } from "@/lib/csrf";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/send-contact-email";
import {
  hasEmailHeaderInjection,
  isValidEmail,
  sanitizePlainText,
  stripControlChars,
} from "@/lib/sanitize";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const MAX_BODY = 32 * 1024;

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") {
    return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
  }

  const len = request.headers.get("content-length");
  if (len && Number(len) > MAX_BODY) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;

  const honeypot = body.company;
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const ip = clientIp(request);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rl.retryAfter}s.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const csrfOk = await validateCsrf(typeof body.csrfToken === "string" ? body.csrfToken : undefined);
  if (!csrfOk) {
    return NextResponse.json({ error: "Invalid security token. Refresh the page." }, { status: 403 });
  }

  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken : undefined;
  const hasTurnstileSecret = Boolean(process.env.TURNSTILE_SECRET_KEY);
  if (process.env.NODE_ENV === "production" && !hasTurnstileSecret) {
    console.error("[contact] Turnstile secret missing in production");
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }
  if (hasTurnstileSecret) {
    const ok = await verifyTurnstileToken(turnstileToken, ip !== "unknown" ? ip : undefined);
    if (!ok) {
      return NextResponse.json({ error: "Bot verification failed." }, { status: 400 });
    }
  }

  const nameRes = sanitizePlainText(body.name, 120);
  if (!nameRes.ok) {
    return NextResponse.json({ error: nameRes.error }, { status: 400 });
  }

  const emailRaw =
    typeof body.email === "string" ? stripControlChars(body.email).trim() : "";
  if (!emailRaw || !isValidEmail(emailRaw) || hasEmailHeaderInjection(emailRaw)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const subjectRes = sanitizePlainText(body.subject, 200);
  if (!subjectRes.ok) {
    return NextResponse.json({ error: subjectRes.error }, { status: 400 });
  }

  const messageRes = sanitizePlainText(body.message, 8000);
  if (!messageRes.ok) {
    return NextResponse.json({ error: messageRes.error }, { status: 400 });
  }

  const result = await sendContactEmail({
    name: nameRes.value,
    email: emailRaw,
    subject: subjectRes.value,
    message: messageRes.value,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
