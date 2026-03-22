"use client";

import { CONTACT_EMAIL, SOCIAL } from "@/lib/constants";
import Link from "next/link";
import { useCallback } from "react";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16v12H4V6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.57 6.82-4.05 6.82-2.34 0-4.29-3.26-4.29-6.82 0-3.6 1.95-6.82 4.29-6.82 2.48 0 4.05 3.28 4.05 6.82zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.18-2.58-1.18-5.75 0-3.2.52-5.75 1.19-5.75C23.48 6.25 24 8.8 24 12z" />
    </svg>
  );
}

const iconClass =
  "h-5 w-5 transition-colors duration-200 group-hover:text-fuchsia-300";

const btnClass =
  "group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-dark bg-zinc-950/80 text-ink-dark shadow-sm ring-1 ring-purple-500/10 transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-fuchsia-500/40 hover:ring-fuchsia-500/20";

export function FooterSocialBar() {
  const toTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-3">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className={btnClass}
          aria-label="Email"
        >
          <MailIcon className={iconClass} />
        </a>
        <Link
          href={SOCIAL.github}
          className={btnClass}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
        >
          <GitHubIcon className={iconClass} />
        </Link>
        <Link
          href={SOCIAL.linkedin}
          className={btnClass}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
        >
          <LinkedInIcon className={iconClass} />
        </Link>
        <Link
          href={SOCIAL.medium}
          className={btnClass}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Medium articles"
        >
          <MediumIcon className={iconClass} />
        </Link>
      </div>

      <div className="flex w-full justify-center border-t border-white/[0.08] pt-4 sm:w-auto sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
        <button
          type="button"
          onClick={toTop}
          className="group inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/25 bg-zinc-950/70 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-fuchsia-200/90 shadow-inner ring-1 ring-fuchsia-500/15 transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:border-fuchsia-400/45 hover:bg-fuchsia-500/10 hover:text-fuchsia-100"
          aria-label="Back to top"
        >
          Top
          <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-amber-400 bg-clip-text text-[12px] font-normal leading-none text-transparent" aria-hidden>
            ↑
          </span>
        </button>
      </div>
    </div>
  );
}
