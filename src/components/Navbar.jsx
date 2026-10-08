import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Moon, Sun, Search, Download, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, SITE } from '../lib/data';
import useActiveSection from '../hooks/useActiveSection';
import BrandMark from './BrandMark';
import Magnetic from './Magnetic';

const IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar({ theme, onToggleTheme, onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [portrait, setPortrait] = useState(true);
  const active = useActiveSection(IDS);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={`nav ${scrolled || open ? 'is-scrolled' : ''} ${open ? 'is-menu-open' : ''}`}
        style={{ background: open ? 'var(--bg-glass-strong)' : undefined }}
      >
        <a className="nav__brand" href="#top" aria-label={`${SITE.handle} — home`}>
          {/* The About portrait, cropped round — the header's identity mark.
              BrandMark stays as the fallback if the file never arrives. */}
          {portrait ? (
            <span className="nav__mark nav__mark--photo" aria-hidden="true">
              <img
                src="/avatar.jpg"
                alt=""
                width={32}
                height={32}
                decoding="async"
                fetchPriority="high"
                onError={() => setPortrait(false)}
              />
            </span>
          ) : (
            <BrandMark />
          )}
          <span className="nav__word">
            {SITE.handle}
            <em>.</em>
          </span>
        </a>

        <nav className="nav__links hide-mobile" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav__link ${active === link.id ? 'is-active' : ''}`}
              aria-current={active === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="btn btn--ghost btn--icon hide-mobile"
            onClick={onOpenPalette}
            aria-label="Open command menu"
            data-cursor="⌘K"
          >
            <Search size={16} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="btn btn--ghost btn--icon"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -70, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 70, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22 }}
                style={{ display: 'flex' }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Magnetic strength={0.18} className="hide-mobile">
            <a className="btn btn--primary btn--sm" href="/Resume.pdf" download>
              <Download size={14} aria-hidden="true" />
              <span className="btn__swap">
                <span>Resume</span>
                <span>Download</span>
              </span>
            </a>
          </Magnetic>

          <button
            type="button"
            className="burger show-mobile-only"
            aria-expanded={open}
            aria-controls="mobile-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>

        <motion.div className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-sheet"
            className="sheet"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  className="sheet__link"
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -22 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span>{link.index}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="sheet__foot">
              <a
                className="btn btn--primary btn--lg"
                href="/Resume.pdf"
                download
                onClick={() => setOpen(false)}
              >
                <Download size={16} aria-hidden="true" /> Download resume
              </a>
              <a
                className="btn btn--ghost"
                href={`https://github.com/${SITE.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                GitHub <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
