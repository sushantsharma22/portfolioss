'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            return; // Skip smooth scroll for users who prefer reduced motion
        }

        // Initialize Lenis with premium configuration
        const lenis = new Lenis({
            duration: 1.2, // Smooth scroll duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // RAF loop for continuous updates
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Add lenis class to html element
        document.documentElement.classList.add('lenis', 'lenis-smooth');

        // Cleanup
        return () => {
            lenis.destroy();
            document.documentElement.classList.remove('lenis', 'lenis-smooth');
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}

// Export hook for other components to control scroll
export function useLenis() {
    return {
        scrollTo: (target: string | number, options?: { offset?: number; duration?: number }) => {
            if (typeof window !== 'undefined') {
                const element = typeof target === 'string' ? document.querySelector(target) : null;
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else if (typeof target === 'number') {
                    window.scrollTo({ top: target, behavior: 'smooth' });
                }
            }
        },
    };
}
