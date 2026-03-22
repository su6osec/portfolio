"use client";

import type { ContributionCalendar } from "@/lib/github-contributions";
import { motion } from "framer-motion";

export function ContributionHeatmap({ calendar }: { calendar: ContributionCalendar | null }) {
  if (!calendar) {
    return (
      <div className="flex h-full min-h-[200px] w-full min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-purple-500/20 bg-purple-950/20 p-6 text-center sm:p-8">
        <p className="text-sm text-muted-dark">Contribution calendar will appear when data is available.</p>
      </div>
    );
  }

  const weeks = calendar.weeks;
  if (weeks.length === 0) {
    return (
      <div className="flex h-full min-h-[160px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-purple-500/20 bg-purple-950/15 p-6 text-center">
        <p className="text-sm text-muted-dark">No week data in this calendar response.</p>
      </div>
    );
  }

  const colCount = weeks.length;

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
        <p className="min-w-0 font-mono text-[11px] text-muted-dark sm:text-xs">
          Last ~year · {calendar.totalContributions} contributions
        </p>
        <p className="shrink-0 text-[10px] text-muted-dark sm:text-[11px]">Intensity → activity level</p>
      </div>

      {/* Fluid grid: all weeks visible in one row — no horizontal scroll */}
      <div
        className="mt-4 grid w-full min-w-0 gap-px sm:mt-5 sm:gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className="flex min-w-0 flex-col gap-px sm:gap-[3px]">
            {week.map((day) => (
              <motion.span
                key={day.date}
                title={`${day.date}: ${day.contributionCount}`}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="aspect-square w-full min-h-[2px] min-w-0 rounded-sm border border-purple-500/15"
                style={{
                  backgroundColor: day.color || "rgba(147, 51, 234, 0.25)",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
