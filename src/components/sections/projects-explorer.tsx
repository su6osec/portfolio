"use client";

import { PortfolioCard } from "@/components/ui/card";
import type { EnrichedRepo } from "@/types/project";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.72 1.26 3.38.96.1-.75.41-1.26.74-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 5.78 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.77.12 3.06.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.38-5.25 5.66.41.35.78 1.05.78 2.12 0 1.53-.02 2.76-.02 3.14 0 .31.21.67.8.56A10.82 10.82 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function normalizeUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const t = url.trim();
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

export function ProjectsExplorer({ repos }: { repos: EnrichedRepo[] }) {
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    for (const r of repos) {
      for (const t of r.displayTags) s.add(t.toLowerCase());
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [repos]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return repos.filter((r) => {
      const matchQ =
        !needle ||
        r.name.toLowerCase().includes(needle) ||
        r.displayDescription.toLowerCase().includes(needle) ||
        r.displayTags.some((t) => t.toLowerCase().includes(needle) || needle.includes(t.toLowerCase()));
      const matchTag =
        !activeTag || r.displayTags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
      return matchQ && matchTag;
    });
  }, [repos, q, activeTag]);

  const featured = filtered.find((r) => r.featured) ?? filtered[0];
  const rest = featured ? filtered.filter((r) => r !== featured) : [];

  if (repos.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-fuchsia-500/25 bg-zinc-950/30 p-10 text-center text-muted-dark">
        No repositories could be loaded. Please try again later.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, stack, or keyword…"
            className="w-full rounded-2xl border-2 border-slate-300 bg-white/90 px-4 py-3 text-sm text-ink-light outline-none ring-0 transition placeholder:text-muted-light/70 focus:border-accent dark:border-zinc-600 dark:bg-zinc-950/70 dark:text-ink-dark dark:placeholder:text-muted-dark/70 dark:focus:border-fuchsia-500"
          />
          <p className="text-xs text-muted-light dark:text-muted-dark">
            Showing {filtered.length} of {repos.length} repositories
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter by tag">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            activeTag === null
              ? "border-accent bg-accent/12 text-accent"
              : "border-border-light bg-white/70 text-muted-light hover:border-accent/35 dark:border-border-dark dark:bg-zinc-950/65 dark:text-muted-dark"
          }`}
        >
          All
        </button>
        {allTags.slice(0, 18).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveTag((prev) => (prev === t ? null : t))}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition ${
              activeTag === t
                ? "border-accent bg-accent/12 text-accent"
                : "border-border-light bg-white/70 text-ink-light hover:border-accent/35 dark:border-border-dark dark:bg-zinc-950/65 dark:text-ink-dark"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${q}-${activeTag}`}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.28 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featured ? (
            <PortfolioCard
              key={featured.id}
              variant="highlight"
              className="sm:col-span-2 lg:col-span-2"
              icon={<GitHubIcon />}
              category="Featured"
              title={featured.name}
              description={featured.displayDescription}
              tags={featured.displayTags}
              meta={
                <p>
                  <span className="text-ink-light dark:text-ink-dark">{featured.stargazers_count} stars</span>
                  <span className="mx-2 text-border-light dark:text-border-dark">·</span>
                  <span>{featured.forks_count} forks</span>
                </p>
              }
              actions={
                <>
                  <Link
                    href={featured.html_url}
                    className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hoverLight dark:hover:bg-accent-hoverDark"
                  >
                    View code
                  </Link>
                  {normalizeUrl(featured.homepage) ? (
                    <Link
                      href={normalizeUrl(featured.homepage)!}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-center rounded-full border border-border-light px-4 py-2 text-sm font-semibold text-ink-light transition hover:border-accent dark:border-border-dark dark:text-ink-dark"
                    >
                      Live demo
                    </Link>
                  ) : (
                    <Link
                      href={`${featured.html_url}#readme`}
                      className="inline-flex items-center justify-center rounded-full border border-border-light px-4 py-2 text-sm font-semibold text-ink-light transition hover:border-accent dark:border-border-dark dark:text-ink-dark"
                    >
                      Readme
                    </Link>
                  )}
                </>
              }
            />
          ) : null}

          {rest.map((repo) => (
            <PortfolioCard
              key={repo.id}
              icon={<GitHubIcon />}
              category="Repository"
              title={repo.name}
              description={repo.displayDescription}
              tags={repo.displayTags}
              meta={
                <p>
                  <span className="text-ink-light dark:text-ink-dark">{repo.stargazers_count} stars</span>
                  <span className="mx-2 text-border-light dark:text-border-dark">·</span>
                  <span>{repo.forks_count} forks</span>
                </p>
              }
              actions={
                <>
                  <Link
                    href={repo.html_url}
                    className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hoverLight dark:hover:bg-accent-hoverDark"
                  >
                    View code
                  </Link>
                  {normalizeUrl(repo.homepage) ? (
                    <Link
                      href={normalizeUrl(repo.homepage)!}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-center rounded-full border border-border-light px-4 py-2 text-sm font-semibold text-ink-light transition hover:border-accent dark:border-border-dark dark:text-ink-dark"
                    >
                      Live demo
                    </Link>
                  ) : (
                    <Link
                      href={`${repo.html_url}#readme`}
                      className="inline-flex items-center justify-center rounded-full border border-border-light px-4 py-2 text-sm font-semibold text-ink-light transition hover:border-accent dark:border-border-dark dark:text-ink-dark"
                    >
                      Readme
                    </Link>
                  )}
                </>
              }
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-fuchsia-500/25 bg-zinc-950/30 p-8 text-center text-sm text-muted-dark">
          No projects match this filter. Try a different keyword or tag.
        </p>
      ) : null}
    </div>
  );
}
