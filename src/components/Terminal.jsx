import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Terminal() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const sequence = [
    { text: "> whoami\n", delay: 600, fast: false },
    { text: "su6osec (deepanshu_chauhan)\n\n", delay: 600, fast: true },
    { text: "> cat skills.txt\n", delay: 600, fast: false },
    { text: "[*] Offensive Security\n", delay: 100, fast: true },
    { text: "[*] Penetration Testing\n", delay: 100, fast: true },
    { text: "[*] Cloud Infrastructure\n\n", delay: 600, fast: true },
    { text: "> ./init_mission.sh\n", delay: 800, fast: false },
    { text: "[+] Securing infrastructure through an offensive lens... [OK]\n", delay: 100, fast: true },
    { text: "> ", delay: 500, fast: false }
  ];

  useEffect(() => {
    if (!isInView) return;

    let currentText = '';
    let seqIndex = 0;
    let charIndex = 0;
    let timeoutId;

    const typeWriter = () => {
      if (seqIndex >= sequence.length) return;

      const currentItem = sequence[seqIndex];
      
      if (currentItem.fast) {
        currentText += currentItem.text;
        setText(currentText);
        seqIndex++;
        timeoutId = setTimeout(typeWriter, currentItem.delay);
      } else {
        currentText += currentItem.text.charAt(charIndex);
        setText(currentText);
        charIndex++;

        if (charIndex < currentItem.text.length) {
          timeoutId = setTimeout(typeWriter, Math.random() * 50 + 30);
        } else {
          seqIndex++;
          charIndex = 0;
          timeoutId = setTimeout(typeWriter, currentItem.delay);
        }
      }
    };

    timeoutId = setTimeout(typeWriter, 500);

    return () => clearTimeout(timeoutId);
  }, [isInView]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        background: 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '700px',
        margin: 'var(--space-8) auto 0',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        textAlign: 'left'
      }}
    >
      {/* Terminal Header */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'monospace', marginLeft: '-44px' }}>
          bash - 80x24
        </div>
      </div>

      {/* Terminal Body */}
      <div style={{
        padding: '24px',
        fontFamily: '"Fira Code", "Courier New", Courier, monospace',
        fontSize: 'clamp(13px, 2vw, 15px)',
        lineHeight: 1.6,
        color: 'var(--color-text-secondary)',
        minHeight: '220px',
        whiteSpace: 'pre-wrap'
      }}>
        <span>{text}</span>
        <span style={{ opacity: showCursor ? 1 : 0, color: 'var(--color-text-primary)' }}>█</span>
      </div>
    </motion.div>
  );
}
