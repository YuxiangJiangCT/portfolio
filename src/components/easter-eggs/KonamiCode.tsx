import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../../hooks/useKonamiCode';
import confetti from 'canvas-confetti';

function KonamiCode() {
  const [showMessage, setShowMessage] = useState(false);

  const { isActivated } = useKonamiCode(() => {
    // Trigger confetti explosion
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Shoot confetti from random positions
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0088']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0088']
      });
    }, 250);

    // Show achievement message
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);

    // Log achievement
    console.log('🎮 Achievement Unlocked: Konami Code Master!');
  });

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999]"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <div className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎮</span>
              <div>
                <div className="font-bold text-lg">Achievement Unlocked!</div>
                <div className="text-sm opacity-90">Konami Code Master</div>
              </div>
              <span className="text-2xl">✨</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Rainbow mode overlay when activated */}
      {isActivated && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[9998]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                45deg,
                rgba(255, 0, 0, 0.1),
                rgba(255, 154, 0, 0.1),
                rgba(208, 222, 33, 0.1),
                rgba(79, 220, 74, 0.1),
                rgba(63, 218, 216, 0.1),
                rgba(47, 201, 226, 0.1),
                rgba(28, 127, 238, 0.1),
                rgba(95, 21, 242, 0.1),
                rgba(186, 12, 248, 0.1),
                rgba(251, 7, 217, 0.1),
                rgba(255, 0, 0, 0.1)
              )`,
              animation: 'rainbow-shift 3s ease-in-out infinite',
              mixBlendMode: 'multiply'
            }}
          />
        </motion.div>
      )}

      <style jsx>{`
        @keyframes rainbow-shift {
          0%, 100% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(180deg);
          }
        }
      `}</style>
    </AnimatePresence>
  );
}

export default KonamiCode;