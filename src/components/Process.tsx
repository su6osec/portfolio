
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, FileText } from 'lucide-react';

const Process = () => {
  const processSteps = [
    {
      step: "01",
      title: "Reconnaissance",
      description: "Comprehensive information gathering using automated tools and manual techniques to map the attack surface.",
      tools: ["subfinder", "httpx", "nuclei", "ffuf"],
      icon: Search
    },
    {
      step: "02", 
      title: "Vulnerability Assessment",
      description: "Systematic testing using industry-standard tools and custom scripts to identify security weaknesses.",
      tools: ["Burp Suite", "Custom Scripts", "API Testing", "OWASP Top 10"],
      icon: Shield
    },
    {
      step: "03",
      title: "Exploitation & PoC",
      description: "Careful exploitation of discovered vulnerabilities with proof-of-concept development for validation.",
      tools: ["Manual Testing", "Custom Payloads", "Business Logic", "Impact Analysis"],
      icon: Zap
    },
    {
      step: "04",
      title: "Documentation & Reporting",
      description: "Detailed vulnerability reports with clear reproduction steps, impact assessment, and remediation guidance.",
      tools: ["Technical Reports", "Risk Assessment", "Remediation", "Follow-up"],
      icon: FileText
    }
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="process" className="py-20 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-red-500 mb-6 uppercase tracking-wide">
              My Security Testing Process
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              A systematic approach to identifying and documenting security vulnerabilities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((process, index) => {
              const Icon = process.icon;
              return (
                <div key={index} className="relative min-h-[20rem]">
                  <div className="relative h-full bg-[#0a0a0a] border-2 border-red-500 p-6 hover:bg-red-500/5 transition-all duration-300">
                    <div className="text-center">
                      <div className="w-fit mx-auto bg-red-500 p-3 mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-red-500 font-mono text-sm mb-2 font-bold">
                        STEP {process.step}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 uppercase">
                        {process.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                      {process.description}
                    </p>

                    <div className="space-y-2">
                      <div className="text-red-500 text-sm font-bold mb-2 uppercase">
                        Tools & Techniques:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {process.tools.map((tool, toolIndex) => (
                          <motion.span
                            key={toolIndex}
                            whileHover={{ scale: 1.05 }}
                            className="bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-500 font-medium hover:bg-red-500/20 transition-all duration-300"
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-red-500 opacity-50 z-10"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Process Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 relative"
          >
            <div className="relative bg-[#0a0a0a] border-2 border-red-500 p-8 text-center">
              <h3 className="text-2xl font-bold text-red-500 mb-4 uppercase">
                Why This Process Works
              </h3>
              <p className="text-white mb-6 max-w-4xl mx-auto">
                My systematic approach ensures comprehensive coverage of potential attack vectors while maintaining 
                a professional, responsible disclosure process. Each step builds upon the previous one, creating a 
                thorough security assessment that provides maximum value to clients.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl text-red-500 font-black mb-2">100%</div>
                  <div className="text-white text-sm font-bold uppercase">Responsible Disclosure</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-red-500 font-black mb-2">48h</div>
                  <div className="text-white text-sm font-bold uppercase">Average Report Turnaround</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-red-500 font-black mb-2">95%</div>
                  <div className="text-white text-sm font-bold uppercase">Client Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
