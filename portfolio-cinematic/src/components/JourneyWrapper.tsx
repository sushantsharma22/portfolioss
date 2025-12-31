'use client';

import { ReactNode, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface JourneyWrapperProps {
    children: ReactNode;
}

const chapters = [
    { id: 'home', name: 'Home', number: '01', color: 'bg-amber-400' },
    { id: 'about', name: 'About', number: '02', color: 'bg-sky-400' },
    { id: 'experience', name: 'Experience', number: '03', color: 'bg-amber-500' },
    { id: 'projects', name: 'Projects', number: '04', color: 'bg-sky-500' },
    { id: 'skills', name: 'Skills', number: '05', color: 'bg-teal-400' },
    { id: 'education', name: 'Education', number: '06', color: 'bg-orange-400' },
    { id: 'certificates', name: 'Certificates', number: '07', color: 'bg-cyan-400' },
    { id: 'contact', name: 'Contact', number: '08', color: 'bg-stone-400' },
];

export default function JourneyWrapper({ children }: JourneyWrapperProps) {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 30,
    });

    return (
        <div className="relative">
            {/* Chapter Navigation - Fixed Right Side */}
            <nav
                className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4"
                aria-label="Page sections"
            >
                {chapters.map((chapter) => (
                    <a
                        key={chapter.id}
                        href={`#${chapter.id}`}
                        className="group relative flex items-center"
                        title={chapter.name}
                    >
                        {/* Dot with color on hover */}
                        <div className={`w-2 h-2 rounded-full bg-stone-300 group-hover:${chapter.color} group-hover:scale-150 transition-all duration-300`} />

                        {/* Label on hover */}
                        <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                            <span className="text-stone-400 text-xs mr-2 font-medium">{chapter.number}</span>
                            <span className="text-stone-600 text-xs font-medium">{chapter.name}</span>
                        </div>
                    </a>
                ))}

                {/* Progress line */}
                <div className="absolute top-0 bottom-0 right-[3px] w-px bg-stone-200 -z-10">
                    <motion.div
                        className="w-full bg-gradient-to-b from-sky-400 to-teal-400 origin-top"
                        style={{ scaleY: smoothProgress }}
                    />
                </div>
            </nav>

            {/* Content */}
            <div className="relative">
                {children}
            </div>
        </div>
    );
}
