import { cookies } from "next/headers";

const CSRF_COOKIE = "portfolio_csrf";
const CSRF_MAX_AGE = 60 * 60 * 2; // 2 hours

export async function setCsrfCookie(): Promise<string> {
  const token = crypto.randomUUID();
  const jar = await cookies();
  jar.set(CSRF_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CSRF_MAX_AGE,
  });
  return token;
}

export async function validateCsrf(bodyToken: string | undefined): Promise<boolean> {
  if (!bodyToken || typeof bodyToken !== "string") return false;
  const jar = await cookies();
  const cookieToken = jar.get(CSRF_COOKIE)?.value;
  if (!cookieToken || cookieToken.length < 10) return false;
  return timingSafeEqual(bodyToken, cookieToken);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}
