import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  // Handle avatar clicks for activation
  useEffect(() => {
    const handleAvatarClick = (e: Event) => {
      e.stopPropagation(); // Prevent card flip

      setClickCount(prev => {
        const newCount = prev + 1;

        // Clear previous timer
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        // Reset counter after 3 seconds of no clicks
        timerRef.current = setTimeout(() => {
          setClickCount(0);
        }, 3000);

        // Activate Matrix rain after 5 clicks
        if (newCount >= 5) {
          setIsActive(true);
          console.log('%c🐇 Follow the white rabbit...', 'color: #00FF00; font-family: monospace; font-size: 16px;');

          // Longer duration, more dramatic effect
          setTimeout(() => {
            setIsActive(false);
            setClickCount(0);
          }, 15000); // 15 seconds
          return 0;
        }

        return newCount;
      });
    };

    // Attach click handler to avatar container
    const avatarTrigger = document.querySelector('.matrix-trigger');
    if (avatarTrigger) {
      avatarTrigger.addEventListener('click', handleAvatarClick);
      return () => avatarTrigger.removeEventListener('click', handleAvatarClick);
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

    // Matrix characters - more diverse set
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
    const matrixArray = matrix.split("");

    const fontSize = 14; // Smaller for denser effect
    const columns = canvas.width / fontSize;

    // Array to store drop positions and speeds
    const drops: { y: number; speed: number }[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = {
        y: Math.random() * -100,
        speed: Math.random() * 0.5 + 0.5 // Variable speeds
      };
    }

    // Drawing function
    function draw() {
      if (!ctx) return;

      // Add trail effect (more visible)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.font = fontSize + 'px monospace';

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        const x = i * fontSize;
        const y = drops[i].y * fontSize;

        // Multi-layer gradient effect for depth
        const gradient = ctx.createLinearGradient(0, y - fontSize * 15, 0, y);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.1)');
        gradient.addColorStop(0.8, 'rgba(0, 255, 0, 0.5)');
        gradient.addColorStop(0.95, 'rgba(100, 255, 100, 0.8)');
        gradient.addColorStop(1, 'rgba(200, 255, 200, 1)');
        ctx.fillStyle = gradient;

        // Add glow effect for the leading character
        if (Math.random() > 0.98) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#0F0';
        }

        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        // Reset drop when it reaches bottom
        if (drops[i].y * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i].y = 0;
          drops[i].speed = Math.random() * 0.5 + 0.5;
        }

        // Move drop at variable speed
        drops[i].y += drops[i].speed;
      }
    }

    const interval = setInterval(draw, 30); // Faster refresh rate

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