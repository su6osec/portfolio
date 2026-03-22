import Parser from "rss-parser";

export type MediumPost = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
};

const FEEDS = [
  "https://medium.com/feed/@su6osec",
  "https://su6osec.medium.com/feed",
] as const;

/** Full story list + lastmod; Medium RSS alone caps at ~10 items. */
const PROFILE_SITEMAP = "https://su6osec.medium.com/sitemap/sitemap.xml";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalStoryUrl(href: string): string {
  try {
    const u = new URL(href);
    u.search = "";
    u.hash = "";
    let s = u.toString();
    if (s.endsWith("/")) s = s.slice(0, -1);
    return s;
  } catch {
    return href;
  }
}

function isProfileStoryUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith("su6osec.medium.com")) return false;
    const parts = u.pathname.replace(/^\//, "").split("/").filter(Boolean);
    if (parts.length === 0) return false;
    if (parts[0] === "about") return false;
    return true;
  } catch {
    return false;
  }
}

/** Medium slugs end with a 12-char hex id; title-case the rest for archive-only rows. */
function titleFromSlug(slug: string): string {
  const core = slug.replace(/-[a-f0-9]{12}$/i, "").trim();
  const words = core.split("-").filter((w) => w.length > 0);
  return words
    .map((w) => {
      const clean = w.replace(/\uFE0F/g, "");
      if (!clean) return "";
      return clean.charAt(0).toUpperCase() + clean.slice(1);
    })
    .filter(Boolean)
    .join(" ");
}

async function fetchSitemapStories(): Promise<{ loc: string; lastmod: string }[]> {
  try {
    const res = await fetch(PROFILE_SITEMAP, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const out: { loc: string; lastmod: string }[] = [];
    const urlBlocks = xml.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/g);
    for (const m of urlBlocks) {
      const block = m[1];
      const loc = /<loc>([^<]+)<\/loc>/.exec(block)?.[1];
      const lastmod = /<lastmod>([^<]+)<\/lastmod>/.exec(block)?.[1] ?? "";
      if (!loc || !isProfileStoryUrl(loc)) continue;
      out.push({ loc: canonicalStoryUrl(loc), lastmod });
    }
    return out;
  } catch {
    return [];
  }
}

function rssItemToPost(item: Parser.Item, i: number): MediumPost {
  const enc = (item as { "content:encoded"?: string })["content:encoded"];
  let snippet = item.contentSnippet?.trim();
  if (!snippet && enc) snippet = stripHtml(String(enc)).slice(0, 280);
  if (!snippet && item.content) snippet = stripHtml(String(item.content)).slice(0, 280);
  if (!snippet && item.summary) snippet = String(item.summary).slice(0, 280);
  const excerpt = (snippet || "Read on Medium.").slice(0, 220);
  const linkRaw = item.link ?? "";
  const link = linkRaw ? canonicalStoryUrl(linkRaw) : "";
  const title = item.title ?? "Untitled";
  const pubDate = item.pubDate ?? item.isoDate ?? "";
  const guid = item.guid;
  const id =
    typeof guid === "string" && guid.length > 0 ? guid : link || `medium-${i}`;
  return {
    id: String(id),
    title,
    link,
    pubDate,
    excerpt: excerpt.length >= 220 ? `${excerpt}…` : excerpt || "Read on Medium.",
  };
}

/**
 * Merge RSS (rich snippets) with profile sitemap. Sort matches Medium profile:
 * RSS item order first (newest-first as Medium serves the feed), then remaining stories by date.
 */
export async function fetchMediumPosts(): Promise<MediumPost[]> {
  const parser = new Parser<{ "content:encoded"?: string }>();
  const byUrl = new Map<string, MediumPost>();
  let rssOrder: string[] = [];

  for (const feedUrl of FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const items = feed.items ?? [];
      items.forEach((item, i) => {
        const post = rssItemToPost(item, i);
        if (!post.link) return;
        if (!byUrl.has(post.link)) byUrl.set(post.link, post);
      });
      if (rssOrder.length === 0 && items.length > 0) {
        rssOrder = items
          .map((item, i) => rssItemToPost(item, i).link)
          .filter((link): link is string => Boolean(link));
      }
    } catch {
      /* try next feed */
    }
  }

  const sitemap = await fetchSitemapStories();
  for (const { loc, lastmod } of sitemap) {
    if (byUrl.has(loc)) continue;
    const slug = new URL(loc).pathname.split("/").pop() ?? "";
    const title = titleFromSlug(slug) || "Article";
    const pubDate = lastmod ? new Date(`${lastmod}T12:00:00Z`).toISOString() : "";
    byUrl.set(loc, {
      id: loc,
      title,
      link: loc,
      pubDate,
      excerpt: "Open on Medium to read the full story.",
    });
  }

  const posts = Array.from(byUrl.values());

  /** Match Medium profile “Latest”: newest first; tie-break with RSS order when timestamps align. */
  return posts.sort((a, b) => {
    const ta = new Date(a.pubDate || 0).getTime();
    const tb = new Date(b.pubDate || 0).getTime();
    if (tb !== ta) return tb - ta;
    const ia = rssOrder.indexOf(a.link);
    const ib = rssOrder.indexOf(b.link);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return 0;
  });
}

export const MEDIUM_PROFILE = "https://su6osec.medium.com";
