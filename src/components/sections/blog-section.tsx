"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MEDIUM_PROFILE } from "@/lib/medium";
import type { MediumPost } from "@/lib/medium";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

const BATCH = 6;

type Props = {
  posts: MediumPost[];
};

function readingMinutes(excerpt: string): number {
  const words = excerpt.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function TiltArticleCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 28 });
  const springY = useSpring(y, { stiffness: 320, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    x.set(px * 12);
    y.set(-py * 12);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        perspective: 900,
        rotateX: springY,
        rotateY: springX,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

export function BlogSection({ posts }: Props) {
  const [visible, setVisible] = useState(BATCH);
  const shown = posts.slice(0, visible);
  const canLoadMore = visible < posts.length;

  return (
    <section
      id="writing"
      className="relative border-b border-border-light py-24 dark:border-border-dark"
      aria-labelledby="writing-heading"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="writing-heading" eyebrow="Notes">
            Writing
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-body text-muted-light dark:text-muted-dark">
            Articles from{" "}
            <Link
              href={MEDIUM_PROFILE}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-fuchsia-400 underline-offset-4 transition-colors duration-200 ease-out hover:text-fuchsia-300 hover:underline"
            >
              su6osec on Medium
            </Link>
            — security, automation, and infrastructure notes.
          </p>
        </Reveal>

        {shown.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-fuchsia-500/25 bg-zinc-950/30 px-6 py-10 text-center text-sm text-muted-dark">
            Could not load Medium feed right now.{" "}
            <Link
              href={MEDIUM_PROFILE}
              className="text-fuchsia-400 underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              Open Medium profile
            </Link>
            .
          </p>
        ) : (
          <>
            <ul className="mt-14 grid list-none auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((post, i) => (
                <Reveal key={post.id} delay={0.03 * (i % BATCH)} className="h-full min-h-0">
                  <li className="h-full min-h-0">
                    <TiltArticleCard className="flex h-full min-h-0 flex-col [transform-style:preserve-3d]">
                      <motion.div
                        whileHover={{ z: 8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        className="section-card flex h-full min-h-[280px] flex-col p-6 sm:min-h-[300px] sm:p-7"
                        style={{ transform: "translateZ(0)" }}
                      >
                        <p className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-dark">
                          {post.pubDate
                            ? new Date(post.pubDate).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                          {post.pubDate ? (
                            <span className="text-muted-dark/80"> · ~{readingMinutes(post.excerpt)} min</span>
                          ) : null}
                        </p>
                        <h3 className="mt-3 line-clamp-3 shrink-0 font-heading text-lg font-semibold leading-snug text-ink-dark">
                          {post.title}
                        </h3>
                        <p className="mt-2 min-h-0 flex-1 text-sm leading-relaxed text-muted-dark line-clamp-5">
                          {post.excerpt}
                        </p>
                        <div className="mt-6 shrink-0 pt-1">
                          <Link
                            href={post.link}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center justify-center rounded-lg border border-fuchsia-500/35 bg-zinc-950/40 px-4 py-2.5 text-sm font-semibold text-fuchsia-200/95 ring-1 ring-white/[0.06] transition-[border-color,background-color,box-shadow,color] duration-200 hover:border-fuchsia-400/55 hover:bg-fuchsia-500/10 hover:text-fuchsia-100 hover:shadow-[0_0_24px_-8px_rgba(217,70,239,0.35)]"
                          >
                            Read article
                          </Link>
                        </div>
                      </motion.div>
                    </TiltArticleCard>
                  </li>
                </Reveal>
              ))}
            </ul>

            {canLoadMore ? (
              <div className="mt-12 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVisible((v) => Math.min(v + BATCH, posts.length))}
                  className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-ink-dark shadow-lg shadow-purple-950/20 ring-1 ring-fuchsia-500/20 backdrop-blur-md transition-[transform,background-color,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] hover:bg-white/10 hover:ring-fuchsia-500/35 active:scale-[0.98]"
                >
                  Load {Math.min(BATCH, posts.length - visible)} more
                </button>
                <p className="text-xs text-muted-dark">
                  {shown.length} / {posts.length}
                </p>
              </div>
            ) : posts.length > BATCH ? (
              <p className="mt-8 text-center text-xs text-muted-dark">{posts.length} articles</p>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
