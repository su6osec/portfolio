import { useMemo, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

/**
 * Magnetic — element leans toward the pointer on hover and springs back.
 * Disabled for coarse pointers and reduced-motion users.
 */
export default function Magnetic({ children, strength = 0.28, className = '', as = 'div' }) {
  const ref = useRef(null);
  const controls = useAnimation();
  // Pointer capability never changes within a session, so it is safe — and
  // lint-clean — to read it during render instead of syncing it in an effect.
  const enabled = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const Tag = motion[as] || motion.div;

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const dx = e.clientX - (left + width / 2);
    const dy = e.clientY - (top + height / 2);
    controls.start({
      x: dx * strength,
      y: dy * strength,
      transition: { type: 'spring', stiffness: 220, damping: 18, mass: 0.4 },
    });
  };

  const onLeave = () => {
    controls.start({
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20, mass: 0.5 },
    });
  };

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      animate={controls}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </Tag>
  );
}
