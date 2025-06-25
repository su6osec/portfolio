
import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export const firstColumn: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Security Lead",
    company: "TechCorp",
    content: "Outstanding security researcher! Their detailed vulnerability reports helped us secure our platform before any incidents occurred.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Mike Chen",
    role: "CISO",
    company: "DataSecure Inc",
    content: "Professional, ethical, and thorough. The security assessment provided actionable insights that strengthened our entire infrastructure.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Emily Rodriguez",
    role: "DevSecOps Engineer",
    company: "CloudTech",
    content: "Exceptional work on our bug bounty program. Found critical vulnerabilities that our internal team missed. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

export const secondColumn: Testimonial[] = [
  {
    name: "David Park",
    role: "Security Architect",
    company: "FinanceGuard",
    content: "Impressed by the depth of analysis and clear communication. The security recommendations were practical and easy to implement.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Lisa Wang",
    role: "Product Security Manager",
    company: "StartupXYZ",
    content: "Quick response time and detailed explanations. Helped us understand the vulnerabilities and prioritize fixes effectively.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "James Wilson",
    role: "IT Director",
    company: "Enterprise Solutions",
    content: "Professional approach to responsible disclosure. The security audit provided valuable insights into our application's weaknesses.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

export const thirdColumn: Testimonial[] = [
  {
    name: "Anna Thompson",
    role: "Security Consultant",
    company: "CyberDefense Pro",
    content: "Excellent technical skills combined with clear reporting. The vulnerability assessment was comprehensive and well-documented.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Robert Kim",
    role: "Lead Developer",
    company: "WebSecure",
    content: "Thorough testing methodology and professional communication. Helped us implement security best practices across our platform.",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Maria Garcia",
    role: "Security Operations",
    company: "TechDefender",
    content: "Outstanding bug bounty researcher. Found multiple high-severity issues and provided clear steps for remediation.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  }
];

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  duration: number;
}

export const TestimonialsColumn: React.FC<TestimonialsColumnProps> = ({ testimonials, duration }) => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative w-80 overflow-hidden">
      <motion.div
        className="flex flex-col gap-4"
        animate={{
          y: [0, -50 * testimonials.length + '%']
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.name}-${index}`}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 glow-border"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
              />
              <div>
                <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-xs text-primary">{testimonial.company}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "{testimonial.content}"
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
