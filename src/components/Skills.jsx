import React from 'react';
import { motion } from 'framer-motion';

const topRowSkills = [
  'Penetration Testing', 'Web App & API Security', 'Bug Bounty Hunting', 
  'OSINT', 'Vulnerability Assessment', 'Threat Detection', 'Incident Response',
  'Burp Suite Pro', 'Nmap', 'Metasploit', 'Nuclei', 'Subfinder', 'Httpx'
];

const bottomRowSkills = [
  'Microsoft Azure', 'Linux (Ubuntu/RHEL)', 'Windows Server', 'Active Directory', 
  'VMware/Hyper-V', 'TCP/IP', 'DNS', 'DHCP', 'Go (Golang)', 'Python', 
  'Bash/Shell', 'PowerShell', 'OWASP Top 10', 'MITRE ATT&CK', 'Zero Trust Architecture'
];

export default function Skills() {
  return (
    <section id="skills" style={{ 
      padding: 'var(--space-8) 0', 
      overflow: 'hidden',
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-6)', textAlign: 'center' }}>
          Technical Stack
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--space-5)', 
          position: 'relative',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}>

          {/* Top Marquee (scrolls left) */}
          <div className="marquee_track marquee-left">
            {[...topRowSkills, ...topRowSkills].map((skill, index) => (
              <div key={`top-${index}`} className="glass" style={{
                padding: 'var(--space-4) var(--space-6)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-primary)',
                fontWeight: 500,
                display: 'inline-block',
                cursor: 'default',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-surface-glass)'}
              >
                {skill}
              </div>
            ))}
          </div>

          {/* Bottom Marquee (scrolls right) */}
          <div className="marquee_track marquee-right">
            {[...bottomRowSkills, ...bottomRowSkills].map((skill, index) => (
              <div key={`bottom-${index}`} className="glass" style={{
                padding: 'var(--space-4) var(--space-6)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-primary)',
                fontWeight: 500,
                display: 'inline-block',
                cursor: 'default',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-surface-glass)'}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
