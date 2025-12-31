/**
 * Section Transition Configuration
 * Premium scroll-based transitions between portfolio sections
 */

export interface TransitionConfig {
    name: string;
    description: string;
    duration: number; // in seconds
    scrollStart: number; // viewport percentage (0.8 = 80%)
    scrollEnd: number; // viewport percentage (0.2 = 20%)
    easing: number[]; // cubic bezier
}

// Transition configurations for each section boundary
export const transitions: Record<string, TransitionConfig> = {
    'hero-about': {
        name: 'Page Curl',
        description: 'Turning the first page of a story',
        duration: 1.2,
        scrollStart: 0.8,
        scrollEnd: 0.2,
        easing: [0.25, 0.1, 0.25, 1.0], // Apple easing
    },
    'about-experience': {
        name: 'Horizontal Wipe',
        description: 'Stepping into professional journey',
        duration: 0.9,
        scrollStart: 0.7,
        scrollEnd: 0.3,
        easing: [0.4, 0, 0.2, 1],
    },
    'experience-projects': {
        name: 'Card Shuffle',
        description: 'Portfolio pieces flying into view',
        duration: 1.0,
        scrollStart: 0.75,
        scrollEnd: 0.25,
        easing: [0.22, 1, 0.36, 1], // Magnetic easing
    },
    'projects-skills': {
        name: 'Liquid Morph',
        description: 'Ideas flowing into capabilities',
        duration: 1.5,
        scrollStart: 0.8,
        scrollEnd: 0.2,
        easing: [0.83, 0, 0.17, 1], // Cinematic easing
    },
    'skills-education': {
        name: 'Book Opening',
        description: 'Opening the academic chapter',
        duration: 1.3,
        scrollStart: 0.75,
        scrollEnd: 0.25,
        easing: [0.25, 0.1, 0.25, 1.0],
    },
    'education-certificates': {
        name: 'Gallery Slide',
        description: 'Achievements revealed in gallery',
        duration: 1.0,
        scrollStart: 0.7,
        scrollEnd: 0.3,
        easing: [0.4, 0, 0.2, 1],
    },
    'certificates-contact': {
        name: 'Zoom Focus',
        description: 'Focus on connection',
        duration: 0.8,
        scrollStart: 0.65,
        scrollEnd: 0.35,
        easing: [0.4, 0, 0.2, 1],
    },
};

// Animation variants for Framer Motion
export const transitionVariants = {
    // Page Curl effect (Hero exit)
    pageCurl: {
        initial: {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            transform: 'perspective(1200px) rotateX(0deg)',
            opacity: 1,
        },
        exit: {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 20%)',
            transform: 'perspective(1200px) rotateX(-15deg) translateY(-30%)',
            opacity: 0,
        },
    },

    // Horizontal Wipe effect
    horizontalWipeExit: {
        initial: { x: '0%', filter: 'blur(0px)', opacity: 1 },
        exit: { x: '100%', filter: 'blur(10px)', opacity: 0 },
    },
    horizontalWipeEnter: {
        initial: { x: '-50%', filter: 'blur(10px)', opacity: 0 },
        enter: { x: '0%', filter: 'blur(0px)', opacity: 1 },
    },

    // Gallery Slide with Parallax
    gallerySlideExit: {
        initial: { y: '0%', scale: 1, filter: 'blur(0px)' },
        exit: { y: '-100%', scale: 0.95, filter: 'blur(3px)' },
    },
    gallerySlideEnter: {
        initial: { y: '15%', scale: 0.98, opacity: 0.8 },
        enter: { y: '0%', scale: 1, opacity: 1 },
    },

    // Zoom Focus effect
    zoomFocusExit: {
        initial: { scale: 1, filter: 'blur(0px)', opacity: 1 },
        exit: { scale: 0.9, filter: 'blur(8px)', opacity: 0.5 },
    },
    zoomFocusEnter: {
        initial: { scale: 0.9, filter: 'blur(8px)', opacity: 0 },
        enter: { scale: 1, filter: 'blur(0px)', opacity: 1 },
    },

    // Book Opening effect
    bookCloseLeft: {
        initial: { rotateY: 0, opacity: 1 },
        exit: { rotateY: -90, opacity: 0 },
    },
    bookOpenRight: {
        initial: { rotateY: 90, opacity: 0 },
        enter: { rotateY: 0, opacity: 1 },
    },
};

// Section color palette for transitions
export const sectionColors = {
    hero: { primary: '#f59e0b', secondary: '#ea580c' },
    about: { primary: '#0ea5e9', secondary: '#3b82f6' },
    experience: { primary: '#f97316', secondary: '#ea580c' },
    projects: { primary: '#8b5cf6', secondary: '#a855f7' },
    skills: { primary: '#14b8a6', secondary: '#10b981' },
    education: { primary: '#eab308', secondary: '#f59e0b' },
    certificates: { primary: '#06b6d4', secondary: '#0ea5e9' },
    contact: { primary: '#f43f5e', secondary: '#ec4899' },
};

// Helper function to interpolate between values
export function interpolate(progress: number, from: number, to: number): number {
    return from + (to - from) * progress;
}

// Helper to check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
