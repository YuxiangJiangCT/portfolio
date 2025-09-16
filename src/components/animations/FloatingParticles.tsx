import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  particleClassName?: string;
  minSize?: number;
  maxSize?: number;
  color?: string;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 30,
  className = '',
  particleClassName = '',
  minSize = 2,
  maxSize = 6,
  color = 'rgba(129, 140, 248, 0.3)'
}) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3
    }));
  }, [count, minSize, maxSize]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particleClassName}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: particle.opacity
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Performance-optimized version using CSS animations
export const CSSFloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 20,
  className = '',
  minSize = 2,
  maxSize = 6,
  color = 'rgba(129, 140, 248, 0.2)'
}) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1
    }));
  }, [count, minSize, maxSize]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: particle.opacity,
            animation: `float-particle ${particle.duration}s ${particle.delay}s ease-in-out infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) scale(0.95);
          }
          75% {
            transform: translateY(-30px) translateX(5px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;