import { Variants } from "framer-motion";

// Easing functions
export const easing = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

// Animation durations
export const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195,
} as const;

// Common animation variants
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

export const slideDown: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

export const slideLeft: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const slideRight: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

export const rotateIn: Variants = {
  initial: { opacity: 0, rotate: -180 },
  animate: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: 180 },
};

export const flipX: Variants = {
  initial: { opacity: 0, rotateX: -90 },
  animate: { opacity: 1, rotateX: 0 },
  exit: { opacity: 0, rotateX: 90 },
};

export const flipY: Variants = {
  initial: { opacity: 0, rotateY: -90 },
  animate: { opacity: 1, rotateY: 0 },
  exit: { opacity: 0, rotateY: 90 },
};

// Complex animations
export const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const bounceIn: Variants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
  exit: { opacity: 0, scale: 0.3 },
};

export const elasticIn: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 8,
      stiffness: 100,
      mass: 1,
    },
  },
  exit: { opacity: 0, scale: 0.5 },
};

// Page transitions
export const pageSlideLeft: Variants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
};

export const pageSlideRight: Variants = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
};

export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Special effects
export const glitchEffect: Variants = {
  initial: { x: 0, y: 0 },
  animate: {
    x: [0, -2, 2, -2, 2, 0],
    y: [0, 2, -2, 2, -2, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export const pulseGlow: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const rotatingOrbit: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Interaction animations
export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

export const hoverGlow: Variants = {
  rest: {
    boxShadow: "0 0 0px rgba(0, 255, 255, 0)",
  },
  hover: {
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const hoverLift: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Typewriter effect
export const typewriter = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 3,
      ease: "steps(20)",
    },
  },
};

// Loading animations
export const spinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Utility functions
export const createStaggeredAnimation = (
  baseVariant: Variants,
  staggerDelay: number = 0.1
): Variants => ({
  ...baseVariant,
  animate: {
    ...baseVariant.animate,
    transition: {
      ...baseVariant.animate?.transition,
      staggerChildren: staggerDelay,
    },
  },
});

export const createDelayedAnimation = (
  baseVariant: Variants,
  delay: number
): Variants => ({
  ...baseVariant,
  animate: {
    ...baseVariant.animate,
    transition: {
      ...baseVariant.animate?.transition,
      delay,
    },
  },
});

export const createBounceAnimation = (
  scale: number = 1.1,
  damping: number = 10,
  stiffness: number = 100
) => ({
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      damping,
      stiffness,
      overshoot: scale,
    },
  },
  exit: { scale: 0 },
});

// Canvas animation helpers
export const createRippleEffect = (x: number, y: number, element?: HTMLElement) => {
  const ripple = document.createElement('div');
  ripple.className = 'absolute rounded-full border-2 border-primary/50 pointer-events-none';
  ripple.style.left = (x - 25) + 'px';
  ripple.style.top = (y - 25) + 'px';
  ripple.style.width = '50px';
  ripple.style.height = '50px';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple-expand 0.8s ease-out forwards';
  
  const container = element || document.body;
  container.appendChild(ripple);
  
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 800);
};

export const createParticleExplosion = (x: number, y: number, count: number = 8) => {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute w-1 h-1 bg-primary rounded-full pointer-events-none';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const angle = (i / count) * Math.PI * 2;
    const distance = 50 + Math.random() * 50;
    const finalX = x + Math.cos(angle) * distance;
    const finalY = y + Math.sin(angle) * distance;
    
    particle.style.setProperty('--final-x', finalX + 'px');
    particle.style.setProperty('--final-y', finalY + 'px');
    particle.style.animation = 'particle-explode 1s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1000);
  }
};

// CSS keyframes (to be added to CSS)
export const cssKeyframes = `
  @keyframes ripple-expand {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes particle-explode {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(
        calc(var(--final-x) - var(--start-x)),
        calc(var(--final-y) - var(--start-y))
      ) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes glow-pulse {
    0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
    50% { filter: drop-shadow(0 0 20px currentColor); }
  }
`;
