import { useCallback, useEffect, useRef, useState } from 'react';

/** Minimal toast store — no provider needed, one instance per page. */
let listeners = new Set();
let idSeq = 0;

export function notify(message, opts = {}) {
  const id = ++idSeq;
  const toast = { id, message, tone: opts.tone || 'default', ttl: opts.ttl || 2400 };
  listeners.forEach((fn) => fn((list) => [...list, toast]));
  setTimeout(() => {
    listeners.forEach((fn) => fn((list) => list.filter((t) => t.id !== id)));
  }, toast.ttl);
  return id;
}

export default function useToasts() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    listeners.add(setToasts);
    return () => listeners.delete(setToasts);
  }, []);

  return toasts;
}

/** Copy helper with a confirmation toast. */
export function useCopy() {
  const timer = useRef(null);

  const copy = useCallback(async (text, label = 'Copied to clipboard') => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      notify(label, { tone: 'ok' });
    } catch {
      notify('Copy failed — select the text manually', { tone: 'error' });
    } finally {
      clearTimeout(timer.current);
    }
  }, []);

  return copy;
}
