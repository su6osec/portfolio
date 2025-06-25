import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock real GitHub repositories for su6osec
  const mockRepos: GitHubRepo[] = [
    {
      name: 'api-security-scanner',
      description: 'Custom tool for automated API security testing with support for SOAP and REST endpoints. Identifies common vulnerabilities like IDOR, authentication bypass, and injection flaws.',
      html_url: 'https://github.com/su6osec/api-security-scanner',
      stargazers_count: 156,
      forks_count: 42,
      language: 'Python',
      topics: ['api-security', 'penetration-testing', 'vulnerability-scanner', 'security-tools'],
      updated_at: '2024-01-15T10:30:00Z'
    },
    {
      name: 'subdomain-enum-suite',
      description: 'Advanced subdomain discovery tool with passive and active reconnaissance capabilities. Supports DNS brute-forcing, certificate transparency logs, and web crawling.',
      html_url: 'https://github.com/su6osec/subdomain-enum-suite',
      stargazers_count: 89,
      forks_count: 23,
      language: 'Go',
      topics: ['subdomain-enumeration', 'reconnaissance', 'dns', 'security'],
      updated_at: '2024-01-10T14:20:00Z'
    },
    {
      name: 'vuln-database',
      description: 'Personal database for tracking discovered vulnerabilities and their remediation status. Includes severity classification, CVSS scoring, and automated reporting features.',
      html_url: 'https://github.com/su6osec/vuln-database',
      stargazers_count: 67,
      forks_count: 18,
      language: 'TypeScript',
      topics: ['vulnerability-management', 'security-tracking', 'cvss', 'reporting'],
      updated_at: '2024-01-08T09:15:00Z'
    },
    {
      name: 'idor-detection-framework',
      description: 'Automated framework for detecting Insecure Direct Object References in web applications. Features intelligent parameter fuzzing and access control testing.',
      html_url: 'https://github.com/su6osec/idor-detection-framework',
      stargazers_count: 203,
      forks_count: 67,
      language: 'Python',
      topics: ['idor', 'web-security', 'automation', 'penetration-testing'],
      updated_at: '2024-01-05T16:45:00Z'
    },
    {
      name: 'mobile-security-toolkit',
      description: 'Comprehensive toolkit for mobile application security testing on iOS and Android platforms. Includes static analysis, dynamic testing, and reverse engineering tools.',
      html_url: 'https://github.com/su6osec/mobile-security-toolkit',
      stargazers_count: 134,
      forks_count: 31,
      language: 'Java',
      topics: ['mobile-security', 'android', 'ios', 'reverse-engineering'],
      updated_at: '2023-12-28T11:30:00Z'
    },
    {
      name: 'cloud-security-auditor',
      description: 'Security auditing tool for AWS, Azure, and GCP environments. Automatically detects misconfigurations, exposed resources, and compliance violations.',
      html_url: 'https://github.com/su6osec/cloud-security-auditor',
      stargazers_count: 98,
      forks_count: 26,
      language: 'Python',
      topics: ['cloud-security', 'aws', 'azure', 'gcp', 'compliance'],
      updated_at: '2023-12-20T13:22:00Z'
    }
  ];

  useEffect(() => {
    // Simulate GitHub API call
    setTimeout(() => {
      setProjects(mockRepos);
      setLoading(false);
    }, 1500);
  }, []);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'Python': 'text-yellow-400',
      'Go': 'text-blue-400',
      'TypeScript': 'text-blue-300',
      'JavaScript': 'text-yellow-300',
      'Java': 'text-orange-400',
      'C++': 'text-pink-400',
    };
    return colors[language] || 'text-gray-400';
  };

  return (
    <section id="projects" className="py-20 relative bg-[#0a0a0a]">
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
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-6 py-3 border-2 border-red-500 bg-red-500/10 backdrop-blur-sm">
                <span className="text-sm font-bold text-red-500 uppercase tracking-wider">PROJECTS</span>
              </div>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white uppercase"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Projects & Tools
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Collection of security tools and applications I've developed for the cybersecurity community
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i} 
                  className="relative min-h-[20rem]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="relative h-full border-2 border-red-500/20 p-2 bg-gradient-to-br from-red-500/5 to-transparent">
                    <div className="relative flex h-full flex-col gap-6 overflow-hidden bg-[#111111] p-6 shadow-sm animate-pulse">
                      <div className="h-6 bg-red-500/20 mb-2"></div>
                      <div className="h-4 bg-red-500/20 mb-4"></div>
                      <div className="h-4 bg-red-500/20 w-3/4 mb-4"></div>
                      <div className="flex gap-2 mb-4">
                        <div className="h-6 bg-red-500/20 w-16"></div>
                        <div className="h-6 bg-red-500/20 w-16"></div>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <div className="h-10 bg-red-500/20 flex-1"></div>
                        <div className="h-10 bg-red-500/20 flex-1"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative min-h-[20rem] group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-full border-2 border-red-500/30 p-2 bg-gradient-to-br from-red-500/5 to-transparent group-hover:border-red-500 transition-all duration-300">
                    <div className="relative flex h-full flex-col gap-6 overflow-hidden bg-[#111111] p-6 shadow-sm">
                      {/* Project Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">
                            {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className={`flex items-center gap-1 ${getLanguageColor(project.language)}`}>
                              <span className="w-2 h-2 rounded-full bg-current"></span>
                              {project.language}
                            </span>
                            <span className="flex items-center gap-1 text-yellow-400">
                              <Star className="w-3 h-3" />
                              {project.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1 text-blue-400">
                              <GitFork className="w-3 h-3" />
                              {project.forks_count}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Project Description */}
                      <p className="text-gray-300 leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {/* Topics/Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.topics.slice(0, 4).map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="text-xs px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 uppercase tracking-wider"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Last Updated */}
                      <div className="text-xs text-gray-500">
                        Updated {new Date(project.updated_at).toLocaleDateString()}
                      </div>

                      {/* Project Links */}
                      <div className="flex gap-3">
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          <a
                            href={project.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <Github className="w-4 h-4" />
                            GitHub
                          </a>
                        </Button>
                        <Button
                          asChild
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold uppercase tracking-wider transition-all duration-300"
                        >
                          <a
                            href={project.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* GitHub Profile Link */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="relative border-2 border-red-500 p-2 max-w-2xl mx-auto bg-gradient-to-br from-red-500/10 to-transparent">
              <div className="relative bg-[#111111] p-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-4xl mb-4"
                  transition={{ duration: 0.3 }}
                >
                  <Github className="w-12 h-12 mx-auto text-red-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
                  More Projects on GitHub
                </h3>
                <p className="text-gray-300 mb-6">
                  Explore my complete collection of security tools, scripts, and research projects
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300"
                >
                  <a
                    href="https://github.com/su6osec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Visit GitHub Profile
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
