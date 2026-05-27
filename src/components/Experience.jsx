import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import TiltCard from './TiltCard';

export default function Experience() {
  return (
    <section id="experience" style={{ padding: 'var(--space-8) 0', display: 'flex', flexDirection: 'column', gap: '150px' }}>
      
      {/* Experience - Image Left, Text Right */}
      <div style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: 'var(--space-8)' }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ flex: '1 1 500px', perspective: '1000px' }}
        >
          <TiltCard>
            <div style={{
              background: 'linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(5,5,5,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: 'var(--space-6)',
              transform: 'translateZ(20px)',
              transformStyle: 'preserve-3d'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
                 <h3 style={{ fontSize: '18px', color: '#fff', fontWeight: 500 }}>Infrastructure Compliance</h3>
                 <span style={{ fontSize: '12px', color: 'var(--color-success)', background: 'rgba(34, 197, 94, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>100% SLA</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                 <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ fontSize: '14px', color: '#fff', marginBottom: '4px' }}>Cloud & On-prem Monitoring</div>
                   <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>CIS domain availability & security posture</div>
                 </div>
                 <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ fontSize: '14px', color: '#fff', marginBottom: '4px' }}>ITIL v4 Service Requests</div>
                   <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Access provisioning, patching, P1/P2 incidents</div>
                 </div>
                 <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ fontSize: '14px', color: '#fff', marginBottom: '4px' }}>Technical Governance</div>
                   <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Runbooks, incident reports, audit readiness</div>
                 </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--color-accent-primary)' }}></div>
            <span style={{ color: 'var(--color-accent-primary)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nov 2025 – Present</span>
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
            <motion.h2 
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.1 }}
            >
              LTIMindtree
            </motion.h2>
          </div>
          <h3 style={{ fontSize: '20px', color: 'var(--color-text-secondary)', fontWeight: 400 }}>
             Engineer, Cloud & Infrastructure
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', lineHeight: 1.6, maxWidth: '400px', marginTop: 'var(--space-2)' }}>
            Administering and monitoring cloud and on-premises infrastructure within the CIS domain, upholding availability, security posture, and operational compliance across hybrid enterprise environments.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
