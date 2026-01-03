'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface MouseParallax {
    x: number;           // Normalized X position (-1 to 1)
    y: number;           // Normalized Y position (-1 to 1)
    rotateX: number;     // Rotation around X axis (for tilt)
    rotateY: number;     // Rotation around Y axis (for tilt)
    isHovering: boolean; // Whether mouse is over the target element
}

interface UseMouseParallaxOptions {
    maxRotation?: number;  // Maximum rotation in degrees (default: 5)
    smoothing?: number;    // Smoothing factor 0-1 (default: 0.1)
    disabled?: boolean;    // Disable parallax (for mobile)
}

export function useMouseParallax(options: UseMouseParallaxOptions = {}): MouseParallax & {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
} {
    const { maxRotation = 5, smoothing = 0.1, disabled = false } = options;

    const [state, setState] = useState<MouseParallax>({
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        isHovering: false,
    });

    const targetRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef<number | undefined>(undefined);

    // Smooth animation loop
    useEffect(() => {
        if (disabled) return;

        const animate = () => {
            setState(prev => {
                const newX = prev.x + (targetRef.current.x - prev.x) * smoothing;
                const newY = prev.y + (targetRef.current.y - prev.y) * smoothing;

                // Only update if significant change
                if (Math.abs(newX - prev.x) < 0.001 && Math.abs(newY - prev.y) < 0.001 && !prev.isHovering) {
                    return prev;
                }

                return {
                    ...prev,
                    x: newX,
                    y: newY,
                    rotateX: -newY * maxRotation,  // Inverted for natural feel
                    rotateY: newX * maxRotation,
                };
            });

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [disabled, smoothing, maxRotation]);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (disabled) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize to -1 to 1 range
        targetRef.current = {
            x: (e.clientX - centerX) / (rect.width / 2),
            y: (e.clientY - centerY) / (rect.height / 2),
        };
    }, [disabled]);

    const onMouseEnter = useCallback(() => {
        setState(prev => ({ ...prev, isHovering: true }));
    }, []);

    const onMouseLeave = useCallback(() => {
        setState(prev => ({ ...prev, isHovering: false }));
        targetRef.current = { x: 0, y: 0 };
    }, []);

    return {
        ...state,
        onMouseMove,
        onMouseEnter,
        onMouseLeave,
    };
}

// Hook for detecting mobile devices
export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}
