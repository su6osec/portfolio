import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useRepos — live repository list from the public GitHub API.
 *
 * Design constraints:
 *  - Unauthenticated calls are capped at 60/hour per IP, so responses are
 *    cached in localStorage with a TTL and revalidated in the background.
 *  - If the network or rate limit fails, we fall back to the cached copy
 *    (however stale) rather than showing an error wall.
 *  - Private repositories are never returned by this endpoint, so nothing
 *    sensitive can leak.
 */

const API = 'https://api.github.com/users/su6osec/repos?per_page=100&sort=updated';
const CACHE_KEY = 'su6osec:repos:v1';
const TTL = 1000 * 60 * 60; // 1 hour

/**
 * Repos shown are public + not forks + not mirrors + not archived.
 *
 * Two names are always withheld:
 *   - `portfolio` — this very site's source; listing it here would be recursive
 *   - `su6osec`   — the profile README repo used to render the GitHub profile
 *                   page, not a software project.
 * Add new names to HIDDEN to keep them out of the grid permanently.
 */
const HIDDEN = new Set(['portfolio', 'su6osec']);

function normalise(list) {
  return list
    .filter(
      (r) =>
        r &&
        !r.fork &&
        !r.mirror_url &&
        !r.archived &&
        !r.private &&
        !HIDDEN.has(String(r.name || '').toLowerCase())
    )
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description || '',
      url: r.html_url,
      homepage: r.homepage || '',
      language: r.language,
      topics: r.topics || [],
      stars: r.stargazers_count ?? 0,
      forks: r.forks_count ?? 0,
      license: r.license?.spdx_id || null,
      createdAt: r.created_at,
      updatedAt: r.pushed_at || r.updated_at,
      isPrivate: r.private,
    }));
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.at || !Array.isArray(parsed.repos)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(repos) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
  } catch {
    /* quota exceeded / private mode — non-fatal */
  }
}

export default function useRepos() {
  const cached = readCache();
  const [repos, setRepos] = useState(() => normalise(cached?.repos || []));
  const [loading, setLoading] = useState(() => !cached);
  const [error, setError] = useState(null);
  const [stale, setStale] = useState(() => Boolean(cached) && Date.now() - cached.at > TTL);
  const inflight = useRef(false);

  const load = useCallback(async (force = false) => {
    if (inflight.current) return;
    inflight.current = true;

    const cache = readCache();
    const fresh = cache && Date.now() - cache.at < TTL;

    // State is already seeded from the cache by the lazy initialisers above, so
    // a warm, fresh cache needs no state write here — the first setState in
    // this function now sits behind `await`, which is what React wants.
    if (fresh && !force) {
      inflight.current = false;
      return;
    }

    try {
      const res = await fetch(API, {
        headers: { Accept: 'application/vnd.github+json' },
      });

      if (res.status === 403 || res.status === 429) {
        // Rate limited — keep whatever we already have.
        setStale(true);
        setError('rate-limited');
        return;
      }
      if (!res.ok) throw new Error(`GitHub responded ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Unexpected payload');

      writeCache(data);
      setRepos(normalise(data));
      setStale(false);
      setError(null);
    } catch (e) {
      setError(e?.message || 'offline');
      // Cache (even expired) keeps the section populated.
      if (cache) setRepos(normalise(cache.repos));
    } finally {
      setLoading(false);
      inflight.current = false;
    }
  }, []);

  useEffect(() => {
    // Every setState in `load()` sits behind `await fetch(...)`, so nothing is
    // written synchronously while this effect body runs — the rule simply
    // can't see through the async boundary.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  return { repos, loading, error, stale, refresh: () => load(true) };
}
