import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import CountUpAnimation from '../animations/CountUpAnimation';
import './dashboardStyles.css';

interface PerformanceMetricRowProps {
  label: string;
  beforeValue: number;
  afterValue: number;
  unit: string;
  format?: (value: number) => string;
  inverse?: boolean; // For metrics where lower is better (like latency)
  sparklineData?: number[];
}

const PerformanceMetricRow: React.FC<PerformanceMetricRowProps> = ({
  label,
  beforeValue,
  afterValue,
  unit,
  format,
  inverse = false,
  sparklineData = []
}) => {
  const improvement = inverse
    ? ((beforeValue - afterValue) / beforeValue) * 100
    : ((afterValue - beforeValue) / beforeValue) * 100;

  const isImproved = improvement > 0;
  const displayFormat = format || ((v: number) => v.toString());

  // Generate sparkline path
  const generateSparkline = (data: number[]) => {
    if (data.length < 2) return '';

    const width = 100;
    const height = 30;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  return (
    <motion.div
      className="metric-display"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wider">{label}</h3>

          <div className="flex items-center gap-6">
            {/* Before Value */}
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">BEFORE</div>
              <div className="text-xl font-mono text-gray-400">
                {displayFormat(beforeValue)}{unit}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center">
              <Activity className="w-4 h-4 text-gray-500" />
            </div>

            {/* After Value */}
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">AFTER</div>
              <div className="text-2xl font-mono terminal-green">
                <CountUpAnimation
                  value={afterValue}
                  format={(v) => `${displayFormat(v)}${unit}`}
                  duration={2}
                />
              </div>
            </div>

            {/* Improvement Percentage */}
            <div className={`comparison-arrow ${isImproved ? 'improved' : 'degraded'}`}>
              {isImproved ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-mono">
                {Math.abs(improvement).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Sparkline */}
        {sparklineData.length > 0 && (
          <div className="ml-6">
            <svg width="100" height="30" className="overflow-visible">
              <path
                d={generateSparkline(sparklineData)}
                fill="none"
                stroke="rgba(0, 255, 65, 0.6)"
                strokeWidth="2"
                className="drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]"
              />
              {/* Dot at the end */}
              <circle
                cx="100"
                cy={30 - ((sparklineData[sparklineData.length - 1] - Math.min(...sparklineData)) /
                    (Math.max(...sparklineData) - Math.min(...sparklineData) || 1)) * 30}
                r="3"
                fill="#00ff41"
                className="animate-pulse"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Performance Bar */}
      <div className="mt-3">
        <div className="performance-bar">
          <motion.div
            className="performance-bar-fill"
            style={{
              background: isImproved
                ? 'linear-gradient(90deg, #00ff41, #00cc33)'
                : 'linear-gradient(90deg, #ff3838, #cc0000)',
              width: '0%'
            }}
            animate={{
              width: `${Math.min(Math.abs(improvement), 100)}%`
            }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMetricRow;