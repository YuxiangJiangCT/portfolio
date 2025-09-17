import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import './dashboardStyles.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RealtimeChartProps {
  title: string;
  beforeData?: number[];
  afterData?: number[];
  labels?: string[];
  yAxisLabel?: string;
  animate?: boolean;
  showLegend?: boolean;
  height?: number;
}

const RealtimeChart: React.FC<RealtimeChartProps> = ({
  title,
  beforeData = [],
  afterData = [],
  labels = [],
  yAxisLabel = 'Value',
  animate = true,
  showLegend = true,
  height = 250
}) => {
  const [dataPoints, setDataPoints] = useState<{
    before: number[];
    after: number[];
    labels: string[];
  }>({
    before: [],
    after: [],
    labels: []
  });

  // Generate simulated real-time data if not provided
  useEffect(() => {
    if (beforeData.length === 0 && afterData.length === 0) {
      const generateData = () => {
        const points = 30;
        const newLabels = Array.from({ length: points }, (_, i) =>
          new Date(Date.now() - (points - i) * 1000).toLocaleTimeString('en-US', {
            hour12: false,
            second: '2-digit'
          }).slice(-2)
        );

        const newBeforeData = Array.from({ length: points }, () =>
          150 + Math.random() * 40 // 150-190ms latency before
        );

        const newAfterData = Array.from({ length: points }, () =>
          40 + Math.random() * 20 // 40-60ms latency after
        );

        return { labels: newLabels, before: newBeforeData, after: newAfterData };
      };

      // Initial data - only set once
      setDataPoints(prev => {
        // Only generate if not already set
        if (prev.labels.length === 0) {
          return generateData();
        }
        return prev;
      });

      // Simulate real-time updates
      if (animate) {
        const interval = setInterval(() => {
          setDataPoints(prev => {
            const newLabel = new Date().toLocaleTimeString('en-US', {
              hour12: false,
              second: '2-digit'
            }).slice(-2);

            const newBefore = 150 + Math.random() * 40;
            const newAfter = 40 + Math.random() * 20;

            return {
              labels: [...prev.labels.slice(1), newLabel],
              before: [...prev.before.slice(1), newBefore],
              after: [...prev.after.slice(1), newAfter]
            };
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    } else {
      setDataPoints({
        before: beforeData,
        after: afterData,
        labels: labels
      });
    }
  }, [beforeData, afterData, labels, animate]);

  const chartData = {
    labels: dataPoints.labels,
    datasets: [
      {
        label: 'Before Optimization',
        data: dataPoints.before,
        borderColor: 'rgba(255, 56, 56, 0.8)',
        backgroundColor: 'rgba(255, 56, 56, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true
      },
      {
        label: 'After Optimization',
        data: dataPoints.after,
        borderColor: 'rgba(0, 255, 65, 0.8)',
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: animate ? 500 : 0
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
        labels: {
          color: '#94A3B8',
          font: {
            family: "'Fira Code', monospace",
            size: 11
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: title,
        color: '#00ff41',
        font: {
          family: "'Fira Code', monospace",
          size: 14,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#00ff41',
        bodyColor: '#94A3B8',
        borderColor: 'rgba(0, 255, 65, 0.3)',
        borderWidth: 1,
        titleFont: {
          family: "'Fira Code', monospace",
          size: 12
        },
        bodyFont: {
          family: "'Fira Code', monospace",
          size: 11
        },
        padding: 10,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}ms`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(0, 255, 65, 0.05)',
          drawTicks: false
        },
        ticks: {
          color: '#64748B',
          font: {
            family: "'Fira Code', monospace",
            size: 10
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10
        },
        border: {
          color: 'rgba(0, 255, 65, 0.2)'
        }
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 255, 65, 0.05)',
          drawTicks: false
        },
        ticks: {
          color: '#64748B',
          font: {
            family: "'Fira Code', monospace",
            size: 10
          },
          callback: function(value) {
            return value + 'ms';
          }
        },
        border: {
          color: 'rgba(0, 255, 65, 0.2)'
        },
        title: {
          display: true,
          text: yAxisLabel,
          color: '#64748B',
          font: {
            family: "'Fira Code', monospace",
            size: 11
          }
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <div className="chart-container">
      <div style={{ height: `${height}px`, position: 'relative' }}>
        <Line data={chartData} options={options} />

        {/* Data stream effect overlay */}
        <div className="data-stream" />

        {/* Live indicator */}
        {animate && (
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-500 font-mono">LIVE</span>
          </div>
        )}
      </div>

      {/* Performance Summary */}
      <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-gray-500">AVG BEFORE</span>
          <div className="font-mono text-red-400">
            {dataPoints.before.length > 0
              ? (dataPoints.before.reduce((a, b) => a + b, 0) / dataPoints.before.length).toFixed(1)
              : '0'}ms
          </div>
        </div>
        <div>
          <span className="text-gray-500">AVG AFTER</span>
          <div className="font-mono terminal-green">
            {dataPoints.after.length > 0
              ? (dataPoints.after.reduce((a, b) => a + b, 0) / dataPoints.after.length).toFixed(1)
              : '0'}ms
          </div>
        </div>
        <div>
          <span className="text-gray-500">IMPROVEMENT</span>
          <div className="font-mono text-blue-400">
            {dataPoints.before.length > 0 && dataPoints.after.length > 0
              ? (((dataPoints.before.reduce((a, b) => a + b, 0) / dataPoints.before.length) -
                  (dataPoints.after.reduce((a, b) => a + b, 0) / dataPoints.after.length)) /
                  (dataPoints.before.reduce((a, b) => a + b, 0) / dataPoints.before.length) * 100).toFixed(1)
              : '0'}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeChart;