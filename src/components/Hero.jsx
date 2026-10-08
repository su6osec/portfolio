import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa6';
import { SITE, HERO_STATS } from '../lib/data';
import Magnetic from './Magnetic';
import HeroCanvas from './HeroCanvas';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__art" aria-hidden="true">
        <div className="grid-backdrop" />
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <HeroCanvas />
      </div>

      <div className="container hero__inner">
        <motion.div
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          <span className="status-dot" aria-hidden="true" />
          <span className="hero__eyebrow-unit">Open to new opportunities</span>
          <span className="hero__eyebrow-unit" style={{ color: 'var(--text-3)' }}>
            · {SITE.location} · Remote
          </span>
        </motion.div>

        <h1 className="hero__title" id="hero-title">
          <span className="reveal-line">
            <motion.span
              initial={{ y: '108%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
              style={{ display: 'block' }}
            >
              Deepanshu
            </motion.span>
          </span>
          <span className="reveal-line">
            <motion.span
              className="hero__outline"
              initial={{ y: '108%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.36 }}
              style={{ display: 'block' }}
            >
              Chauhan
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
        >
          <strong>{SITE.role}</strong> — building a dual-track foundation in
          enterprise cloud operations and offensive security. I break things
          responsibly, then engineer them so they stay broken-proof.
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
        >
          <Magnetic strength={0.22}>
            <a className="btn btn--primary btn--lg" href="#contact" data-cursor="say hi">
              <Mail size={17} aria-hidden="true" />
              <span className="btn__swap">
                <span>Get in touch</span>
                <span>Let's talk</span>
              </span>
            </a>
          </Magnetic>

          <a className="btn btn--ghost btn--lg" href="#projects">
            View projects
            <ArrowDownRight size={17} aria-hidden="true" />
          </a>

          <a className="btn btn--ghost btn--lg" href="/Resume.pdf" download>
            <Download size={17} aria-hidden="true" />
            <span className="btn__swap">
              <span>Download resume</span>
              <span>PDF · 107 KB</span>
            </span>
          </a>

          <a
            className="btn btn--ghost btn--icon btn--lg"
            href={`https://github.com/${SITE.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            data-cursor="github"
            style={{ width: 56, height: 56 }}
          >
            <Github size={19} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.dl
          className="hero__meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
        >
          {HERO_STATS.map((s) => (
            <div className="hero__meta-item" key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className="scroll-cue hide-mobile" aria-hidden="true">
        <span>Scroll</span>
        <span className="scroll-cue__rail" />
      </div>
    </section>
  );
}
