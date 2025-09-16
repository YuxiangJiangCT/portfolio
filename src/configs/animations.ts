import { Variants } from 'framer-motion';

// Animation Variants
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -60
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -60
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 60
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const rotateIn: Variants = {
  initial: {
    opacity: 0,
    rotate: -180,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Spring Animations
export const springAnimation = {
  type: "spring",
  stiffness: 100,
  damping: 10,
  mass: 1
};

export const bounceAnimation = {
  type: "spring",
  stiffness: 400,
  damping: 10
};

// Hover Animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeInOut"
  }
};

export const hoverRotate = {
  rotate: 5,
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeInOut"
  }
};

export const tapScale = {
  scale: 0.95,
  transition: {
    duration: 0.1,
    ease: "easeInOut"
  }
};

// Page Transitions
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    x: -200
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: {
    opacity: 0,
    x: 200,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Floating Animation
export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut"
    }
  }
};

// Pulse Animation
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut"
    }
  }
};

// Typewriter cursor
export const cursorAnimation = {
  animate: {
    opacity: [0, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

// Performance-optimized viewport settings
export const viewportSettings = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -100px 0px"
};

// Duration constants
export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  slowest: 1
};

// Easing functions
export const EASING = {
  smooth: [0.6, -0.05, 0.01, 0.99],
  easeInOut: [0.43, 0.13, 0.23, 0.96],
  easeOut: [0.19, 1, 0.22, 1],
  easeIn: [0.47, 0, 0.745, 0.715],
  sharp: [0.4, 0, 0.6, 1]
};