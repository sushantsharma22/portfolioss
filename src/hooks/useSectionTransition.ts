'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { transitions, prefersReducedMotion } from '@/lib/sectionTransitions';

interface TransitionValues {
    progress: MotionValue<number>;
    opacity: MotionValue<number>;
    x: MotionValue<string>;
    y: MotionValue<string>;
    scale: MotionValue<number>;
    rotateY: MotionValue<number>;
    rotateX: MotionValue<number>;
    blur: MotionValue<string>;
    clipPath: MotionValue<string>;
}

interface UseSectionTransitionOptions {
    transitionKey: string;
    direction?: 'enter' | 'exit';
    disabled?: boolean;
}

/**
 * Hook to create smooth section transitions based on scroll position
 */
export function useSectionTransition(
    options: UseSectionTransitionOptions
): TransitionValues & { ref: React.RefObject<HTMLDivElement | null> } {
    const { transitionKey, direction = 'enter', disabled = false } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        setIsReducedMotion(prefersReducedMotion());
    }, []);

    const config = transitions[transitionKey] ?? transitions['hero-about'];
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`start ${config?.scrollStart ?? 'end'}`, `start ${config?.scrollEnd ?? 'start'}`],
    });

    // Smooth spring for natural feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // If reduced motion or disabled, return static values
    const isDisabled = disabled || isReducedMotion;

    // Transform values based on transition type
    const progress = smoothProgress;
    
    const opacity = useTransform(
        smoothProgress,
        [0, 0.3, 0.7, 1],
        direction === 'enter' ? [0, 0.5, 0.9, 1] : [1, 0.9, 0.5, 0]
    );

    const x = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'enter' ? ['-30%', '0%'] : ['0%', '30%']
    );

    const y = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'enter' ? ['50px', '0px'] : ['0px', '-50px']
    );

    const scale = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'enter' ? [0.95, 1] : [1, 0.95]
    );

    const rotateY = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'enter' ? [15, 0] : [0, -15]
    );

    const rotateX = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'enter' ? [10, 0] : [0, -10]
    );

    const blur = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        direction === 'enter' 
            ? ['blur(10px)', 'blur(5px)', 'blur(0px)']
            : ['blur(0px)', 'blur(5px)', 'blur(10px)']
    );

    const clipPath = useTransform(
        smoothProgress,
        [0, 1],
        [
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ]
    );

    return {
        ref,
        progress,
        opacity: isDisabled ? useTransform(() => 1) : opacity,
        x: isDisabled ? useTransform(() => '0%') : x,
        y: isDisabled ? useTransform(() => '0px') : y,
        scale: isDisabled ? useTransform(() => 1) : scale,
        rotateY: isDisabled ? useTransform(() => 0) : rotateY,
        rotateX: isDisabled ? useTransform(() => 0) : rotateX,
        blur: isDisabled ? useTransform(() => 'blur(0px)') : blur,
        clipPath,
    } as TransitionValues & { ref: React.RefObject<HTMLDivElement | null> };
}

/**
 * Specialized hook for Hero → About page curl transition
 */
export function usePageCurlTransition() {
    const ref = useRef<HTMLDivElement>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        setIsReducedMotion(prefersReducedMotion());
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    const opacity = useTransform(smoothProgress, [0, 0.6, 1], [1, 0.8, 0]);
    const scale = useTransform(smoothProgress, [0, 1], [1, 0.95]);
    const rotateX = useTransform(smoothProgress, [0, 1], [0, -8]);
    const y = useTransform(smoothProgress, [0, 1], ['0%', '-15%']);
    
    // Page curl clip path
    const clipPath = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        [
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            'polygon(0% 0%, 100% 0%, 100% 85%, 0% 95%)',
            'polygon(0% 0%, 100% 0%, 100% 0%, 0% 20%)',
        ]
    );

    // Shadow that follows curl
    const shadowOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.4, 0]);

    if (isReducedMotion) {
        return {
            ref,
            style: {},
            shadowOpacity: useTransform(() => 0),
        };
    }

    return {
        ref,
        style: {
            opacity,
            scale,
            rotateX,
            y,
            clipPath,
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d' as const,
        },
        shadowOpacity,
    };
}

