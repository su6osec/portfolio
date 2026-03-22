"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TESTIMONIALS } from "@/data/testimonials";
import { motion } from "framer-motion";

function QuoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 7h6v6H9l-2 4H4l2.5-4A4 4 0 0 1 7 7Zm10 0h6v6h-4l-2 4h-3l2.5-4A4 4 0 0 1 17 7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="text-accent/50"
      />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative border-b border-border-light py-24 dark:border-border-dark"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="testimonials-heading" eyebrow="Community">
            Testimonials
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-body text-muted-light dark:text-muted-dark">
            Placeholder endorsements to demonstrate layout—you can replace these with real quotes and verified
            attributions.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={0.05 * i}>
              <motion.figure
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="section-card flex h-full flex-col p-6 sm:p-7"
              >
                <QuoteIcon />
                <blockquote className="mt-4 flex-1 text-[clamp(0.875rem,0.82rem+0.2vw,1rem)] leading-relaxed text-muted-dark">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/[0.08] pt-5">
                  <p className="font-heading text-[clamp(0.875rem,0.82rem+0.2vw,1rem)] font-semibold text-ink-dark">
                    {t.name}
                  </p>
                  <p className="text-[clamp(0.75rem,0.72rem+0.12vw,0.875rem)] text-muted-dark">
                    {t.role} · {t.org}
                  </p>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
