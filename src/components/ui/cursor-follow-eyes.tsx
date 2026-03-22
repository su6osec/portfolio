"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  disabled?: boolean;
  className?: string;
  variant?: "nav" | "form";
};

type Mood = "good" | "excited" | "wow";

/**
 * Cute face: tracking eyes, brows, nose — cycles happy moods (good → excited → wow), blink — no box background.
 */
export function CursorFollowEyes({ disabled, className = "", variant = "form" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [mood, setMood] = useState<Mood>("good");

  const isNav = variant === "nav";
  const w = isNav ? 76 : 96;
  const h = isNav ? 38 : 46;
  const scale = isNav ? 1 : 1.15;

  useEffect(() => {
    if (disabled) return;

    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = (e.clientX - cx) / Math.max(14, r.width / 2);
      const ny = (e.clientY - cy) / Math.max(14, r.height / 2);
      const clamp = (v: number) => Math.min(1, Math.max(-1, v));
      const m = isNav ? 2.8 : 3.8;
      setOffset({
        x: clamp(nx) * m,
        y: clamp(ny) * (isNav ? 2.2 : 3),
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [disabled, isNav]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
    }, 2800 + Math.random() * 1200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMood((m) => (m === "good" ? "excited" : m === "excited" ? "wow" : "good"));
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const px = offset.x;
  const py = offset.y;

  const browLeft =
    mood === "wow"
      ? "M 9 5.5 Q 18 2 27 5"
      : mood === "excited"
        ? "M 9 6 Q 18 2.5 27 5.5"
        : "M 10 6.5 Q 18 3.5 26 6";
  const browRight =
    mood === "wow"
      ? "M 49 5.5 Q 58 2 67 5"
      : mood === "excited"
        ? "M 49 6 Q 58 2.5 67 5.5"
        : "M 50 6 Q 58 3.5 66 6";

  const eyeRy = mood === "wow" ? 9.2 : mood === "excited" ? 8.4 : 8;

  const mouthPath =
    mood === "excited"
      ? "M 24 27.5 Q 38 35.5 52 27.5"
      : "M 26 28.5 Q 38 33.5 50 28.5";

  const flirtMotion =
    isNav && !reduceMotion
      ? { x: [0, 6, -5, 4, -3, 0], rotate: [0, 6, -5, 4, 0], scale: [1, 1.06, 1.03, 1] }
      : {};

  return (
    <motion.div
      ref={wrapRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
      initial={false}
      animate={flirtMotion}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 76 38"
        className="overflow-visible text-zinc-300 dark:text-zinc-200"
        style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
      >
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth={1.35}
          strokeLinecap="round"
          animate={{ d: browLeft }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth={1.35}
          strokeLinecap="round"
          animate={{ d: browRight }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.g
          animate={{ scaleY: blink ? 0.12 : 1 }}
          transition={{ duration: 0.07, ease: "easeIn" }}
          style={{ transformOrigin: "38px 15px" }}
        >
          <motion.ellipse
            cx="22"
            cy="15"
            rx="9"
            animate={{ ry: eyeRy }}
            transition={{ duration: 0.35 }}
            fill="#f4f4f5"
            stroke="rgba(24,24,27,0.12)"
            strokeWidth="0.75"
          />
          <motion.ellipse
            cx="54"
            cy="15"
            rx="9"
            animate={{ ry: eyeRy }}
            transition={{ duration: 0.35 }}
            fill="#f4f4f5"
            stroke="rgba(24,24,27,0.12)"
            strokeWidth="0.75"
          />
        </motion.g>

        {!blink ? (
          <g>
            <circle
              cx={22 + px * 0.45}
              cy={15 + py * 0.35}
              r={mood === "wow" ? 2.9 : 3.2}
              className="fill-zinc-900 dark:fill-zinc-950"
            />
            <circle
              cx={54 + px * 0.45}
              cy={15 + py * 0.35}
              r={mood === "wow" ? 2.9 : 3.2}
              className="fill-zinc-900 dark:fill-zinc-950"
            />
            <circle cx={22 + px * 0.45 + 1} cy={14 + py * 0.35 - 0.8} r="0.9" className="fill-white/85" />
            <circle cx={54 + px * 0.45 + 1} cy={14 + py * 0.35 - 0.8} r="0.9" className="fill-white/85" />
          </g>
        ) : null}

        <ellipse
          cx="38"
          cy="22"
          rx="1.6"
          ry="2"
          fill="rgba(244,114,182,0.22)"
          stroke="rgba(192,38,211,0.35)"
          strokeWidth="0.5"
        />

        {mood === "wow" ? (
          <ellipse
            cx="38"
            cy="28.5"
            rx="4"
            ry="4.2"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.35}
            className="text-fuchsia-400/85 dark:text-fuchsia-400/80"
          />
        ) : (
          <motion.path
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            className="text-fuchsia-400/75 dark:text-fuchsia-400/70"
            animate={{ d: mouthPath }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </svg>
    </motion.div>
  );
}
