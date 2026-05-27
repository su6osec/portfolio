import React from 'react';
import { motion } from 'framer-motion';

export default function WavingDivider() {
  return (
    <div style={{ 
      width: '100vw', 
      position: 'relative', 
      left: '50%', 
      right: '50%', 
      marginLeft: '-50vw', 
      marginRight: '-50vw',
      height: '150px', 
      overflow: 'hidden', 
      marginTop: 'var(--space-8)',
      marginBottom: 'var(--space-8)',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.9 }}
      >
        {/* Deep background glow */}
        <motion.path 
          animate={{ 
            d: [
              "M 0 60 C 300 10, 900 110, 1200 60",
              "M 0 60 C 300 110, 900 10, 1200 60",
              "M 0 60 C 300 10, 900 110, 1200 60"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          fill="none" 
          stroke="rgba(255, 255, 255, 0.1)" 
          strokeWidth="10"
          style={{ filter: 'blur(8px)' }}
        />

        {/* Purple Accent Wave */}
        <motion.path 
          animate={{ 
            d: [
              "M 0 60 C 200 150, 1000 -30, 1200 60",
              "M 0 60 C 200 -30, 1000 150, 1200 60",
              "M 0 60 C 200 150, 1000 -30, 1200 60"
            ]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          fill="none" 
          stroke="url(#gradientPurple)" 
          strokeWidth="3"
          style={{ filter: 'blur(2px)' }}
        />

        {/* Cyan Accent Wave */}
        <motion.path 
          animate={{ 
            d: [
              "M 0 60 C 400 -40, 800 160, 1200 60",
              "M 0 60 C 400 160, 800 -40, 1200 60",
              "M 0 60 C 400 -40, 800 160, 1200 60"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          fill="none" 
          stroke="url(#gradientCyan)" 
          strokeWidth="2.5"
          style={{ filter: 'blur(1px)', opacity: 0.8 }}
        />

        {/* Main Crisp White Wave */}
        <motion.path 
          animate={{ 
            d: [
              "M 0 60 C 500 120, 700 0, 1200 60",
              "M 0 60 C 500 0, 700 120, 1200 60",
              "M 0 60 C 500 120, 700 0, 1200 60"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          fill="none" 
          stroke="url(#gradientWave)" 
          strokeWidth="2"
        />
        
        <defs>
          <linearGradient id="gradientWave" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="50%" stopColor="rgba(255,255,255,1)" />
            <stop offset="75%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          <linearGradient id="gradientPurple" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="rgba(124, 58, 237, 0.4)" />
            <stop offset="50%" stopColor="rgba(124, 58, 237, 0.8)" />
            <stop offset="70%" stopColor="rgba(124, 58, 237, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <linearGradient id="gradientCyan" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="rgba(110, 231, 255, 0.4)" />
            <stop offset="50%" stopColor="rgba(110, 231, 255, 0.8)" />
            <stop offset="70%" stopColor="rgba(110, 231, 255, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
