import useActiveSection from '../hooks/useActiveSection';
import { NAV_LINKS } from '../lib/data';

const IDS = NAV_LINKS.map((l) => l.id);

/**
 * SectionRail — a fixed, quiet progress navigator pinned to the right edge.
 * It doubles as a table of contents and a scroll position indicator.
 * Hidden by CSS below 1200px where it would crowd the container.
 */
export default function SectionRail() {
  const active = useActiveSection(IDS);

  return (
    <nav className="rail" aria-label="Section navigation">
      {NAV_LINKS.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={`rail__item ${active === link.id ? 'is-active' : ''}`}
          aria-label={`Jump to ${link.label}`}
          aria-current={active === link.id ? 'true' : undefined}
        >
          <span className="rail__label">{link.label}</span>
          <span className="rail__tick" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
