"use client";

import type { ContributionCalendar } from "@/lib/github-contributions";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Maps RGBA alpha ~into visible light-mode purple tones
function adaptColorForLight(color: string): string {
  // If it's already a hex color (from GraphQL), use a purple equivalent based on luminance
  if (color.startsWith("#")) {
    // GitHub greens → map to fuchsia/purple for our theme
    return color; // hex colors are fine as-is
  }
  // For our SVG rgba colors, boost opacity for light mode visibility
  return color.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/, (_, r, g, b, a) => {
    const boosted = Math.min(1, parseFloat(a) + 0.25);
    return `rgba(${r},${g},${b},${boosted})`;
  });
}

function useColors() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === "dark";
  return {
    emptyColor: isDark ? "rgba(147, 51, 234, 0.15)" : "rgba(209, 213, 219, 0.8)",
    isDark,
  };
}

export function ContributionHeatmap({ calendar }: { calendar: ContributionCalendar | null }) {
  const { emptyColor, isDark } = useColors();

  if (!calendar) {
    return (
      <div className="flex h-full min-h-[200px] w-full min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-purple-500/20 p-6 text-center sm:p-8">
        <p className="text-sm text-muted-dark">Contribution calendar will appear when data is available.</p>
      </div>
    );
  }

  const weeks = calendar.weeks;
  if (weeks.length === 0) {
    return (
      <div className="flex h-full min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-purple-500/20 p-6 text-center">
        <p className="text-sm text-muted-dark">No week data in this calendar response.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
        <p className="min-w-0 font-mono text-[11px] text-muted-dark sm:text-xs">
          Last ~year · {calendar.totalContributions} contributions
        </p>
        <p className="shrink-0 text-[10px] text-muted-dark sm:text-[11px]">Intensity → activity level</p>
      </div>

      <div
        className="mt-4 grid w-full min-w-0 gap-px sm:mt-5 sm:gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className="flex min-w-0 flex-col gap-px sm:gap-[3px]">
            {week.map((day) => {
              const active = day.contributionCount > 0;
              const cellColor = active
                ? isDark
                  ? (day.color ?? "rgba(147, 51, 234, 0.7)")
                  : adaptColorForLight(day.color ?? "rgba(147, 51, 234, 0.7)")
                : emptyColor;

              return (
                <motion.span
                  key={day.date}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.18 }}
                  className="aspect-square w-full min-h-[3px] min-w-0 rounded-sm"
                  style={{ backgroundColor: cellColor }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
