
import React from 'react';
import { motion } from 'framer-motion';
import { StaggerTestimonials } from './ui/stagger-testimonials';

const Testimonials = () => {
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
    <section id="testimonials" className="py-20 relative bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
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
                <span className="text-sm font-bold text-red-500 uppercase tracking-wider">TESTIMONIALS</span>
              </div>
            </motion.div>
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 text-white uppercase"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              What Security Teams Say
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Trusted by security professionals and companies worldwide
            </motion.p>
          </motion.div>

          {/* Stagger Testimonials Component - Fixed for mobile */}
          <motion.div
            variants={itemVariants}
            className="mb-16 w-full"
          >
            <div className="w-full overflow-hidden">
              <StaggerTestimonials />
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center px-4"
          >
            <div className="bg-[#0a0a0a] border-2 border-red-500 p-6 sm:p-8 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 uppercase tracking-wider">
                Ready to Secure Your Applications?
              </h3>
              <p className="text-white mb-6 text-sm sm:text-base">
                Join these satisfied clients who trust my security expertise
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 bg-red-500 text-white font-bold uppercase tracking-wider border-2 border-red-500 hover:bg-red-600 transition-all duration-300 text-sm sm:text-base"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Security Assessment
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
