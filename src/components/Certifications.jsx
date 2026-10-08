import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { SectionHead, Reveal } from './SectionHead';
import { CERTIFICATIONS, CERT_TIERS } from '../lib/data';

/** Difficulty meter — three pips, filled according to the tier. */
function TierMeter({ dots }) {
  return (
    <span className="cert-tier__meter" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <i key={i} className={i < dots ? 'is-on' : ''} />
      ))}
    </span>
  );
}

export default function Certifications() {
  return (
    <section className="section" id="certifications" aria-labelledby="certs-title">
      <div className="container">
        <SectionHead
          id="certs-title"
          index="06"
          label="Certifications"
          title="Verified"
          accent="credentials."
          lead="Eight credentials, sorted by the rigor of the exam behind them — from proctored professional certifications down to focused coursework."
          split
        />

        <div className="cert-tiers">
          {CERT_TIERS.map((tier) => {
            const items = CERTIFICATIONS.filter((c) => c.tier === tier.key);
            if (!items.length) return null;

            return (
              <section
                key={tier.key}
                className="cert-tier"
                aria-labelledby={`tier-${tier.key}`}
              >
                <Reveal className="cert-tier__head" y={18}>
                  <div className="cert-tier__title">
                    <TierMeter dots={tier.dots} />
                    <h3 id={`tier-${tier.key}`}>{tier.label}</h3>
                    <span className="cert-tier__rule" aria-hidden="true" />
                    <span className="cert-tier__count">
                      {String(items.length).padStart(2, '0')}{' '}
                      {items.length === 1 ? 'credential' : 'credentials'}
                    </span>
                  </div>
                  <p className="cert-tier__blurb">{tier.blurb}</p>
                </Reveal>

                <div className="cert-grid">
                  {items.map((cert, i) => (
                    <Reveal key={cert.title} y={26} delay={i * 0.06}>
                      <article className="card cert-card">
                        <div className="cert-card__head">
                          <span className="cert-card__logo" aria-hidden="true">
                            <img
                              src={cert.logo}
                              alt=""
                              width={56}
                              height={56}
                              loading="lazy"
                              decoding="async"
                            />
                          </span>
                          <div className="cert-card__titles">
                            <h4>{cert.title}</h4>
                            <p className="cert-card__issuer">{cert.issuer}</p>
                          </div>
                        </div>

                        <div className="cert-card__meta">
                          <span className="chip">
                            <CalendarDays size={12} aria-hidden="true" />
                            {cert.date}
                          </span>
                          {cert.expired && (
                            <span className="cert-card__flag">Expired</span>
                          )}
                          {cert.credentialId && (
                            <code className="cert-card__id">{cert.credentialId}</code>
                          )}
                        </div>

                        <ul className="cert-card__skills">
                          {cert.skills.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>

                        <div className="cert-card__foot">
                          <span className="cert-card__source">{cert.source}</span>
                          {cert.verify && (
                            <a
                              className="link-arrow"
                              href={cert.verify.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${cert.verify.label} for ${cert.title} (opens in a new tab)`}
                            >
                              {cert.verify.label}
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
