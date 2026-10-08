import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TERMINAL_SEQUENCE } from '../lib/data';

/** Typing terminal that starts when it scrolls into view, exactly once. */
export default function Terminal() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });

  const [text, setText] = useState('');
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 560);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!inView) return;

    let current = '';
    let seqIndex = 0;
    let charIndex = 0;
    let timeout;

    const tick = () => {
      if (seqIndex >= TERMINAL_SEQUENCE.length) return;
      const item = TERMINAL_SEQUENCE[seqIndex];

      if (item.instant) {
        current += item.text;
        setText(current);
        seqIndex++;
        timeout = setTimeout(tick, item.delay);
        return;
      }

      current += item.text.charAt(charIndex);
      setText(current);
      charIndex += 1;

      if (charIndex < item.text.length) {
        timeout = setTimeout(tick, 28 + Math.random() * 55);
      } else {
        seqIndex += 1;
        charIndex = 0;
        timeout = setTimeout(tick, item.delay);
      }
    };

    timeout = setTimeout(tick, 320);
    return () => clearTimeout(timeout);
  }, [inView]);

  return (
    <motion.div
      ref={containerRef}
      className="terminal"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      aria-hidden="true"
    >
      <div className="terminal__bar">
        <span className="terminal__dot" style={{ background: '#ff5f56' }} />
        <span className="terminal__dot" style={{ background: '#ffbd2e' }} />
        <span className="terminal__dot" style={{ background: '#27c93f' }} />
        <span className="terminal__title">su6osec — zsh — 80×24</span>
      </div>
      <div className="terminal__body">
        <span>{text}</span>
        <span className="caret" style={{ opacity: blink ? 1 : 0 }}>
          ▍
        </span>
      </div>
    </motion.div>
  );
}
