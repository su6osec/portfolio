
import React from 'react';
import { motion } from 'framer-motion';
import { ParticleButton } from './ui/particle-button';
import { Badge } from './ui/badge';
import { Shield, Globe, Code, Award, Download } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: Shield,
      title: "Security Research",
      description: "Advanced vulnerability discovery and analysis.",
    },
    {
      icon: Globe,
      title: "API Testing", 
      description: "Comprehensive API security assessments.",
    },
    {
      icon: Code,
      title: "Bug Bounty",
      description: "Active researcher on major platforms.",
    },
    {
      icon: Award,
      title: "Consulting",
      description: "Professional security consulting services.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section id="hero" className="min-h-screen w-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden pt-24 md:pt-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-red-600/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff4444' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="w-full max-w-6xl space-y-8 md:space-y-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-6 md:space-y-8"
        >
          {/* Profile Image - Card Shape */}
          <motion.div
            variants={imageVariants}
            className="relative mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur-lg opacity-50"></div>
              <div className="relative w-48 h-64 md:w-64 md:h-80 border-4 border-red-500 rounded-2xl mx-auto overflow-hidden shadow-2xl bg-gradient-to-b from-gray-900 to-black">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face"
                  alt="Deepanshu Chauhan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-red-500/30"
                  >
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Deepanshu Chauhan</h3>
                    <p className="text-red-400 text-xs">Cybersecurity Specialist</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="space-y-4 md:space-y-6 flex items-center justify-center flex-col"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight max-w-4xl text-white uppercase leading-none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              DEEPANSHU CHAUHAN
            </motion.h1>
            <motion.h2 
              className="text-xl md:text-3xl lg:text-4xl font-bold text-red-500 max-w-3xl uppercase tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              CYBERSECURITY SPECIALIST<br />
              & ETHICAL HACKER
            </motion.h2>
            <motion.h3 
              className="text-lg md:text-2xl lg:text-3xl font-bold text-white max-w-3xl uppercase tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              VULNERABILITY RESEARCH<br />
              & API SECURITY TESTING
            </motion.h3>
            <motion.p 
              className="text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Security Consultant & Bug Bounty Hunter. 
              Based in Dehradun, India with 50+ vulnerabilities disclosed responsibly.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 items-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <ParticleButton 
                className="text-lg px-8 md:px-12 py-4 bg-red-600 text-white border-2 border-red-600 shadow-none hover:bg-red-700 hover:scale-105 transition-all duration-300 font-bold uppercase tracking-wider"
                onClick={() => {
                  window.open('https://drive.google.com/file/d/1dg3UMlsOwKDH8iYHJaAX5ytou8n0R53f/view?usp=sharing', '_blank');
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                DOWNLOAD RESUME
              </ParticleButton>
              <ParticleButton 
                variant="outline"
                className="text-lg px-8 md:px-12 py-4 bg-transparent text-white border-2 border-white shadow-none hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 font-bold uppercase tracking-wider"
                onClick={() => document.getElementById('bug-bounty')?.scrollIntoView({ behavior: 'smooth' })}
              >
                VIEW BUG BOUNTY
              </ParticleButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
