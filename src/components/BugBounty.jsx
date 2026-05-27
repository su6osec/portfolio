import React from 'react';
import { motion } from 'framer-motion';
import { Award, DollarSign, CheckCircle } from 'lucide-react';

export default function BugBounty() {
  return (
    <section id="bugbounty" style={{ padding: 'var(--space-8) 0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-6)' }}>Bug Bounty & Disclosures</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
          
          <div className="glass" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: 'var(--space-2)', borderRadius: '50%' }}>
                <DollarSign color="var(--color-success)" size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-xl)' }}>$300 Reward</h3>
            </div>
            <h4 style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>Liquid Web</h4>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Identified and responsibly disclosed a medium-severity vulnerability; issue confirmed, triaged, and fully remediated by the vendor security team.
            </p>
          </div>

          <div className="glass" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: 'var(--space-2)', borderRadius: '50%' }}>
                <DollarSign color="var(--color-success)" size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-xl)' }}>$50 Reward</h3>
            </div>
            <h4 style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>Zoho</h4>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Uncovered a hardcoded API key exposing internal service credentials; coordinated disclosure patched within vendor-defined reporting SLA.
            </p>
          </div>

          <div className="glass" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <CheckCircle color="var(--color-accent-primary)" size={48} style={{ marginBottom: 'var(--space-3)' }} />
            <h3 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>100%</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Report Acceptance Rate</p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
