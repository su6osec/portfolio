"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";

const metrics = [
  { label: "Focus", value: "Bug bounty · pentest", cmd: "echo $FOCUS" },
  { label: "Stack", value: "Cloud · Linux · Azure", cmd: "cat ./stack.conf" },
  { label: "Automation", value: "su6oRecon · tooling", cmd: "run recon --status" },
] as const;

const STATIC_ROWS = [
  { cmd: "whoami", out: "deepanshu.chauhan · su6osec" },
  { cmd: "cat ./scope.conf", out: "web · api · cloud · iot" },
  { cmd: "check --disclosure", out: "coordinated · responsible" },
] as const;

const TYPE_MS = 40;
const HOLD_MS = 2400;
const ERASE_MS = 20;

export function HeroPanel() {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "erase">("typing");

  const cmd = metrics[cmdIndex].cmd;

  useEffect(() => {
    if (phase !== "typing") return;
    if (typed.length >= cmd.length) return;
    const t = window.setTimeout(() => setTyped(cmd.slice(0, typed.length + 1)), TYPE_MS);
    return () => window.clearTimeout(t);
  }, [phase, typed, cmd]);

  useEffect(() => {
    if (phase !== "typing" || typed.length !== cmd.length || cmd.length === 0) return;
    const t = window.setTimeout(() => setPhase("hold"), 140);
    return () => window.clearTimeout(t);
  }, [phase, typed, cmd]);

  useEffect(() => {
    if (phase !== "hold") return;
    const t = window.setTimeout(() => setPhase("erase"), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "erase") return;
    if (typed.length > 0) {
      const t = window.setTimeout(() => setTyped((s) => s.slice(0, -1)), ERASE_MS);
      return () => window.clearTimeout(t);
    }
    const id = window.requestAnimationFrame(() => {
      setCmdIndex((i) => (i + 1) % metrics.length);
      setPhase("typing");
    });
    return () => window.cancelAnimationFrame(id);
  }, [phase, typed]);

  const showResult = typed.length === cmd.length && (phase === "hold" || phase === "erase");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="section-card relative min-h-[300px] min-w-0 overflow-hidden p-6 sm:min-h-[320px] sm:p-8"
    >
      <BorderBeam
        size={280}
        duration={10}
        colorFrom="#c084fc"
        colorTo="#818cf8"
        borderWidth={1.5}
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-purple-900/20 blur-3xl" />

      <div className="absolute inset-0 animate-grid-drift bg-[linear-gradient(rgba(147,51,234,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <motion.div
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent"
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex flex-col items-center">
        <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:gap-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark sm:text-xs">live.status</p>
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-purple-500/25 bg-zinc-950/90 px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-ink-dark sm:px-2.5 sm:text-[10px]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available
          </span>
        </div>

        <div className="mt-5 w-full min-w-0 rounded-2xl border border-border-dark bg-zinc-950/85 p-3 font-mono text-[11px] leading-relaxed text-muted-dark shadow-inner sm:mt-6 sm:p-4 sm:text-xs">
          <div className="flex items-center gap-2 border-b border-border-dark pb-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-400/90" />
            <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400/90" />
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400/90" />
            <span className="ml-2 truncate text-[9px] text-muted-dark/80 sm:text-[10px]">session — zsh</span>
          </div>
          <motion.div
            className="mt-3 space-y-2"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
          >
            {STATIC_ROWS.map((row) => (
              <motion.div
                key={row.cmd}
                variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.35 }}
                className="min-w-0"
              >
                <p className="truncate">
                  <span className="text-fuchsia-400">➜</span>{" "}
                  <span className="text-ink-dark" title={row.cmd}>
                    {row.cmd}
                  </span>
                </p>
                <p className="min-w-0 truncate pl-4 text-[10px] text-muted-dark/90 sm:text-[11px]" title={row.out}>
                  {row.out}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-3 border-t border-border-dark pt-3">
            <p className="mb-2 min-h-[1.35rem] font-mono text-[10px] sm:text-[11px]">
              <span className="text-muted-dark">→ </span>
              {showResult ? (
                <motion.span
                  key={`${cmdIndex}-${metrics[cmdIndex].value}`}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-ink-dark"
                >
                  {metrics[cmdIndex].value}
                </motion.span>
              ) : (
                <span className="text-muted-dark/40">awaiting stdin…</span>
              )}
            </p>
            <div className="flex min-h-[1.5rem] flex-wrap items-center gap-x-1 font-mono text-[11px] sm:text-xs">
              <span className="shrink-0 text-fuchsia-400">$</span>
              <span className="min-w-0 break-all text-ink-dark">
                {typed}
                <motion.span
                  className="ml-px inline-block w-px bg-fuchsia-400"
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ height: "0.9em", verticalAlign: "-0.08em" }}
                  aria-hidden
                />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid min-w-0 w-full grid-cols-1 gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 28, delay: 0.2 + i * 0.06 }}
              className={`min-w-0 rounded-xl border bg-zinc-950/50 p-2.5 ring-1 backdrop-blur-sm sm:p-3 ${
                i === cmdIndex
                  ? "border-fuchsia-500/40 ring-fuchsia-500/25 shadow-[0_0_22px_-10px_rgba(217,70,239,0.4)]"
                  : "border-white/[0.08] ring-white/[0.04]"
              }`}
            >
              <p className="truncate text-[9px] font-semibold uppercase tracking-wider text-muted-dark sm:text-[10px]">
                {m.label}
              </p>
              <p
                className="mt-1 line-clamp-3 font-heading text-[11px] font-semibold leading-tight text-ink-dark sm:text-sm"
                title={m.value}
              >
                {m.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
