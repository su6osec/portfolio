import { GITHUB_USERNAME } from "./constants";

export type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionDay[][];
};

// Purple palette for levels 1-4 (used when fetching from SVG without a token)
const LEVEL_COLORS = [
  "",
  "rgba(168, 85, 247, 0.35)",
  "rgba(147, 51, 234, 0.55)",
  "rgba(126, 34, 206, 0.78)",
  "rgba(109, 40, 217, 1.00)",
];

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              color: string;
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

async function fetchViaGraphQL(token: string): Promise<ContributionCalendar | null> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USERNAME } }),
    next: { revalidate: 3600, tags: ["github-contributions"] },
  });

  const json = (await res.json()) as GraphQLResponse;
  if (!res.ok || json.errors?.length) {
    console.error("[github] graphql contributions", json.errors ?? res.status);
    return null;
  }

  const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal?.weeks) return null;

  return {
    totalContributions: cal.totalContributions,
    weeks: cal.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        contributionCount: d.contributionCount,
        color: d.color,
      }))
    ),
  };
}

async function fetchViaSVG(): Promise<ContributionCalendar | null> {
  const res = await fetch(
    `https://github.com/users/${GITHUB_USERNAME}/contributions`,
    {
      headers: { "User-Agent": "portfolio-heatmap/1.0" },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return null;

  const html = await res.text();

  // Parse total contributions count from page text
  const totalMatch = html.match(/([\d,]+)\s+contributions?\b/i);
  const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

  // Extract rect elements — GitHub SVG has data-date and data-level on each rect
  const rectRegex = /<rect[^>]+data-date="([^"]+)"[^>]+data-level="([0-4])"/g;
  const altRegex = /<rect[^>]+data-level="([0-4])"[^>]+data-date="([^"]+)"/g;

  const rawDays: { date: string; level: number }[] = [];

  let m: RegExpExecArray | null;
  while ((m = rectRegex.exec(html)) !== null) {
    rawDays.push({ date: m[1], level: parseInt(m[2]) });
  }
  // Try alternate attribute order if nothing matched
  if (rawDays.length === 0) {
    while ((m = altRegex.exec(html)) !== null) {
      rawDays.push({ date: m[2], level: parseInt(m[1]) });
    }
  }

  if (rawDays.length === 0) return null;

  rawDays.sort((a, b) => a.date.localeCompare(b.date));

  // Group into weeks of 7 days
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < rawDays.length; i += 7) {
    const chunk = rawDays.slice(i, i + 7);
    weeks.push(
      chunk.map(({ date, level }) => ({
        date,
        contributionCount: level,
        color: LEVEL_COLORS[level] ?? LEVEL_COLORS[4],
      }))
    );
  }

  return { totalContributions, weeks };
}

export async function fetchContributionCalendar(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  try {
    if (token) {
      const result = await fetchViaGraphQL(token);
      if (result) return result;
    }
    // Fallback: public SVG scrape — no token required
    return await fetchViaSVG();
  } catch (e) {
    console.error("[github] contributions fetch error", e);
    return null;
  }
}
