import React, { useState, useEffect } from 'react';
import { Home, User, Wrench, Cog, BarChart3, Shield, FolderOpen, Star, Phone, Menu, X, Github, Linkedin, Twitter, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { name: 'Home', url: 'hero', icon: Home },
    { name: 'About', url: 'about', icon: User },
    { name: 'Skills', url: 'skills', icon: Wrench },
    { name: 'Process', url: 'process', icon: Cog },
    { name: 'Stats', url: 'stats', icon: BarChart3 },
    { name: 'Bounty', url: 'bug-bounty', icon: Shield },
    { name: 'Projects', url: 'projects', icon: FolderOpen },
    { name: 'Blog', url: 'blog', icon: BookOpen },
    { name: 'Reviews', url: 'testimonials', icon: Star },
    { name: 'Contact', url: 'contact', icon: Phone }
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/su6osec', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/su6osec', icon: Linkedin },
    { name: 'Twitter', url: 'https://x.com/su6osec', icon: Twitter }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.url));
      const scrollPosition = window.scrollY + 200; // Increased offset for better detection

      // If we're at the very top, ensure hero is active
      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].url);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.div 
        className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-red-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <motion.button 
              onClick={scrollToTop}
              className="text-2xl font-black cursor-pointer hover:scale-105 transition-all duration-300 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              DEEPANSHU CHAUHAN
            </motion.button>
            
            <div className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.url)}
                  className={`text-xs font-semibold transition-all duration-300 uppercase tracking-wider relative group ${
                    activeSection === item.url ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                    activeSection === item.url ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div 
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-red-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between p-4">
          <motion.button 
            onClick={scrollToTop}
            className="text-lg font-black cursor-pointer text-white"
            whileTap={{ scale: 0.95 }}
          >
            DEEPANSHU CHAUHAN
          </motion.button>
          
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-red-500/10 border border-red-500 hover:bg-red-500/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed right-0 top-0 h-full w-80 bg-[#0a0a0a] border-l border-red-500 shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-black text-white uppercase tracking-wider">Navigation</h2>
                </div>

                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => scrollToSection(item.url)}
                        className={`w-full flex items-center gap-4 p-3 border transition-all duration-300 group ${
                          activeSection === item.url 
                            ? 'bg-red-500/20 border-red-500/60' 
                            : 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40'
                        }`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-8 h-8 border flex items-center justify-center transition-all duration-300 ${
                          activeSection === item.url 
                            ? 'bg-red-500/30 border-red-500/50' 
                            : 'bg-red-500/10 border-red-500/30 group-hover:bg-red-500/20'
                        }`}>
                          <Icon className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="text-white font-semibold text-sm uppercase tracking-wider">{item.name}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-red-500/20">
                  <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Connect</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 flex items-center justify-center transition-all duration-300"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon className="w-4 h-4 text-red-500" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
