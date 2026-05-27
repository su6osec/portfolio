import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('deepanshu.infosec@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ padding: 'var(--space-8) 0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-4)' }}>Get In Touch</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)', maxWidth: '600px', margin: '0 auto var(--space-6)' }}>
          Currently open to new opportunities in Cloud Infrastructure and Cybersecurity Engineering. Let's build secure systems together.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
          <button 
            onClick={handleCopyEmail}
            className="glass" 
            style={{ 
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)', 
              padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-full)',
              transition: 'background 0.2s ease', position: 'relative'
            }}
          >
            <SiGmail size={20} style={{ minWidth: '20px' }} />
            <span style={{ whiteSpace: 'nowrap' }}>deepanshu.infosec@gmail.com</span>
            <div style={{ width: '16px', height: '16px', marginLeft: 'var(--space-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {copied ? <Check size={16} color="var(--color-success)" /> : <Copy size={16} style={{ color: 'var(--color-text-muted)' }} />}
            </div>
          </button>
          
          <a 
            href="https://linkedin.com/in/su6osec" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass"
            style={{ 
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)', 
              padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-full)',
              transition: 'background 0.2s ease'
            }}
          >
            <FaLinkedin size={20} />
            <span>LinkedIn</span>
            <ExternalLink size={16} style={{ marginLeft: 'var(--space-1)', color: 'var(--color-text-muted)' }} />
          </a>
          
          <a 
            href="https://github.com/su6osec" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass"
            style={{ 
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)', 
              padding: 'var(--space-3) var(--space-5)', borderRadius: 'var(--radius-full)',
              transition: 'background 0.2s ease'
            }}
          >
            <FaGithub size={20} />
            <span>GitHub</span>
            <ExternalLink size={16} style={{ marginLeft: 'var(--space-1)', color: 'var(--color-text-muted)' }} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
