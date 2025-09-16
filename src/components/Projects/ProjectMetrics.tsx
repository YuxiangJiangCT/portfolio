import { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  Clock,
  Users,
  Shield,
  Zap,
  Database,
  Activity,
  CheckCircle,
  Server,
  Cpu
} from 'lucide-react';
import { ProjectMetrics as MetricsType } from '../../data/projects';

interface ProjectMetricsProps {
  metrics: MetricsType;
  isVisible?: boolean;
}

const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics, isVisible = false }) => {
  const [animatedMetrics, setAnimatedMetrics] = useState<{ [key: string]: number }>({});
  const hasAnimatedRef = useRef(false);

  const getMetricIcon = (key: string) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('latency') || lowerKey.includes('time')) return <Clock className="w-4 h-4" />;
    if (lowerKey.includes('throughput') || lowerKey.includes('rps')) return <Zap className="w-4 h-4" />;
    if (lowerKey.includes('user')) return <Users className="w-4 h-4" />;
    if (lowerKey.includes('uptime') || lowerKey.includes('reliability')) return <Shield className="w-4 h-4" />;
    if (lowerKey.includes('reduction') || lowerKey.includes('saved')) return <TrendingUp className="w-4 h-4" />;
    if (lowerKey.includes('cache') || lowerKey.includes('hit')) return <Database className="w-4 h-4" />;
    if (lowerKey.includes('success') || lowerKey.includes('rate')) return <CheckCircle className="w-4 h-4" />;
    if (lowerKey.includes('load') || lowerKey.includes('test')) return <Server className="w-4 h-4" />;
    if (lowerKey.includes('memory') || lowerKey.includes('cpu')) return <Cpu className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getMetricColor = (key: string, value: string | number) => {
    const strValue = String(value);
    const lowerKey = key.toLowerCase();

    // Performance improvements (green)
    if (lowerKey.includes('reduction') || lowerKey.includes('saved') || lowerKey.includes('improvement')) {
      return 'text-green-600 dark:text-green-400 border-green-500';
    }

    // Uptime/Success (green)
    if ((lowerKey.includes('uptime') || lowerKey.includes('success') || lowerKey.includes('reliability')) &&
        (strValue.includes('99') || strValue.includes('100'))) {
      return 'text-green-600 dark:text-green-400 border-green-500';
    }

    // Low latency/error (green)
    if ((lowerKey.includes('latency') || lowerKey.includes('error')) && strValue.includes('<')) {
      return 'text-green-600 dark:text-green-400 border-green-500';
    }

    // High throughput (blue)
    if (lowerKey.includes('throughput') || lowerKey.includes('rps') || lowerKey.includes('request')) {
      return 'text-blue-600 dark:text-blue-400 border-blue-500';
    }

    // Data/Cache (purple)
    if (lowerKey.includes('cache') || lowerKey.includes('data')) {
      return 'text-purple-600 dark:text-purple-400 border-purple-500';
    }

    return 'text-indigo-600 dark:text-indigo-400 border-indigo-500';
  };

  const parseNumericValue = (value: string | number): number | null => {
    const strValue = String(value);
    const match = strValue.match(/[\d,]+\.?\d*/);
    if (match) {
      return parseFloat(match[0].replace(/,/g, ''));
    }
    return null;
  };

  const formatAnimatedValue = (key: string, value: number, originalValue: string | number): string => {
    const strValue = String(originalValue);

    // Handle percentage
    if (strValue.includes('%')) {
      return `${value.toFixed(value < 10 ? 1 : 0)}%`;
    }

    // Handle K/M suffixes
    if (strValue.toLowerCase().includes('k')) {
      return `${value.toFixed(0)}K`;
    }
    if (strValue.toLowerCase().includes('m')) {
      return `${(value / 1000).toFixed(1)}M`;
    }

    // Handle time units
    if (strValue.includes('ms')) {
      return `${value.toFixed(0)}ms`;
    }
    if (strValue.includes('s')) {
      return `${value.toFixed(1)}s`;
    }

    // Handle large numbers
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }

    return value.toFixed(value < 10 ? 1 : 0);
  };

  useEffect(() => {
    if (isVisible && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;

      const animationTargets: { [key: string]: number } = {};

      Object.entries(metrics).forEach(([key, value]) => {
        const numericValue = parseNumericValue(value);
        if (numericValue !== null) {
          animationTargets[key] = numericValue;
        }
      });

      const duration = 1500;
      const steps = 60;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const newValues: { [key: string]: number } = {};
        Object.entries(animationTargets).forEach(([key, target]) => {
          newValues[key] = target * easeOutQuart;
        });

        setAnimatedMetrics(newValues);

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedMetrics(animationTargets);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, metrics]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {Object.entries(metrics).map(([key, value]) => {
        const numericValue = parseNumericValue(value);
        const hasAnimation = numericValue !== null && animatedMetrics[key] !== undefined;
        const displayValue = hasAnimation
          ? formatAnimatedValue(key, animatedMetrics[key], value)
          : String(value);
        const colorClass = getMetricColor(key, value);

        return (
          <div
            key={key}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg
              bg-light-card dark:bg-dark-card
              border ${colorClass.split(' ').find(c => c.startsWith('border')) || 'border-light-border dark:border-dark-border'}
              transition-all duration-300 hover:scale-105
            `}
          >
            <span className={colorClass}>
              {getMetricIcon(key)}
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {key}
              </span>
              <span className={`text-sm font-bold ${colorClass}`}>
                {String(value).includes('<') || String(value).includes('>') ? (
                  <>
                    <span className="text-xs font-normal">{String(value).match(/[<>]/)?.[0]}</span>
                    {' '}
                    <span className="font-mono">
                      {hasAnimation ? displayValue.replace(/[<>]\s*/, '') : String(value).replace(/[<>]\s*/, '')}
                    </span>
                  </>
                ) : (
                  <span className="font-mono">{displayValue}</span>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectMetrics;