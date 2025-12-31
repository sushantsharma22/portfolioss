import type { Variants, Transition } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════
// APPLE-INSPIRED ANIMATION SYSTEM 2025
// Premium • Buttery Smooth • 60 FPS Guaranteed
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// CUSTOM EASING CURVES (Apple-inspired)
// ═══════════════════════════════════════════════════════════════

export const easings = {
  // Apple's signature easing - smooth and elegant
  apple: [0.25, 0.1, 0.25, 1.0] as const,
  // Material Design smooth
  smoothIn: [0.4, 0.0, 0.2, 1.0] as const,
  // Gentle deceleration
  smoothOut: [0.0, 0.0, 0.2, 1.0] as const,
  // Bouncy elastic feel
  elasticOut: [0.68, -0.55, 0.265, 1.55] as const,
  // Premium in-out
  smoothInOut: [0.45, 0.05, 0.55, 0.95] as const,
  // Aggressive acceleration
  accelerate: [0.4, 0.0, 1.0, 1.0] as const,
  // Cinematic reveal
  cinematic: [0.83, 0, 0.17, 1] as const,
  // Magnetic pull effect
  magnetic: [0.22, 1.0, 0.36, 1.0] as const,
} as const;

// ═══════════════════════════════════════════════════════════════
// SPRING CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════

export const springs = {
  // Smooth and responsive
  smooth: { stiffness: 100, damping: 30, mass: 0.5 },
  // Bouncy feel
  bouncy: { stiffness: 300, damping: 20, mass: 0.8 },
  // Snappy response
  snappy: { stiffness: 400, damping: 35, mass: 0.5 },
  // Gentle motion
  gentle: { stiffness: 80, damping: 25, mass: 1 },
  // Magnetic pull
  magnetic: { stiffness: 300, damping: 25, mass: 0.8 },
  // Journey navigation
  navigation: { stiffness: 260, damping: 30, mass: 0.8 },
  // Card hover
  card: { stiffness: 200, damping: 20, mass: 0.6 },
} as const;

// ═══════════════════════════════════════════════════════════════
// TRANSITION PRESETS
// ═══════════════════════════════════════════════════════════════

export const transitions = {
  // Standard smooth transition
  smooth: {
    duration: 0.8,
    ease: easings.apple,
  } as Transition,
  // Fast micro-interaction
  fast: {
    duration: 0.4,
    ease: easings.smoothIn,
  } as Transition,
  // Slow cinematic reveal
  slow: {
    duration: 1.2,
    ease: easings.cinematic,
  } as Transition,
  // Spring-based
  spring: {
    type: 'spring',
    ...springs.smooth,
  } as Transition,
  // Bouncy spring
  springBounce: {
    type: 'spring',
    ...springs.bouncy,
  } as Transition,
} as const;

// ═══════════════════════════════════════════════════════════════
// VIEWPORT CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════

export const viewportConfig = {
  // Standard reveal
  standard: { once: true, margin: '-10% 0px -10% 0px', amount: 0.3 },
  // Early reveal for large elements
  early: { once: true, margin: '-5% 0px -5% 0px', amount: 0.2 },
  // Late reveal for smaller elements
  late: { once: true, margin: '-15% 0px -15% 0px', amount: 0.4 },
  // Re-animate on every scroll
  repeat: { once: false, margin: '-10% 0px -10% 0px', amount: 0.3 },
} as const;

// ═══════════════════════════════════════════════════════════════
// SMOOTH FADE ANIMATIONS (Apple-inspired)
// ═══════════════════════════════════════════════════════════════

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: easings.apple }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.9, ease: easings.apple }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.9, ease: easings.apple }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.9, ease: easings.apple }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.9, ease: easings.apple }
  }
};

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCALE ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: easings.apple }
  }
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring',
      ...springs.bouncy
    }
  }
};

export const scaleInSmooth: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.7, ease: easings.smoothInOut }
  }
};

// ═══════════════════════════════════════════════════════════════
// STAGGER CONTAINERS (Improved timing)
// ═══════════════════════════════════════════════════════════════

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
      ease: easings.apple,
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08,
    }
  }
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// CARD ANIMATIONS (Premium feel)
// ═══════════════════════════════════════════════════════════════

