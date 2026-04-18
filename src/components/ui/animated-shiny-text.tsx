import type { CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
}) => {
  return (
    <span
      style={{ "--shiny-width": `${shimmerWidth}px` } as CSSProperties}
      className={cn(
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0]",
        "[background-size:var(--shiny-width)_100%]",
        "[transition:background-position_1.2s_cubic-bezier(.6,.6,0,1)_infinite]",
        /* light mode: shimmer is dark sparkle on muted text */
        "text-slate-500 bg-gradient-to-r from-transparent via-slate-800/80 via-50% to-transparent",
        /* dark mode: shimmer is bright on muted text */
        "dark:text-zinc-400 dark:bg-gradient-to-r dark:from-transparent dark:via-white/85 dark:via-50% dark:to-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
};
