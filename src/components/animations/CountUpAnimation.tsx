import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

interface CountUpAnimationProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  once?: boolean;
  format?: (value: number) => string;
}

const CountUpAnimation: React.FC<CountUpAnimationProps> = ({
  value,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  once = true,
  format
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    duration: duration * 1000
  });

  const display = useTransform(spring, (current) => {
    if (format) {
      return format(current);
    }

    // Handle formatting
    let formatted: string;
    if (decimals > 0) {
      formatted = current.toFixed(decimals);
    } else {
      formatted = Math.floor(current).toString();
    }

    // Add thousand separators
    if (current >= 1000) {
      const parts = formatted.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      formatted = parts.join('.');
    }

    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    } else if (!once) {
      spring.set(0);
    }
  }, [isInView, spring, value, once]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
};

// Specialized version for percentage
export const PercentageCounter: React.FC<Omit<CountUpAnimationProps, 'suffix'>> = (props) => {
  return <CountUpAnimation {...props} suffix="%" decimals={0} />;
};

// Specialized version for metrics like "70% reduction"
export const MetricCounter: React.FC<{
  value: number;
  label: string;
  className?: string;
  once?: boolean;
}> = ({ value, label, className = '', once = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  const display = useTransform(spring, (current) => Math.floor(current));

  return (
    <div ref={ref} className={className}>
      <motion.span className="font-bold text-2xl">
        {display}
      </motion.span>
      <span className="ml-1">{label}</span>
    </div>
  );
};

export default CountUpAnimation;