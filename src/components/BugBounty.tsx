
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Shield, Target, Bug, Award, TrendingUp, Users, Globe, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const BugBounty = () => {
  const achievements = [
    {
      icon: Target,
      title: "CRITICAL VULNERABILITIES",
      value: "15+",
      description: "High-impact security flaws discovered"
    },
    {
      icon: Bug,
      title: "TOTAL SUBMISSIONS",
      value: "50+",
      description: "Responsible disclosures made"
    },
    {
      icon: Award,
      title: "BOUNTY PROGRAMS",
      value: "25+",
      description: "Active across major platforms"
    },
    {
      icon: Users,
      title: "HALL OF FAME",
      value: "10+",
      description: "Recognition from top companies"
    }
  ];

  const platforms = [
    { name: "HackerOne", status: "Active", vulnerabilities: 12 },
    { name: "Bugcrowd", status: "Active", vulnerabilities: 8 },
    { name: "Synack", status: "Active", vulnerabilities: 6 },
    { name: "Google VRP", status: "Active", vulnerabilities: 15 },
    { name: "Microsoft MSRC", status: "Active", vulnerabilities: 5 },
    { name: "Meta Bug Bounty", status: "Active", vulnerabilities: 4 }
  ];

  const vulnerabilityData = [
    { month: 'Jan', count: 2, critical: 1, high: 1, medium: 0 },
    { month: 'Feb', count: 4, critical: 2, high: 1, medium: 1 },
    { month: 'Mar', count: 3, critical: 1, high: 2, medium: 0 },
    { month: 'Apr', count: 6, critical: 3, high: 2, medium: 1 },
    { month: 'May', count: 8, critical: 4, high: 3, medium: 1 },
    { month: 'Jun', count: 12, critical: 6, high: 4, medium: 2 }
  ];

  return (
    <section id="bug-bounty" className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff4444' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-red-500 uppercase tracking-tight">
            WORKING REMOTELY OUT OF<br />
            CHENNAI, INDIA
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Actively contributing to cybersecurity by discovering and responsibly disclosing vulnerabilities
            across major platforms and Fortune 500 companies.
          </p>
        </motion.div>

        {/* Visual Elements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          <div className="bg-gradient-to-br from-red-600 to-orange-600 aspect-square flex items-center justify-center">
            <Shield className="w-16 h-16 text-white" />
          </div>
          <div className="bg-[#111111] border border-gray-800 aspect-square flex flex-col items-center justify-center p-4">
            <Target className="w-12 h-12 text-red-500 mb-2" />
            <span className="text-2xl font-black text-white">15+</span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">Critical</span>
          </div>
          <div className="bg-[#111111] border border-gray-800 aspect-square flex flex-col items-center justify-center p-4">
            <Bug className="w-12 h-12 text-red-500 mb-2" />
            <span className="text-2xl font-black text-white">50+</span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">Total</span>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-red-600 aspect-square flex items-center justify-center">
            <Award className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 bg-[#111111] border border-gray-800 hover:border-red-500 transition-all duration-300"
            >
              <achievement.icon className="w-12 h-12 mx-auto mb-6 text-red-500" />
              <h3 className="text-4xl font-black mb-4 text-white">{achievement.value}</h3>
              <h4 className="text-sm font-bold mb-3 text-red-500 uppercase tracking-wider">{achievement.title}</h4>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
              "I'VE ALWAYS BEEN INTRIGUED BY THE<br />
              IDEA OF HOW <span className="text-red-500">YOUNG DESIGNERS CAN</span><br />
              REALLY MAKE PEOPLE GIVE A DAMN."
            </h3>
            <div className="w-16 h-1 bg-red-500 mx-auto"></div>
          </div>
        </motion.div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] border border-gray-800 p-8"
          >
            <h3 className="text-2xl font-black mb-8 text-white uppercase tracking-wider">VULNERABILITY DISCOVERY</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vulnerabilityData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <Bar dataKey="critical" stackId="a" fill="#DC2626" />
                  <Bar dataKey="high" stackId="a" fill="#EA580C" />
                  <Bar dataKey="medium" stackId="a" fill="#D97706" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] border border-gray-800 p-8"
          >
            <h3 className="text-2xl font-black mb-8 text-white uppercase tracking-wider">ACTIVE PLATFORMS</h3>
            <div className="space-y-4">
              {platforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-gray-800">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-red-500" />
                    <span className="font-bold text-white uppercase tracking-wider">{platform.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-400">{platform.vulnerabilities} found</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BugBounty;
