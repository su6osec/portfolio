import type { ReactNode } from "react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

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
        <p className="mb-3 font-mono text-overline font-semibold uppercase tracking-[0.22em]">
          <AnimatedShinyText shimmerWidth={120}>{eyebrow}</AnimatedShinyText>
        </p>
      ) : null}
      <h2 id={id} className="font-heading text-section-title font-semibold tracking-tight">
        <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-400 bg-clip-text text-transparent dark:from-fuchsia-400 dark:via-purple-400 dark:to-violet-300">
          {children}
        </span>
      </h2>
    </div>
  );
}
