import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformanceDetect } from '../../hooks/usePerformanceDetect';

function ParticleToggle() {
  const { enableParticles, toggle } = usePerformanceDetect();

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-20 right-6 p-3 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-lg hover:shadow-xl transition-all z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={enableParticles ? "Disable particles" : "Enable particles"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={enableParticles ? 'on' : 'off'}
          initial={{ rotate: 0 }}
          animate={{
            rotate: enableParticles ? 360 : 0,
            transition: { duration: 0.5 }
          }}
          exit={{ rotate: -180 }}
        >
          <Sparkles
            className={`w-5 h-5 ${
              enableParticles
                ? 'text-light-primary dark:text-dark-primary'
                : 'text-light-text-secondary dark:text-dark-text-secondary'
            }`}
            fill={enableParticles ? 'currentColor' : 'none'}
          />
        </motion.div>
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {enableParticles && (
          <motion.div
            className="absolute bottom-full mb-2 right-0 px-2 py-1 bg-dark-bg text-dark-text text-xs rounded whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            Particles enabled
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse effect when enabled */}
      {enableParticles && (
        <motion.div
          className="absolute inset-0 rounded-full bg-light-primary dark:bg-dark-primary"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2
          }}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </motion.button>
  );
}

export default ParticleToggle;