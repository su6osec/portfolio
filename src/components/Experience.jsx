import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, ShieldCheck, FileCheck2, Gauge } from 'lucide-react';
import { SectionHead, Reveal } from './SectionHead';
import { EXPERIENCE } from '../lib/data';

const ICONS = [Gauge, Zap, FileCheck2, ShieldCheck];

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Experience — vertical timeline.
 * The rail fills with scroll progress and each node lights as it passes
 * the reading band. Falls back to a fully-lit state under reduced motion.
 */
export default function Experience() {
  const railRef = useRef(null);
  const listRef = useRef(null);
  const [lit, setLit] = useState(() =>
    prefersReduced() ? new Set(EXPERIENCE.map((_, i) => i)) : new Set()
  );

  useEffect(() => {
    if (prefersReduced()) {
      if (railRef.current) railRef.current.style.setProperty('--progress', '1');
      return undefined;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current;
      const rail = railRef.current;
      if (!list || !rail) return;

      const rect = list.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.6;
      const total = rect.height || 1;
      const progressed = viewportAnchor - rect.top;
      const p = Math.max(0, Math.min(1, progressed / total));
      rail.style.setProperty('--progress', p.toFixed(4));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('.timeline__item');
    if (!items?.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number(e.target.dataset.index);
          setLit((prev) => {
            const next = new Set(prev);
            if (e.isIntersecting) next.add(i);
            else next.delete(i);
            return next;
          });
        });
      },
      { rootMargin: '-15% 0px -35% 0px', threshold: 0 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          id="experience-title"
          index="02"
          label="Experience"
          title="Enterprise"
          accent="credibility."
          lead="Hybrid cloud and on-prem operations for the CIS domain — availability, security posture and compliance, end to end."
          split
        />

        <div className="timeline" ref={listRef}>
          <div className="timeline__rail" ref={railRef} aria-hidden="true">
            <div className="timeline__rail-fill" />
          </div>

          {EXPERIENCE.map((job, i) => (
            <motion.article
              key={job.company}
              className={`timeline__item ${lit.has(i) ? 'is-lit' : ''}`}
              data-index={i}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="timeline__node" aria-hidden="true" />

              <p className="timeline__date">{job.date}</p>
              <h3 className="timeline__company">{job.company}</h3>
              <p className="timeline__role">{job.role}</p>
              <p className="timeline__body">{job.summary}</p>

              <ul className="timeline__points">
                {job.points.map((pt, j) => {
                  const Icon = ICONS[j % ICONS.length];
                  return (
                    <li className="timeline__point" key={pt.title}>
                      <Icon size={16} aria-hidden="true" />
                      <span>
                        <b>{pt.title}</b>
                        {pt.body}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.article>
          ))}

          <Reveal className="timeline__item" y={24}>
            <span className="timeline__node" aria-hidden="true" />
            <p className="timeline__date">Earlier</p>
            <h3 className="timeline__company" style={{ fontSize: 'var(--text-xl)' }}>
              Continuous self-directed practice
            </h3>
            <p className="timeline__body">
              TryHackMe top 5%, sustained bug-bounty submissions across public and
              private programs, and open-source tooling built for real recon work.
            </p>
            <p
              style={{
                marginTop: 'var(--sp-4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--sp-2)',
                color: 'var(--signal)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
              }}
            >
              <Check size={16} aria-hidden="true" /> 100% of submitted reports accepted
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
