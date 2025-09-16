import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterEffectProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  className?: string;
  onComplete?: () => void;
  loop?: boolean;
  deleteSpeed?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = '_',
  className = '',
  onComplete,
  loop = false,
  deleteSpeed = 30
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const texts = Array.isArray(text) ? text : [text];
  const currentFullText = texts[currentTextIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const typeText = () => {
      if (!isDeleting && displayText === currentFullText) {
        setIsComplete(true);
        if (onComplete && !loop) {
          onComplete();
        }
        if (loop && texts.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
            setIsComplete(false);
          }, 2000); // Pause before deleting
        }
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        const nextText = isDeleting
          ? currentFullText.substring(0, displayText.length - 1)
          : currentFullText.substring(0, displayText.length + 1);

        timeout = setTimeout(() => {
          setDisplayText(nextText);
        }, isDeleting ? deleteSpeed : speed);
      }
    };

    if (delay > 0 && displayText === '') {
      timeout = setTimeout(typeText, delay);
    } else {
      typeText();
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentFullText, isDeleting, speed, deleteSpeed, delay, onComplete, loop, texts, currentTextIndex]);

  return (
    <span className={className}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {displayText}
      </motion.span>
      {cursor && (
        <AnimatePresence>
          <motion.span
            className="inline-block ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          >
            {cursorChar}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
};

// Variant with gradient text support
export const GradientTypewriter: React.FC<TypewriterEffectProps & {
  gradient?: string;
}> = ({ gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', ...props }) => {
  return (
    <span
      style={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      <TypewriterEffect {...props} />
    </span>
  );
};

export default TypewriterEffect;