"use client";

import { motion } from "framer-motion";
import { RESUME_FILE, RESUME_URL } from "@/lib/constants";

type ResumeButtonProps = {
  className?: string;
  /** Filled gradient — e.g. mobile drawer CTA */
  variant?: "default" | "accent";
  /** Skip Framer tap/hover scale (e.g. mobile menu CTA). */
  disableAnimation?: boolean;
};

export function ResumeButton({
  className = "",
  variant = "default",
  disableAnimation = false,
}: ResumeButtonProps) {
  const href = (RESUME_URL || RESUME_FILE).trim();
  const isExternal = /^https?:\/\//i.test(href);

  const variantClass =
    variant === "accent"
      ? "border-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-400/95 text-white shadow-lg shadow-fuchsia-950/35 hover:brightness-110 hover:text-white"
      : "border-purple-500/25 bg-zinc-950/85 text-ink-dark shadow-sm hover:border-fuchsia-500/45 hover:text-fuchsia-300";

  const motionClass = `inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm transition-[color,background-color,border-color,box-shadow,filter,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${variantClass} ${className}`;

  const icon = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (disableAnimation) {
    return (
      <a
        href={href}
        download="Resume.pdf"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
        className={motionClass}
      >
        {icon}
        Resume
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      download="Resume.pdf"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={motionClass}
    >
      {icon}
      Resume
    </motion.a>
  );
}
