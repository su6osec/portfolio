"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { BorderBeam } from "@/components/ui/border-beam";
import { ABOUT_BADGES } from "@/data/site-content";

/** Aligned with skills section — responsive type, professional scale */
const lead =
  "max-w-[min(38rem,92vw)] text-[clamp(0.9375rem,0.88rem+0.28vw,1.0625rem)] leading-[1.65] text-muted-dark";
const categoryTitle =
  "font-heading text-[clamp(1.0625rem,0.92rem+0.45vw,1.3125rem)] font-semibold tracking-tight text-ink-dark";
const itemText =
  "text-[clamp(0.8125rem,0.78rem+0.2vw,0.9375rem)] leading-snug text-ink-dark/95";
const bodyMuted =
  "text-[clamp(0.8125rem,0.76rem+0.22vw,0.9375rem)] leading-relaxed text-muted-dark";
const overline =
  "font-mono text-[clamp(0.625rem,0.58rem+0.12vw,0.75rem)] font-semibold uppercase tracking-[0.2em] text-fuchsia-400/85";
const chip =
  "inline-flex items-center rounded-lg border border-white/[0.09] bg-zinc-950/60 px-2.5 py-1.5 text-[clamp(0.6875rem,0.64rem+0.14vw,0.8125rem)] font-medium leading-none text-ink-dark/95 ring-1 ring-white/[0.03] backdrop-blur-sm sm:px-3 sm:py-1.5";

const cardShell = "section-card flex h-full flex-col";

const FOCUS_ITEMS = [
  "Bug bounty triage with structured evidence and reproducible steps.",
  "Penetration testing and vulnerability assessment for web-facing systems.",
  "Recon automation that composes industry tools into repeatable pipelines.",
  "Cloud infrastructure operations with an emphasis on reliability and least privilege.",
] as const;

export function About() {
  const badgeEntries = Object.entries(ABOUT_BADGES);

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-border-light py-20 dark:border-border-dark sm:py-24 lg:py-28"
      aria-labelledby="about-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-light to-transparent dark:via-border-dark" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.45]" aria-hidden>
        <div className="absolute -left-1/4 top-1/4 h-[min(38rem,65vh)] w-[min(40rem,88vw)] rounded-full bg-violet-600/[0.07] blur-3xl" />
        <div className="absolute -right-1/4 bottom-1/4 h-[min(34rem,50vh)] w-[min(34rem,82vw)] rounded-full bg-fuchsia-600/[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="about-heading" eyebrow="Profile">
            About
          </SectionHeading>
          <p className={`mt-5 sm:mt-6 ${lead}`}>
            I am a security researcher who bridges offensive testing with dependable infrastructure work. My practice
            spans bug bounty programs, penetration testing, recon automation, and day-to-day cloud operations—always
            with clear scoping, careful validation, and responsible disclosure.
          </p>
        </Reveal>

        {/* Top band: focus + ethos — fluid split on large screens */}
        <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-12 lg:items-stretch">
          <Reveal delay={0.04} className="min-w-0 lg:col-span-7">
            <article className={`${cardShell} overflow-hidden`}>
              <BorderBeam size={300} duration={14} colorFrom="#a855f7" colorTo="#6366f1" borderWidth={1.2} />
              <p className={overline}>01</p>
              <h3 className={`mt-3 ${categoryTitle}`}>Focus areas</h3>
              <ul className="mt-4 space-y-2.5 border-t border-white/[0.07] pt-4" aria-label="Focus areas">
                {FOCUS_ITEMS.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span
                      className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-500"
                      aria-hidden
                    />
                    <span className={itemText}>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0 lg:col-span-5">
            <article className={`${cardShell} justify-between`}>
              <div>
                <p className={overline}>02</p>
                <h3 className={`mt-3 ${categoryTitle}`}>Ethos</h3>
                <p className={`mt-3 ${bodyMuted}`}>
                  Evidence over noise. Scope before exploit. Disclosure with care.
                </p>
              </div>
              <p className={`mt-6 border-t border-white/[0.07] pt-4 font-mono text-[clamp(0.6875rem,0.62rem+0.18vw,0.8125rem)] leading-snug text-fuchsia-300/90`}>
                Structured validation · Clear reporting · Responsible boundaries
              </p>
            </article>
          </Reveal>
        </div>

        {/* Liquid grid: columns grow/shrink smoothly like the skills row */}
        <div className="mt-5 grid auto-rows-fr gap-5 sm:mt-6 sm:gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,16.25rem),1fr))]">
          {badgeEntries.map(([category, badges], i) => {
            const n = String(i + 3).padStart(2, "0");
            return (
              <Reveal key={category} delay={0.04 * (i + 2)}>
                <article className={cardShell}>
                  <p className={overline}>{n}</p>
                  <h3 className={`mt-3 ${categoryTitle}`}>{category}</h3>
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4 sm:gap-2.5">
                    {badges.map((b) => (
                      <span key={b} className={chip}>
                        {b}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
