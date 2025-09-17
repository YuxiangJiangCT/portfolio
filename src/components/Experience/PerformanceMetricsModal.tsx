import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, TrendingUp, Zap } from 'lucide-react';
import MetricGauge from '../Dashboard/MetricGauge';
import RealtimeChart from '../Dashboard/RealtimeChart';
import StatusGrid from '../Dashboard/StatusGrid';
import PerformanceMetricRow from '../Dashboard/PerformanceMetricRow';

interface PerformanceMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function PerformanceMetricsModal({ isOpen, onClose }: PerformanceMetricsModalProps) {
  const metrics = {
    latency: { before: 170, after: 50, unit: 'ms' },
    throughput: { before: 250, after: 500, unit: ' RPS' },
    errorRate: { before: 2.5, after: 0.5, unit: '%' },
    responseTime: { before: 320, after: 95, unit: 'ms' },
    cpuUsage: { before: 85, after: 45, unit: '%' },
    memoryUsage: { before: 78, after: 52, unit: '%' }
  };

  const sparklineData = {
    latency: [170, 165, 158, 140, 120, 95, 75, 60, 55, 50],
    throughput: [250, 270, 300, 340, 380, 420, 460, 480, 495, 500],
    errorRate: [2.5, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0.6, 0.5, 0.5]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-light-bg dark:bg-dark-bg rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-mono text-light-text dark:text-dark-text mb-1">
                    Performance Optimization Results
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Real-time metrics from system optimization at Dataman Analytics
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-light-bg dark:hover:bg-dark-bg rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(100%-120px)]">
              <div className="grid gap-6">
                {/* Key Metrics Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-light-card dark:bg-dark-card p-4 rounded-lg border border-light-border dark:border-dark-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-light-accent dark:text-dark-accent" />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Response Latency</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-mono font-bold text-light-primary dark:text-dark-primary">
                        {metrics.latency.after}ms
                      </span>
                      <span className="text-sm text-green-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        70% improved
                      </span>
                    </div>
                    <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      Previously: {metrics.latency.before}ms
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-light-card dark:bg-dark-card p-4 rounded-lg border border-light-border dark:border-dark-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-light-accent dark:text-dark-accent" />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Throughput</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-mono font-bold text-light-primary dark:text-dark-primary">
                        {metrics.throughput.after} RPS
                      </span>
                      <span className="text-sm text-green-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        2x increase
                      </span>
                    </div>
                    <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      Previously: {metrics.throughput.before} RPS
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-light-card dark:bg-dark-card p-4 rounded-lg border border-light-border dark:border-dark-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-light-accent dark:text-dark-accent" />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Error Rate</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-mono font-bold text-light-primary dark:text-dark-primary">
                        {metrics.errorRate.after}%
                      </span>
                      <span className="text-sm text-green-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        80% reduced
                      </span>
                    </div>
                    <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      Previously: {metrics.errorRate.before}%
                    </div>
                  </motion.div>
                </div>

                {/* Performance Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-light-card dark:bg-dark-card p-6 rounded-lg border border-light-border dark:border-dark-border"
                >
                  <h4 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">
                    Real-time Performance Trends
                  </h4>
                  <div className="h-64">
                    <RealtimeChart />
                  </div>
                </motion.div>

                {/* Detailed Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-light-card dark:bg-dark-card p-6 rounded-lg border border-light-border dark:border-dark-border"
                >
                  <h4 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">
                    System Optimization Details
                  </h4>
                  <div className="space-y-3">
                    <PerformanceMetricRow
                      label="Response Time"
                      beforeValue={metrics.responseTime.before}
                      afterValue={metrics.responseTime.after}
                      unit={metrics.responseTime.unit}
                      inverse={true}
                      sparklineData={sparklineData.latency}
                    />
                    <PerformanceMetricRow
                      label="CPU Usage"
                      beforeValue={metrics.cpuUsage.before}
                      afterValue={metrics.cpuUsage.after}
                      unit={metrics.cpuUsage.unit}
                      inverse={true}
                      sparklineData={sparklineData.throughput}
                    />
                    <PerformanceMetricRow
                      label="Memory Usage"
                      beforeValue={metrics.memoryUsage.before}
                      afterValue={metrics.memoryUsage.after}
                      unit={metrics.memoryUsage.unit}
                      inverse={true}
                      sparklineData={sparklineData.errorRate}
                    />
                  </div>
                </motion.div>

                {/* Status Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <StatusGrid />
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border p-4 md:p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  *These metrics represent actual performance improvements achieved during my time at Dataman Analytics
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-light-bg dark:bg-dark-bg hover:bg-light-border dark:hover:bg-dark-border rounded-lg transition-colors text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PerformanceMetricsModal;