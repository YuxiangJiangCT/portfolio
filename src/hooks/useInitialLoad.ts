import { useState, useEffect } from 'react';

export const useInitialLoad = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit or a refresh
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (hasVisited) {
      // If already visited in this session, don't show loading
      setIsInitialLoading(false);
    } else {
      // First visit - show loading screen for at least 2 seconds
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return isInitialLoading;
};