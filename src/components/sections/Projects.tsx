'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { projects } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

const colorMap: Record<string, string> = {
    'ai-ml': 'from-violet-500 to-purple-600',
    'data': 'from-emerald-500 to-teal-600',
    'web': 'from-sky-500 to-blue-600',
    'mobile': 'from-amber-500 to-orange-600',
};

// DESKTOP CONFIG
const DESKTOP_CARD_WIDTH = 380;
const DESKTOP_CARD_GAP = 24;
const DESKTOP_PADDING = 64;

// MOBILE CONFIG
const MOBILE_CARD_WIDTH = 260;
const MOBILE_CARD_GAP = 16;
const MOBILE_PADDING = 20;

export default function Projects() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(1200);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setIsMobile(w < 768);
            setViewportWidth(w);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll({ target: targetRef });

    // Smooth spring - gentler for mobile to avoid snap
    const smoothProgress = useSpring(scrollYProgress,
        isMobile
            ? { stiffness: 60, damping: 20, mass: 0.5 } // Mobile: gentler, no snap
            : { stiffness: 80, damping: 22 } // Desktop
    );

    // Calculate dimensions based on device
    const CARD_WIDTH = isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH;
    const CARD_GAP = isMobile ? MOBILE_CARD_GAP : DESKTOP_CARD_GAP;
    const PADDING = isMobile ? MOBILE_PADDING : DESKTOP_PADDING;

    // Total width of all cards
    const totalCardsWidth = projects.length * CARD_WIDTH + (projects.length - 1) * CARD_GAP;
    const visibleArea = viewportWidth - 2 * PADDING;

    // How much to shift to show ALL cards including the last one
    const maxShift = Math.max(0, totalCardsWidth - visibleArea + PADDING);

    // Section height: enough to reveal all cards
    const sectionHeight = isMobile
        ? `${(projects.length + 2) * 35}vh` // Mobile: taller sections
        : `${(projects.length + 2) * 45}vh`; // Desktop

    // Container shift animation
    const containerX = useTransform(
        smoothProgress,
        [0.08, 0.92],
        [0, -maxShift]
    );

    return (
        <section
            ref={targetRef}
            className="relative"
            style={{ height: sectionHeight }}
            id="projects"
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50/30 to-violet-50/20" />

            {/* STICKY CONTAINER */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: easings.apple }}
                    className="pt-6 md:pt-8 px-4 md:px-16 z-30 flex-shrink-0"
                >
                    <span className="text-sky-500 text-xs md:text-sm font-bold tracking-[0.3em]">03 — WORK</span>
                    <h2 className="text-2xl md:text-4xl font-black text-stone-800 mt-1 tracking-tight">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-sky-500 to-amber-500">Projects</span>
                    </h2>
                </motion.div>

                {/* Cards Container */}
                <div className="flex-1 relative overflow-hidden">
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 flex items-center"
                        style={{
                            x: containerX,
                            gap: CARD_GAP,
                            paddingLeft: PADDING,
                            paddingRight: PADDING
                        }}
                    >
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                totalProjects={projects.length}
                                smoothProgress={smoothProgress}
                                isMobile={isMobile}
                                cardWidth={CARD_WIDTH}
                            />
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

// Individual project card
function ProjectCard({
    project,
    index,
    totalProjects,
    smoothProgress,
    isMobile,
    cardWidth
}: {
    project: typeof projects[0];
    index: number;
    totalProjects: number;
    smoothProgress: MotionValue<number>;
    isMobile: boolean;
    cardWidth: number;
}) {
    const color = colorMap[project.category] || 'from-stone-500 to-stone-600';

    // Each card's reveal phase
    const phaseStart = index / (totalProjects + 1);
    const phaseMid = (index + 0.5) / (totalProjects + 1);

    const opacity = useTransform(smoothProgress, [phaseStart, phaseMid], [0, 1]);
    const scale = useTransform(smoothProgress, [phaseStart, phaseMid], [0.85, 1]);
    const y = useTransform(smoothProgress, [phaseStart, phaseMid], [30, 0]);

    const cardHeight = isMobile ? '65%' : '70%';

    return (
        <motion.div
            className="flex-shrink-0"
            style={{
                opacity,
                scale,
                y,
                width: cardWidth,
                height: cardHeight,
            }}
        >
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
            >
                <motion.div
                    className={`h-full bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-stone-100/80 flex flex-col ${project.featured ? 'ring-2 ring-amber-200/50' : ''}`}
                    whileHover={isMobile ? {} : { y: -8, boxShadow: '0 35px 70px rgba(0,0,0,0.15)' }}
                    transition={{ type: 'spring', ...springs.snappy }}
                >
                    {/* Gradient header */}
                    <div className={`${isMobile ? 'h-[30%]' : 'h-[35%]'} bg-gradient-to-br ${color} relative overflow-hidden flex items-center justify-center`}>
                        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />

                        <span className={`relative z-10 ${isMobile ? 'text-5xl' : 'text-7xl md:text-8xl'} drop-shadow-2xl`}>
                            {project.icon}
                        </span>

                        {project.featured && (
                            <span className="absolute top-2 left-2 md:top-4 md:left-4 px-2 md:px-3 py-0.5 md:py-1 bg-white/20 backdrop-blur-md text-white text-[9px] md:text-xs font-bold rounded-full border border-white/30">
                                ⭐ Featured
                            </span>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 bg-gradient-to-t from-black/50 to-transparent">
                            <h3 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-black text-white leading-tight drop-shadow-lg`}>
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`${isMobile ? 'h-[70%]' : 'h-[65%]'} p-3 md:p-6 flex flex-col bg-stone-50/50`}>
                        <p className={`text-stone-600 ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed mb-2 md:mb-4 line-clamp-3 md:line-clamp-4 font-medium`}>
                            {project.description}
                        </p>

                        <div className="flex-1 overflow-y-auto pr-1">
                            <div className="flex flex-wrap gap-1 md:gap-2">
                                {project.techStack.slice(0, isMobile ? 6 : 12).map((t) => (
                                    <span key={t} className={`px-1.5 md:px-2.5 py-0.5 md:py-1 bg-white text-stone-600 ${isMobile ? 'text-[9px]' : 'text-[11px]'} font-semibold rounded-md border border-stone-200 shadow-sm whitespace-nowrap`}>
                                        {t}
                                    </span>
                                ))}
                                {project.techStack.length > (isMobile ? 6 : 12) && (
                                    <span className={`px-1.5 md:px-2.5 py-0.5 md:py-1 bg-stone-100 text-stone-500 ${isMobile ? 'text-[9px]' : 'text-[11px]'} font-semibold rounded-md`}>
                                        +{project.techStack.length - (isMobile ? 6 : 12)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-stone-400 mt-2 md:mt-5 pt-2 md:pt-4 border-t border-stone-200 text-xs md:text-sm font-bold">
                            <span className="p-1 md:p-1.5 rounded-full bg-stone-200">
                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            </span>
                            <span>View Source</span>
                        </div>
                    </div>
                </motion.div>
            </a>
        </motion.div>
    );
}
