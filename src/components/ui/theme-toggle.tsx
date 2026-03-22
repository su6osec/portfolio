"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useId, useState } from "react";

type Ripple = { id: number; x: number; y: number };

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useId();

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(() => {
    if (resolvedTheme === "dark") setTheme("light");
    else setTheme("dark");
  }, [resolvedTheme, setTheme]);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    toggleTheme();
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((x) => x.id !== id));
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative isolate overflow-hidden rounded-full border border-border-light bg-canvas-light px-3 py-1.5 text-xs font-medium text-ink-light transition hover:border-accent dark:border-border-dark dark:bg-canvas-dark dark:text-ink-dark"
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
    >
      <span className="pointer-events-none absolute inset-0 z-0">
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={`${rippleId}-${r.id}`}
              className="absolute rounded-full bg-accent/35 dark:bg-accent/45"
              style={{ left: r.x, top: r.y, width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
              initial={{ scale: 0, opacity: 0.85 }}
              animate={{ scale: 28, opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => removeRipple(r.id)}
            />
          ))}
        </AnimatePresence>
      </span>

      <span className="relative z-10 inline-flex items-center gap-2">
        <span className="relative grid h-5 w-5 place-items-center text-ink-light dark:text-ink-dark">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 grid place-items-center"
                aria-hidden
              >
                <MoonIcon className="h-4 w-4" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, scale: 0.6, rotate: 40 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 grid place-items-center"
                aria-hidden
              >
                <SunIcon className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="min-w-[2.75rem] text-left">{mounted ? (isDark ? "Light" : "Dark") : "Theme"}</span>
      </span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}
