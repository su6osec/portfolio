import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import useTheme from './hooks/useTheme';
import { NAV_LINKS } from './lib/data';

import Cursor from './components/Cursor';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import BugBounty from './components/BugBounty';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import LegalModal from './components/LegalModal';
import SectionRail from './components/SectionRail';
import BackToTop from './components/BackToTop';
import Toasts from './components/Toasts';
import { PrivacyPolicyContent, TermsOfServiceContent } from './components/LegalContent';

const PALETTE_KEY = 'k';

export default function App() {
  const { theme, toggle } = useTheme();
  const [intro, setIntro] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [legal, setLegal] = useState(null); // 'privacy' | 'terms' | null
  const [spot, setSpot] = useState({ x: '50%', y: '30%' });

  const closeIntro = useCallback(() => setIntro(false), []);

  /* ⌘K / Ctrl+K / — but never while typing in a field. */
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      const typing =
        tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable;
      if (typing) return;

      const key = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && key === PALETTE_KEY) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Pointer spotlight (lerped by CSS, values set here). */
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return undefined;

    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setSpot({ x: `${e.clientX}px`, y: `${e.clientY}px` });
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  /* Announce theme swaps so HeroCanvas can re-read the accent. */
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  }, [theme]);

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Cursor />
      <div className="spotlight" style={{ '--mx': spot.x, '--my': spot.y }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <AnimatePresence>
        {intro && <Intro key="intro" onDone={closeIntro} />}
      </AnimatePresence>

      <Navbar
        theme={theme}
        onToggleTheme={toggle}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main id="main">
        <Hero />
        <Ticker />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <BugBounty />
        <Certifications />
        <Contact />
      </main>

      <Footer onOpenLegal={setLegal} />

      <SectionRail />
      <BackToTop />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onToggleTheme={toggle}
        theme={theme}
      />

      <LegalModal
        isOpen={legal === 'privacy'}
        onClose={() => setLegal(null)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </LegalModal>

      <LegalModal
        isOpen={legal === 'terms'}
        onClose={() => setLegal(null)}
        title="Terms of Service"
      >
        <TermsOfServiceContent />
      </LegalModal>

      <Toasts />

      <span className="sr-only" aria-hidden="true">
        {NAV_LINKS.length} sections
      </span>
    </div>
  );
}
