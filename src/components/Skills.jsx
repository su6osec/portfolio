import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHead } from './SectionHead';
import { SKILL_GROUPS } from '../lib/data';

const TONES = { signal: 'chip--signal', violet: 'chip--violet', cyan: 'chip--cyan', gold: 'chip--gold' };

export default function Skills() {
  const [filter, setFilter] = useState('all');

  const groups = useMemo(
    () => (filter === 'all' ? SKILL_GROUPS : SKILL_GROUPS.filter((g) => g.id === filter)),
    [filter]
  );

  const tickerSkills = useMemo(() => SKILL_GROUPS.flatMap((g) => g.skills), []);

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          id="skills-title"
          index="03"
          label="Skills"
          title="Technical"
          accent="stack."
          lead="Filter by discipline, or let it run — the marquee below carries every capability in the inventory."
          split
        />

        <div
          role="tablist"
          aria-label="Filter skills by discipline"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--sp-2)',
            marginBottom: 'var(--sp-6)',
          }}
        >
          {[{ id: 'all', label: 'All disciplines' }, ...SKILL_GROUPS.map((g) => ({ id: g.id, label: g.label }))].map(
            (g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={filter === g.id}
                type="button"
                className={`chip ${filter === g.id ? 'chip--signal' : ''}`}
                onClick={() => setFilter(g.id)}
              >
                {g.label}
              </button>
            )
          )}
        </div>

        <motion.div layout className="bento">
          <AnimatePresence mode="popLayout">
            {groups.map((g) => (
              <motion.article
                key={g.id}
                layout
                className="bento__span-6 card skill-group"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <header className="skill-group__head">
                  <h3>
                    <span className={`chip__dot`} style={{ background: `var(--${g.tone === 'signal' ? 'signal' : g.tone})` }} />
                    {g.label}
                  </h3>
                  <span className="skill-group__count">{g.skills.length} items</span>
                </header>

                <ul className="skill-group__list">
                  {g.skills.map((s) => (
                    <li key={s}>
                      <span className={`chip ${TONES[g.tone] || ''}`}>{s}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full-bleed double marquee */}
      <div className="ticker-band" style={{ marginTop: 'clamp(2.5rem, 6vw, 4rem)' }}>
        <div className="marquee marquee--left">
          <div className="marquee__track">
            {[...tickerSkills, ...tickerSkills].map((s, i) => (
              <span className="chip" key={`a-${i}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="marquee marquee--right" style={{ marginTop: 'var(--sp-3)' }}>
          <div className="marquee__track">
            {[...tickerSkills.slice().reverse(), ...tickerSkills.slice().reverse()].map((s, i) => (
              <span className="chip chip--signal" key={`b-${i}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
