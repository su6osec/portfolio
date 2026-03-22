import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
};

export function SectionHeading({ id, children, className = "", eyebrow }: Props) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-overline font-semibold uppercase tracking-[0.22em] text-fuchsia-400/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="font-heading text-section-title font-semibold tracking-tight text-ink-dark">
        <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-violet-300 bg-clip-text text-transparent">
          {children}
        </span>
      </h2>
    </div>
  );
}
