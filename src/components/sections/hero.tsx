"use client";

import { HeroPanel } from "@/components/sections/hero-panel";
import { HeroParticles } from "@/components/sections/hero-particles";
import { RotatingTypewriter } from "@/components/ui/rotating-typewriter";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ROLE_LINES = [
  "Security researcher & cloud infrastructure engineer",
  "Offensive security · recon · cloud hardening",
  "Bug bounty · responsible disclosure · automation",
] as const;

export function Hero({ avatarUrl }: { avatarUrl: string }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = window.setTimeout(() => setStage(1), 200);
    const t2 = window.setTimeout(() => setStage(2), 500);
    const t3 = window.setTimeout(() => setStage(3), 800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-x-hidden border-b border-border-dark pb-24 pt-28 sm:pt-32 lg:pt-36"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(147,51,234,0.18),transparent_55%)]" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-purple-900/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-950/25 blur-3xl" />
        <HeroParticles />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay" />
      </div>

      <div className="relative mx-auto max-w-content min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="relative mb-12 flex w-full justify-center sm:mb-14">
          <div
            className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative z-10"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-fuchsia-500/80 via-purple-600/70 to-violet-900/80 opacity-80 blur-[3px]" />
            <div className="relative h-[7rem] w-[7rem] overflow-hidden rounded-full border-2 border-purple-400/45 bg-zinc-950 p-1 shadow-[0_0_48px_rgba(168,85,247,0.35)] sm:h-[7.5rem] sm:w-[7.5rem]">
              <Image
                src={avatarUrl}
                alt="Deepanshu Chauhan"
                width={240}
                height={240}
                className="h-full w-full rounded-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        <div className="grid min-w-0 gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="flex min-h-[min(24rem,60vh)] min-w-0 flex-col justify-center lg:min-h-[min(28rem,72vh)]">
            <BlurFade delay={0} duration={0.55}>
              <AnimatedGradientText className="mb-5 ml-0">
                <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-fuchsia-600 dark:text-fuchsia-300">
                  su6osec · Portfolio
                </span>
              </AnimatedGradientText>
              <h1
                id="hero-heading"
                className="font-heading text-hero font-semibold tracking-tight text-slate-900 dark:text-ink-dark"
              >
                Deepanshu Chauhan
              </h1>
            </BlurFade>

            {stage >= 1 ? (
              <motion.div
                key="role"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 min-h-[2.75rem] w-full min-w-0 max-w-full sm:min-h-[3rem]"
              >
                <div className="w-full min-w-0 overflow-x-hidden">
                  <RotatingTypewriter
                    lines={ROLE_LINES}
                    className="block w-full min-w-0 text-xs leading-snug text-ink-dark sm:text-sm md:text-base"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-fuchsia-500/20 bg-zinc-950/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-dark shadow-inner shadow-fuchsia-950/20 backdrop-blur-md sm:text-[11px]"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="truncate text-ink-dark/90">Open to collab · security &amp; cloud</span>
                </motion.p>
              </motion.div>
            ) : (
              <div className="mt-5 min-h-[2.75rem]" aria-hidden />
            )}

            {stage >= 2 ? (
              <motion.p
                key="bio"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-xl text-body text-muted-dark"
              >
                Practical cybersecurity through structured testing, recon automation, and responsible disclosure —
                backed by reliable cloud and infrastructure operations. Calm systems, clear documentation, and
                measurable outcomes define how I work.
              </motion.p>
            ) : (
              <div className="mt-7 min-h-[6rem]" aria-hidden />
            )}

            {stage >= 3 ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-11 flex flex-wrap gap-4"
              >
                <Link
                  href="#projects"
                  className="interactive-lift inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/40 transition hover:brightness-110"
                >
                  View projects
                </Link>
                <Link
                  href="#contact"
                  className="interactive-lift inline-flex items-center justify-center rounded-full border border-purple-500/30 bg-zinc-950/80 px-7 py-3.5 text-sm font-semibold text-ink-dark backdrop-blur-sm transition-colors hover:border-fuchsia-500/45 hover:text-fuchsia-300"
                >
                  Contact
                </Link>
              </motion.div>
            ) : (
              <div className="mt-11 min-h-[3.25rem]" aria-hidden />
            )}
          </div>

          <HeroPanel />
        </div>
      </div>
    </section>
  );
}
