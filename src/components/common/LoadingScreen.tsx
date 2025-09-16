import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Initializing...",
    "Loading components...",
    "Fetching resources...",
    "Compiling assets...",
    "Almost ready...",
    "Finalizing..."
  ];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Non-linear progress for more realistic feel
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    // Rotate messages
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center
                    bg-light-bg dark:bg-dark-bg transition-colors duration-300">

      {/* Main loading animation container */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-32 h-32 relative">
          <div className="absolute inset-0 border-4 border-light-border dark:border-dark-border
                          rounded-full animate-pulse" />
          <div
            className="absolute inset-0 border-4 border-transparent border-t-light-primary
                       dark:border-t-dark-primary rounded-full animate-spin"
            style={{ animationDuration: '1.5s' }}
          />

          {/* Inner rotating ring */}
          <div className="absolute inset-2">
            <div
              className="w-full h-full border-3 border-transparent border-b-light-primary/50
                         dark:border-b-dark-primary/50 rounded-full animate-spin"
              style={{ animationDuration: '1s', animationDirection: 'reverse' }}
            />
          </div>

          {/* Center dot matrix */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-light-primary dark:bg-dark-primary rounded-full
                             animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0.3 + (i * 0.07)
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress percentage */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <span className="text-2xl font-mono font-bold text-light-primary dark:text-dark-primary">
            {Math.floor(progress)}%
          </span>
        </div>
      </div>

      {/* Loading message */}
      <div className="mt-12 h-8">
        <p className="text-light-text-secondary dark:text-dark-text-secondary
                      font-mono text-sm animate-pulse">
          {messages[messageIndex]}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-64">
        <div className="h-1 bg-light-border dark:bg-dark-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-light-primary to-light-primary-hover
                       dark:from-dark-primary dark:to-dark-primary-hover
                       transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Code animation background */}
      <div className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-10">
        <div className="animate-float" style={{ animationDuration: '20s' }}>
          <pre className="text-xs text-light-primary dark:text-dark-primary">
{`function initialize() {
  const components = loadComponents();
  const assets = compileAssets();
  return Promise.all([
    components,
    assets
  ]);
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;