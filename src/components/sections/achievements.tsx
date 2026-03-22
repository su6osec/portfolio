"use client";

import { PortfolioCard } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { BUG_BOUNTY } from "@/data/site-content";
import { Reveal } from "@/components/ui/reveal";

function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 3h12v2a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 5H4a2 2 0 0 0-2 2v1a3 3 0 0 0 3 3h1M18 5h2a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1M9 14h6v3a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3v-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Achievements() {
  return (
    <section
      id="achievements"
      className="relative border-b border-border-light py-24 dark:border-border-dark"
      aria-labelledby="achievements-heading"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="achievements-heading" eyebrow="Disclosure">
            Bug bounty achievements
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-body text-muted-light dark:text-muted-dark">
            Acknowledged rewards from coordinated disclosure programs—shared to highlight impact without exposing
            sensitive details.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {BUG_BOUNTY.map((item, i) => (
            <Reveal key={item.org} delay={0.06 * i}>
              <PortfolioCard
                variant="highlight"
                icon={<TrophyIcon />}
                category="Disclosure"
                title={`${item.amount} — ${item.org}`}
                description={item.detail}
                tags={["Bug bounty", "Responsible disclosure"]}
                meta={<span className="text-xs uppercase tracking-wider text-muted-light dark:text-muted-dark">Reward</span>}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
