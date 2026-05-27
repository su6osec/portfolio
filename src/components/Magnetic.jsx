import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    controls.start({
      x: middleX * strength,
      y: middleY * strength,
      transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={controls}
      className="magnetic-target"
      style={{ display: 'inline-block', zIndex: isHovered ? 10 : 1 }}
    >
      {children}
    </motion.div>
  );
}
