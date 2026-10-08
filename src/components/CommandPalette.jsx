import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ArrowRight, Sun, Moon, Download,
  Mail, User, Briefcase, Wrench, ShieldCheck, Award, Terminal as TerminalIcon,
} from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa6';
import { NAV_LINKS, SITE } from '../lib/data';

/**
 * Command palette — ⌘K / Ctrl+K. Fully keyboard driven, screen-reader
 * announced, Escape to close, focus restored on unmount.
 */
export default function CommandPalette({ open, onClose, onToggleTheme, theme }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const restoreRef = useRef(null);

  const commands = useMemo(() => {
    const nav = NAV_LINKS.map((l) => ({
      id: `nav-${l.id}`,
      label: `Go to ${l.label}`,
      hint: 'Section',
      icon: sectionIcon(l.id),
      run: () => goto(l.id),
    }));

    return [
      ...nav,
      { id: 'resume', label: 'Download resume', hint: 'PDF', icon: Download, run: () => { window.open('/Resume.pdf', '_blank', 'noopener'); } },
      { id: 'email', label: `Copy email — ${SITE.email}`, hint: 'Action', icon: Mail, run: () => copyEmail() },
      { id: 'github', label: 'Open GitHub profile', hint: 'External', icon: Github, run: () => window.open(`https://github.com/${SITE.handle}`, '_blank', 'noopener') },
      { id: 'theme', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`, hint: 'Action', icon: theme === 'dark' ? Sun : Moon, run: onToggleTheme },
      { id: 'top', label: 'Back to top', hint: 'Navigate', icon: ArrowRight, run: () => goto('top') },
    ];
  }, [theme, onToggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q));
  }, [query, commands]);

  // Reset only when the palette *opens*, during render: doing it on close
  // would snap the list back to unfiltered while the exit animation plays.
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    if (open) {
      setQuery('');
      setIndex(0);
    }
    setWasOpen(open);
  }

  useEffect(() => {
    if (!open) return undefined;
    restoreRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const id = requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = '';
      restoreRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIndex((i) => (i + 1) % Math.max(results.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = results[index];
        if (cmd) {
          cmd.run();
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, index, onClose]);

  useEffect(() => {
    const el = listRef.current?.querySelector('[aria-selected="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="palette-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="palette__input">
              <Search size={16} aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                aria-controls="palette-list"
                aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="palette__hint">esc</span>
            </div>

            <ul className="palette__list" id="palette-list" role="listbox" ref={listRef}>
              {results.length === 0 && <li className="palette__empty">No matches.</li>}
              {results.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={c.id} role="none">
                    <button
                      type="button"
                      id={`cmd-${c.id}`}
                      role="option"
                      aria-selected={i === index}
                      className="palette__item"
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => {
                        c.run();
                        onClose();
                      }}
                    >
                      <Icon size={15} aria-hidden="true" />
                      <span>{c.label}</span>
                      <span className="palette__hint">{c.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="palette__foot">
              <span>↑↓ navigate</span>
              <span>⏎ select</span>
              <span>esc close</span>
              <span style={{ marginLeft: 'auto' }}>or press /</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function goto(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(SITE.email);
    window.dispatchEvent(new CustomEvent('su6osec:toast', { detail: 'Email copied to clipboard' }));
  } catch {
    window.location.href = `mailto:${SITE.email}`;
  }
}

function sectionIcon(id) {
  switch (id) {
    case 'about': return User;
    case 'experience': return Briefcase;
    case 'skills': return Wrench;
    case 'projects': return TerminalIcon;
    case 'bounty': return ShieldCheck;
    case 'certifications': return Award;
    default: return Mail;
  }
}
