import { motion } from 'framer-motion';
import { Server, Database, Shield, Activity, Wifi, Cpu } from 'lucide-react';
import './dashboardStyles.css';

interface ServiceStatus {
  name: string;
  status: 'online' | 'warning' | 'offline';
  uptime: number;
  latency?: number;
  icon?: React.ReactNode;
}

interface StatusGridProps {
  services?: ServiceStatus[];
}

const defaultServices: ServiceStatus[] = [
  { name: 'API Gateway', status: 'online', uptime: 99.99, latency: 45, icon: <Server size={16} /> },
  { name: 'Database', status: 'online', uptime: 99.95, latency: 12, icon: <Database size={16} /> },
  { name: 'Auth Service', status: 'online', uptime: 100, latency: 28, icon: <Shield size={16} /> },
  { name: 'Cache Layer', status: 'online', uptime: 99.98, latency: 2, icon: <Activity size={16} /> },
  { name: 'CDN', status: 'online', uptime: 100, latency: 8, icon: <Wifi size={16} /> },
  { name: 'Worker Pool', status: 'warning', uptime: 98.5, latency: 156, icon: <Cpu size={16} /> }
];

const StatusGrid: React.FC<StatusGridProps> = ({
  services = defaultServices
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const getStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'online': return 'terminal-green';
      case 'warning': return 'terminal-amber';
      case 'offline': return 'terminal-red';
    }
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-green-400';
    if (latency < 150) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-mono terminal-green mb-4 glitch-text">
        SERVICE STATUS
      </h3>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            variants={itemVariants}
            className="metric-display group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="text-gray-400">
                  {service.icon}
                </div>
                <h4 className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">
                  {service.name}
                </h4>
              </div>
              <div className={`status-indicator ${service.status}`} />
            </div>

            <div className="space-y-2">
              {/* Status */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">STATUS</span>
                <span className={`text-xs font-mono ${getStatusColor(service.status)}`}>
                  {service.status.toUpperCase()}
                </span>
              </div>

              {/* Uptime */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">UPTIME</span>
                <span className="text-xs font-mono text-gray-300">
                  {service.uptime.toFixed(2)}%
                </span>
              </div>

              {/* Latency */}
              {service.latency !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">LATENCY</span>
                  <span className={`text-xs font-mono ${getLatencyColor(service.latency)}`}>
                    {service.latency}ms
                  </span>
                </div>
              )}

              {/* Mini Progress Bar */}
              <div className="mt-2">
                <div className="h-1 bg-gray-800 rounded overflow-hidden">
                  <motion.div
                    className="h-full rounded"
                    style={{
                      background: service.status === 'online'
                        ? 'linear-gradient(90deg, #00ff41, #00cc33)'
                        : service.status === 'warning'
                        ? 'linear-gradient(90deg, #ffb000, #ff8800)'
                        : 'linear-gradient(90deg, #ff3838, #cc0000)'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${service.uptime}%` }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.1,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Pulse Animation Overlay */}
            {service.status === 'online' && (
              <motion.div
                className="absolute inset-0 pointer-events-none rounded"
                style={{
                  background: 'radial-gradient(circle at center, transparent, rgba(0, 255, 65, 0.05))'
                }}
                animate={{
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            System Health Score
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-4 rounded-sm"
                  style={{
                    background: i < 4 ? '#00ff41' : 'rgba(255, 255, 255, 0.1)'
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.1
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-mono terminal-green">
              {((services.filter(s => s.status === 'online').length / services.length) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusGrid;