import { ReactNode, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInWhenVisibleProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.3,
  className = '',
  once = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold
  });
  const controls = useAnimation();

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 60 };
      case 'down':
        return { y: -60 };
      case 'left':
        return { x: -60 };
      case 'right':
        return { x: 60 };
      case 'none':
      default:
        return {};
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition()
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;