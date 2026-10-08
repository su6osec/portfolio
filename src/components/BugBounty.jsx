import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Banknote, ShieldCheck, Trophy, Target } from 'lucide-react';
import { SectionHead, Reveal } from './SectionHead';
import { BOUNTIES } from '../lib/data';
import useCountUp from '../hooks/useCountUp';

function Counter({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const value = useCountUp(to, { start: inView, duration: 1300 });

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default function BugBounty() {
  return (
    <section className="section" id="bounty" aria-labelledby="bounty-title">
      <div className="container">
        <SectionHead
          id="bounty-title"
          index="05"
          label="Bug Bounty"
          title="Disclosed, rewarded,"
          accent="remediated."
          lead="Real reports, real vendors, real fixes — submitted through coordinated disclosure and accepted without a single rejection."
          split
        />

        <div className="bento">
          {BOUNTIES.map((b, i) => (
            <Reveal key={b.org} className="bento__span-4" y={26} delay={i * 0.07}>
              <article className="card bounty-card" data-cursor="bounty" style={{ height: '100%' }}>
                <div className="bounty-card__head">
                  <span
                    style={{
                      width: 42,
                      height: 42,
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: 'var(--r-sm)',
                      background: 'var(--gold-soft)',
                      border: '1px solid color-mix(in srgb, var(--gold) 30%, transparent)',
                      color: 'var(--gold)',
                    }}
                  >
                    <Banknote size={20} aria-hidden="true" />
                  </span>
                  <span className="chip chip--gold">Paid</span>
                </div>

                <div>
                  <p className="bounty-card__amount">{b.amount}</p>
                  <p className="bounty-card__org">{b.org}</p>
                </div>

                <p>{b.body}</p>
              </article>
            </Reveal>
          ))}

          <Reveal className="bento__span-4" y={26} delay={0.14}>
            <article className="card bounty-card bounty-card--stat" style={{ height: '100%' }}>
              <Trophy size={26} style={{ color: 'var(--gold)' }} aria-hidden="true" />
              <p className="stat__value" style={{ color: 'var(--gold)' }}>
                <Counter to={100} suffix="%" />
              </p>
              <p className="stat__label">Report acceptance rate</p>
            </article>
          </Reveal>

          <Reveal className="bento__span-6" y={26} delay={0.05}>
            <article className="card bounty-card" style={{ height: '100%' }}>
              <div className="bounty-card__head">
                <span
                  style={{
                    width: 42,
                    height: 42,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--signal-soft)',
                    border: '1px solid color-mix(in srgb, var(--signal) 30%, transparent)',
                    color: 'var(--signal)',
                  }}
                >
                  <Target size={20} aria-hidden="true" />
                </span>
                <span className="chip chip--signal">Rank</span>
              </div>
              <p className="stat__value" style={{ color: 'var(--signal)' }}>
                Top <Counter to={5} suffix="%" />
              </p>
              <p className="stat__label">TryHackMe global ranking</p>
              <p>
                Sustained hands-on practice across offensive paths, blue-team
                modules and real-world lab scenarios.
              </p>
            </article>
          </Reveal>

          <Reveal className="bento__span-6" y={26} delay={0.12}>
            <article className="card bounty-card" style={{ height: '100%' }}>
              <div className="bounty-card__head">
                <span
                  style={{
                    width: 42,
                    height: 42,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--violet-soft)',
                    border: '1px solid color-mix(in srgb, var(--violet) 30%, transparent)',
                    color: 'var(--violet)',
                  }}
                >
                  <ShieldCheck size={20} aria-hidden="true" />
                </span>
                <span className="chip chip--violet">Process</span>
              </div>
              <p className="stat__value" style={{ color: 'var(--violet)' }}>
                Coordinated
              </p>
              <p className="stat__label">Disclosure standard</p>
              <p>
                Reproducible write-ups, severity justification and vendor-defined
                SLAs — every submission is documented end to end.
              </p>
            </article>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            marginTop: 'var(--sp-6)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-3)',
            flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-3)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          <ShieldCheck size={14} aria-hidden="true" />
          Vulnerability disclosure follows each vendor&apos;s published policy. No customer data accessed, retained or exfiltrated.
        </motion.div>
      </div>
    </section>
  );
}
