import { motion } from 'framer-motion';
import { Activity, Zap, AlertCircle, TrendingUp } from 'lucide-react';
import MetricGauge from './MetricGauge';
import RealtimeChart from './RealtimeChart';
import StatusGrid from './StatusGrid';
import PerformanceMetricRow from './PerformanceMetricRow';
import FadeInWhenVisible from '../animations/FadeInWhenVisible';
import './dashboardStyles.css';

const PerformanceDashboard: React.FC = () => {
  // Performance metrics data
  const metrics = {
    latency: { before: 170, after: 50, unit: 'ms' },
    throughput: { before: 250, after: 500, unit: ' RPS' },
    errorRate: { before: 2.5, after: 0.5, unit: '%' },
    responseTime: { before: 320, after: 95, unit: 'ms' },
    cpuUsage: { before: 85, after: 45, unit: '%' },
    memoryUsage: { before: 78, after: 52, unit: '%' }
  };

  // Sparkline data for metrics
  const sparklineData = {
    latency: [170, 165, 158, 140, 120, 95, 75, 60, 55, 50],
    throughput: [250, 270, 300, 340, 380, 420, 460, 480, 495, 500],
    errorRate: [2.5, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0.6, 0.5, 0.5]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className="py-20 px-6 dashboard-container relative">
      {/* Grid Background */}
      <div className="dashboard-grid" />

      {/* Scanline Effect */}
      <div className="dashboard-scanline" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono terminal-green mb-4 glitch-text">
            PERFORMANCE MONITORING DASHBOARD
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time visualization of system optimization results from my performance engineering work at Dataman Analytics
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6"
        >
          {/* Top Stats Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Latency Metric */}
            <div className="metric-display flex items-center justify-between p-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Response Latency</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <div>
                    <span className="text-3xl font-mono terminal-green">{metrics.latency.after}</span>
                    <span className="text-sm text-gray-400 ml-1">ms</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-mono">70%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Previously: {metrics.latency.before}ms
                </div>
              </div>
            </div>

            {/* Throughput Metric */}
            <div className="metric-display flex items-center justify-between p-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Throughput</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <div>
                    <span className="text-3xl font-mono terminal-green">{metrics.throughput.after}</span>
                    <span className="text-sm text-gray-400 ml-1">RPS</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-mono">100%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Previously: {metrics.throughput.before} RPS
                </div>
              </div>
            </div>

            {/* Error Rate Metric */}
            <div className="metric-display flex items-center justify-between p-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Error Rate</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <div>
                    <span className="text-3xl font-mono terminal-green">{metrics.errorRate.after}</span>
                    <span className="text-sm text-gray-400 ml-1">%</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-mono">80%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Previously: {metrics.errorRate.before}%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gauges and Charts Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Gauges */}
            <div className="metric-display p-6">
              <h3 className="text-lg font-mono text-gray-300 mb-6 uppercase tracking-wider">
                System Performance Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <MetricGauge
                  label="CPU Usage"
                  value={metrics.cpuUsage.after}
                  maxValue={100}
                  unit="%"
                  size="small"
                />
                <MetricGauge
                  label="Memory Usage"
                  value={metrics.memoryUsage.after}
                  maxValue={100}
                  unit="%"
                  size="small"
                />
              </div>
            </div>

            {/* Real-time Chart */}
            <div className="metric-display p-6">
              <RealtimeChart
                title="LATENCY MONITORING"
                yAxisLabel="Latency (ms)"
                animate={true}
                height={200}
              />
            </div>
          </motion.div>

          {/* Detailed Metrics */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-lg font-mono terminal-green uppercase tracking-wider">
              Optimization Results
            </h3>
            <PerformanceMetricRow
              label="API Response Time"
              beforeValue={metrics.responseTime.before}
              afterValue={metrics.responseTime.after}
              unit="ms"
              inverse={true}
              sparklineData={sparklineData.latency}
            />
            <PerformanceMetricRow
              label="Request Throughput"
              beforeValue={metrics.throughput.before}
              afterValue={metrics.throughput.after}
              unit=" RPS"
              inverse={false}
              sparklineData={sparklineData.throughput}
            />
            <PerformanceMetricRow
              label="Error Rate"
              beforeValue={metrics.errorRate.before}
              afterValue={metrics.errorRate.after}
              unit="%"
              inverse={true}
              sparklineData={sparklineData.errorRate}
            />
          </motion.div>

          {/* Service Status Grid */}
          <motion.div
            variants={itemVariants}
            className="metric-display"
          >
            <StatusGrid />
          </motion.div>
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        >
          <div className="metric-display p-4">
            <div className="text-2xl font-mono terminal-green">99.99%</div>
            <div className="text-xs text-gray-400 uppercase mt-1">Uptime SLA</div>
          </div>
          <div className="metric-display p-4">
            <div className="text-2xl font-mono terminal-green">&lt; 50ms</div>
            <div className="text-xs text-gray-400 uppercase mt-1">P95 Latency</div>
          </div>
          <div className="metric-display p-4">
            <div className="text-2xl font-mono terminal-green">500+</div>
            <div className="text-xs text-gray-400 uppercase mt-1">RPS Capacity</div>
          </div>
          <div className="metric-display p-4">
            <div className="text-2xl font-mono terminal-green">0</div>
            <div className="text-xs text-gray-400 uppercase mt-1">Critical Incidents</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceDashboard;