import type { GitHubRepo } from "@/lib/github";

export type EnrichedRepo = GitHubRepo & {
  displayDescription: string;
  displayTags: string[];
  featured: boolean;
};
