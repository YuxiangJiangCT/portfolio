import { useEffect, useState, useRef } from 'react';
import { TrendingUp, TrendingDown, Activity, Target, Clock, Shield, Database } from 'lucide-react';

interface MetricCardProps {
  metric: string;
  isVisible?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, isVisible = false }) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [isAnimating, setIsAnimating] = useState(false);
  const hasAnimatedRef = useRef(false);

  // Parse metric to extract number and type
  const parseMetric = (metricStr: string) => {
    const hasPercentage = metricStr.includes('%');
    const hasX = metricStr.includes('x');
    const hasPlus = metricStr.includes('+');
    const hasMs = metricStr.includes('ms');
    const hasMinute = metricStr.includes('minute');

    // Extract number
    const numberMatch = metricStr.match(/[\d,\.]+/);
    const number = numberMatch ? parseFloat(numberMatch[0].replace(',', '')) : 0;

    // Determine type and color
    let type = 'neutral';
    let color = 'text-blue-600 dark:text-blue-400';
    let icon = <Activity className="w-4 h-4" />;

    if (hasPercentage || hasX) {
      if (metricStr.includes('reduction') || metricStr.includes('improvement')) {
        type = 'improvement';
        color = 'text-green-600 dark:text-green-400';
        icon = <TrendingUp className="w-4 h-4" />;
      } else if (metricStr.includes('uptime')) {
        type = 'reliability';
        color = 'text-green-600 dark:text-green-400';
        icon = <Shield className="w-4 h-4" />;
      }
    } else if (hasMs || metricStr.includes('response')) {
      type = 'performance';
      color = 'text-purple-600 dark:text-purple-400';
      icon = <Clock className="w-4 h-4" />;
    } else if (hasPlus || metricStr.includes('pools')) {
      type = 'scale';
      color = 'text-indigo-600 dark:text-indigo-400';
      icon = <Database className="w-4 h-4" />;
    } else if (metricStr.includes('Zero')) {
      type = 'security';
      color = 'text-green-600 dark:text-green-400';
      icon = <Shield className="w-4 h-4" />;
    } else if (metricStr.includes('tracking') || metricStr.includes('alerts')) {
      type = 'monitoring';
      color = 'text-blue-600 dark:text-blue-400';
      icon = <Target className="w-4 h-4" />;
    }

    return {
      number,
      suffix: metricStr.replace(/^[\d,\.]+/, '').trim(),
      prefix: metricStr.match(/^[^\d]*/) ? metricStr.match(/^[^\d]*/)?.[0] : '',
      type,
      color,
      icon,
      hasNumber: numberMatch !== null
    };
  };

  const metricData = parseMetric(metric);

  // Animate number counting
  useEffect(() => {
    if (isVisible && !hasAnimatedRef.current && metricData.hasNumber) {
      hasAnimatedRef.current = true;
      setIsAnimating(true);

      const duration = 1500; // 1.5 seconds
      const steps = 60;
      const increment = metricData.number / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(increment * step, metricData.number);

        // Format display value
        if (metricData.number >= 1000) {
          setDisplayValue(current.toLocaleString('en-US', { maximumFractionDigits: 0 }));
        } else if (metricData.number < 10) {
          setDisplayValue(current.toFixed(1));
        } else {
          setDisplayValue(Math.floor(current).toString());
        }

        if (step >= steps) {
          clearInterval(timer);
          setIsAnimating(false);
          // Set final value
          if (metricData.number >= 1000) {
            setDisplayValue(metricData.number.toLocaleString('en-US', { maximumFractionDigits: 0 }));
          } else if (metricData.number < 10) {
            setDisplayValue(metricData.number.toFixed(1));
          } else {
            setDisplayValue(Math.floor(metricData.number).toString());
          }
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else if (!metricData.hasNumber) {
      setDisplayValue(metric);
    }
  }, [isVisible, metricData]);

  return (
    <div className={`
      flex items-center gap-2 px-3 py-2 rounded-lg
      bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border
      ${isAnimating ? 'scale-105' : 'scale-100'}
      transition-all duration-300
    `}>
      <span className={metricData.color}>
        {metricData.icon}
      </span>
      <span className={`text-sm font-medium ${metricData.color}`}>
        {metricData.hasNumber ? (
          <>
            {metricData.prefix}
            <span className="font-mono">
              {displayValue}
            </span>
            {metricData.suffix}
          </>
        ) : (
          metric
        )}
      </span>
    </div>
  );
};

export default MetricCard;