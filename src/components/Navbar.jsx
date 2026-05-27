import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import Magnetic from './Magnetic';
import LegalModal from './LegalModal';
import { PrivacyPolicyContent, TermsOfServiceContent } from './LegalContent';

const FrostedPillIcon = () => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ 
      width: 48,
      height: 32,
      borderRadius: 16,
      background: 'rgba(255,255,255,0.05)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '4px',
      border: 'none',
      backdropFilter: 'blur(8px)'
    }}
  >
    <div style={{ width: 14, height: 1.5, background: 'var(--color-text-primary)', borderRadius: 1 }} />
    <div style={{ width: 14, height: 1.5, background: 'var(--color-text-primary)', borderRadius: 1 }} />
  </motion.div>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-logo {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .nav-logo.scrolled {
          position: static;
          left: auto;
          transform: none;
        }
        @media (max-width: 768px) {
          .nav-container {
            align-items: center !important;
          }
          .nav-logo, .nav-logo.scrolled {
            position: static !important;
            transform: none !important;
            margin-top: 0 !important;
          }
        }
      `}</style>
      <nav className="nav-container" style={{
        position: 'fixed',
        top: isScrolled ? '16px' : '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: isScrolled ? 'calc(100% - 32px)' : '100%',
        maxWidth: isScrolled ? '800px' : '100%',
        zIndex: 50,
        padding: isScrolled ? '8px 16px' : '32px 40px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isScrolled ? 'rgba(20, 20, 20, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        border: isScrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        borderRadius: isScrolled ? '999px' : '0',
        boxShadow: isScrolled ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
        display: 'flex',
        alignItems: isScrolled ? 'center' : 'flex-start',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <a href="#" className={`nav-logo ${isScrolled ? 'scrolled' : ''}`} style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: 800, 
          fontFamily: 'var(--font-primary)', 
          fontSize: isScrolled ? '20px' : '24px',
          letterSpacing: '-0.04em',
          color: 'var(--color-text-primary)',
          marginTop: isScrolled ? '0' : '4px',
          textDecoration: 'none'
        }}>
          <img 
            src="/profile.jpg" 
            alt="Profile" 
            style={{ 
              width: isScrolled ? '24px' : '32px', 
              height: isScrolled ? '24px' : '32px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '2px solid rgba(255,255,255,0.1)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }} 
          />
          <span>su6osec<span style={{ color: 'var(--color-accent-primary)' }}>.</span></span>
        </a>
        
        {/* Links (Desktop) */}
        <div className="hide-mobile" style={{ 
          display: 'flex', 
          flexDirection: isScrolled ? 'row' : 'column',
          gap: isScrolled ? 'var(--space-4)' : '14px', 
          alignItems: isScrolled ? 'center' : 'flex-start',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <a href="#about" style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>About</a>
          <a href="#experience" style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>Experience</a>
          <a href="#projects" style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>Projects</a>
          <a href="#contact" style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>Contact</a>
        </div>

        {/* Button (Desktop) */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center' }}>
          <Magnetic strength={0.2}>
            <a href="/Resume.pdf" download style={{ 
              display: 'inline-flex', alignItems: 'center',
              padding: '8px 20px', 
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 500,
              background: '#fff',
              color: '#000',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Download Resume
            </a>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="show-mobile-only" style={{ display: 'flex', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            {!isMobileMenuOpen && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(true)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <FrostedPillIcon />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </nav>

      {/* Mobile Menu Dropdown & Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', justifyContent: 'center' }}>
            {/* Full-screen blurred backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(5, 5, 5, 0.6)',
                backdropFilter: 'blur(12px)',
                cursor: 'pointer'
              }}
            />

            {/* Menu Container */}
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: 'absolute',
                top: '90px', // Just below the navbar
                width: 'calc(100% - 32px)',
                maxWidth: '400px',
                background: 'rgba(20, 20, 20, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                padding: 'var(--space-5)',
                gap: 'var(--space-4)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                zIndex: 101
              }}
            >
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '18px', fontWeight: 500, textAlign: 'center' }}>About</a>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
              <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '18px', fontWeight: 500, textAlign: 'center' }}>Experience</a>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '18px', fontWeight: 500, textAlign: 'center' }}>Projects</a>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '18px', fontWeight: 500, textAlign: 'center' }}>Contact</a>
              
              <a href="/Resume.pdf" download onClick={() => setIsMobileMenuOpen(false)} style={{ 
                display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center',
                padding: '16px 20px', 
                borderRadius: '999px',
                fontSize: '16px',
                fontWeight: 600,
                background: '#fff',
                color: '#000',
                marginTop: 'var(--space-2)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <Download size={18} /> Download Resume
              </a>

              {/* Social Icons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                <a href="https://linkedin.com/in/su6osec" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', padding: '8px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                  <FaLinkedin size={22} />
                </a>
                <a href="https://github.com/su6osec" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', padding: '8px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                  <FaGithub size={22} />
                </a>
                <a href="mailto:deepanshu.infosec@gmail.com" style={{ color: 'rgba(255,255,255,0.6)', padding: '8px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                  <SiGmail size={22} />
                </a>
              </div>

              {/* Legal Links */}
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
                <span onClick={() => { setIsPrivacyOpen(true); setIsMobileMenuOpen(false); }} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>Privacy Policy</span>
                <span onClick={() => { setIsTermsOpen(true); setIsMobileMenuOpen(false); }} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>Terms of Service</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <LegalModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} title="Privacy Policy">
        <PrivacyPolicyContent />
      </LegalModal>
      
      <LegalModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} title="Terms of Service">
        <TermsOfServiceContent />
      </LegalModal>

    </>
  );
}
