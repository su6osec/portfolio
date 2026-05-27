import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import TiltCard from './TiltCard';

export default function Projects() {
  return (
    <section id="projects" style={{ padding: 'var(--space-8) 0', display: 'flex', flexDirection: 'column', gap: '150px' }}>
      
      {/* Graphite Project - Image Right */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-8)' }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flex: '1 1 min(100%, 400px)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--color-accent-primary)' }}></div>
            <span style={{ color: 'var(--color-accent-primary)', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Subdomain Reconnaissance</span>
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
            <motion.h2 
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.1 }}
            >
              Graphite Engine
            </motion.h2>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', lineHeight: 1.6, maxWidth: '400px' }}>
            Architected a high-throughput subdomain enumeration CLI in Go. Aggregates 39 passive OSINT sources via concurrent goroutine querying with deterministic deduplication and zero false positives.
          </p>
          <a href="https://github.com/su6osec/graphite" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', marginTop: 'var(--space-3)', width: 'fit-content', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', transition: 'border-color 0.2s' }} onMouseOver={(e) => e.target.style.borderColor = '#fff'} onMouseOut={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}>
            <FaGithub size={16} /> View on GitHub
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ flex: '1 1 min(100%, 500px)', width: '100%', perspective: '1000px' }}
        >
          <TiltCard>
            <div style={{
              background: 'linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(5,5,5,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: 'clamp(16px, 5vw, 32px)',
              transform: 'translateZ(20px)',
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
              </div>
              <div style={{ fontFamily: 'monospace', color: '#a8c7fa', fontSize: 'clamp(11px, 2.5vw, 13px)', lineHeight: 1.8, whiteSpace: 'pre', overflowX: 'auto', paddingBottom: '8px' }}>
                <div style={{ color: '#fff' }}>$ graphite -d hackerone.com -w 50 -c 60</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>[*] Validating [========================] 143/143</div>
                <div style={{ marginTop: '8px' }}> 1  api.hackerone.com         95   high   ✓   200</div>
                <div> 2  docs.hackerone.com        92   high   ✓   200</div>
                <div> 3  hacktivity.hackerone.com  88   high   ✓   200</div>
                <div style={{ color: 'var(--color-success)', marginTop: '8px' }}>→ 89 verified subdomain(s) discovered</div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

      </div>

      {/* OSCAR Project - Image Left */}
      <div style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: 'var(--space-8)' }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ flex: '1 1 min(100%, 500px)', width: '100%', perspective: '1000px' }}
        >
          <TiltCard>
            <div style={{
              background: 'linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(5,5,5,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: 'clamp(16px, 5vw, 32px)',
              transform: 'translateZ(20px)',
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
              </div>
              <div style={{ fontFamily: 'monospace', color: '#e5b3fe', fontSize: 'clamp(11px, 2.5vw, 13px)', lineHeight: 1.8, whiteSpace: 'pre', overflowX: 'auto', paddingBottom: '8px' }}>
                <div style={{ color: '#fff' }}>$ oscar -h</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>Omni-Signal Capture & Agentic Recon — v1.0.0</div>
                <div style={{ marginTop: '8px' }}>  -t &lt;domain&gt;    Target domain (required)</div>
                <div>  -fast          Skip slow tools (~3× faster)</div>
                <div>  -deep          Enable all tools (slow, thorough)</div>
                <div>  -resume        Resume a previous scan</div>
                <div style={{ color: 'var(--color-success)' }}>  -no-ai         Skip Ollama AI triage</div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flex: '1 1 min(100%, 400px)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--color-accent-secondary)' }}></div>
            <span style={{ color: 'var(--color-accent-secondary)', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Automated Recon & Triage</span>
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
            <motion.h2 
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.1 }}
            >
              OSCAR Pipeline
            </motion.h2>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', lineHeight: 1.6, maxWidth: '400px' }}>
            Designed a production-grade bug bounty recon framework with a 5-stage automated pipeline: asset discovery → service fingerprinting → vulnerability detection → AI-assisted triage via local Ollama LLM.
          </p>
          <a href="https://github.com/su6osec/oscar" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', marginTop: 'var(--space-3)', width: 'fit-content', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', transition: 'border-color 0.2s' }} onMouseOver={(e) => e.target.style.borderColor = '#fff'} onMouseOut={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}>
            <FaGithub size={16} /> View on GitHub
          </a>
        </motion.div>

      </div>

      {/* Bug Bounty Project - Image Right */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-8)' }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flex: '1 1 min(100%, 400px)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--color-accent-primary)' }}></div>
            <span style={{ color: 'var(--color-accent-primary)', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Security Methodology</span>
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
            <motion.h2 
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ fontSize: 'clamp(32px, 4vw, 40px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.1 }}
            >
              Bug Bounty Hunting Methodology
            </motion.h2>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', lineHeight: 1.6, maxWidth: '400px' }}>
            A comprehensive, community-driven resource covering advanced reconnaissance, enumeration, exploitation, and reporting workflows. Designed for structured testing against modern infrastructure.
          </p>
          <a href="https://github.com/su6osec/Bug-Bounty-Hunting-Methodology-2026" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', marginTop: 'var(--space-3)', width: 'fit-content', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', transition: 'border-color 0.2s' }} onMouseOver={(e) => e.target.style.borderColor = '#fff'} onMouseOut={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}>
            <FaGithub size={16} /> View on GitHub
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ flex: '1 1 min(100%, 500px)', width: '100%', perspective: '1000px' }}
        >
          <TiltCard>
            <div style={{
              background: 'linear-gradient(145deg, rgba(20,20,20,0.95) 0%, rgba(5,5,5,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: 'clamp(16px, 5vw, 32px)',
              transform: 'translateZ(20px)',
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
              </div>
              <div style={{ fontFamily: 'monospace', color: '#a8c7fa', fontSize: 'clamp(11px, 2.5vw, 13px)', lineHeight: 1.8, whiteSpace: 'pre', overflowX: 'auto', paddingBottom: '8px' }}>
                <div style={{ color: '#fff' }}>$ tree phases/</div>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>phases/</div>
                <div>├── 01_scope_and_program_analysis.md</div>
                <div>├── 02_passive_reconnaissance.md</div>
                <div>├── 03_active_enumeration.md</div>
                <div>├── 04_vulnerability_discovery.md</div>
                <div>├── 05_exploitation_and_poc.md</div>
                <div style={{ color: 'var(--color-success)' }}>└── 06_reporting.md</div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

      </div>

    </section>
  );
}
