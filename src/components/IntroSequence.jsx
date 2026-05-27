import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import LottieDefault from 'lottie-react';
import birdAnimation from '../assets/bird.json';
import BackgroundOrbs from './BackgroundOrbs';

const Lottie = LottieDefault.default || LottieDefault;

export default function IntroSequence({ onComplete }) {
  // Prevent body scroll during intro
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0); // Ensure we start at the top
    
    // Total time before we tell App to hide this component
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    
    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="intro-sequence"
      initial={{ y: 0 }}
      exit={{ y: '-100vh', opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#050505',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <BackgroundOrbs />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        <Lottie 
          animationData={birdAnimation} 
          loop={true} 
          style={{ 
            width: 120, 
            height: 120, 
            filter: 'brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.2))', 
            opacity: 0.9 
          }} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <h2 style={{
            fontSize: 'clamp(16px, 3vw, 20px)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-primary)',
            textTransform: 'uppercase'
          }}>
            Engineering the unseen<span style={{ color: 'var(--color-accent-primary)' }}>.</span>
          </h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