/**
 * Hook for horizontal wipe transition (About → Experience)
 */
export function useHorizontalWipeTransition(direction: 'exit' | 'enter') {
    const ref = useRef<HTMLDivElement>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        setIsReducedMotion(prefersReducedMotion());
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: direction === 'exit' 
            ? ['end end', 'end start']
            : ['start end', 'start 0.3'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 25,
    });

    const x = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'exit' ? ['0%', '100%'] : ['-50%', '0%']
    );

    // Blur increases then decreases (parabolic)
    const blurAmount = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        direction === 'exit' ? [0, 8, 0] : [8, 4, 0]
    );

    const opacity = useTransform(
        smoothProgress,
        [0, 0.3, 0.7, 1],
        direction === 'exit' ? [1, 0.9, 0.5, 0] : [0, 0.5, 0.9, 1]
    );

    if (isReducedMotion) {
        return { ref, style: {} };
    }

    return {
        ref,
        style: {
            x,
            opacity,
            filter: useTransform(blurAmount, (v) => `blur(${v}px)`),
        },
    };
}

/**
 * Hook for gallery slide with parallax (Education → Certificates)
 */
export function useGallerySlideTransition(direction: 'exit' | 'enter') {
    const ref = useRef<HTMLDivElement>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        setIsReducedMotion(prefersReducedMotion());
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: direction === 'exit'
            ? ['end end', 'end start']
            : ['start end', 'start 0.3'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    // Parallax speeds - exit section moves faster
    const parallaxMultiplier = direction === 'exit' ? 1.5 : 0.5;
    
    const y = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'exit' 
            ? ['0%', `-${100 * parallaxMultiplier}%`]
            : [`${15 * parallaxMultiplier}%`, '0%']
    );

    const scale = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'exit' ? [1, 0.95] : [0.98, 1]
    );

    const opacity = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        direction === 'exit' ? [1, 0.8, 0.3] : [0.5, 0.8, 1]
    );

    const blur = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'exit' ? [0, 3] : [2, 0]
    );

    if (isReducedMotion) {
        return { ref, style: {} };
    }

    return {
        ref,
        style: {
            y,
            scale,
            opacity,
            filter: useTransform(blur, (v) => `blur(${v}px)`),
        },
    };
}

/**
 * Hook for zoom focus transition (Certificates → Contact)
 */
export function useZoomFocusTransition(direction: 'exit' | 'enter') {
    const ref = useRef<HTMLDivElement>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        setIsReducedMotion(prefersReducedMotion());
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: direction === 'exit'
            ? ['end 0.65', 'end 0.35']
            : ['start 0.65', 'start 0.35'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 20,
    });

    const scale = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'exit' ? [1, 0.9] : [0.9, 1]
    );

    const blur = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        direction === 'exit' ? [0, 6, 8] : [8, 4, 0]
    );

    const opacity = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'exit' ? [1, 0.5] : [0, 1]
    );

    if (isReducedMotion) {
        return { ref, style: {} };
    }

    return {
        ref,
        style: {
            scale,
            opacity,
            filter: useTransform(blur, (v) => `blur(${v}px)`),
            transformOrigin: 'center center',
        },
    };
}

/**
 * Hook for book opening transition (Skills → Education)
 */
export function useBookOpenTransition(direction: 'exit' | 'enter') {
    const ref = useRef<HTMLDivElement>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        setIsReducedMotion(prefersReducedMotion());
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: direction === 'exit'
            ? ['end end', 'end 0.25']
            : ['start 0.75', 'start 0.25'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
    });

    const rotateY = useTransform(
        smoothProgress,
        [0, 1],
        direction === 'exit' ? [0, -75] : [75, 0]
    );

    const opacity = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        direction === 'exit' ? [1, 0.8, 0] : [0, 0.6, 1]
    );

    const scale = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        direction === 'exit' ? [1, 0.98, 0.95] : [0.95, 0.98, 1]
    );

    if (isReducedMotion) {
        return { ref, style: {} };
    }

    return {
        ref,
        style: {
            rotateY,
            opacity,
            scale,
            transformOrigin: direction === 'exit' ? 'right center' : 'left center',
            transformStyle: 'preserve-3d' as const,
            perspective: 1200,
        },
    };
}

export default useSectionTransition;
