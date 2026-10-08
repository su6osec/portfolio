import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor]';

const RING = 34;
const DOT = 5;

/**
 * Custom cursor — a precise dot plus a lagging ring that reacts to the
 * element beneath it. Only mounts on fine-pointer devices; the native cursor
 * is hidden by CSS only while this layer exists.
 *
 * Positioning lives on the outer element (framer x/y), visual state on the
 * inner element, so the two transforms never fight over `transform`.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const mounted = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const [mode, setMode] = useState('default');
  const [label, setLabel] = useState('');
  /* Flip the caption inboard when the pointer sits near an edge. */
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const rx = useSpring(mx, { stiffness: 340, damping: 32, mass: 0.55 });
  const ry = useSpring(my, { stiffness: 340, damping: 32, mass: 0.55 });

  useEffect(() => {
    if (!mounted) return undefined;

    document.body.classList.add('has-custom-cursor');

    let raf = 0;
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      mx.set(x);
      my.set(y);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
      });
    };

    const onOver = (e) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;
      const hit = target.closest(SELECTOR);
      if (!hit) {
        setMode('default');
        setLabel('');
        return;
      }
      const explicit = hit.getAttribute('data-cursor');
      if (explicit) {
        setMode('label');
        setLabel(explicit);
        setFlipX(e.clientX > window.innerWidth - 190);
        setFlipY(e.clientY > window.innerHeight - 96);
      } else if (hit.matches('input, textarea')) {
        setMode('text');
        setLabel('');
      } else {
        setMode('hover');
        setLabel('');
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [mx, my, mounted]);

  if (!mounted) return null;

  /* One interaction size for both feedback states — the ring never grows
     over the thing you are pointing at, so it can never eat the label. */
  const scale = mode === 'hover' ? 1.6 : mode === 'label' ? 1.75 : mode === 'text' ? 0.5 : 1;

  const interactive = mode === 'hover' || mode === 'label';

  const visual = {
    background: interactive
      ? 'color-mix(in srgb, var(--signal) 20%, transparent)'
      : 'transparent',
    borderColor: interactive ? 'var(--signal)' : 'color-mix(in srgb, var(--text) 45%, transparent)',
    transform: `scale(${scale})`,
  };

  return (
    <div className="cursor-layer" aria-hidden="true">
      {/* outer: positioned by the spring */}
      <motion.div
        style={{ x: rx, y: ry, marginLeft: -RING / 2, marginTop: -RING / 2 }}
        className="cursor-ring"
      >
        {/* inner: visual state only */}
        <div className="cursor-ring__inner" style={visual} />

        {/* the caption lives outside the ring, so nothing is ever covered
            and the caption itself never scales with the ring */}
        {mode === 'label' && label ? (
          <span
            className={[
              'cursor-ring__label',
              flipX ? 'is-flip-x' : '',
              flipY ? 'is-flip-y' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </span>
        ) : null}
      </motion.div>

      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          marginLeft: -DOT / 2,
          marginTop: -DOT / 2,
          opacity: mode === 'default' ? 1 : 0,
          transition: 'opacity 160ms',
        }}
      />
    </div>
  );
}
