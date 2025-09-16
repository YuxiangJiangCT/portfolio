import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxWrapperProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
  opacity?: boolean;
  scale?: boolean;
  rotate?: boolean;
}

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  offset = 50,
  className = '',
  speed = 0.5,
  direction = 'up',
  opacity = false,
  scale = false,
  rotate = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yRange = direction === 'up' ? [offset, -offset] : [-offset, offset];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  const opacityRange = opacity ? useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]) : undefined;
  const scaleRange = scale ? useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]) : undefined;
  const rotateRange = rotate ? useTransform(scrollYProgress, [0, 1], [-5, 5]) : undefined;

  return (
    <motion.div
      ref={ref}
      style={{
        y: useTransform(y, (value) => value * speed),
        opacity: opacityRange,
        scale: scaleRange,
        rotate: rotateRange
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Specialized parallax for background layers
export const ParallaxLayer: React.FC<{
  children: ReactNode;
  speed?: number;
  className?: string;
  zIndex?: number;
}> = ({ children, speed = 0.5, className = '', zIndex = -1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${100 * speed}%`]);

  return (
    <motion.div
      ref={ref}
      style={{ y, zIndex }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Parallax text effect
export const ParallaxText: React.FC<{
  children: string;
  baseVelocity?: number;
  className?: string;
}> = ({ children, baseVelocity = 100, className = '' }) => {
  const baseX = useTransform(useScroll().scrollY, (value) => `${value * baseVelocity}px`);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className={`inline-block ${className}`} style={{ x: baseX }}>
        <span className="mr-10">{children}</span>
        <span className="mr-10">{children}</span>
        <span className="mr-10">{children}</span>
        <span className="mr-10">{children}</span>
      </motion.div>
    </div>
  );
};

// Parallax image with zoom effect
export const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  zoomOnScroll?: boolean;
}> = ({ src, alt, className = '', zoomOnScroll = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = zoomOnScroll
    ? useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2])
    : 1;

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{ scale }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y }}
      />
    </motion.div>
  );
};

export default ParallaxWrapper;