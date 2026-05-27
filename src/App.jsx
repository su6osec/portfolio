import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import BugBounty from './components/BugBounty';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WavingDivider from './components/WavingDivider';
import IntroSequence from './components/IntroSequence';
import BackgroundOrbs from './components/BackgroundOrbs';
import Cursor from './components/Cursor';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const img = new Image();
    img.src = '/profile.jpg';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      
      ctx.beginPath();
      ctx.arc(64, 64, 64, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      ctx.drawImage(img, 0, 0, 128, 128);
      
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.type = 'image/png';
        link.href = canvas.toDataURL('image/png');
      }
    };
  }, []);

  return (
    <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <Cursor />
      <AnimatePresence mode="wait">
        {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      
      <motion.div 
        style={{ 
          scaleX, 
          transformOrigin: 'left', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '3px', 
          background: 'rgba(255, 255, 255, 0.2)', 
          zIndex: 10000 
        }} 
      />
      
      <Navbar />
      <BackgroundOrbs />

      <Hero />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px var(--space-5) 0", display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <WavingDivider />
        <About />
        <WavingDivider />
        <Experience />
        <Skills />
        <WavingDivider />
        <Projects />
        <BugBounty />
        <Certifications />
        <WavingDivider />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
