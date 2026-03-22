export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PORTFOLIO_VERSION = "2.0.0";

export const GITHUB_USERNAME = "su6osec";

/** Resolves to your GitHub profile avatar (PNG). Safe for favicons and OG-style icons. */
export const GITHUB_AVATAR_URL = `https://github.com/${GITHUB_USERNAME}.png`;

/** Served from `public/Resume.pdf` → `/Resume.pdf` (same-origin; download works reliably). */
export const RESUME_FILE = "/Resume.pdf";

/**
 * Optional absolute URL for the resume (CDN, release asset, etc.).
 * Leave unset to use {@link RESUME_FILE}. Do not point at a broken raw GitHub URL.
 */
export const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL ?? "";

export const SOCIAL = {
  github: "https://github.com/su6osec",
  linkedin: "https://www.linkedin.com/in/su6osec",
  medium: "https://su6osec.medium.com",
} as const;

export const CONTACT_EMAIL = "deepanshu.infosec@gmail.com";
