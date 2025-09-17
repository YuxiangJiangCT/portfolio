import { motion } from 'framer-motion';

function SectionLoader() {
  return (
    <motion.div
      className="min-h-[400px] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-light-primary/20 dark:border-dark-primary/20 rounded-full" />
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-light-primary dark:border-t-dark-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        <motion.p
          className="text-light-text-secondary dark:text-dark-text-secondary text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading section...
        </motion.p>
      </div>
    </motion.div>
  );
}

export default SectionLoader;