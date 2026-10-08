import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Download, MapPin } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { SiGmail, SiMedium, SiTryhackme } from 'react-icons/si';
import { SITE, NAV_LINKS, SOCIALS } from '../lib/data';
import BrandMark from './BrandMark';
import Magnetic from './Magnetic';

const YEAR = new Date().getFullYear();

/** Live local time — the footer reads as a real, present person. */
function useLocalClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  }).format(now);
}

const SOCIAL_ICONS = {
  linkedin: FaLinkedin,
  github: FaGithub,
  mail: SiGmail,
  pen: SiMedium,
  shield: SiTryhackme,
};

export default function Footer({ onOpenLegal }) {
  const markRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false });
  const clock = useLocalClock();

  const onMove = (e) => {
    const el = markRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCursor({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };

  return (
    <footer className="footer" id="footer">
      {/* CTA */}
      <div className="footer__cta">
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 80% at 50% 120%, var(--signal-soft), transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-5)' }}
        >
          <span className="eyebrow">
            <span className="status-dot" aria-hidden="true" /> Open to new opportunities
          </span>

          <h2>
            Secure infrastructure is{' '}
            <em className="serif-accent" style={{ color: 'var(--signal)' }}>
              more important
            </em>{' '}
            than ever.
          </h2>

          <p style={{ color: 'var(--text-2)', maxWidth: '52ch', fontSize: 'var(--text-md)' }}>
            If you&apos;re hiring for cloud infrastructure or offensive security — or you&apos;ve got a
            problem worth solving — I&apos;d like to hear about it.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', justifyContent: 'center' }}>
            <Magnetic strength={0.22}>
              <a className="btn btn--primary btn--lg" href={`mailto:${SITE.email}`}>
                <Mail size={17} aria-hidden="true" />
                <span className="btn__swap">
                  <span>Get in touch</span>
                  <span>Reply in 24h</span>
                </span>
              </a>
            </Magnetic>

            <a className="btn btn--ghost btn--lg" href="/Resume.pdf" download>
              <Download size={17} aria-hidden="true" /> Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Sitemap */}
      <div className="container footer__grid">
        <div className="footer__brand">
          <a className="nav__brand" href="#top">
            <BrandMark />
            <span>
              {SITE.handle}
              <em>.</em>
            </span>
          </a>
          <p>{SITE.description}</p>

          <div style={{ display: 'flex', gap: 'var(--sp-2)', marginTop: 'var(--sp-4)', flexWrap: 'wrap' }}>
            {SOCIALS.filter((s) => s.action !== 'copy').map((s) => {
              const Icon = SOCIAL_ICONS[s.kind];
              if (!Icon) return null;
              return (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="btn btn--ghost btn--icon"
                  style={{ width: 38, height: 38, minHeight: 38 }}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <nav className="footer__col" aria-label="Sections">
          <h4>Sections</h4>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Resources">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="/Resume.pdf" download>Download resume</a>
            </li>
            <li>
              <a
                href="https://github.com/su6osec/Bug-Bounty-Hunting-Methodology-2026"
                target="_blank"
                rel="noopener noreferrer"
              >
                BBH Methodology 2026
              </a>
            </li>
            <li>
              <a
                href={`https://github.com/${SITE.handle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub profile
              </a>
            </li>
            <li>
              <button type="button" onClick={() => onOpenLegal('privacy')}>
                Privacy policy
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onOpenLegal('terms')}>
                Terms of service
              </button>
            </li>
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Elsewhere">
          <h4>Elsewhere</h4>
          <ul>
            {SOCIALS.map((s) => (
              <li key={s.id}>
                {s.action === 'copy' ? (
                  <a href={s.href}>{s.label}</a>
                ) : (
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Giant wordmark with cursor-driven reveal */}
      <div
        className="wordmark"
        ref={markRef}
        onMouseMove={onMove}
        onMouseLeave={() => setCursor((c) => ({ ...c, on: false }))}
        aria-hidden="true"
      >
        <span className="wordmark__base">{SITE.handle}</span>
        <span
          className="wordmark__fill"
          style={{
            opacity: cursor.on ? 1 : 0.06,
            WebkitMaskImage: cursor.on
              ? `radial-gradient(circle 240px at ${cursor.x}px ${cursor.y}px, #000 25%, transparent 100%)`
              : 'none',
            maskImage: cursor.on
              ? `radial-gradient(circle 240px at ${cursor.x}px ${cursor.y}px, #000 25%, transparent 100%)`
              : 'none',
            transition: 'opacity 300ms ease',
          }}
        >
          {SITE.handle}
        </span>
      </div>

      <div className="container footer__bar">
        <span className="footer__bar-left">
          <span className="footer__clock">
            <MapPin size={12} aria-hidden="true" />
            New Delhi, IN
            <span className="footer__clock-sep" aria-hidden="true">/</span>
            <span className="mono">{clock} IST</span>
          </span>
          <span className="footer__copyright">
            © {YEAR} {SITE.name}
          </span>
        </span>
        <div className="footer__bar-links">
          <button type="button" onClick={() => onOpenLegal('privacy')}>
            Privacy
          </button>
          <button type="button" onClick={() => onOpenLegal('terms')}>
            Terms
          </button>
          <a href="#top">
            Back to top <ArrowUpRight size={11} style={{ display: 'inline' }} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
