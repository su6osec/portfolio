"use client";

import { PortfolioCard } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CERTIFICATIONS } from "@/data/site-content";
import { Reveal } from "@/components/ui/reveal";
import Link from "next/link";

function CertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3h10a2 2 0 0 1 2 2v9a4 4 0 0 1-4 4h-2v3l-3-3H9a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative border-b border-border-light py-24 dark:border-border-dark"
      aria-labelledby="certifications-heading"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="certifications-heading" eyebrow="Credentials">
            Certifications
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-body text-muted-light dark:text-muted-dark">
            Formal credentials that complement hands-on practice across security and cloud platforms.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.title} delay={0.05 * i}>
              <PortfolioCard
                icon={<CertIcon />}
                category={c.issuer}
                title={c.title}
                description={c.description}
                tags={["Credential", "Verification available"]}
                actions={
                  c.verifyUrl ? (
                    <Link
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hoverLight dark:hover:bg-accent-hoverDark"
                    >
                      Verify / Learn more
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-light dark:text-muted-dark">Verification link on request</span>
                  )
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
