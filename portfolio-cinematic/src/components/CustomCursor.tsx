'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        // Only show custom cursor on desktop
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Direct update without spring for instant response
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Track hover on interactive elements
        const handleElementHover = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, [role="button"], input, textarea, [data-cursor-hover]'
            );

            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        // Run after a small delay to catch dynamically rendered elements
        setTimeout(handleElementHover, 500);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX, // Use raw values for instant tracking
                    y: cursorY,
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                    {/* Outer ring */}
                    <motion.div
                        className="absolute -inset-4 rounded-full border border-white/50"
                        animate={{
                            scale: isHovering ? 1.3 : 1,
                            opacity: isHovering ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Inner dot */}
                    <motion.div
                        className="w-3 h-3 rounded-full bg-white"
                        animate={{
                            scale: isHovering ? 0.5 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.div>
            </motion.div>

            {/* Hide default cursor */}
            <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
        </>
    );
}
