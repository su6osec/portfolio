
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Bug, Award, TrendingUp, Users, Globe, Zap, Calendar, Building, CheckCircle, Brain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

const Stats = () => {
  const stats = [
    {
      number: "50+",
      label: "Critical Vulnerabilities",
      description: "Successfully identified and reported",
      icon: Bug,
    },
    {
      number: "10+",
      label: "Companies Secured",
      description: "Including Fortune 500 organizations",
      icon: Building,
    },
    {
      number: "95%",
      label: "Success Rate",
      description: "Vulnerabilities accepted by programs",
      icon: CheckCircle,
    },
    {
      number: "24/7",
      label: "Security Mindset",
      description: "Always learning and researching",
      icon: Brain,
    },
    {
      number: "3+",
      label: "Years Experience",
      description: "In cybersecurity and bug bounty",
      icon: Calendar,
    },
    {
      number: "100%",
      label: "Responsible Disclosure",
      description: "Ethical and professional approach",
      icon: Shield,
    }
  ];

  const platforms = [
    { name: "HackerOne", status: "Active", reports: "25+" },
    { name: "Bugcrowd", status: "Active", reports: "15+" },
    { name: "Intigriti", status: "Active", reports: "10+" },
    { name: "Private Programs", status: "Invited", reports: "8+" }
  ];

  const vulnerabilityData = [
    { month: 'Jan', xss: 2, sqli: 1, csrf: 1, idor: 3, rce: 0, authBypass: 1 },
    { month: 'Feb', xss: 4, sqli: 2, csrf: 2, idor: 2, rce: 1, authBypass: 2 },
    { month: 'Mar', xss: 3, sqli: 1, csrf: 3, idor: 4, rce: 1, authBypass: 1 },
    { month: 'Apr', xss: 6, sqli: 3, csrf: 2, idor: 5, rce: 2, authBypass: 3 },
    { month: 'May', xss: 8, sqli: 4, csrf: 4, idor: 6, rce: 2, authBypass: 4 },
    { month: 'Jun', xss: 12, sqli: 5, csrf: 6, idor: 8, rce: 3, authBypass: 5 },
    { month: 'Jul', xss: 15, sqli: 6, csrf: 7, idor: 10, rce: 4, authBypass: 6 },
    { month: 'Aug', xss: 10, sqli: 4, csrf: 5, idor: 7, rce: 3, authBypass: 4 },
    { month: 'Sep', xss: 14, sqli: 7, csrf: 8, idor: 9, rce: 5, authBypass: 7 },
    { month: 'Oct', xss: 18, sqli: 8, csrf: 9, idor: 12, rce: 6, authBypass: 8 },
    { month: 'Nov', xss: 16, sqli: 6, csrf: 7, idor: 10, rce: 4, authBypass: 6 },
    { month: 'Dec', xss: 20, sqli: 9, csrf: 10, idor: 15, rce: 7, authBypass: 9 }
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
    <section id="stats" className="py-20 bg-[#0a0a0a] relative">
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
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-red-500 uppercase tracking-wide">
              Security Research Impact
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Numbers that showcase my commitment to cybersecurity excellence
            </p>
          </motion.div>

          {/* Main Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <div className="bg-[#0a0a0a] border-2 border-red-500 p-6 text-center hover:bg-red-500/5 transition-all duration-300">
                    <div className="mb-4">
                      <IconComponent className="w-12 h-12 mx-auto text-red-500" />
                    </div>
                    <div className="text-4xl font-black mb-2 text-red-500">
                      {stat.number}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 uppercase">
                      {stat.label}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Platform Status */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0a0a0a] border-2 border-red-500 p-8 mb-12"
          >
            <h3 className="text-2xl font-bold text-red-500 mb-6 text-center uppercase tracking-wide">
              Bug Bounty Platform Status
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform, index) => (
                <div key={index} className="text-center">
                  <div className="bg-red-500/10 border border-red-500/30 p-4">
                    <h4 className="text-red-500 font-bold mb-2 uppercase">
                      {platform.name}
                    </h4>
                    <div className="text-white text-sm mb-1 font-bold">
                      Status: {platform.status}
                    </div>
                    <div className="text-gray-300 text-sm">
                      Reports: {platform.reports}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Vulnerability Chart */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0a0a0a] border-2 border-red-500 p-8 mb-12"
          >
            <h3 className="text-2xl font-bold text-red-500 mb-6 text-center uppercase tracking-wide">
              Vulnerabilities Discovered by Type
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vulnerabilityData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#ffffff', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#ffffff', fontSize: 12 }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="xss" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="XSS"
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sqli" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    name="SQL Injection"
                    dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="csrf" 
                    stroke="#eab308" 
                    strokeWidth={2}
                    name="CSRF"
                    dot={{ fill: '#eab308', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="idor" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    name="IDOR"
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rce" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="RCE"
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="authBypass" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    name="Auth Bypass"
                    dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Terminal Output */}
          <motion.div
            variants={itemVariants}
            className="bg-[#0a0a0a] border-2 border-red-500 p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-4">security-stats.sh</span>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div className="text-red-500">su6osec@portfolio:~$ cat security_impact.log</div>
              <div className="text-white">
                [INFO] Total vulnerabilities reported: 50+<br/>
                [INFO] Critical/High severity findings: 35+<br/>
                [INFO] Companies secured: Apple, FYERS, Dapper Labs, Dukaan<br/>
                [INFO] Average response time: 48 hours<br/>
                [INFO] Responsible disclosure rate: 100%<br/>
                <span className="text-red-500">[SUCCESS]</span> Making the internet safer, one vulnerability at a time
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
