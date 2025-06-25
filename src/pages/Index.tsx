
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { ArtificialHero } from '../components/ui/artificial-hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Process from '../components/Process';
import Stats from '../components/Stats';
import BugBounty from '../components/BugBounty';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-red-600 text-white shadow-lg transition-all duration-300 flex items-center justify-center hover:bg-red-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />
      <ArtificialHero />
      <div className="relative">
        <About />
        <Skills />
        <Process />
        <Stats />
        <div id="bug-bounty">
          <BugBounty />
        </div>
        <Projects />
        <Blog />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
