import { Buffer } from "node:buffer";

import { GITHUB_AVATAR_URL } from "@/lib/constants";

/**
 * Fetches the GitHub profile image and returns a data URL for use in {@link ImageResponse}.
 * Cached per ISR revalidate window.
 */
export async function fetchGithubAvatarDataUrl(): Promise<string | null> {
  try {
    const res = await fetch(GITHUB_AVATAR_URL, { next: { revalidate: 86_400 } });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const base64 = Buffer.from(buf).toString("base64");
    const ct = res.headers.get("content-type")?.split(";")[0]?.trim() ?? "image/png";
    return `data:${ct};base64,${base64}`;
  } catch {
    return null;
  }
}
