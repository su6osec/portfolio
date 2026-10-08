import { Zap } from 'lucide-react';

const ITEMS = [
  'Offensive Security',
  'Cloud Infrastructure',
  'Bug Bounty',
  'Azure',
  'Penetration Testing',
  'Go',
  'Active Directory',
  'OSINT',
  'Kubernetes',
  'Linux',
  'Nuclei',
  'MITRE ATT&CK',
  'Zero Trust',
  'Python',
];

/**
 * Ticker — a single full-bleed marquee band that acts as the transition
 * between the hero and the body of the page.
 */
export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="ticker-band" aria-hidden="true">
      <div className="marquee marquee--left">
        <div className="marquee__track">
          {row.map((item, i) => (
            <span
              key={`${item}-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--sp-3)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                paddingInline: 'var(--sp-3)',
              }}
            >
              <Zap size={11} style={{ color: 'var(--signal)', flex: 'none' }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
