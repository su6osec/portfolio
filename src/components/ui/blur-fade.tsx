"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useInView, type Variants, type UseInViewOptions } from "framer-motion";
import { cn } from "@/lib/cn";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: { hidden: { y: number }; visible: { y: number } };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inViewMargin?: MarginType;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.42,
  delay = 0,
  yOffset = 10,
  inViewMargin = "-6%",
  blur = "8px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });

  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inViewResult ? "visible" : "hidden"}
        exit="hidden"
        variants={variant ?? defaultVariants}
        transition={{ delay: 0.04 + delay, duration, ease: [0.22, 1, 0.36, 1] }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
