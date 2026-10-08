import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, ArrowUpRight, RefreshCw, CalendarClock, AlertTriangle, Boxes } from 'lucide-react';
import { SectionHead, Reveal } from './SectionHead';
import useRepos from '../hooks/useRepos';
import ProjectPlate from './ProjectPlate';
import { languageColor } from '../lib/art';

const SORTS = [
  { id: 'recent', label: 'Recently shipped' },
  { id: 'stars', label: 'Most starred' },
  { id: 'name', label: 'A → Z' },
];

function timeAgo(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function SkeletonCard() {
  return (
    <div className="card card--flat project-card" aria-hidden="true">
      <div
        style={{
          aspectRatio: '16 / 10',
          borderRadius: 'var(--r-md)',
          background:
            'linear-gradient(100deg, var(--bg-elev) 30%, var(--bg-elev-2) 50%, var(--bg-elev) 70%)',
          backgroundSize: '220% 100%',
          animation: 'shimmer 1.4s linear infinite',
          border: '1px solid var(--line)',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ height: 18, width: '55%', background: 'var(--bg-elev-2)', borderRadius: 6 }} />
        <div style={{ height: 12, width: '100%', background: 'var(--bg-elev-2)', borderRadius: 6 }} />
        <div style={{ height: 12, width: '78%', background: 'var(--bg-elev-2)', borderRadius: 6 }} />
      </div>
    </div>
  );
}

export default function Projects() {
  const { repos, loading, error, stale, refresh } = useRepos();
  const [sort, setSort] = useState('recent');

  const sorted = useMemo(() => {
    const list = [...repos];
    if (sort === 'stars') list.sort((a, b) => b.stars - a.stars);
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    return list;
  }, [repos, sort]);

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          id="projects-title"
          index="04"
          label="Projects"
          title="Everything I've"
          accent="shipped."
          lead="Pulled live from GitHub, so this grid is never stale. Create a repo and it appears here on your next visit — no redeploy."
          split
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--sp-4)',
            marginBottom: 'var(--sp-6)',
          }}
        >
          <div role="group" aria-label="Sort projects" style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
            {SORTS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`chip ${sort === s.id ? 'chip--signal' : ''}`}
                onClick={() => setSort(s.id)}
                aria-pressed={sort === s.id}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <span
              className="mono"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--text-3)', letterSpacing: 'var(--tracking-wide)' }}
            >
              {loading
                ? 'SYNCING…'
                : `${repos.length} PUBLIC REPO${repos.length === 1 ? '' : 'S'}${stale ? ' · CACHED' : ''}`}
            </span>
            <button
              type="button"
              className="chip"
              onClick={refresh}
              disabled={loading}
              aria-label="Refresh repository list"
              style={{ opacity: loading ? 0.5 : 1 }}
            >
              <RefreshCw size={13} className={loading ? 'spin' : ''} aria-hidden="true" />
              Sync
            </button>
          </div>
        </div>

        {/* Status: cache fallback, rate limits, offline */}
        {!loading && (error || stale) && (
          <div className="repo-state" style={{ marginBottom: 'var(--sp-5)' }}>
            <AlertTriangle size={16} style={{ color: 'var(--gold)', flex: 'none' }} aria-hidden="true" />
            <span>
              {error
                ? 'GitHub is unreachable right now — showing the last synced list.'
                : 'Showing a cached copy. Hit “Sync” for the newest list.'}
            </span>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {loading && !repos.length ? (
            <div className="project-grid">
              {[0, 1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <motion.div
              key="empty"
              className="repo-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ flexDirection: 'column', textAlign: 'center', padding: 'var(--sp-8)' }}
            >
              <Boxes size={30} style={{ color: 'var(--text-3)' }} aria-hidden="true" />
              <p style={{ fontWeight: 600, color: 'var(--text)' }}>No public repositories yet</p>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Anything public on github.com/su6osec will show up here automatically.
              </p>
            </motion.div>
          ) : (
            <div className="project-grid">
              {sorted.map((repo, i) => (
                <motion.article
                  key={repo.id}
                  layout
                  className="card project-card"
                  data-cursor="open"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(i * 0.06, 0.3) }}
                >
                  <ProjectPlate repo={repo} />

                  <div className="project-card__body">
                    <h3 className="project-card__title">{repo.name}</h3>

                    <p className="project-card__desc">
                      {repo.description || 'No description provided yet — see the README for details.'}
                    </p>

                    {repo.topics.length > 0 && (
                      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
                        {repo.topics.slice(0, 4).map((t) => (
                          <li key={t}>
                            <span className="chip" style={{ fontSize: 'var(--text-2xs)' }}>
                              {t}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="project-card__meta">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <Star size={12} aria-hidden="true" /> {repo.stars}
                      </span>
                      <span className="dot">·</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <GitFork size={12} aria-hidden="true" /> {repo.forks}
                      </span>
                      <span className="dot">·</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <CalendarClock size={12} aria-hidden="true" /> {timeAgo(repo.updatedAt)}
                      </span>
                    </div>
                  </div>

                  <footer className="project-card__foot">
                    <span className="project-card__lang">
                      <i style={{ '--lang': languageColor(repo.language) }} />
                      {repo.language || 'Mixed'}
                    </span>

                    <a
                      className="link-arrow"
                      href={repo.homepage && /^https?:\/\//.test(repo.homepage) ? repo.homepage : repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${repo.name} on GitHub`}
                    >
                      View repo
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </footer>
                </motion.article>
              ))}
            </div>
          )}
        </AnimatePresence>

        <Reveal delay={0.1}>
          <p
            className="mono"
            style={{
              marginTop: 'var(--sp-6)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-3)',
              letterSpacing: 'var(--tracking-wide)',
            }}
          >
            {/* Private repositories are intentionally never listed here. */}
            Private repos stay private — this pulls from GitHub&apos;s public API only.
          </p>
        </Reveal>
      </div>

      <style>{`@keyframes shimmer { to { background-position: -220% 0; } }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
