import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectsExplorer } from "@/components/sections/projects-explorer";
import { ProjectsGridSkeleton } from "@/components/ui/skeleton";
import { getOverride } from "@/data/project-overrides";
import { fetchUserRepos, type GitHubRepo } from "@/lib/github";
import type { EnrichedRepo } from "@/types/project";
import { Suspense } from "react";

const REQUIRED = [
  { slug: "su6oRecon", featured: true },
  { slug: "keylogger-security-research-tool", featured: false },
] as const;

function enrich(repos: GitHubRepo[]): EnrichedRepo[] {
  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
  const out: EnrichedRepo[] = [];

  for (const r of repos) {
    const o = getOverride(r.name);
    const baseTags = [...(r.topics ?? [])];
    const extra = o?.extraTags ?? [];
    const tags = Array.from(new Set([...baseTags, ...extra])).slice(0, 10);
    out.push({
      ...r,
      displayDescription: (o?.description ?? r.description ?? "Open-source repository.").trim(),
      displayTags: tags,
      featured: Boolean(o?.featured),
    });
  }

  let synth = 0;
  for (const req of REQUIRED) {
    if (!byName.has(req.slug.toLowerCase())) {
      const o = getOverride(req.slug);
      synth += 1;
      out.push({
        id: -synth,
        name: req.slug,
        description: o?.description ?? null,
        html_url: `https://github.com/su6osec/${req.slug}`,
        homepage: null,
        stargazers_count: 0,
        forks_count: 0,
        topics: o?.extraTags ?? [],
        fork: false,
        archived: false,
        displayDescription:
          o?.description ??
          "Repository details will appear here once published publicly on GitHub.",
        displayTags: o?.extraTags ?? ["GitHub", "Open Source"],
        featured: req.featured,
      });
    }
  }

  out.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.stargazers_count - a.stargazers_count;
  });

  return out;
}

async function ProjectsLoader() {
  const repos = await fetchUserRepos();
  const enriched = enrich(repos);
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
          Projects
        </SectionHeading>
        <p className="mt-6 max-w-2xl text-body text-muted-light dark:text-muted-dark">
          Selected GitHub work—featuring automated recon pipelines and security research tooling. Repository metadata
          refreshes periodically from the GitHub API. Use search and tags to filter the stack.
        </p>

        <div className="mt-12">
          <Suspense fallback={<ProjectsGridSkeleton />}>
            <ProjectsLoader />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
