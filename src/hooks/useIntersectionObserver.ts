import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
}

export const useIntersectionObserver = <T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean] => {
  const {
    threshold = 0,
    rootMargin = '100px',
    triggerOnce = true,
    enabled = true
  } = options;

  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    // If already triggered once and triggerOnce is true, don't observe again
    if (triggerOnce && hasTriggeredRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;

        if (isCurrentlyIntersecting) {
          setIsIntersecting(true);

          if (triggerOnce) {
            hasTriggeredRef.current = true;
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const element = elementRef.current;
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [enabled, threshold, rootMargin, triggerOnce]);

  return [elementRef, isIntersecting];
};

// Hook specifically for image lazy loading
export const useImageLazyLoad = (
  src?: string,
  options: UseIntersectionObserverOptions = {}
): {
  ref: RefObject<HTMLImageElement>;
  isVisible: boolean;
  isLoaded: boolean;
  isError: boolean;
  loadImage: () => void;
} => {
  const [ref, isVisible] = useIntersectionObserver<HTMLImageElement>(options);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!src || !isVisible || isLoaded || isError) return;

    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
      setIsError(false);
    };

    img.onerror = () => {
      setIsError(true);
      setIsLoaded(false);
    };

    img.src = src;
  }, [src, isVisible, isLoaded, isError]);

  const loadImage = () => {
    if (!src || isLoaded || isError) return;

    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
      setIsError(false);
    };

    img.onerror = () => {
      setIsError(true);
      setIsLoaded(false);
    };

    img.src = src;
  };

  return {
    ref,
    isVisible,
    isLoaded,
    isError,
    loadImage
  };
};

// Hook for batch lazy loading multiple elements
export const useBatchIntersectionObserver = <T extends HTMLElement = HTMLElement>(
  count: number,
  options: UseIntersectionObserverOptions = {}
): {
  refs: RefObject<T>[];
  visibilityStates: boolean[];
} => {
  const {
    threshold = 0,
    rootMargin = '100px',
    triggerOnce = true,
    enabled = true
  } = options;

  const refs = useRef<RefObject<T>[]>(
    Array.from({ length: count }, () => useRef<T>(null))
  ).current;

  const [visibilityStates, setVisibilityStates] = useState<boolean[]>(
    new Array(count).fill(false)
  );

  const hasTriggeredRef = useRef<boolean[]>(new Array(count).fill(false));

  useEffect(() => {
    if (!enabled) return;

    const observers: IntersectionObserver[] = [];

    refs.forEach((ref, index) => {
      if (!ref.current) return;
      if (triggerOnce && hasTriggeredRef.current[index]) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          const isCurrentlyIntersecting = entry.isIntersecting;

          if (isCurrentlyIntersecting) {
            setVisibilityStates(prev => {
              const newStates = [...prev];
              newStates[index] = true;
              return newStates;
            });

            if (triggerOnce) {
              hasTriggeredRef.current[index] = true;
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            setVisibilityStates(prev => {
              const newStates = [...prev];
              newStates[index] = false;
              return newStates;
            });
          }
        },
        {
          threshold,
          rootMargin
        }
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [enabled, threshold, rootMargin, triggerOnce, refs]);

  return {
    refs,
    visibilityStates
  };
};