/** Enrich GitHub data for featured repositories (case-insensitive keys). */
export const PROJECT_OVERRIDES: Record<
  string,
  { description: string; extraTags: string[]; featured?: boolean }
> = {
  su6orecon: {
    featured: true,
    description:
      "Automated reconnaissance framework that chains subfinder, httpx, nuclei, and URL discovery to accelerate structured bug bounty workflows and reduce manual toil.",
    extraTags: ["subfinder", "httpx", "nuclei", "recon", "automation"],
  },
  "keylogger-security-research-tool": {
    description:
      "Educational security research project demonstrating keystroke monitoring techniques for controlled lab environments and defensive awareness.",
    extraTags: ["research", "education", "Windows", "logging"],
  },
};

export function getOverride(name: string) {
  return PROJECT_OVERRIDES[name.toLowerCase()];
}
