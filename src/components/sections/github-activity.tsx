import { ContributionHeatmap } from "@/components/sections/github-heatmap";
import { SectionHeading } from "@/components/ui/section-heading";
import { GITHUB_USERNAME, SOCIAL } from "@/lib/constants";
import { fetchContributionCalendar } from "@/lib/github-contributions";
import { fetchGitHubProfile } from "@/lib/github";
import Image from "next/image";
import Link from "next/link";

export async function GitHubActivitySection() {
  const [calendar, profile] = await Promise.all([fetchContributionCalendar(), fetchGitHubProfile()]);

  return (
    <section
      id="activity"
      className="relative overflow-x-clip border-b border-border-dark py-20 sm:py-24"
      aria-labelledby="activity-heading"
    >
      <div className="mx-auto max-w-content min-w-0 px-4 sm:px-6 lg:px-8">
        <SectionHeading id="activity-heading" eyebrow="Live stats">
          GitHub activity
        </SectionHeading>
        <p className="mt-6 max-w-2xl text-[clamp(0.9375rem,0.88rem+0.28vw,1.0625rem)] leading-relaxed text-muted-dark">
          Profile snapshot and a full-year contribution grid—scaled to fit your screen.
        </p>

        <div className="mt-10 grid min-w-0 grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <div className="section-card flex min-h-0 min-w-0 flex-col gap-5 p-5 sm:p-6 lg:col-span-4 lg:gap-6 lg:p-7">
            {profile ? (
              <div className="flex min-w-0 flex-row items-start gap-3 sm:gap-4">
                <Image
                  src={profile.avatar_url}
                  alt=""
                  width={72}
                  height={72}
                  className="h-[64px] w-[64px] shrink-0 rounded-2xl border border-white/[0.1] object-cover ring-1 ring-white/[0.06] sm:h-[72px] sm:w-[72px]"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-[clamp(1.125rem,1rem+0.6vw,1.35rem)] font-semibold leading-tight text-ink-dark">
                    {profile.name ?? profile.login}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[11px] text-muted-dark sm:text-xs">
                    @{profile.login}
                  </p>
                  {profile.bio ? (
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted-dark sm:line-clamp-3">
                      {profile.bio}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-dark">Profile data unavailable right now.</p>
            )}

            {profile ? (
              <dl className="grid min-w-0 grid-cols-3 gap-2 sm:gap-3">
                <div className="min-w-0 rounded-xl border border-white/[0.08] bg-zinc-950/50 p-2.5 text-center ring-1 ring-white/[0.04] sm:p-3">
                  <dt className="text-[9px] font-semibold uppercase tracking-wider text-muted-dark sm:text-[10px]">
                    Repos
                  </dt>
                  <dd className="mt-1 font-heading text-lg font-semibold tabular-nums text-ink-dark sm:text-xl">
                    {profile.public_repos}
                  </dd>
                </div>
                <div className="min-w-0 rounded-xl border border-white/[0.08] bg-zinc-950/50 p-2.5 text-center ring-1 ring-white/[0.04] sm:p-3">
                  <dt className="text-[9px] font-semibold uppercase tracking-wider text-muted-dark sm:text-[10px]">
                    Followers
                  </dt>
                  <dd className="mt-1 font-heading text-lg font-semibold tabular-nums text-ink-dark sm:text-xl">
                    {profile.followers}
                  </dd>
                </div>
                <div className="min-w-0 rounded-xl border border-white/[0.08] bg-zinc-950/50 p-2.5 text-center ring-1 ring-white/[0.04] sm:p-3">
                  <dt className="text-[9px] font-semibold uppercase tracking-wider text-muted-dark sm:text-[10px]">
                    Following
                  </dt>
                  <dd className="mt-1 font-heading text-lg font-semibold tabular-nums text-ink-dark sm:text-xl">
                    {profile.following}
                  </dd>
                </div>
              </dl>
            ) : null}

            <Link
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer noopener"
              className="interactive-lift mt-auto inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-800 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-purple-950/40 hover:brightness-110 sm:w-auto sm:self-start"
            >
              View {GITHUB_USERNAME} on GitHub
            </Link>
          </div>

          <div className="section-card min-h-0 min-w-0 w-full max-w-full overflow-hidden p-5 sm:p-6 lg:col-span-8 lg:p-8">
            <ContributionHeatmap calendar={calendar} />
          </div>
        </div>
      </div>
    </section>
  );
}
