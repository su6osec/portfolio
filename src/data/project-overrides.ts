/** Enrich GitHub data for featured repositories (case-insensitive keys). */
export const PROJECT_OVERRIDES: Record<
  string,
  { description: string; extraTags: string[]; featured?: boolean }
> = {
  "keylogger-security-research-tool": {
    description:
      "Educational security research project demonstrating keystroke monitoring techniques for controlled lab environments and defensive awareness.",
    extraTags: ["research", "education", "Windows", "logging"],
  },
};

export function getOverride(name: string) {
  return PROJECT_OVERRIDES[name.toLowerCase()];
}
