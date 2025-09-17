import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export function useKonamiCode(callback?: () => void) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);

  const reset = useCallback(() => {
    setSequence([]);
    setIsActivated(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if in input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const newSequence = [...sequence, event.code];

      // Check if the new sequence matches the beginning of Konami code
      const isValidSequence = newSequence.every(
        (key, index) => key === KONAMI_CODE[index]
      );

      if (isValidSequence) {
        setSequence(newSequence);

        // Check if complete Konami code
        if (newSequence.length === KONAMI_CODE.length) {
          setIsActivated(true);
          if (callback) {
            callback();
          }
          // Reset after activation
          setTimeout(() => {
            reset();
          }, 3000);
        }
      } else {
        // Reset if invalid sequence
        setSequence([event.code] === KONAMI_CODE[0] ? [event.code] : []);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequence, callback, reset]);

  return { isActivated, sequence, reset };
}