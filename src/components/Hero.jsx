import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Terminal } from 'lucide-react';
import LottieDefault from 'lottie-react';
import birdAnimation from '../assets/bird.json';
import Magnetic from './Magnetic';

const Lottie = LottieDefault.default || LottieDefault;

export default function Hero() {

  const birds = [
    { id: 'L1', dir: 1, top: '20%', size: 140, duration: 25, delay: 0, color: 'white' },
    { id: 'L2', dir: 1, top: '35%', size: 120, duration: 32, delay: 10, color: 'white' },
    { id: 'R1', dir: -1, top: '15%', size: 130, duration: 28, delay: 5, color: 'black' },
    { id: 'R2', dir: -1, top: '40%', size: 160, duration: 26, delay: 15, color: 'white' },
  ];

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: 'var(--space-6) var(--space-4)',
      overflow: 'hidden'
    }}>
      
      {/* Cinematic Scenery Background from micro1.ai */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: -2,
        backgroundImage: 'url(/micro1_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
      }}></div>
      
      {/* Dark Overlay to Ensure Text Legibility */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: -1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
      }}></div>

      {/* Animated Minimalist Birds */}
      {birds.map(bird => (
        <motion.div
          key={bird.id}
          initial={{ x: bird.dir === 1 ? '-10vw' : '110vw', y: 0 }}
          animate={{ 
            x: bird.dir === 1 ? '110vw' : '-10vw',
            y: [0, -20, 15, -10, 0] // Gentle gliding bob
          }}
          transition={{
            x: {
              duration: bird.duration,
              repeat: Infinity,
              ease: "linear",
              delay: bird.delay
            },
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            position: 'absolute',
            top: bird.top,
            left: 0,
            zIndex: 0
          }}
        >
          <div style={{
            position: 'relative',
            transform: bird.dir === -1 ? 'scaleX(-1)' : 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Lottie 
              animationData={birdAnimation} 
              loop={true} 
              style={{ 
                width: bird.size, 
                height: bird.size, 
                filter: bird.color === 'black' 
                  ? 'brightness(0) drop-shadow(0 0 5px rgba(0,0,0,0.6))' 
                  : 'brightness(0) invert(1) drop-shadow(0 0 5px rgba(255,255,255,0.4))', 
                opacity: bird.color === 'black' ? 0.9 : 0.8 
              }} 
            />
          </div>
        </motion.div>
      ))}

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        style={{ 
          position: 'relative', 
          zIndex: 10,
          maxWidth: '900px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center perfectly like micro1.ai
          textAlign: 'center',
          padding: '0 var(--space-4)'
        }}
      >
        <h1 style={{ 
          position: 'relative',
          fontSize: 'clamp(48px, 8vw, 84px)', 
          letterSpacing: '-0.03em', 
          lineHeight: 1.1,
          marginBottom: 'var(--space-4)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          Deepanshu Chauhan
        </h1>
        
        <h2 style={{ 
          fontSize: 'clamp(18px, 2.5vw, 24px)', 
          fontWeight: 400, 
          color: 'rgba(255, 255, 255, 0.9)', 
          marginBottom: 'var(--space-6)',
          maxWidth: '700px',
          lineHeight: 1.5,
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          Cloud & Infrastructure Engineer building a dual-track foundation in enterprise cloud operations and offensive security.
        </h2>

        <Magnetic strength={0.3}>
          <a href="#contact" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: '6px 24px 6px 6px',
            background: 'var(--color-text-primary)',
            color: 'var(--color-surface-base)',
            borderRadius: '999px',
            fontWeight: 600,
            fontSize: '16px',
            transition: 'transform 0.2s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{ 
              background: 'var(--color-surface-base)', 
              color: 'var(--color-text-primary)', 
              borderRadius: '50%', 
              padding: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <ChevronRight size={18} />
            </span>
            Get in touch
          </a>
        </Magnetic>
      </motion.div>

    </section>
  );
}
