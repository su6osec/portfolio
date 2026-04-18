"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TIMELINE } from "@/data/timeline";

const lead =
  "max-w-[min(40rem,92vw)] text-[clamp(0.9375rem,0.88rem+0.28vw,1.0625rem)] leading-[1.65] text-muted-dark";
const overline =
  "font-mono text-[clamp(0.625rem,0.58rem+0.12vw,0.75rem)] font-semibold uppercase tracking-[0.2em] text-fuchsia-400/85";
const title =
  "font-heading text-[clamp(1.0625rem,0.92rem+0.45vw,1.35rem)] font-bold tracking-tight text-ink-dark";
const orgLine =
  "text-[clamp(0.8125rem,0.78rem+0.18vw,0.9375rem)] font-medium text-muted-dark";
const body =
  "text-[clamp(0.875rem,0.82rem+0.2vw,1rem)] leading-relaxed text-muted-dark";
const chip =
  "inline-flex items-center rounded-lg border border-white/[0.09] bg-zinc-950/60 px-2.5 py-1 text-[clamp(0.65rem,0.6rem+0.12vw,0.75rem)] font-semibold uppercase tracking-wider text-ink-dark/90 ring-1 ring-white/[0.04] backdrop-blur-sm";
const yearPill =
  "inline-flex items-center rounded-full border border-fuchsia-500/35 bg-gradient-to-r from-fuchsia-500/15 via-purple-500/10 to-violet-600/15 px-3 py-1 font-mono text-[clamp(0.7rem,0.65rem+0.15vw,0.8125rem)] font-bold tabular-nums tracking-wide text-fuchsia-700 dark:text-fuchsia-100 shadow-[0_0_20px_-8px_rgba(217,70,239,0.45)]";

export function Experience() {
  const n = TIMELINE.length;

  return (
    <section
      id="experience"
      className="relative overflow-hidden border-b border-border-light py-20 dark:border-border-dark sm:py-24 lg:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.5]" aria-hidden>
        <div className="absolute -left-1/4 top-0 h-[min(36rem,60vh)] w-[min(38rem,90vw)] rounded-full bg-purple-600/[0.09] blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[min(32rem,50vh)] w-[min(34rem,85vw)] rounded-full bg-fuchsia-500/[0.07] blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-[min(24rem,40vh)] w-[min(24rem,70vw)] -translate-x-1/2 rounded-full bg-violet-600/[0.05] blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(244,244,255,0.35) 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="experience-heading" eyebrow="The arc">
            Experience
          </SectionHeading>
          <p className={`mt-5 sm:mt-6 ${lead}`}>
            Education → certs → community → shipped tools → production infra. A straight-line story with receipts—not
            a buzzword wall.
          </p>
          <p className="mt-3 font-mono text-[clamp(0.7rem,0.65rem+0.12vw,0.8125rem)] uppercase tracking-[0.28em] text-fuchsia-400/70">
            ✦ proof of work · public trail · real roles
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {TIMELINE.map((item, i) => {
            const idx = String(i + 1).padStart(2, "0");
            const isCurrent = i === n - 1;
            return (
              <Reveal
                key={`${item.title}-${item.year}`}
                delay={0.04 * i}
                className={isCurrent ? "md:col-span-3" : undefined}
              >
                <article
                  className={`section-card group relative flex h-full flex-col overflow-hidden ${
                    isCurrent ? "section-card--accent" : ""
                  }`}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gradient-to-br from-fuchsia-500/20 via-purple-600/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <p className={`relative z-[1] ${overline}`}>{idx}</p>

                  <div className="relative mt-3 flex flex-wrap items-center gap-2">
                    <span className={yearPill}>{item.year}</span>
                    {item.vibe ? <span className={chip}>{item.vibe}</span> : null}
                  </div>

                  <h3 className={`relative mt-3 ${title}`}>
                    <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-fuchsia-700 bg-clip-text text-transparent dark:from-ink-dark dark:via-ink-dark dark:to-fuchsia-200/95">
                      {item.title}
                    </span>
                  </h3>
                  <p className={`relative mt-1.5 ${orgLine}`}>{item.org}</p>

                  <div className="relative mt-4 border-t border-white/[0.08] pt-4">
                    <p className={body}>{item.description}</p>
                  </div>

                  {isCurrent ? (
                    <p className="relative mt-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fuchsia-300/80">
                      Active · current chapter
                    </p>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
