"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SKILLS_SECTION } from "@/data/site-content";

/** Responsive type tuned for readability: compact on phones, calm on large screens. */
const lead =
  "max-w-[min(38rem,92vw)] text-[clamp(0.9375rem,0.88rem+0.28vw,1.0625rem)] leading-[1.65] text-muted-dark";
const categoryTitle =
  "font-heading text-[clamp(1.0625rem,0.92rem+0.45vw,1.3125rem)] font-semibold tracking-tight text-ink-dark";
const blurb =
  "mt-2.5 text-[clamp(0.8125rem,0.76rem+0.22vw,0.9375rem)] leading-relaxed text-muted-dark";
const itemText =
  "text-[clamp(0.8125rem,0.78rem+0.2vw,0.9375rem)] leading-snug text-ink-dark/95";
const overline =
  "font-mono text-[clamp(0.625rem,0.58rem+0.12vw,0.75rem)] font-semibold uppercase tracking-[0.2em] text-fuchsia-400/85";
const chip =
  "inline-flex items-center rounded-lg border border-white/[0.09] bg-zinc-950/60 px-2.5 py-1.5 text-[clamp(0.6875rem,0.64rem+0.14vw,0.8125rem)] font-medium leading-none text-ink-dark/95 ring-1 ring-white/[0.03] backdrop-blur-sm sm:px-3 sm:py-1.5";

const domainCard = "section-card flex h-full flex-col";

export function Skills() {
  const tagCloud = SKILLS_SECTION.flatMap((s) => s.items);

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-b border-border-light py-20 dark:border-border-dark sm:py-24 lg:py-28"
      aria-labelledby="skills-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[min(42rem,70vh)] w-[min(42rem,90vw)] rounded-full bg-purple-600/[0.07] blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[min(36rem,55vh)] w-[min(36rem,85vw)] rounded-full bg-fuchsia-600/[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="skills-heading" eyebrow="Capabilities">
            Skills
          </SectionHeading>
          <p className={`mt-5 sm:mt-6 ${lead}`}>
            Technical strengths across offensive security, automation, and infrastructure—structured by domain so
            you can see depth without a wall of buzzwords.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {SKILLS_SECTION.map((block, i) => (
            <Reveal key={block.category} delay={0.04 * i}>
              <article className={domainCard}>
                <p className={overline}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className={`mt-3 ${categoryTitle}`}>{block.category}</h3>
                <p className={blurb}>{block.blurb}</p>
                <ul className="mt-4 flex-1 space-y-2.5 border-t border-white/[0.07] pt-4" aria-label={`${block.category} details`}>
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-500"
                        aria-hidden
                      />
                      <span className={itemText}>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="section-card mt-12 sm:mt-14 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <p className={overline}>Keywords &amp; tools</p>
              <p className="text-[clamp(0.75rem,0.72rem+0.12vw,0.875rem)] text-muted-dark">
                Cross-cutting stack referenced across projects and labs.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
              {tagCloud.map((t) => (
                <span key={t} className={chip}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
