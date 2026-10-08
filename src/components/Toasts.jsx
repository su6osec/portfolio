import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, AlertTriangle } from 'lucide-react';
import useToasts, { notify } from '../hooks/useToast';

/** Toast viewport. Also accepts window-level `su6osec:toast` events. */
export default function Toasts() {
  const toasts = useToasts();

  useEffect(() => {
    const onToast = (e) => notify(e.detail?.message ?? e.detail ?? '');
    window.addEventListener('su6osec:toast', onToast);
    return () => window.removeEventListener('su6osec:toast', onToast);
  }, []);

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="false">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            className="toast"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            role="status"
          >
            <span
              className="toast__icon"
              style={{ color: t.tone === 'error' ? 'var(--danger)' : 'var(--signal)' }}
            >
              {t.tone === 'error' ? <AlertTriangle size={15} /> : <Check size={15} />}
            </span>
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
