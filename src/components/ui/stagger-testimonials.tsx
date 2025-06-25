
"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Deepanshu's security assessment helped us identify critical vulnerabilities we never knew existed. His expertise is unmatched.",
    by: "Sarah Chen, CTO at TechVault",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "Working with Deepanshu gave us confidence in our API security. His thorough testing methodology is impressive.",
    by: "Marcus Rodriguez, DevOps Lead at CloudSecure",
    imgSrc: "https://i.pravatar.cc/150?img=2"
  },
  {
    tempId: 2,
    testimonial: "Deepanshu found vulnerabilities that our internal team missed. His bug bounty reports are detailed and actionable.",
    by: "Jennifer Park, Security Manager at DataFlow",
    imgSrc: "https://i.pravatar.cc/150?img=3"
  },
  {
    tempId: 3,
    testimonial: "His penetration testing services are top-notch. Deepanshu helped us strengthen our security posture significantly.",
    by: "Ahmed Hassan, IT Director at FinanceSecure",
    imgSrc: "https://i.pravatar.cc/150?img=4"
  },
  {
    tempId: 4,
    testimonial: "Deepanshu's vulnerability research capabilities are exceptional. He discovered zero-day vulnerabilities in our system.",
    by: "Lisa Thompson, CISO at MedTech Solutions",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 5,
    testimonial: "Professional, thorough, and reliable. Deepanshu's security consulting services exceeded our expectations completely.",
    by: "David Kumar, Lead Engineer at StartupLab",
    imgSrc: "https://i.pravatar.cc/150?img=6"
  },
  {
    tempId: 6,
    testimonial: "His web application security testing is comprehensive. Deepanshu helped us fix critical security flaws.",
    by: "Rachel Green, Product Manager at WebCorp",
    imgSrc: "https://i.pravatar.cc/150?img=7"
  },
  {
    tempId: 7,
    testimonial: "Deepanshu's security expertise is evident in every report. His recommendations are practical and effective.",
    by: "Michael Chang, Security Analyst at CyberGuard",
    imgSrc: "https://i.pravatar.cc/150?img=8"
  },
  {
    tempId: 8,
    testimonial: "Outstanding security professional. Deepanshu's ethical hacking skills helped secure our infrastructure.",
    by: "Emma Wilson, Tech Lead at InnovateSoft",
    imgSrc: "https://i.pravatar.cc/150?img=9"
  },
  {
    tempId: 9,
    testimonial: "His bug bounty submissions are always high-quality. Deepanshu is a trusted security researcher.",
    by: "Carlos Martinez, Security Engineer at GlobalTech",
    imgSrc: "https://i.pravatar.cc/150?img=10"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-4 sm:p-6 md:p-8 transition-all duration-500 ease-in-out overflow-hidden",
        isCenter 
          ? "z-10 bg-red-500 text-white border-red-500" 
          : "z-0 bg-[#111111] text-white border-red-500/30 hover:border-red-500/50"
      )}
      style={{
        width: Math.min(cardSize, window.innerWidth - 40),
        height: Math.min(cardSize, window.innerWidth - 40),
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(Math.min(cardSize, window.innerWidth - 40) / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(220, 38, 38, 0.3)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-red-500/30"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-3 sm:mb-4 h-10 w-8 sm:h-14 sm:w-12 bg-gray-600 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)"
        }}
      />
      <h3 className={cn(
        "text-sm sm:text-base md:text-xl font-medium mb-2 sm:mb-4 leading-tight",
        isCenter ? "text-white" : "text-white"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 text-xs sm:text-sm italic",
        isCenter ? "text-white/90" : "text-gray-400"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardSize(Math.min(290, width - 80));
      } else if (width < 1024) {
        setCardSize(320);
      } else {
        setCardSize(365);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0a0a0a] border-2 border-red-500/20"
      style={{ height: Math.max(600, window.innerHeight * 0.6) }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center text-lg sm:text-2xl transition-colors",
            "bg-[#0a0a0a] border-2 border-red-500/30 hover:bg-red-500 hover:text-white text-red-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center text-lg sm:text-2xl transition-colors",
            "bg-[#0a0a0a] border-2 border-red-500/30 hover:bg-red-500 hover:text-white text-red-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
