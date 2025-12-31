'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Declare lenis on window for global access
declare global {
    interface Window {
        lenis: Lenis | null;
    }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            return; // Skip smooth scroll for users who prefer reduced motion
        }

        // Initialize Lenis with snappier configuration
        const lenis = new Lenis({
            duration: 1.0, // Faster: 1.0s instead of 1.2s
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;
        
        // Expose lenis globally for journey navigation
        window.lenis = lenis;

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
            window.lenis = null;
        };
    }, []);

    return <>{children}</>;
}

// Export hook for other components to control scroll
export function useLenis() {
    return {
        scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => {
            if (typeof window !== 'undefined' && window.lenis) {
                window.lenis.scrollTo(target, {
                    duration: options?.duration ?? 0.8,
                    offset: options?.offset ?? 0,
                });
            } else if (typeof window !== 'undefined') {
                // Fallback to native scroll
                const element = typeof target === 'string' ? document.querySelector(target) : 
                               target instanceof HTMLElement ? target : null;
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else if (typeof target === 'number') {
                    window.scrollTo({ top: target, behavior: 'smooth' });
                }
            }
        },
    };
}
