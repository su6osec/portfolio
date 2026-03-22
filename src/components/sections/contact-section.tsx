"use client";

import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { Reveal } from "@/components/ui/reveal";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-b border-border-light py-24 dark:border-border-dark"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="min-w-0 flex-1">
              <SectionHeading id="contact-heading" eyebrow="Reach out">
                Contact
              </SectionHeading>
            </div>
            <CopyEmailButton className="shrink-0 self-start sm:self-end" idleLabel="Copy my email" />
          </div>
          <p className="mt-6 max-w-2xl text-body text-muted-light dark:text-muted-dark">
            Send a concise note—include scope, timelines, and the best address for a reply. Messages are validated
            server-side and filtered for abuse.
          </p>
        </Reveal>

        <ContactForm />
      </div>
    </section>
  );
}
