import { useState, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Download, RefreshCw, Layers } from 'lucide-react';
import { skillCategories, SkillCategory } from '../../data/skills';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillRadarChartProps {
  selectedCategory?: string;
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ selectedCategory }) => {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'all');
  const [comparisonMode, setComparisonMode] = useState(false);
  const chartRef = useRef<any>(null);

  const getChartData = () => {
    if (activeCategory === 'all') {
      // Show average levels for each category
      const labels = skillCategories.map(cat => cat.name);
      const data = skillCategories.map(cat => {
        const skills = cat.skills;
        return Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length);
      });

      return {
        labels,
        datasets: [
          {
            label: 'Average Proficiency',
            data,
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(79, 70, 229, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(79, 70, 229, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      };
    } else {
      // Show skills within a specific category
      const category = skillCategories.find(cat => cat.name === activeCategory);
      if (!category) return null;

      const labels = category.skills.map(skill => skill.name);
      const data = category.skills.map(skill => skill.level);

      const datasets = [
        {
          label: category.name,
          data,
          backgroundColor: `${category.color}33`,
          borderColor: category.color,
          borderWidth: 2,
          pointBackgroundColor: category.color,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: category.color,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ];

      // Add comparison dataset if enabled
      if (comparisonMode) {
        const targetLevels = category.skills.map(() => 85); // Target proficiency level
        datasets.push({
          label: 'Target Level',
          data: targetLevels,
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: 'rgba(16, 185, 129, 0.5)',
          borderWidth: 1,
          borderDash: [5, 5],
          pointBackgroundColor: 'rgba(16, 185, 129, 0.5)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(16, 185, 129, 1)',
          pointRadius: 3,
          pointHoverRadius: 5
        } as any);
      }

      return {
        labels,
        datasets
      };
    }
  };

  const chartOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          font: {
            size: 10
          },
          color: 'rgba(156, 163, 175, 0.8)'
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        },
        pointLabels: {
          font: {
            size: 11
          },
          color: 'rgba(156, 163, 175, 1)',
          padding: 15,
          callback: function(label: string) {
            // Truncate long labels
            return label.length > 15 ? label.substring(0, 12) + '...' : label;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12
          },
          color: 'rgba(156, 163, 175, 1)',
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  const downloadChart = () => {
    if (chartRef.current) {
      const link = document.createElement('a');
      link.download = `skills-radar-${activeCategory}.png`;
      link.href = chartRef.current.toBase64Image();
      link.click();
    }
  };

  const resetView = () => {
    setActiveCategory('all');
    setComparisonMode(false);
  };

  const chartData = getChartData();

  if (!chartData) return null;

  return (
    <div className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-light-primary dark:text-dark-primary" />
          <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
            Skills Radar Chart
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Category Selector */}
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text
              focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
          >
            <option value="all">All Categories</option>
            {skillCategories.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          {/* Comparison Toggle */}
          {activeCategory !== 'all' && (
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${comparisonMode
                  ? 'bg-light-primary dark:bg-dark-primary text-white'
                  : 'bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:bg-light-card dark:hover:bg-dark-card'
                }`}
            >
              Compare to Target
            </button>
          )}

          {/* Action Buttons */}
          <button
            onClick={resetView}
            className="p-1.5 rounded-lg text-sm
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text-secondary dark:text-dark-text-secondary
              hover:text-light-text dark:hover:text-dark-text
              transition-colors"
            title="Reset View"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={downloadChart}
            className="p-1.5 rounded-lg text-sm
              bg-light-bg dark:bg-dark-bg
              border border-light-border dark:border-dark-border
              text-light-text-secondary dark:text-dark-text-secondary
              hover:text-light-text dark:hover:text-dark-text
              transition-colors"
            title="Download Chart"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-[400px] md:h-[500px]">
        <Radar
          ref={chartRef}
          data={chartData}
          options={chartOptions}
        />
      </div>

      {/* Legend/Info */}
      <div className="mt-6 pt-6 border-t border-light-border dark:border-dark-border">
        <div className="flex flex-wrap gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>90-100%: Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>75-89%: Proficient</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>60-74%: Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span>&lt;60%: Learning</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart;