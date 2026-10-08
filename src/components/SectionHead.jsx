import { Fragment, useMemo } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * SectionHead — the numbered editorial header used by every section.
 * Title words rise out of a mask one after another, which reads far more
 * deliberate than a flat fade on the whole block.
 */
export function SectionHead({ index, label, title, accent, lead, split = false, id }) {
  const tokens = useMemo(() => {
    const base = String(title || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((text) => ({ text, accent: false }));
    const tail = String(accent || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((text) => ({ text, accent: true }));
    return [...base, ...tail];
  }, [title, accent]);

  return (
    <motion.header
      className={`section-head ${split ? 'section-head--split' : ''}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="section-head__main">
        <span className="section-index">
          <span>{index}</span>
          <span style={{ color: 'var(--text-3)' }}>{label}</span>
          <motion.span
            className="section-index__line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          />
        </span>

        <h2 className="section-title" id={id}>
          {tokens.map((t, i) => (
            <Fragment key={`${t.text}-${i}`}>
              <span className="word-mask">
                <motion.span
                  className={t.accent ? 'serif-accent accent-word' : undefined}
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.85, ease: EASE, delay: 0.08 + i * 0.055 }}
                >
                  {t.text}
                </motion.span>
              </span>
              {i < tokens.length - 1 ? ' ' : ''}
            </Fragment>
          ))}
        </h2>
      </div>

      {lead ? (
        <motion.p
          className="section-lead"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
        >
          {lead}
        </motion.p>
      ) : null}
    </motion.header>
  );
}

/** Masked line-by-line reveal for hero-scale type. */
export function RevealLines({ lines, className = '', delay = 0, stagger = 0.09 }) {
  return (
    <>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i}>
          <motion.span
            className={className}
            initial={{ y: '108%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Generic scroll-in wrapper with a sane default. */
export function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
