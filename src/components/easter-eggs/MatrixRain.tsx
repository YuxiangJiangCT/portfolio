import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  // Handle logo clicks for activation
  useEffect(() => {
    const handleLogoClick = () => {
      setClickCount(prev => {
        const newCount = prev + 1;

        // Clear previous timer
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        // Reset counter after 2 seconds of no clicks
        timerRef.current = setTimeout(() => {
          setClickCount(0);
        }, 2000);

        // Activate Matrix rain after 5 clicks
        if (newCount >= 5) {
          setIsActive(true);
          setTimeout(() => {
            setIsActive(false);
            setClickCount(0);
          }, 10000); // Auto-disable after 10 seconds
          return 0;
        }

        return newCount;
      });
    };

    // Attach click handler to logo/header
    const logo = document.querySelector('.logo-trigger');
    if (logo) {
      logo.addEventListener('click', handleLogoClick);
      return () => logo.removeEventListener('click', handleLogoClick);
    }
  }, []);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Array to store drop positions
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
    }

    // Drawing function
    function draw() {
      if (!ctx) return;

      // Add trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient effect
        const gradient = ctx.createLinearGradient(0, y - fontSize * 10, 0, y);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0)');
        gradient.addColorStop(0.9, 'rgba(0, 255, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 1)');
        ctx.fillStyle = gradient;

        ctx.fillText(text, x, y);

        // Reset drop when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fixed inset-0 z-[9997] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ background: 'rgba(0, 0, 0, 0.9)' }}
            />

            {/* Matrix message */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-400 font-mono text-2xl md:text-4xl text-center z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5
              }}
            >
              <div className="mb-4">SYSTEM.BREACH</div>
              <div className="text-lg md:text-xl opacity-70">Follow the white rabbit...</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click counter indicator */}
      {clickCount > 0 && clickCount < 5 && (
        <motion.div
          className="fixed bottom-10 left-10 text-green-400 font-mono text-xs opacity-50 z-[9998]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        >
          [{clickCount}/5]
        </motion.div>
      )}
    </>
  );
}

export default MatrixRain;