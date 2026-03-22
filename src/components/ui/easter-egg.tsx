"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

export function EasterEgg() {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI[idx];
      const match =
        expected.length === 1
          ? key === expected.toLowerCase()
          : key === expected;

      if (match) {
        const next = idx + 1;
        if (next >= KONAMI.length) {
          setOpen(true);
          setIdx(0);
        } else {
          setIdx(next);
        }
      } else {
        setIdx(0);
      }
    },
    [idx]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => setOpen(false), 5200);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed bottom-24 left-1/2 z-[400] w-[min(92vw,22rem)] -translate-x-1/2 rounded-2xl border border-accent/35 bg-zinc-950/95 px-5 py-4 text-center font-mono text-xs text-ink-dark shadow-lift-dark backdrop-blur-xl dark:text-ink-dark"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-400">cheat unlocked</p>
          <p className="mt-2 text-sm leading-relaxed text-white/95">
            Stay curious. Stay ethical. Thanks for visiting the stack trace.
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
