
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Search, Trophy, Users, Globe, Zap, Award } from 'lucide-react';

const About = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const achievements = [
    { icon: Shield, title: "CRITICAL VULNERABILITIES", value: "15+", description: "High-impact security flaws" },
    { icon: Users, title: "COMPANIES SECURED", value: "25+", description: "Fortune 500 & startups" },
    { icon: Globe, title: "GLOBAL REACH", value: "50+", description: "Countries impacted" },
    { icon: Award, title: "HALL OF FAME", value: "10+", description: "Recognition received" }
  ];

  return (
    <section id="about" className="py-20 bg-[#0a0a0a] text-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff4444' fill-opacity='0.1'%3E%3Cpath d='M20 20h20v20H20V20zm-20 0h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-red-500 uppercase">
              CRAFTING BEAUTIFUL<br />
              BRAND EXPERIENCES
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              As a passionate Security Researcher, I transform complex security challenges into comprehensive solutions. 
              My expertise spans across multiple domains of cybersecurity, helping organizations build robust defenses.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-[#111111] border border-gray-800 hover:border-red-500 transition-all duration-300"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-red-500" />
                  <h3 className="text-3xl md:text-4xl font-black mb-2 text-white">{achievement.value}</h3>
                  <h4 className="text-sm font-bold mb-2 text-red-500 uppercase tracking-wider">{achievement.title}</h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase">
                  WHEN I'M NOT DESIGNING...
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  I'm actively hunting for vulnerabilities across major platforms like HackerOne, Bugcrowd, and direct VRP programs. 
                  My focus areas include API Security, Business Logic Flaws, and Advanced Persistent Threats.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I believe in responsible disclosure and have helped secure applications used by millions of users worldwide. 
                  Every vulnerability discovery is an opportunity to make the internet safer.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  'IDOR', 'SSRF', 'SQLi', 'Broken Access Control',
                  'Business Logic', 'API Security', 'XSS', 'CSRF'
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-red-600 text-white px-4 py-2 text-center font-bold uppercase tracking-wider text-sm hover:bg-red-700 transition-colors"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Visual Elements */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4 h-96">
                <div className="bg-gradient-to-br from-red-600 to-orange-600 p-8 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                <div className="bg-[#111111] border border-gray-800 p-8 flex items-center justify-center">
                  <Target className="w-16 h-16 text-red-500" />
                </div>
                <div className="bg-[#111111] border border-gray-800 p-8 flex items-center justify-center">
                  <Search className="w-16 h-16 text-red-500" />
                </div>
                <div className="bg-gradient-to-br from-orange-600 to-red-600 p-8 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
