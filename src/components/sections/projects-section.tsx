import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectsExplorer } from "@/components/sections/projects-explorer";
import { ProjectsGridSkeleton } from "@/components/ui/skeleton";
import { GithubStatBox } from "@/components/ui/github-stat-box";
import { BorderBeam } from "@/components/ui/border-beam";
import { getOverride } from "@/data/project-overrides";
import { fetchUserRepos, fetchGitHubProfile, type GitHubRepo } from "@/lib/github";
import { GITHUB_USERNAME, SOCIAL } from "@/lib/constants";
import type { EnrichedRepo } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function enrich(repos: GitHubRepo[]): EnrichedRepo[] {
  return repos.map((r) => {
    const o = getOverride(r.name);
    const tags = Array.from(
      new Set([...(r.topics ?? []), ...(o?.extraTags ?? [])])
    ).slice(0, 10);
    return {
      ...r,
      displayDescription: (o?.description ?? r.description ?? "Open-source repository.").trim(),
      displayTags: tags,
      featured: Boolean(o?.featured),
    };
  });
}

function GitHubMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.72 1.26 3.38.96.1-.75.41-1.26.74-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 5.78 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.77.12 3.06.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.38-5.25 5.66.41.35.78 1.05.78 2.12 0 1.53-.02 2.76-.02 3.14 0 .31.21.67.8.56A10.82 10.82 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

async function GitHubProfileBanner() {
  const profile = await fetchGitHubProfile();
  if (!profile) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm dark:border-white/[0.07] dark:bg-zinc-950/60 sm:p-6">
      <BorderBeam size={260} duration={10} colorFrom="#a855f7" colorTo="#6366f1" borderWidth={1.2} />

      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        {/* Avatar + identity */}
        <div className="flex shrink-0 items-center gap-4">
          <div className="relative">
            <Image
              src={profile.avatar_url}
              alt={`${profile.login} GitHub avatar`}
              width={64}
              height={64}
              className="h-14 w-14 rounded-2xl border border-white/10 object-cover ring-1 ring-fuchsia-500/20 sm:h-16 sm:w-16"
            />
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white ring-2 ring-white dark:ring-zinc-950">
              <GitHubMark />
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-heading text-base font-semibold leading-tight text-slate-900 dark:text-ink-dark sm:text-lg">
              {profile.name ?? profile.login}
            </p>
            <p className="font-mono text-[11px] text-fuchsia-600 dark:text-fuchsia-400">
              @{profile.login}
            </p>
            {profile.bio ? (
              <p className="mt-1 hidden max-w-xs text-xs leading-relaxed text-slate-500 dark:text-muted-dark sm:line-clamp-1 md:block">
                {profile.bio}
              </p>
            ) : null}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-14 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent dark:via-white/10 sm:block" aria-hidden />

        {/* Stats */}
        <dl className="grid flex-1 grid-cols-3 gap-2 sm:gap-4">
          <GithubStatBox label="Repos" value={profile.public_repos} />
          <GithubStatBox label="Followers" value={profile.followers} />
          <GithubStatBox label="Following" value={profile.following} />
        </dl>

        {/* CTA */}
        <Link
          href={SOCIAL.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-fuchsia-950/30 transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98] sm:self-center"
        >
          <GitHubMark />
          {GITHUB_USERNAME}
        </Link>
      </div>
    </div>
  );
}

async function ProjectsLoader() {
  const repos = await fetchUserRepos();
  const enriched = enrich(repos).sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.stargazers_count - a.stargazers_count;
  });
  return <ProjectsExplorer repos={enriched} />;
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative border-b border-border-light py-24 dark:border-border-dark"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeading id="projects-heading" eyebrow="Open source">
          Projects & GitHub
        </SectionHeading>
        <p className="mt-6 max-w-2xl text-body text-muted-light dark:text-muted-dark">
          Live repositories synced directly from GitHub — plus a quick profile snapshot. Use search and tags to filter by stack.
        </p>

        {/* GitHub profile banner */}
        <div className="mt-10">
          <Suspense fallback={<div className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-zinc-900" />}>
            <GitHubProfileBanner />
          </Suspense>
        </div>

        {/* Separator with label */}
        <div className="relative mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-muted-dark/60">
            Repositories
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-transparent dark:via-white/10" />
        </div>

        {/* Projects grid */}
        <div className="mt-8">
          <Suspense fallback={<ProjectsGridSkeleton />}>
            <ProjectsLoader />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
