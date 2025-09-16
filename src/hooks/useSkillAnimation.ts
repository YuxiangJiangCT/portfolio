import { useState, useEffect, useRef } from 'react';

interface AnimationState {
  isVisible: boolean;
  progress: number;
  displayValue: number;
}

export const useSkillAnimation = (targetValue: number, duration: number = 1500) => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isVisible: false,
    progress: 0,
    displayValue: 0
  });

  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            setAnimationState(prev => ({ ...prev, isVisible: true }));
            startAnimation();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const startAnimation = () => {
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutQuart
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValue = targetValue * easeOutQuart;

      setAnimationState({
        isVisible: true,
        progress: easeOutQuart * 100,
        displayValue: Math.round(currentValue)
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return {
    ref: elementRef,
    ...animationState
  };
};

export const useStaggerAnimation = (
  itemsCount: number,
  baseDelay: number = 100,
  duration: number = 500
) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            animateItems();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [itemsCount]);

  const animateItems = () => {
    for (let i = 0; i < itemsCount; i++) {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, i]));
      }, i * baseDelay);
    }
  };

  const isItemVisible = (index: number) => visibleItems.has(index);

  const getItemStyle = (index: number) => ({
    opacity: isItemVisible(index) ? 1 : 0,
    transform: isItemVisible(index) ? 'translateY(0)' : 'translateY(20px)',
    transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
  });

  return {
    containerRef,
    isItemVisible,
    getItemStyle
  };
};