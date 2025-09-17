import { useState, useEffect } from 'react';

interface PerformanceConfig {
  enableParticles: boolean;
  particleCount: number;
  connectionDistance: number;
  autoDetect: boolean;
}

export function usePerformanceDetect(): PerformanceConfig & { toggle: () => void } {
  const [config, setConfig] = useState<PerformanceConfig>(() => {
    // TEMPORARILY FORCE ENABLE FOR TESTING
    return {
      enableParticles: true, // Always true for now
      particleCount: 50,
      connectionDistance: 200,
      autoDetect: false
    };
  });

  useEffect(() => {
    // Skip detection if user has manual preference
    if (!config.autoDetect) {
      const saved = localStorage.getItem('particlesEnabled');
      setConfig(prev => ({ ...prev, enableParticles: saved === 'true' }));
      return;
    }

    // Performance detection
    const detectPerformance = () => {
      let score = 0;

      // 1. Check if mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

      if (isMobile) {
        setConfig(prev => ({ ...prev, enableParticles: false }));
        return;
      }

      // 2. Check GPU
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl && gl instanceof WebGLRenderingContext) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          // Check for integrated/low-end GPUs
          if (!/Intel|AMD|NVIDIA|Apple/i.test(renderer)) {
            score -= 2;
          } else {
            score += 2;
          }
        }
      }

      // 3. Check device memory (if available)
      if ('deviceMemory' in navigator) {
        const memory = (navigator as any).deviceMemory;
        if (memory >= 8) score += 2;
        else if (memory >= 4) score += 1;
        else score -= 1;
      }

      // 4. Check CPU cores (if available)
      if ('hardwareConcurrency' in navigator) {
        const cores = navigator.hardwareConcurrency;
        if (cores >= 8) score += 2;
        else if (cores >= 4) score += 1;
        else score -= 1;
      }

      // 5. Check connection type
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection?.effectiveType === '4g') score += 1;
        else if (connection?.effectiveType === '3g') score -= 1;
        else if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') score -= 2;
      }

      // 6. Measure frame rate
      let fps = 0;
      let lastTime = performance.now();
      let frameCount = 0;

      const measureFPS = () => {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime >= lastTime + 1000) {
          fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

          // Make decision based on FPS and score
          const shouldEnable = fps >= 50 && score >= 0;

          setConfig(prev => ({
            ...prev,
            enableParticles: shouldEnable,
            // Adjust quality based on performance
            particleCount: shouldEnable ? (score >= 3 ? 25 : 15) : 0,
            connectionDistance: shouldEnable ? (score >= 3 ? 150 : 100) : 0
          }));
        } else if (frameCount < 60) {
          requestAnimationFrame(measureFPS);
        }
      };

      // Use requestIdleCallback if available
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          requestAnimationFrame(measureFPS);
        });
      } else {
        requestAnimationFrame(measureFPS);
      }
    };

    detectPerformance();
  }, [config.autoDetect]);

  const toggle = () => {
    setConfig(prev => {
      const newState = !prev.enableParticles;
      localStorage.setItem('particlesEnabled', String(newState));
      return {
        ...prev,
        enableParticles: newState,
        autoDetect: false
      };
    });
  };

  return { ...config, toggle };
}