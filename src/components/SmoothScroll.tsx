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
            return; // Use native scroll for reduced motion preference
        }

        const isMobile = window.innerWidth < 768;

        // Initialize Lenis with device-specific settings
        const lenis = new Lenis({
            duration: isMobile ? 2.0 : 1.2, // Slower on mobile
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: isMobile ? 0.3 : 1.0, // Very slow touch scroll on mobile
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
