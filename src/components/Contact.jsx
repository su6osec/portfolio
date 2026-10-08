import { Mail, ArrowUpRight, Copy, Shield, PenTool } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { SiGmail, SiMedium, SiTryhackme } from 'react-icons/si';
import { SectionHead, Reveal } from './SectionHead';
import { SOCIALS, SITE } from '../lib/data';
import { useCopy } from '../hooks/useToast';
import Magnetic from './Magnetic';

const ICONS = {
  mail: SiGmail,
  linkedin: FaLinkedin,
  github: FaGithub,
  shield: SiTryhackme,
  pen: SiMedium,
};

// react-icons v6 split brand icons; fall back to lucide where absent.
const FALLBACK = { mail: Mail, shield: Shield, pen: PenTool };

export default function Contact() {
  const copy = useCopy();

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-grid">
          <div>
            <SectionHead
              id="contact-title"
              index="07"
              label="Contact"
              title="Let's build something"
              accent="hard to break."
              lead="Open to Cloud Infrastructure and Cybersecurity Engineering roles, plus interesting bug-bounty collaborations. Fastest reply is email."
            />

            <Reveal delay={0.1}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
                <Magnetic strength={0.2}>
                  <a className="btn btn--primary btn--lg" href={`mailto:${SITE.email}`}>
                    <Mail size={17} aria-hidden="true" />
                    <span className="btn__swap">
                      <span>Email me</span>
                      <span>Say hello</span>
                    </span>
                  </a>
                </Magnetic>

                <a className="btn btn--ghost btn--lg" href="/Resume.pdf" download>
                  Download resume
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="card" style={{ marginTop: 'var(--sp-6)', padding: 'clamp(1.25rem,3vw,1.75rem)' }}>
                <p className="eyebrow" style={{ marginBottom: 'var(--sp-3)' }}>
                  Availability
                </p>
                <p style={{ color: 'var(--text-2)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>
                  Currently at <strong style={{ color: 'var(--text)' }}>LTM</strong> and open to the
                  right opportunity in cloud infrastructure or offensive security — on-site or remote.
                  Response time is usually under 24 hours.
                </p>
                <div style={{ display: 'flex', gap: 'var(--sp-2)', marginTop: 'var(--sp-4)', flexWrap: 'wrap' }}>
                  <span className="chip chip--signal">
                    <span className="status-dot" aria-hidden="true" /> Available
                  </span>
                  <span className="chip">Remote friendly</span>
                  <span className="chip">Notice period negotiable</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <ul className="contact-links">
              {SOCIALS.map((s) => {
                const Icon = ICONS[s.kind] || FALLBACK[s.kind] || ArrowUpRight;
                const isCopy = s.action === 'copy';
                const Wrapper = isCopy ? 'button' : 'a';
                const props = isCopy
                  ? { type: 'button', onClick: () => copy(s.value, 'Email copied to clipboard') }
                  : { href: s.href, target: '_blank', rel: 'noopener noreferrer' };

                return (
                  <li key={s.id}>
                    <Wrapper className="contact-link" {...props} data-cursor={isCopy ? 'copy' : 'open'}>
                      <span className="contact-link__icon">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="contact-link__label">
                        <b>{s.label}</b>
                        <span>{s.value}</span>
                      </span>
                      {isCopy ? (
                        <Copy size={16} className="contact-link__go" aria-hidden="true" />
                      ) : (
                        <ArrowUpRight size={16} className="contact-link__go" aria-hidden="true" />
                      )}
                    </Wrapper>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
