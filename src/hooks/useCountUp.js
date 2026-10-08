import { useEffect, useRef, useState } from 'react';

/**
 * Animates an integer from 0 to `to` the first time it scrolls into view.
 * Respects prefers-reduced-motion by snapping straight to the final value.
 */
export default function useCountUp(to, { duration = 1400, start = false } = {}) {
  const [value, setValue] = useState(0);
  const frame = useRef(0);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!start || reduced) return undefined;

    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(to * eased));
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [to, duration, start, reduced]);

  // Reduced-motion users get the final number straight away, so the effect
  // above never has to push it after the fact.
  return reduced ? to : value;
}
