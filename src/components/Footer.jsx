import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { SiGmail } from 'react-icons/si';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import LegalModal from './LegalModal';
import { PrivacyPolicyContent, TermsOfServiceContent } from './LegalContent';

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <footer style={{
      background: 'linear-gradient(to bottom, transparent 0%, rgba(5,5,5,1) 150px)',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 'var(--space-9)'
    }}>
      
      {/* Floating CTA Card */}
      <div style={{ maxWidth: '1200px', margin: '0 auto var(--space-9)', padding: '0 var(--space-4)', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 50px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)',
          borderRadius: '32px',
          padding: '120px 60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '450px'
        }}>
          {/* Subtle glow behind text */}
          <div style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 1 }}></div>
          
          {/* Right side background image with a gradient fade */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            backgroundImage: 'url("https://cdn.prod.website-files.com/68b095121300aebde21ab3f4/696bbe2ad14ea13882ad2f36_Group%201413373306%20(2).webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
            zIndex: 0,
            opacity: 0.9
          }}></div>
          
          <div className="cta-content" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#fff', marginBottom: 'var(--space-6)', lineHeight: 1.2 }}>
              Secure infrastructure is more important than ever
            </h2>
            
            <Magnetic strength={0.2}>
              <a href="#contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: '8px 32px 8px 8px',
                background: 'var(--color-text-primary)',
                color: 'var(--color-surface-base)',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '18px',
                transition: 'transform 0.2s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{ 
                  background: 'var(--color-surface-base)', 
                  color: 'var(--color-text-primary)', 
                  borderRadius: '50%', 
                  padding: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <ChevronRight size={20} />
                </span>
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="footer-grid" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        padding: '0 var(--space-4)',
        marginBottom: '100px'
      }}>
        
        {/* Brand Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ 
            fontWeight: 700, 
            fontFamily: 'var(--font-primary)', 
            fontSize: '24px',
            letterSpacing: '-0.04em',
            color: 'var(--color-text-primary)'
          }}>
            su6osec<span style={{ color: 'var(--color-accent-primary)' }}>.</span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', maxWidth: '250px', lineHeight: 1.6 }}>
            Cloud & Infrastructure Engineer building a dual-track foundation in enterprise cloud operations and offensive security.
          </p>
        </div>

        {/* Links Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h4 style={{ color: 'var(--color-text-primary)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-2)' }}>
            Company
          </h4>
          <a href="#about" style={{ color: 'var(--color-text-secondary)', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>About</a>
          <a href="#experience" style={{ color: 'var(--color-text-secondary)', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Experience</a>
          <a href="#projects" style={{ color: 'var(--color-text-secondary)', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Projects</a>
        </div>

        {/* Legal Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h4 style={{ color: 'var(--color-text-primary)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-2)' }}>
            Legal
          </h4>
          <a href="/Resume.pdf" download style={{ color: 'var(--color-text-secondary)', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Download Resume</a>
          <span role="button" onClick={() => setIsPrivacyOpen(true)} style={{ color: 'var(--color-text-secondary)', fontSize: '14px', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Privacy Policy</span>
          <span role="button" onClick={() => setIsTermsOpen(true)} style={{ color: 'var(--color-text-secondary)', fontSize: '14px', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Terms of Service</span>
        </div>

        {/* Social Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h4 style={{ color: 'var(--color-text-primary)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-2)' }}>
            Connect
          </h4>
          <div className="social-links-container">
            <a href="https://linkedin.com/in/su6osec" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              <FaLinkedin size={18} /> <span className="social-text">LinkedIn</span>
            </a>
            <a href="https://github.com/su6osec" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              <FaGithub size={18} /> <span className="social-text">GitHub</span>
            </a>
            <a href="mailto:deepanshu.infosec@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              <SiGmail size={18} /> <span className="social-text">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Shining Hover Text Section */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          marginTop: '60px',
          marginBottom: '-15px', // Shift down slightly to hide just the bottom edge
          zIndex: 0,
          cursor: 'default',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        
        {/* Background glowing orbs reflecting screenshot */}
        <div style={{
          position: 'absolute',
          bottom: '-600px',
          left: '-600px',
          width: '1200px',
          height: '1200px',
          background: 'radial-gradient(circle, rgba(110, 231, 255, 0.35) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-500px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-600px',
          right: '-600px',
          width: '1200px',
          height: '1200px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}></div>

        {/* Base dark text (Desktop) */}
        <h1 className="hide-mobile" style={{
          fontSize: 'clamp(80px, 25vw, 300px)',
          fontWeight: 800,
          margin: 0,
          lineHeight: 0.8,
          letterSpacing: '-0.04em',
          color: 'rgba(255, 255, 255, 0.03)',
          userSelect: 'none',
          textAlign: 'center',
          width: '100%'
        }}>
          su6osec
        </h1>

        {/* Base dark text (Mobile - brighter & shifted upwards) */}
        <h1 className="show-mobile-only" style={{
          fontSize: 'clamp(80px, 25vw, 300px)',
          fontWeight: 800,
          margin: 0,
          lineHeight: 0.8,
          letterSpacing: '-0.04em',
          color: 'rgba(255, 255, 255, 0.07)',
          userSelect: 'none',
          textAlign: 'center',
          width: '100%',
          justifyContent: 'center',
          transform: 'translateY(-20px)'
        }}>
          su6osec
        </h1>

        {/* Faint white dish tracking the cursor */}
        <div className="hide-mobile" style={{
          position: 'absolute',
          top: '-200px',
          left: '-200px',
          right: '-200px',
          bottom: '-200px',
          pointerEvents: 'none',
          background: `radial-gradient(circle 250px at ${mousePos.x + 200}px ${mousePos.y + 200}px, rgba(255,255,255,0.04) 0%, transparent 100%)`,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1
        }}></div>

        {/* Shiny reveal mask overlay (Border Only) */}
        <h1 className="hide-mobile" style={{
          fontSize: 'clamp(80px, 25vw, 300px)',
          fontWeight: 800,
          margin: 0,
          lineHeight: 0.8,
          letterSpacing: '-0.04em',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          pointerEvents: 'none',
          userSelect: 'none',
          textAlign: 'center',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.8)',
          WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 20%, transparent 100%)`,
          maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 20%, transparent 100%)`,
          opacity: isHovering ? 0.9 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 2
        }}>
          su6osec
        </h1>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      <LegalModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} title="Privacy Policy">
        <PrivacyPolicyContent />
      </LegalModal>
      
      <LegalModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} title="Terms of Service">
        <TermsOfServiceContent />
      </LegalModal>

    </footer>
  );
}
