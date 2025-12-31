import type { Variants } from 'framer-motion';

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.68, -0.55, 0.265, 1.55] // Bounce effect
    }
  }
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Card hover animations
export const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  hover: { 
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// Glassmorphism card animation
export const glassCard: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    backdropFilter: 'blur(0px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    backdropFilter: 'blur(20px)',
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Floating animation for decorative elements
export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Pulse animation
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Wave animation for text
export const waveContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1
    }
  }
};

export const waveLetter: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200
    }
  }
};

// Skill bar animation
export const skillBar: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    opacity: 1,
    transition: { duration: 1, ease: 'easeOut' }
  })
};

// Navigation animations
export const navSlide: Variants = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    x: '100%',
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// Zoom reveal for content cards
export const zoomReveal: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

// Aurora glow effect
export const auroraGlow: Variants = {
  initial: { 
    opacity: 0.5,
    filter: 'blur(100px)'
  },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    filter: ['blur(100px)', 'blur(150px)', 'blur(100px)'],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Bubble float animation for ocean section
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

// Parallax scroll effect
export const parallaxSlow = {
  y: ['0%', '-20%'],
  transition: { ease: 'linear' }
};

export const parallaxFast = {
  y: ['0%', '-40%'],
  transition: { ease: 'linear' }
};

// Button animations
export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

// Icon rotation
export const iconRotate: Variants = {
  initial: { rotate: 0 },
  hover: { 
    rotate: 360,
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
};

// Typing cursor blink
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

// Loading spinner
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

// Morphing shapes for background
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
