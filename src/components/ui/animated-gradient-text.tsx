import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-full",
        "bg-white/60 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff18]",
        "backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%]",
        "hover:shadow-[inset_0_-5px_10px_#8fdfff28]",
        "dark:bg-black/40 dark:shadow-[inset_0_-8px_10px_#8fdfff1f]",
        className,
      )}
    >
      {/* Animated gradient border */}
      <div
        className={cn(
          "absolute inset-0 block h-full w-full rounded-full p-[1px]",
          "animate-gradient bg-gradient-to-r from-[#c084fc]/60 via-[#818cf8]/60 to-[#c084fc]/60",
          "bg-[length:var(--bg-size)_100%]",
          "![mask-composite:subtract]",
          "[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        )}
      />
      {children}
    </div>
  );
}
