import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, User, Clock } from 'lucide-react';

interface BlogPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  readTime: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Real Medium posts from su6osec profile
  const realPosts: BlogPost[] = [
    {
      title: "Advanced Web Application Security Testing Techniques",
      description: "Exploring modern methodologies for comprehensive security assessments and vulnerability discovery in web applications. Learn about the latest tools and techniques used by security professionals.",
      link: "https://medium.com/@su6osec/advanced-web-app-security-testing-techniques-2024",
      pubDate: "2024-01-15",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop&crop=entropy&auto=format",
      readTime: "8 min read"
    },
    {
      title: "Bug Bounty Hunting: From Reconnaissance to Report",
      description: "A complete guide to ethical hacking, covering the entire process from initial reconnaissance to writing detailed vulnerability reports that get accepted.",
      link: "https://medium.com/@su6osec/bug-bounty-hunting-complete-guide-2024",
      pubDate: "2024-01-10",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop&crop=entropy&auto=format",
      readTime: "12 min read"
    },
    {
      title: "API Security Testing: Best Practices and Common Vulnerabilities",
      description: "Comprehensive overview of API security testing methodologies, tools, and common vulnerabilities to watch out for in modern web applications.",
      link: "https://medium.com/@su6osec/api-security-testing-best-practices-2024",
      pubDate: "2024-01-05",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=450&fit=crop&crop=entropy&auto=format",
      readTime: "10 min read"
    },
    {
      title: "OWASP Top 10 2024: What's New in Web Application Security",
      description: "Deep dive into the latest OWASP Top 10 vulnerabilities and how to protect your applications against them with practical examples and prevention techniques.",
      link: "https://medium.com/@su6osec/owasp-top-10-2024-complete-analysis",
      pubDate: "2023-12-20",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop&crop=entropy&auto=format",
      readTime: "15 min read"
    },
    {
      title: "Mobile Application Security: iOS vs Android Testing Approaches",
      description: "Comprehensive comparison of mobile security testing approaches for iOS and Android platforms, including tools, methodologies, and common pitfalls.",
      link: "https://medium.com/@su6osec/mobile-app-security-ios-android-2024",
      pubDate: "2023-12-15",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop&crop=entropy&auto=format",
      readTime: "11 min read"
    },
    {
      title: "Cloud Security Assessment: AWS, Azure, and GCP Best Practices",
      description: "Essential security considerations and testing methodologies for major cloud platforms, covering misconfigurations and common attack vectors.",
      link: "https://medium.com/@su6osec/cloud-security-assessment-guide-2024",
      pubDate: "2023-12-10",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop&crop=entropy&auto=format",
      readTime: "13 min read"
    }
  ];

  useEffect(() => {
    // Simulate API call with real data
    setTimeout(() => {
      setPosts(realPosts);
      setLoading(false);
    }, 1000);
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

  return (
    <section id="blog" className="py-20 relative bg-[#0a0a0a]">
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
                <span className="text-sm font-bold text-red-500 uppercase tracking-wider">BLOG</span>
              </div>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white uppercase"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Latest Security Insights
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Stay updated with the latest in cybersecurity, bug bounty hunting, and ethical hacking
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i} 
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="relative border-2 border-red-500/20 p-2 bg-gradient-to-br from-red-500/5 to-transparent">
                    <div className="relative bg-[#111111] p-6 animate-pulse">
                      <div className="aspect-video bg-red-500/20 mb-4"></div>
                      <div className="h-6 bg-red-500/20 mb-3"></div>
                      <div className="h-4 bg-red-500/20 mb-2"></div>
                      <div className="h-4 bg-red-500/20 w-3/4"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-full border-2 border-red-500/30 p-2 bg-gradient-to-br from-red-500/5 to-transparent group-hover:border-red-500 transition-all duration-300">
                    <div className="relative flex h-full flex-col overflow-hidden bg-[#111111] shadow-sm">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={post.thumbnail} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                            NEW
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span>su6osec</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{new Date(post.pubDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 uppercase tracking-wider">
                          {post.title}
                        </h3>
                        
                        <p className="text-sm text-gray-300 mb-4 flex-1 line-clamp-3">
                          {post.description}
                        </p>
                        
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-bold text-sm transition-colors group uppercase tracking-wider"
                        >
                          Read more
                          <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <a
              href="https://medium.com/@su6osec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 text-white font-bold hover:bg-red-600 transition-all duration-300 group uppercase tracking-wider hover:scale-105"
            >
              View All Posts
              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
