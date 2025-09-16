import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import './dashboardStyles.css';

interface MetricGaugeProps {
  label: string;
  value: number;
  maxValue: number;
  unit?: string;
  thresholds?: {
    good: number;
    warning: number;
  };
  size?: 'small' | 'medium' | 'large';
  showPercentage?: boolean;
}

const MetricGauge: React.FC<MetricGaugeProps> = ({
  label,
  value,
  maxValue,
  unit = '',
  thresholds = { good: 70, warning: 40 },
  size = 'medium',
  showPercentage = true
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const percentage = (value / maxValue) * 100;

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const dimensions = {
    small: { width: 150, height: 100, strokeWidth: 8 },
    medium: { width: 200, height: 130, strokeWidth: 10 },
    large: { width: 250, height: 160, strokeWidth: 12 }
  }[size];

  const { width, height, strokeWidth } = dimensions;
  const centerX = width / 2;
  const centerY = height - 20;
  const radius = Math.min(width, height) / 2 - strokeWidth;

  // Create arc path
  const createArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Determine color based on value
  const getColor = () => {
    if (percentage >= thresholds.good) return '#00ff41';
    if (percentage >= thresholds.warning) return '#ffb000';
    return '#ff3838';
  };

  // Needle rotation angle (from -90 to 90 degrees)
  const needleRotation = useTransform(spring, [0, 100], [-90, 90]);

  useEffect(() => {
    setIsAnimating(true);
    spring.set(percentage);
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, [percentage, spring]);

  const displayValue = useTransform(spring, (current) => Math.floor(current));

  return (
    <div className="gauge-container">
      <svg
        width={width}
        height={height}
        className="gauge-svg"
        style={{ overflow: 'visible' }}
      >
        {/* Background Arc */}
        <path
          d={createArc(-90, 90)}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />

        {/* Color Zones */}
        <path
          d={createArc(-90, -30)}
          fill="none"
          stroke="rgba(255, 56, 56, 0.3)"
          strokeWidth={strokeWidth}
        />
        <path
          d={createArc(-30, 30)}
          fill="none"
          stroke="rgba(255, 176, 0, 0.3)"
          strokeWidth={strokeWidth}
        />
        <path
          d={createArc(30, 90)}
          fill="none"
          stroke="rgba(0, 255, 65, 0.3)"
          strokeWidth={strokeWidth}
        />

        {/* Value Arc */}
        <motion.path
          d={createArc(-90, -90 + (percentage * 1.8))}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 ${strokeWidth}px ${getColor()})`
          }}
        />

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map(tick => {
          const angle = -90 + (tick * 1.8);
          const start = polarToCartesian(centerX, centerY, radius - strokeWidth, angle);
          const end = polarToCartesian(centerX, centerY, radius - strokeWidth - 10, angle);
          return (
            <line
              key={tick}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
            />
          );
        })}

        {/* Needle */}
        <motion.g
          style={{
            originX: centerX,
            originY: centerY,
          }}
        >
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={centerX}
            y2={centerY - radius + 10}
            stroke={getColor()}
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              rotate: needleRotation,
              transformOrigin: `${centerX}px ${centerY}px`,
              filter: `drop-shadow(0 0 10px ${getColor()})`
            }}
          />
          <circle
            cx={centerX}
            cy={centerY}
            r="6"
            fill={getColor()}
            style={{
              filter: `drop-shadow(0 0 10px ${getColor()})`
            }}
          />
        </motion.g>

        {/* Labels */}
        <text
          x={centerX - radius}
          y={centerY + 15}
          className="text-xs fill-gray-500"
          textAnchor="middle"
        >
          0
        </text>
        <text
          x={centerX}
          y={centerY - radius - 5}
          className="text-xs fill-gray-500"
          textAnchor="middle"
        >
          {maxValue / 2}
        </text>
        <text
          x={centerX + radius}
          y={centerY + 15}
          className="text-xs fill-gray-500"
          textAnchor="middle"
        >
          {maxValue}
        </text>
      </svg>

      {/* Value Display */}
      <div className="text-center mt-4">
        <div className="gauge-value terminal-green">
          <motion.span>{displayValue}</motion.span>
          {showPercentage && <span className="text-lg ml-1">%</span>}
          {!showPercentage && unit && <span className="text-lg ml-1">{unit}</span>}
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-wider mt-1">
          {label}
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center mt-2">
        <span
          className="text-xs font-mono"
          style={{
            color: getColor(),
            textShadow: `0 0 10px ${getColor()}`
          }}
        >
          {percentage >= thresholds.good ? 'OPTIMAL' :
           percentage >= thresholds.warning ? 'WARNING' : 'CRITICAL'}
        </span>
      </div>
    </div>
  );
};

export default MetricGauge;