export const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    transition: { type: 'spring', ...springs.card }
  },
  hover: { 
    scale: 1.02,
    y: -8,
    transition: { type: 'spring', ...springs.card }
  }
};

export const cardHoverPremium = {
  rest: { 
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    transition: { type: 'spring', ...springs.smooth }
  },
  hover: { 
    scale: 1.03,
    y: -12,
    transition: { type: 'spring', ...springs.magnetic }
  }
};

export const cardReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.96,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.9, 
      ease: easings.apple,
    }
  }
};

// Glassmorphism card animation
export const glassCard: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: easings.apple }
  }
};

// ═══════════════════════════════════════════════════════════════
// FLOATING & PULSE ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const floatGentle: Variants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [-5, 5, -5],
    rotate: [-1, 1, -1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const pulse: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const pulseRing: Variants = {
  initial: { scale: 1, opacity: 0.8 },
  animate: {
    scale: [1, 1.3, 1.5],
    opacity: [0.8, 0.4, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeOut'
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// MAGNETIC HOVER EFFECTS
// ═══════════════════════════════════════════════════════════════

export const magneticHover = {
  rest: {
    scale: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring', ...springs.magnetic }
  },
  hover: {
    scale: 1.1,
    transition: { type: 'spring', ...springs.magnetic }
  }
};

export const magneticDot = {
  rest: {
    scale: 1,
    transition: { type: 'spring', ...springs.snappy }
  },
  hover: {
    scale: 1.8,
    transition: { type: 'spring', ...springs.magnetic }
  }
};

// ═══════════════════════════════════════════════════════════════
// JOURNEY NAVIGATION ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const journeyDot: Variants = {
  inactive: {
    scale: 1,
    opacity: 0.4,
    transition: { type: 'spring', ...springs.navigation }
  },
  hover: {
    scale: 1.6,
    opacity: 1,
    transition: { type: 'spring', ...springs.magnetic }
  },
  active: {
    scale: 1.4,
    opacity: 1,
    transition: { type: 'spring', ...springs.navigation }
  }
};

export const journeyLabel: Variants = {
  hidden: {
    opacity: 0,
    x: 16,
    transition: { duration: 0.3, ease: easings.smoothIn }
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easings.magnetic }
  }
};

export const journeyProgress: Variants = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1,
    transition: { type: 'spring', ...springs.smooth }
  }
};

// ═══════════════════════════════════════════════════════════════
// EDUCATION SECTION ANIMATIONS (Academic Excellence)
// ═══════════════════════════════════════════════════════════════

export const diplomaReveal: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60,
    rotateY: -15,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    rotateY: 0,
    transition: { 
      duration: 1,
      ease: easings.cinematic,
    }
  }
};

export const timelineDot: Variants = {
  hidden: { 
    scale: 0, 
    opacity: 0,
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: 'spring',
      ...springs.bouncy,
      delay: 0.2
    }
  }
};

export const timelineGlow: Variants = {
  inactive: {
    boxShadow: '0 0 0 0 rgba(212, 175, 55, 0)',
    transition: { duration: 0.5 }
  },
  active: {
    boxShadow: [
      '0 0 0 0 rgba(212, 175, 55, 0.4)',
      '0 0 20px 10px rgba(212, 175, 55, 0.2)',
      '0 0 0 0 rgba(212, 175, 55, 0)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const gradeCountUp = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: easings.apple }
  }
};

export const cardFlip: Variants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.6, ease: easings.smoothInOut }
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.6, ease: easings.smoothInOut }
  }
};

// ═══════════════════════════════════════════════════════════════
// TEXT & WAVE ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const waveContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.08
    }
  }
};

export const waveLetter: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 200
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// SKILL & PROGRESS ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const skillBar: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    opacity: 1,
    transition: { duration: 1.2, ease: easings.apple }
  })
};

export const skillTag: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', ...springs.bouncy }
  }
};

