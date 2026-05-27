import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LegalModal({ isOpen, onClose, title, children }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' 
        }}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(5, 5, 5, 0.8)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer'
            }}
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: 'relative',
              width: 'calc(100% - 32px)',
              maxWidth: '800px',
              maxHeight: '85vh',
              background: 'rgba(20, 20, 20, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              zIndex: 10000
            }}
          >
            <div style={{ 
              padding: '24px 32px', 
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {title}
              </h2>
            </div>
            
            <div style={{ 
              padding: '32px', 
              overflowY: 'auto',
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: 1.8,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
