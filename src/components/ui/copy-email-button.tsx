"use client";

import { CONTACT_EMAIL } from "@/lib/constants";
import { useCallback, useState } from "react";

export function CopyEmailButton({
  className = "",
  idleLabel = "Copy my email",
  copiedLabel = "Copied",
}: {
  className?: string;
  idleLabel?: string;
  copiedLabel?: string;
}) {
  const [ok, setOk] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setOk(true);
      window.setTimeout(() => setOk(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  }, []);

  return (
    <button
      type="button"
      onClick={copy}
      className={`group inline-flex items-center gap-1.5 rounded-full border border-border-dark bg-zinc-950/80 px-3 py-1.5 font-mono text-[11px] text-muted-dark shadow-sm ring-1 ring-purple-500/10 transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:border-fuchsia-500/40 hover:text-fuchsia-200 hover:ring-fuchsia-500/20 ${className}`}
      aria-label={ok ? "Email copied to clipboard" : idleLabel}
    >
      <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 8h12v12H8V8zM4 4h12v4H8v12H4V4z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      {ok ? copiedLabel : idleLabel}
    </button>
  );
}
