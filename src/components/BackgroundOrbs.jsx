import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundOrbs() {
  return (
    <div style={{
      position: 'fixed', // Fixed ensures they never scroll away!
      top: 0, left: 0, right: 0, bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: -1 
    }}>
      {/* Top Left - Cyan */}
      <motion.div 
        animate={{ 
          x: [0, 40, -20, 0], 
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '-10vh',
          left: '-10vw',
          width: '50vw',
          height: '50vw',
          minWidth: '400px',
          minHeight: '400px',
          background: 'radial-gradient(circle, rgba(110, 231, 255, 0.15) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}
      />

      {/* Bottom Right - Purple */}
      <motion.div 
        animate={{ 
          x: [0, -50, 30, 0], 
          y: [0, 40, -20, 0],
          scale: [1, 1.05, 0.9, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '-15vh',
          right: '-10vw',
          width: '60vw',
          height: '60vw',
          minWidth: '500px',
          minHeight: '500px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}
      />

      {/* Top Right - Purple (Fainter) */}
      <motion.div 
        animate={{ 
          x: [0, 30, -40, 0], 
          y: [0, 20, -30, 0],
          scale: [0.9, 1.1, 1, 0.9]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '-20vh',
          right: '-5vw',
          width: '40vw',
          height: '40vw',
          minWidth: '350px',
          minHeight: '350px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}
      />

      {/* Bottom Left - Cyan (Fainter) */}
      <motion.div 
        animate={{ 
          x: [0, -20, 40, 0], 
          y: [0, -30, 20, 0],
          scale: [1, 0.95, 1.05, 1]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '-10vh',
          left: '-15vw',
          width: '45vw',
          height: '45vw',
          minWidth: '300px',
          minHeight: '300px',
          background: 'radial-gradient(circle, rgba(110, 231, 255, 0.1) 0%, transparent 65%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}
      />
    </div>
  );
}
