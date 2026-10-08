import { motion } from 'framer-motion';
import { Crosshair, Cloud, ArrowUpRight } from 'lucide-react';
import { SectionHead, Reveal } from './SectionHead';
import Terminal from './Terminal';
import { FOCUS_AREAS } from '../lib/data';

const ICONS = { crosshair: Crosshair, cloud: Cloud };

const STATS = [
  { value: '100%', label: 'Report acceptance' },
  { value: 'Top 5%', label: 'TryHackMe' },
  { value: '39+', label: 'Recon sources' },
  { value: '8', label: 'Certifications' },
];

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          id="about-title"
          index="01"
          label="About"
          title="Engineering secure infrastructure through an"
          accent="offensive lens."
          lead="A dual-track career spanning enterprise cloud operations and offensive security — with the receipts to back both sides."
        />

        <div className="bento">
          {/* Mission + terminal */}
          <Reveal className="bento__span-7" y={30}>
            <article className="card bento__card" style={{ height: '100%' }}>
              <span className="bento__label">Mission</span>
              <h3 style={{ fontSize: 'var(--text-xl)', lineHeight: 1.3 }}>
                I operate at the intersection of availability and attack surface.
              </h3>
              <p>
                By day I keep hybrid enterprise estates compliant, monitored and
                available. Off the clock I hunt bugs, ship security tooling and
                publish the recon methodology I wish I'd had when I started. The
                two halves feed each other: defending infrastructure teaches you
                exactly where it breaks.
              </p>
              <Terminal />
            </article>
          </Reveal>

          {/* Portrait */}
          <Reveal className="bento__span-5" y={30} delay={0.08}>
            <figure className="card bento__portrait" style={{ height: '100%' }}>
              <img
                src="/profile.jpg"
                alt="Portrait of Deepanshu Chauhan"
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                {`// su6osec — offensive security & cloud`}
              </figcaption>
            </figure>
          </Reveal>

          {/* Focus areas */}
          {FOCUS_AREAS.map((area, i) => {
            const Icon = ICONS[area.icon] || Crosshair;
            return (
              <Reveal key={area.title} className="bento__span-4" y={26} delay={0.06 * i}>
                <article className="card bento__card" style={{ height: '100%' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 'var(--sp-3)',
                    }}
                  >
                    <span
                      style={{
                        width: 40,
                        height: 40,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: 'var(--r-sm)',
                        background: 'var(--signal-soft)',
                        border: '1px solid color-mix(in srgb, var(--signal) 26%, transparent)',
                        color: 'var(--signal)',
                      }}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="chip chip--signal">0{i + 1}</span>
                  </div>
                  <h3>{area.title}</h3>
                  <p>{area.body}</p>
                </article>
              </Reveal>
            );
          })}

          {/* Stats */}
          <Reveal className="bento__span-4" y={26} delay={0.12}>
            <div className="card card--flat" style={{ height: '100%', padding: 0, overflow: 'hidden' }}>
              <div className="stat-grid" style={{ border: 0, height: '100%' }}>
                {STATS.map((s) => (
                  <div key={s.label}>
                    <span className="stat__value" style={{ color: 'var(--signal)' }}>
                      {s.value}
                    </span>
                    <span className="stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            marginTop: 'var(--sp-6)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-2)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-3)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          <ArrowUpRight size={14} aria-hidden="true" />
          Currently at LTM · previously focused on Google Cloud ML &amp; offensive pentesting
        </motion.p>
      </div>
    </section>
  );
}
