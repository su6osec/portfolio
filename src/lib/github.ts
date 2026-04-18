import { GITHUB_USERNAME } from "./constants";

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
};

const FEATURED_ORDER = ["su6oRecon", "keylogger-security-research-tool"];

function normalizeRepo(r: GitHubRepo & { topics?: string[] }): GitHubRepo {
  return {
    ...r,
    topics: r.topics ?? [],
    homepage: r.homepage ?? null,
  };
}

export async function fetchUserRepos(): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    (headers as Record<string, string>).Authorization =
      `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers,
      next: { revalidate: 1800, tags: ["github-repos"] },
    }
  );

  if (!res.ok) {
    console.error("[github] fetch failed", res.status, await res.text());
    return [];
  }

  const data = (await res.json()) as Array<GitHubRepo & { topics?: string[] }>;
  const EXCLUDED = new Set(["su6osec", "portfolio"]);
  const owned = data
    .filter((r) => !r.fork && !r.archived && !EXCLUDED.has(r.name.toLowerCase()))
    .map(normalizeRepo);

  const score = (name: string) => {
    const lower = name.toLowerCase();
    const i = FEATURED_ORDER.findIndex((n) => n.toLowerCase() === lower);
    return i === -1 ? 100 : i;
  };

  return owned.sort((a, b) => score(a.name) - score(b.name));
}

export type GitHubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
};

export async function fetchGitHubProfile(): Promise<GitHubProfile | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    (headers as Record<string, string>).Authorization =
      `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
    headers,
    next: { revalidate: 1800, tags: ["github-profile"] },
  });

  if (!res.ok) {
    console.error("[github] profile fetch failed", res.status);
    return null;
  }

  return (await res.json()) as GitHubProfile;
}
