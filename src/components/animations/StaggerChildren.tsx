import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const StaggerChildren: React.FC<StaggerChildrenProps> = ({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  className = '',
  once = true,
  threshold = 0.2
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const containerVariants: Variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger item component to be used as children
export const StaggerItem: React.FC<{
  children: ReactNode;
  className?: string;
  index?: number;
}> = ({ children, className = '', index = 0 }) => {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      custom={index}
    >
      {children}
    </motion.div>
  );
};

// Specialized version for lists
export const StaggerList: React.FC<{
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  once?: boolean;
}> = ({ items, className = '', itemClassName = '', staggerDelay = 0.1, once = true }) => {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <motion.ul
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className={itemClassName}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default StaggerChildren;