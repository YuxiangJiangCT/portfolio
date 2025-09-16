import { useEffect, useRef, useState } from 'react';

interface GlowEffectOptions {
  color?: string;
  intensity?: number;
  radius?: number;
  followMouse?: boolean;
  pulseAnimation?: boolean;
  gradientGlow?: boolean;
}

interface GlowPosition {
  x: number;
  y: number;
}

export const useGlowEffect = (options: GlowEffectOptions = {}) => {
  const {
    color = 'rgba(79, 70, 229, 0.4)',
    intensity = 0.4,
    radius = 20,
    followMouse = false,
    pulseAnimation = false,
    gradientGlow = false
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPosition, setGlowPosition] = useState<GlowPosition>({ x: 50, y: 50 });
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (!followMouse || !isHovered) return;

      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setGlowPosition({ x, y });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    if (followMouse) {
      element.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (followMouse) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [followMouse, isHovered]);

  useEffect(() => {
    const baseGlow = {
      position: 'absolute' as const,
      inset: 0,
      borderRadius: 'inherit',
      pointerEvents: 'none' as const,
      transition: 'opacity 0.3s ease',
      opacity: isHovered ? intensity : 0,
      zIndex: -1
    };

    if (gradientGlow) {
      setGlowStyle({
        ...baseGlow,
        background: `radial-gradient(
          circle at ${glowPosition.x}% ${glowPosition.y}%,
          ${color} 0%,
          transparent ${radius}%
        )`,
        filter: `blur(${radius}px)`,
        animation: pulseAnimation ? 'glow-pulse 2s infinite' : undefined
      });
    } else {
      setGlowStyle({
        ...baseGlow,
        boxShadow: isHovered
          ? `0 0 ${radius}px ${radius / 4}px ${color}`
          : 'none',
        animation: pulseAnimation && isHovered ? 'glow-pulse 2s infinite' : undefined
      });
    }
  }, [isHovered, glowPosition, color, intensity, radius, pulseAnimation, gradientGlow]);

  const glowProps = {
    ref: elementRef,
    style: {
      position: 'relative' as const,
      ...(!gradientGlow ? glowStyle : {})
    }
  };

  const glowOverlay = gradientGlow ? (
    <div style={glowStyle} />
  ) : null;

  return {
    glowProps,
    glowOverlay,
    isHovered
  };
};

// Preset glow effects for common use cases
export const glowPresets = {
  primary: {
    color: 'rgba(79, 70, 229, 0.4)',
    intensity: 0.4,
    radius: 20
  },
  success: {
    color: 'rgba(16, 185, 129, 0.4)',
    intensity: 0.4,
    radius: 20
  },
  error: {
    color: 'rgba(239, 68, 68, 0.4)',
    intensity: 0.4,
    radius: 20
  },
  performance: {
    color: 'rgba(16, 185, 129, 0.5)',
    intensity: 0.5,
    radius: 30,
    gradientGlow: true
  },
  tech: {
    color: 'rgba(139, 92, 246, 0.4)',
    intensity: 0.4,
    radius: 25,
    pulseAnimation: true
  },
  subtle: {
    color: 'rgba(79, 70, 229, 0.2)',
    intensity: 0.2,
    radius: 10
  },
  intense: {
    color: 'rgba(102, 126, 234, 0.6)',
    intensity: 0.6,
    radius: 40,
    gradientGlow: true
  }
} as const;