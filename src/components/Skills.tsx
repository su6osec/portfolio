
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Code, 
  Globe, 
  BookOpen,
  Terminal,
  Database,
  Cloud,
  GraduationCap
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Security Tools',
      icon: Shield,
      skills: ['Burp Suite', 'ffuf', 'httpx', 'nuclei', 'subfinder', 'Zeep']
    },
    {
      title: 'Programming',
      icon: Code,
      skills: ['Python', 'JavaScript', 'Bash', 'SQL', 'Go', 'PHP']
    },
    {
      title: 'Platforms',
      icon: Cloud,
      skills: ['macOS', 'Linux', 'Docker', 'AWS', 'GCP', 'Azure']
    },
    {
      title: 'Learning',
      icon: GraduationCap,
      skills: ['HTB Academy', 'PortSwigger Labs', 'TryHackMe', 'VulnHub']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  return (
    <section id="skills" className="py-20 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-black text-center mb-12 text-red-500 uppercase tracking-wide"
          >
            SKILLS & TOOLS
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div key={categoryIndex} className="relative min-h-[20rem]">
                  <div className="relative h-full bg-[#0a0a0a] border-2 border-red-500 p-6 hover:bg-red-500/5 transition-all duration-300">
                    <div className="text-center">
                      <div className="w-fit mx-auto bg-red-500 p-3 mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-red-500 uppercase tracking-wider mb-6">
                        {category.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-3 flex-1">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-red-500/10 border border-red-500/30 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-500/20 hover:text-red-500 transition-all duration-300"
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 relative"
          >
            <div className="relative bg-[#0a0a0a] border-2 border-red-500 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">skills-overview.sh</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-red-500">deepanshu@security:~$ cat expertise.txt</div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white space-y-1"
                >
                  <div>[+] Web Application Security Testing</div>
                  <div>[+] API Security Assessment</div>
                  <div>[+] Network Penetration Testing</div>
                  <div>[+] Source Code Review</div>
                  <div>[+] Vulnerability Research</div>
                  <div>[+] Social Engineering Testing</div>
                  <div className="text-red-500">[SUCCESS] All systems operational</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
