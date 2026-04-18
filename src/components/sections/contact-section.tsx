"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { Reveal } from "@/components/ui/reveal";
import { CONTACT_EMAIL } from "@/lib/constants";
import { BorderBeam } from "@/components/ui/border-beam";

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-b border-border-light py-24 dark:border-border-dark"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="contact-heading" eyebrow="Reach out">
            Contact
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-body text-muted-light dark:text-muted-dark">
            Have a project, disclosure, or collaboration in mind? Reach out directly — I respond to concise, scoped messages.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-sm dark:border-white/[0.07] dark:bg-zinc-950/50 sm:p-10 lg:p-12">
            <BorderBeam size={320} duration={12} colorFrom="#a855f7" colorTo="#6366f1" borderWidth={1.5} />

            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-600 dark:text-fuchsia-400">
                  deepanshu.infosec@gmail.com
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-slate-900 dark:text-ink-dark sm:text-3xl">
                  Let&apos;s work together
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-slate-500 dark:text-muted-dark">
                  Open for security research collaborations, bug bounty consulting, cloud infrastructure projects, and technical writing opportunities.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
                >
                  <MailIcon />
                  Send Email
                </a>
                <CopyEmailButton
                  idleLabel="Copy email"
                  copiedLabel="Copied!"
                  className="!border-slate-200/80 !bg-white/90 !text-slate-600 hover:!border-fuchsia-400/50 hover:!text-fuchsia-700 dark:!border-white/10 dark:!bg-white/5 dark:!text-muted-dark dark:hover:!text-fuchsia-300"
                />
              </div>
            </div>

            <div className="mt-10 grid gap-4 border-t border-slate-200/60 pt-8 dark:border-white/[0.07] sm:grid-cols-3">
              {[
                { label: "Response time", value: "Within 48 hours" },
                { label: "Best for", value: "Security & cloud projects" },
                { label: "Timezone", value: "IST (UTC +5:30)" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fuchsia-600/80 dark:text-fuchsia-400/70">{label}</p>
                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-ink-dark/90">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
