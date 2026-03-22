"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollChrome() {
  const { scrollYProgress } = useScroll();
  const scale = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.28 });
  const sheen = useTransform(scrollYProgress, [0, 0.12, 1], [0.25, 0.9, 1]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[1000] h-[2px] overflow-hidden" aria-hidden>
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400/90"
        style={{
          scaleX: scale,
          boxShadow: "0 0 12px rgba(217, 70, 239, 0.55)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent"
        style={{ opacity: sheen }}
      />
    </div>
  );
}
