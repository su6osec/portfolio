export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  /** Future: route to MDX page — for now optional external link */
  href?: string;
  tags: string[];
};

/** Static writeups — structure is CMS-ready (swap for Contentlayer / Sanity later). */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "coordinated-disclosure-notes",
    title: "Notes on coordinated disclosure",
    excerpt:
      "How I structure reports, evidence, and timelines for safer handoffs—without oversharing sensitive detail.",
    date: "2025-11-02",
    tags: ["process", "disclosure"],
  },
  {
    slug: "recon-pipelines",
    title: "Composable recon pipelines",
    excerpt:
      "Chaining discovery, HTTP probing, and templated scanning with guardrails—built for repeatability, not noise.",
    date: "2025-09-18",
    tags: ["automation", "recon"],
  },
  {
    slug: "cloud-baseline",
    title: "Cloud baselines that survive on-call",
    excerpt:
      "Least privilege, observability, and rollback-friendly changes—small habits that keep production calm.",
    date: "2025-07-07",
    tags: ["cloud", "reliability"],
  },
];
