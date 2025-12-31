'use client';

import { ReactNode, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface JourneyWrapperProps {
    children: ReactNode;
}

// Chapter definitions for the journey
const chapters = [
    { id: 'home', name: 'Home', number: '01' },
    { id: 'about', name: 'About', number: '02' },
    { id: 'experience', name: 'Experience', number: '03' },
    { id: 'projects', name: 'Projects', number: '04' },
    { id: 'skills', name: 'Skills', number: '05' },
    { id: 'certificates', name: 'Certificates', number: '06' },
    { id: 'contact', name: 'Contact', number: '07' },
];

export default function JourneyWrapper({ children }: JourneyWrapperProps) {
    const { scrollYProgress } = useScroll();

    // Lightweight spring for progress - less stiff = less updates
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 30,
        restDelta: 0.001
    });

    // Memoize chapter positions to avoid recalculation
    const chapterPositions = useMemo(() =>
        chapters.map((_, i) => i / chapters.length),
        []
    );

    return (
        <div className="relative">
            {/* Lightweight Journey Progress Indicator - CSS only, no per-frame calculations */}
            <nav
                className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3"
                aria-label="Page sections"
            >
                {chapters.map((chapter, index) => (
                    <a
                        key={chapter.id}
                        href={`#${chapter.id}`}
                        className="group relative flex items-center"
                        title={chapter.name}
                    >
                        {/* Simple dot with CSS hover */}
                        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300" />

                        {/* Label on hover - CSS only */}
                        <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                            <span className="text-white/40 text-xs mr-2">{chapter.number}</span>
                            <span className="text-white/60 text-xs">{chapter.name}</span>
                        </div>
                    </a>
                ))}

                {/* Progress line - single animated element */}
                <div className="absolute top-0 bottom-0 right-[3px] w-px bg-white/10 -z-10">
                    <motion.div
                        className="w-full bg-gradient-to-b from-emerald-400 to-cyan-400 origin-top"
                        style={{ scaleY: smoothProgress }}
                    />
                </div>
            </nav>

            {/* Content - no 3D transforms, just simple wrapper */}
            <div className="relative">
                {children}
            </div>

            {/* Subtle vignette - pure CSS, no JS */}
            <div
                className="fixed inset-0 pointer-events-none z-40 opacity-50"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
                }}
            />
        </div>
    );
}
