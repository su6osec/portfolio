import { useId } from 'react';

/**
 * The round su6osec mark — the same drawing as `public/favicon.svg`,
 * inlined so the header and footer paint the logo without waiting on a
 * request. Colours are brand constants on purpose (not theme tokens):
 * the mark must be identical in both themes, in the tab, and on the
 * OG card.
 */
export default function BrandMark({ className = 'nav__mark', size = 32 }) {
  const uid = useId();
  const disc = `mark-disc${uid.replace(/:/g, '')}`;

  return (
    <span className={className} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={disc} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#171b23" />
            <stop offset="55%" stopColor="#0b0e13" />
            <stop offset="100%" stopColor="#05060a" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="32" fill={`url(#${disc})`} />
        <circle
          cx="32"
          cy="32"
          r="30.5"
          stroke="#4ff0b4"
          strokeOpacity="0.32"
          strokeWidth="1.5"
        />
        <g stroke="#4ff0b4" strokeWidth="4.5" strokeLinecap="round">
          <path d="M20 34 A10 10 0 0 1 30 44" strokeOpacity="0.4" />
          <path d="M20 24 A20 20 0 0 1 40 44" strokeOpacity="0.68" />
          <path d="M20 14 A30 30 0 0 1 50 44" />
        </g>
        <circle cx="20" cy="44" r="5" fill="#4ff0b4" />
        <circle cx="20" cy="44" r="9" stroke="#4ff0b4" strokeOpacity="0.4" strokeWidth="1.5" />
      </svg>
    </span>
  );
}
