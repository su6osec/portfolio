"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CardVariant = "default" | "highlight";

export function PortfolioCard({
  variant = "default",
  icon,
  category,
  title,
  description,
  tags,
  meta,
  actions,
  className,
}: {
  variant?: CardVariant;
  icon?: ReactNode;
  category?: string;
  title: string;
  description: string;
  tags?: string[];
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  const base = "group relative section-card flex h-full flex-col";
  const skin = variant === "highlight" ? "section-card--accent" : "";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={`${base} ${skin} ${className ?? ""}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon ? (
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-zinc-950/70 text-fuchsia-300/95 shadow-inner ring-1 ring-white/[0.05]"
              aria-hidden
            >
              {icon}
            </span>
          ) : null}
          <div>
            {category ? (
              <p className="font-mono text-[clamp(0.625rem,0.58rem+0.12vw,0.75rem)] font-semibold uppercase tracking-[0.18em] text-fuchsia-400/85">
                {category}
              </p>
            ) : null}
            <h3 className="font-heading text-[clamp(1.0625rem,0.95rem+0.35vw,1.25rem)] font-semibold tracking-tight text-ink-dark">
              {title}
            </h3>
          </div>
        </div>
      </div>
      <p className="mb-4 flex-1 text-[clamp(0.875rem,0.82rem+0.2vw,1rem)] leading-relaxed text-muted-dark">
        {description}
      </p>
      {tags && tags.length > 0 ? (
        <ul className="mb-4 flex flex-wrap gap-2" aria-label="Tags">
          {tags.map((t, i) => (
            <li
              key={`${t}-${i}`}
              className="inline-flex items-center rounded-lg border border-white/[0.09] bg-zinc-950/60 px-2.5 py-1.5 text-[clamp(0.6875rem,0.64rem+0.14vw,0.8125rem)] font-medium leading-none text-ink-dark/95 ring-1 ring-white/[0.03] backdrop-blur-sm sm:px-3 sm:py-1.5"
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}
      {meta ? <div className="mb-4 text-[clamp(0.8125rem,0.78rem+0.15vw,0.9375rem)] text-muted-dark">{meta}</div> : null}
      {actions ? <div className="mt-auto flex flex-wrap gap-3 pt-2">{actions}</div> : null}
    </motion.article>
  );
}
