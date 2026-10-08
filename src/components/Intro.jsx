import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SESSION_KEY = 'su6osec:intro-seen';

/**
 * Intro — a 1.4s brand card that only plays once per session.
 * Skippable with a click / any key, and bypassed entirely for
 * reduced-motion users or repeat visits in the same tab session.
 */
export default function Intro({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      seen = false;
    }

    if (reduced || seen) {
      onDone();
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* no-op */
    }

    document.body.style.overflow = 'hidden';
    const started = performance.now();
    const TOTAL = 1400;

    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - started) / TOTAL);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    function finish() {
      document.body.style.overflow = '';
      onDone();
    }

    const onKey = () => finish();
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onDone]);

  return (
    <motion.div
      className="intro"
      role="status"
      aria-label="Loading portfolio"
      exit={{ y: '-100%', opacity: 0.6 }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      onClick={onDone}
    >
      <div className="intro__inner">
        <motion.div
          className="intro__mark"
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          su6osec<em>.</em>
        </motion.div>

        <div className="intro__bar">
          <i style={{ transform: `scaleX(${progress})` }} />
        </div>

        <motion.span
          className="intro__hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          click to skip
        </motion.span>
      </div>
    </motion.div>
  );
}
