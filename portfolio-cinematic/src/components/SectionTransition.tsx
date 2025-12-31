'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionTransitionProps {
    children: ReactNode;
    chapter: string;
    chapterNumber: string;
    transitionType?: 'fade' | 'zoom' | 'slide' | 'rotate' | 'depth';
    direction?: 'left' | 'right' | 'up' | 'down';
}

export default function SectionTransition({
    children,
    chapter,
    chapterNumber,
    transitionType = 'zoom',
    direction = 'up',
}: SectionTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Different transform values based on transition type
    const getEntryTransforms = () => {
        switch (transitionType) {
            case 'zoom':
                return {
                    scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]),
                    opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]),
                    rotateX: useTransform(scrollYProgress, [0, 0.3], [15, 0]),
                };
            case 'slide':
                const slideX = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
                const slideY = direction === 'up' ? 100 : direction === 'down' ? -100 : 0;
                return {
                    x: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [slideX, 0, 0, -slideX / 2]),
                    y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [slideY, 0, 0, -slideY / 2]),
                    opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]),
                };
            case 'rotate':
                return {
                    rotateY: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-15, 0, 0, 5]),
                    rotateX: useTransform(scrollYProgress, [0, 0.3], [10, 0]),
                    opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]),
                    scale: useTransform(scrollYProgress, [0, 0.3], [0.9, 1]),
                };
            case 'depth':
                return {
                    z: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-200, 0, 0, 100]),
                    opacity: useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]),
                    scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.5, 1, 1, 0.9]),
                    filter: useTransform(scrollYProgress, [0, 0.2], ['blur(10px)', 'blur(0px)']),
                };
            default: // fade
                return {
                    opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
                };
        }
    };

    const transforms = getEntryTransforms();

    return (
        <div ref={containerRef} className="relative" style={{ perspective: '1200px' }}>
            {/* Chapter indicator that fades in */}
            <motion.div
                className="absolute top-0 left-0 z-10 p-8 pointer-events-none"
                style={{
                    opacity: useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 1, 0]),
                }}
            >
                <div className="flex items-center gap-4">
                    <span className="text-emerald-400/50 text-6xl font-black">{chapterNumber}</span>
                    <div>
                        <div className="w-12 h-px bg-emerald-400/30 mb-2" />
                        <span className="text-white/40 text-sm tracking-[0.3em] uppercase">{chapter}</span>
                    </div>
                </div>
            </motion.div>

            {/* Main content with transitions */}
            <motion.div
                style={{
                    ...transforms,
                    transformStyle: 'preserve-3d',
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
