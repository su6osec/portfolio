"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

export function GithubStatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200/70 bg-slate-50/80 p-2.5 text-center ring-1 ring-slate-200/50 dark:border-white/[0.08] dark:bg-zinc-950/50 dark:ring-white/[0.04] sm:p-3">
      <dt className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 dark:text-muted-dark sm:text-[10px]">
        {label}
      </dt>
      <dd className="mt-1 font-heading text-lg font-semibold text-slate-900 dark:text-ink-dark sm:text-xl">
        <NumberTicker value={value} delay={0.2} />
      </dd>
    </div>
  );
}
