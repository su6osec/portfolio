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

/**
 * Fetches the public contribution calendar via GitHub GraphQL.
 * Requires `GITHUB_TOKEN` with `read:user` (or classic `read:user` scope) for reliable access.
 */
export async function fetchContributionCalendar(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600, tags: ["github-contributions"] },
    });

    const json = (await res.json()) as GraphQLResponse;
    if (!res.ok || json.errors?.length) {
      console.error("[github] graphql contributions", json.errors ?? res.status);
      return null;
    }

    const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal?.weeks) return null;

    const weeks: ContributionDay[][] = cal.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        contributionCount: d.contributionCount,
        color: d.color,
      }))
    );

    return {
      totalContributions: cal.totalContributions,
      weeks,
    };
  } catch (e) {
    console.error("[github] contributions fetch error", e);
    return null;
  }
}
