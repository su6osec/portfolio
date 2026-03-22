"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((m) => m.Turnstile),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-muted-light dark:text-muted-dark">Loading verification widget…</p>
    ),
  }
);

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const MAX_NAME = 120;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 8000;
const MAX_EMAIL = 254;

const PLANE_MS = 900;
const SENT_MS = 2000;

function parseRetryAfterSeconds(res: Response, errorText?: string): number {
  const header = res.headers.get("Retry-After");
  const fromHeader = header ? parseInt(header.trim(), 10) : NaN;
  if (Number.isFinite(fromHeader) && fromHeader > 0) return fromHeader;
  const m = errorText?.match(/Try again in (\d+)s/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return 60;
}

type FormStatus = "idle" | "loading" | "plane" | "sent" | "error";

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut", delay: i * 0.14 }}
        />
      ))}
    </span>
  );
}

function PaperPlaneMark() {
  return (
    <motion.span
      className="inline-flex items-center justify-center text-accent"
      initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
      animate={{ x: 52, y: -40, opacity: 0, scale: 0.92, rotate: 22 }}
      transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
      </svg>
    </motion.span>
  );
}

export function ContactForm() {
  const [csrfToken, setCsrfToken] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [rateLimitSecondsLeft, setRateLimitSecondsLeft] = useState<number | null>(null);
  const [msgLen, setMsgLen] = useState(0);
  const timersRef = useRef<number[]>([]);

  const rateLimitActive = rateLimitSecondsLeft != null && rateLimitSecondsLeft > 0;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    if (!rateLimitActive) return;
    const id = setInterval(() => {
      setRateLimitSecondsLeft((prev) => {
        if (prev === null || prev <= 1) return null;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [rateLimitActive]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/contact/csrf", {
          method: "GET",
          cache: "no-store",
          credentials: "same-origin",
        });
        const data = (await res.json()) as { token?: string };
        if (!cancelled && data.token) setCsrfToken(data.token);
      } catch {
        if (!cancelled) setMessage("Could not initialize security token.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      clearTimers();
      setStatus("loading");
      setMessage("");

      const form = e.currentTarget;
      const fd = new FormData(form);
      const payload = {
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        subject: String(fd.get("subject") ?? ""),
        message: String(fd.get("message") ?? ""),
        company: String(fd.get("company") ?? ""),
        csrfToken,
        turnstileToken: turnstileToken ?? "",
      };

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify(payload),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };

        if (!res.ok) {
          if (res.status === 429) {
            setRateLimitSecondsLeft(parseRetryAfterSeconds(res, data.error));
            setStatus("error");
            setMessage("");
          } else {
            setRateLimitSecondsLeft(null);
            setStatus("error");
            setMessage(data.error ?? "Something went wrong. Please try again.");
          }
          return;
        }

        setRateLimitSecondsLeft(null);
        setMessage("");
        setStatus("plane");

        const t1 = window.setTimeout(() => {
          setStatus("sent");
          setMessage("");
          form.reset();
          setTurnstileToken(null);
          setMsgLen(0);
          const t2 = window.setTimeout(() => {
            setStatus("idle");
          }, SENT_MS);
          timersRef.current.push(t2);
        }, PLANE_MS);
        timersRef.current.push(t1);
      } catch {
        setRateLimitSecondsLeft(null);
        setStatus("error");
        setMessage("Network error. Please try again.");
      }
    },
    [csrfToken, turnstileToken, clearTimers]
  );

  const formFieldsDisabled = status === "loading" || status === "plane" || status === "sent" || rateLimitActive;

  return (
      <form
        onSubmit={onSubmit}
        className="section-card mt-12 grid gap-5 sm:p-8"
        noValidate
        aria-describedby={
          status === "sent" ? "send-success" : message || rateLimitActive ? "contact-feedback" : undefined
        }
      >
        <input type="hidden" name="csrfToken" value={csrfToken} readOnly />

        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
            disabled={formFieldsDisabled}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-ink-light dark:text-ink-dark">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={MAX_NAME}
              autoComplete="name"
              placeholder="Your name"
              disabled={formFieldsDisabled}
              className="mt-2 w-full rounded-xl border border-border-light bg-white/90 px-4 py-3 text-body text-ink-light outline-none transition placeholder:text-muted-light/70 focus:border-accent disabled:cursor-not-allowed disabled:opacity-60 dark:border-border-dark dark:bg-zinc-950/70 dark:text-ink-dark dark:placeholder:text-muted-dark/70"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-ink-light dark:text-ink-dark">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={MAX_EMAIL}
              autoComplete="email"
              placeholder="you@example.com"
              disabled={formFieldsDisabled}
              className="mt-2 w-full rounded-xl border border-border-light bg-white/90 px-4 py-3 text-body text-ink-light outline-none transition placeholder:text-muted-light/70 focus:border-accent disabled:cursor-not-allowed disabled:opacity-60 dark:border-border-dark dark:bg-zinc-950/70 dark:text-ink-dark dark:placeholder:text-muted-dark/70"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="text-sm font-medium text-ink-light dark:text-ink-dark">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            maxLength={MAX_SUBJECT}
            placeholder="What this is about"
            disabled={formFieldsDisabled}
            className="mt-2 w-full rounded-xl border border-border-light bg-white/90 px-4 py-3 text-body text-ink-light outline-none transition placeholder:text-muted-light/70 focus:border-accent disabled:cursor-not-allowed disabled:opacity-60 dark:border-border-dark dark:bg-zinc-950/70 dark:text-ink-dark dark:placeholder:text-muted-dark/70"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="message" className="text-sm font-medium text-ink-light dark:text-ink-dark">
              Message
            </label>
            <span className="text-[11px] text-muted-light tabular-nums dark:text-muted-dark" aria-live="polite">
              {msgLen} / {MAX_MESSAGE}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={MAX_MESSAGE}
            placeholder="Your message — scope, timelines, and how to reach you back."
            disabled={formFieldsDisabled}
            onChange={(ev) => setMsgLen(ev.target.value.length)}
            className="mt-2 w-full resize-y rounded-xl border border-border-light bg-white/90 px-4 py-3 text-body text-ink-light outline-none transition placeholder:text-muted-light/70 focus:border-accent disabled:cursor-not-allowed disabled:opacity-60 dark:border-border-dark dark:bg-zinc-950/70 dark:text-ink-dark dark:placeholder:text-muted-dark/70"
          />
        </div>

        {siteKey ? (
          <div className={`flex flex-col gap-2 ${rateLimitActive ? "pointer-events-none opacity-60" : ""}`}>
            <span className="text-sm font-medium text-ink-light dark:text-ink-dark">Verification</span>
            <Turnstile
              siteKey={siteKey}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setTurnstileToken(null)}
            />
          </div>
        ) : null}

        <div className="flex min-h-[2rem] flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "loading" || !csrfToken || rateLimitActive}
            className="inline-flex min-h-[2.75rem] min-w-[10rem] items-center justify-center overflow-visible rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition hover:bg-accent-hoverLight disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-accent-hoverDark"
          >
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <LoadingDots />
                <span className="sr-only">Sending</span>
              </span>
            ) : status === "plane" ? (
              <span className="relative flex h-8 w-24 items-center justify-start overflow-visible">
                <PaperPlaneMark />
                <span className="sr-only">Sending</span>
              </span>
            ) : status === "sent" ? (
              <motion.span
                id="send-success"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-semibold tracking-wide"
                role="status"
              >
                Sent!
              </motion.span>
            ) : rateLimitActive ? (
              `Wait ${rateLimitSecondsLeft}s…`
            ) : (
              "Send Message"
            )}
          </button>

          <AnimatePresence mode="wait">
            {message || rateLimitActive ? (
              <motion.p
                key={rateLimitActive ? "rate" : message}
                id="contact-feedback"
                role="status"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className={
                  status === "sent"
                    ? "text-sm font-medium text-emerald-700 dark:text-emerald-400"
                    : "text-sm text-red-600 dark:text-red-400"
                }
              >
                {rateLimitActive ? `Too many requests. Try again in ${rateLimitSecondsLeft}s.` : message}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </form>
  );
}