// ═══════════════════════════════════════════════════════════════
// NAVIGATION ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const navSlide: Variants = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: { 
      type: 'spring',
      stiffness: 280,
      damping: 28
    }
  },
  exit: { 
    x: '100%',
    transition: { duration: 0.35, ease: easings.smoothIn }
  }
};

export const navLink: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', ...springs.snappy }
  }
};

// ═══════════════════════════════════════════════════════════════
// PAGE TRANSITIONS
// ═══════════════════════════════════════════════════════════════

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.6, ease: easings.apple }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4, ease: easings.smoothIn }
  }
};

export const sectionReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1,
      ease: easings.apple,
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// ZOOM & BLUR EFFECTS
// ═══════════════════════════════════════════════════════════════

export const zoomReveal: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.92,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.9, ease: easings.apple }
  }
};

export const blurReveal: Variants = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easings.smoothOut }
  }
};

// ═══════════════════════════════════════════════════════════════
// GLOW & AURORA EFFECTS
// ═══════════════════════════════════════════════════════════════

export const auroraGlow: Variants = {
  initial: { 
    opacity: 0.5,
  },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const goldShimmer: Variants = {
  initial: {
    backgroundPosition: '-200% 0',
  },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// PARALLAX & SCROLL EFFECTS
// ═══════════════════════════════════════════════════════════════

export const parallaxSlow = {
  y: ['0%', '-15%'],
};

export const parallaxFast = {
  y: ['0%', '-30%'],
};

export const scrollFade = {
  opacity: [1, 0],
  y: ['0%', '-10%'],
};

// ═══════════════════════════════════════════════════════════════
// BUTTON ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const buttonTap = {
  scale: 0.96,
  transition: { duration: 0.1 }
};

export const buttonHover = {
  scale: 1.03,
  transition: { type: 'spring', ...springs.snappy }
};

export const buttonRipple: Variants = {
  initial: { scale: 0, opacity: 0.5 },
  animate: {
    scale: 4,
    opacity: 0,
    transition: { duration: 0.6, ease: easings.smoothOut }
  }
};

// ═══════════════════════════════════════════════════════════════
// ICON ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const iconRotate: Variants = {
  initial: { rotate: 0 },
  hover: { 
    rotate: 360,
    transition: { duration: 0.6, ease: easings.smoothInOut }
  }
};

export const iconBounce: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-3, 3, -3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// LOADING ANIMATIONS
// ═══════════════════════════════════════════════════════════════

export const cursorBlink: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

export const spinner: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// MORPHING SHAPES
// ═══════════════════════════════════════════════════════════════

export const morphShape: Variants = {
  initial: { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
  animate: {
    borderRadius: [
      '30% 70% 70% 30% / 30% 30% 70% 70%',
      '70% 30% 30% 70% / 70% 70% 30% 30%',
      '30% 70% 70% 30% / 30% 30% 70% 70%'
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// SECTION TRANSITION EFFECTS
// ═══════════════════════════════════════════════════════════════

export const sectionTransitions = {
  fadeSlide: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.9, ease: easings.apple }
    },
    exit: { 
      opacity: 0, 
      y: -40,
      transition: { duration: 0.5, ease: easings.smoothIn }
    }
  },
  
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.9, ease: easings.apple }
    },
    exit: { 
      opacity: 0, 
      x: -60,
      transition: { duration: 0.5, ease: easings.smoothIn }
    }
  },
  
  zoomFade: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.9, ease: easings.apple }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      transition: { duration: 0.5, ease: easings.smoothIn }
    }
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// UTILITY EXPORTS
// ═══════════════════════════════════════════════════════════════

// Helper for creating custom spring transitions
export const createSpring = (stiffness = 100, damping = 30, mass = 0.5) => ({
  type: 'spring' as const,
  stiffness,
  damping,
  mass,
});

// Helper for creating smooth transitions with custom duration
export const createSmooth = (duration = 0.8, ease = easings.apple) => ({
  duration,
  ease,
});

// Bubble animation (keeping for compatibility)
export const bubbleFloat: Variants = {
  initial: { y: 0, opacity: 0.7 },
  animate: {
    y: [-20, -100],
    opacity: [0.7, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeOut'
    }
  }
};
