import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './MouseTrailEffect.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  timestamp: number;
}

function MouseTrailEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isEnabled, setIsEnabled] = useState(() => {
    return localStorage.getItem('mouseTrailEnabled') !== 'false';
  });
  const { isDark } = useTheme();
  const particleIdCounter = useRef(0);
  const lastParticleTime = useRef(0);

  useEffect(() => {
    if (!isEnabled) return;

    const colors = isDark
      ? ['#A78BFA', '#8B5CF6', '#7C3AED', '#06B6D4', '#0EA5E9'] // Purple/Cyan for dark mode
      : ['#6366F1', '#8B5CF6', '#A855F7', '#EC4899', '#F43F5E']; // Blue/Pink for light mode

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      // Throttle particle creation (every 30ms)
      if (now - lastParticleTime.current < 30) return;
      lastParticleTime.current = now;

      const newParticle: Particle = {
        id: particleIdCounter.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 4, // 4-8px
        color: colors[Math.floor(Math.random() * colors.length)],
        timestamp: now,
      };

      setParticles(prev => {
        // Keep only last 30 particles for performance
        const updated = [...prev, newParticle];
        return updated.slice(-30);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up old particles every second
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setParticles(prev => prev.filter(p => now - p.timestamp < 1000));
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, [isEnabled, isDark]);

  // Toggle button for enabling/disabling effect
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + M to toggle mouse trail
      if (e.altKey && e.key === 'm') {
        setIsEnabled(prev => {
          const newState = !prev;
          localStorage.setItem('mouseTrailEnabled', newState.toString());
          console.log(`%c🎨 Mouse trail ${newState ? 'enabled' : 'disabled'}`, 'color: #A78BFA; font-weight: bold;');
          return newState;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="mouse-trail-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="mouse-particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}

export default MouseTrailEffect;