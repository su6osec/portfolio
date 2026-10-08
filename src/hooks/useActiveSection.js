import { useEffect, useRef, useState } from 'react';

/** Which section is currently occupying the middle of the viewport. */
export default function useActiveSection(ids) {
  // Empty while the hero owns the viewport, so no nav item reads as active.
  const [active, setActive] = useState('');
  const visible = useRef(new Map());

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visible.current.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });

        let bestId = '';
        let bestRatio = 0;
        visible.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        setActive(bestId);
      },
      {
        // Bias toward the reading band in the middle of the screen.
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
