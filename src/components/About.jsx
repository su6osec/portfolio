import React from 'react';
import { motion } from 'framer-motion';
import Terminal from './Terminal';

export default function About() {
  return (
    <section id="about" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 'var(--space-8) var(--space-4)',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // smooth ease out
        style={{ maxWidth: '1000px' }}
      >
        <p style={{
          fontSize: 'var(--font-size-sm)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-4)'
        }}>
          My Mission
        </p>

        {/* Masked Text Reveal for Heading */}
        <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
          <motion.h2 
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ 
              fontSize: 'clamp(32px, 5vw, 56px)', 
              lineHeight: 1.2,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)'
            }}
          >
            Engineering <span style={{ color: 'var(--color-accent-primary)' }}>secure infrastructure</span> through an <span style={{ color: 'var(--color-accent-primary)' }}>offensive lens</span>.
          </motion.h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-6)',
          textAlign: 'left',
          marginTop: 'var(--space-8)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 'var(--space-8)'
        }}>
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-text-primary)' }}>Offensive Security</h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Specializing in penetration testing, bug bounty hunting, and threat-driven reconnaissance. I maintain a 100% report acceptance rate across public and private programs and rank in the global top 5% on TryHackMe.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-text-primary)' }}>Cloud Operations</h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Building secure and scalable enterprise cloud infrastructure. Experienced with Azure, Linux, and Windows server environments, focusing on availability and security posture compliance.
            </p>
          </div>
        </div>

        {/* Interactive Hacker Terminal */}
        <Terminal />
      </motion.div>
    </section>
  );
}
