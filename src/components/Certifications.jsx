import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function Certifications() {
  const certs = [
    {
      title: "Google Cybersecurity Professional Certificate",
      issuer: "Google / Coursera",
      date: "Jul 2025"
    },
    {
      title: "Professional Machine Learning Engineer",
      issuer: "Google Cloud",
      date: "Jul 2024 – Jul 2026"
    },
    {
      title: "Offensive Penetration Testing",
      issuer: "Cybrary",
      date: "Oct 2023"
    }
  ];

  return (
    <section id="certifications" style={{ padding: 'var(--space-8) 0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-6)' }}>Certifications</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
          {certs.map((cert, index) => (
            <div key={index} className="glass" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 'var(--space-4)' }}>
              <div style={{ flexShrink: 0 }}>
                <Award color="var(--color-accent-primary)" size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-1)', lineHeight: 1.3 }}>{cert.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-2)' }}>{cert.issuer}</p>
                <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                  {cert.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
