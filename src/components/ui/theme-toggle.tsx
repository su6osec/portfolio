"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      document.documentElement.style.setProperty("--theme-x", `${x}px`);
      document.documentElement.style.setProperty("--theme-y", `${y}px`);

      const next = isDark ? "light" : "dark";

      if (!("startViewTransition" in document)) {
        setTheme(next);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document as any).startViewTransition(() => {
        setTheme(next);
      });
    },
    [isDark, setTheme],
  );

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={`relative isolate inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/50 bg-transparent text-slate-500 transition-[color,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-violet-300/60 hover:bg-violet-50/60 hover:text-fuchsia-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:shadow-none dark:hover:border-fuchsia-500/30 dark:hover:bg-white/10 dark:hover:text-fuchsia-300 ${className}`}
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {/* Glow ring on dark mode */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 ring-1 ring-fuchsia-400/0 transition-[opacity,box-shadow] duration-300 dark:group-hover:opacity-100"
        aria-hidden
      />

      <span className="relative grid h-[18px] w-[18px] place-items-center" aria-hidden>
        <AnimatePresence mode="wait" initial={false}>
          {!mounted ? null : isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, scale: 0.2, rotate: -120, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.2, rotate: 120, filter: "blur(6px)" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 grid place-items-center"
            >
              <MoonIcon className="h-[17px] w-[17px]" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, scale: 0.2, rotate: 120, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.2, rotate: -120, filter: "blur(6px)" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 grid place-items-center"
            >
              <SunIcon className="h-[17px] w-[17px]" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}
