import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, useInView, MotionValue } from 'framer-motion';

// Hook for tracking scroll progress
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return {
    scrollYProgress,
    scaleX,
    percentage: useTransform(scrollYProgress, [0, 1], [0, 100])
  };
};

// Hook for parallax effects
export const useParallax = (
  value: MotionValue<number>,
  distance: number = 100
) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

// Hook for animated counter
export const useAnimatedCounter = (
  endValue: number,
  duration: number = 2000,
  startOnView: boolean = true
) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView || (isInView && !hasStarted.current)) {
      hasStarted.current = true;
      const startTime = Date.now();
      const startValue = count;

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (endValue - startValue) * easeOutQuart;

        setCount(Math.floor(currentValue));

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [isInView, endValue, duration, startOnView]);

  return { count, ref };
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (
  threshold: number = 0.3,
  once: boolean = true
) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return {
    ref,
    isInView,
    hasAnimated,
    shouldAnimate: once ? hasAnimated : isInView
  };
};

// Hook for mouse parallax
export const useMouseParallax = (strength: number = 20) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return mousePosition;
};

// Hook for intersection-based reveal
export const useReveal = (
  staggerChildren: boolean = false,
  staggerDelay: number = 0.1
) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: staggerChildren
        ? {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        : {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
          }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants
  };
};

// Hook for scroll-based transforms
export const useScrollTransform = (
  inputRange: number[] = [0, 1],
  outputRange: any[] = [0, 100]
) => {
  const { scrollY } = useScroll();
  const transform = useTransform(scrollY, inputRange, outputRange);

  return transform;
};

// Hook for element dimensions with resize observer
export const useElementDimensions = () => {
  const ref = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  return { ref, dimensions };
};

// Hook for scroll direction detection
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
};