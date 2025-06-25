
"use client"

import { useEffect, useId, useState } from "react"

interface SparklesProps {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  background?: string;
  options?: any;
}

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
}: SparklesProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speedX: number;
    speedY: number;
  }>>([]);

  const id = useId();

  useEffect(() => {
    const particleArray = Array.from({ length: density / 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (size - (minSize || size / 2.5)) + (minSize || size / 2.5),
      opacity: Math.random() * (opacity - (minOpacity || opacity / 10)) + (minOpacity || opacity / 10),
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
    }));
    setParticles(particleArray);

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
          opacity: 0.1 + Math.sin(Date.now() * 0.001 + particle.id) * 0.5,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [density, size, minSize, speed, opacity, minOpacity]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} id={id}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            opacity: Math.max(0.1, particle.opacity),
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
}
