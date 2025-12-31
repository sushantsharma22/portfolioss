'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { projects } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

const colorMap: Record<string, string> = {
    'ai-ml': 'from-violet-500 to-purple-600',
    'data': 'from-emerald-500 to-teal-600',
    'web': 'from-sky-500 to-blue-600',
    'mobile': 'from-amber-500 to-orange-600',
};

// Card dimensions
const CARD_WIDTH = 420;
const CARD_GAP = 24;
const PADDING = 64; // px-16 = 64px

export default function Projects() {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ target: targetRef });
    const smoothProgress = useSpring(scrollYProgress, springs.smooth);

    // Calculate how much to shift left as cards accumulate
    // Each card takes up CARD_WIDTH + CARD_GAP
    // We start shifting once we have more than ~2 cards visible
    const maxShift = Math.max(0, (projects.length - 2) * (CARD_WIDTH + CARD_GAP));

    const containerX = useTransform(
        smoothProgress,
        [0.3, 0.9],
        [0, -maxShift]
    );

    return (
        <section
            ref={targetRef}
            className="relative"
            style={{ height: `${(projects.length + 1) * 100}vh` }}
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
                    className="pt-8 px-8 md:px-16 z-30 flex-shrink-0"
                >
                    <span className="text-sky-500 text-sm font-bold tracking-[0.3em]">03 — WORK</span>
                    <h2 className="text-3xl md:text-4xl font-black text-stone-800 mt-1 tracking-tight">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-sky-500 to-amber-500">Projects</span>
                    </h2>
                </motion.div>

                {/* Cards Container - fills remaining height */}
                <div className="flex-1 relative overflow-hidden">
                    {/* Horizontal scrolling container */}
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 flex items-center gap-6 px-8 md:px-16"
                        style={{ x: containerX }}
                    >
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                totalProjects={projects.length}
                                smoothProgress={smoothProgress}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Progress bar */}
                <div className="flex-shrink-0 px-8 md:px-16 pb-6">
                    <div className="h-1 bg-stone-200/50 rounded-full overflow-hidden">
                        <motion.div
                            style={{ scaleX: smoothProgress }}
                            className="h-full bg-gradient-to-r from-violet-500 to-sky-500 origin-left"
                        />
                    </div>
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
    smoothProgress
}: {
    project: typeof projects[0];
    index: number;
    totalProjects: number;
    smoothProgress: MotionValue<number>;
}) {
    const color = colorMap[project.category] || 'from-stone-500 to-stone-600';

    // Each project's phase
    const phaseStart = index / (totalProjects + 1);
    const phaseMid = (index + 0.5) / (totalProjects + 1);

    // Opacity: hidden before phase, fade in during phase, stay visible
    const opacity = useTransform(
        smoothProgress,
        [phaseStart, phaseMid, 1],
        [0, 1, 1]
    );

    // Scale: appear at full size
    const scale = useTransform(
        smoothProgress,
        [phaseStart, phaseMid, 1],
        [0.85, 1, 1]
    );

    // Y: slide up into view
    const y = useTransform(
        smoothProgress,
        [phaseStart, phaseMid, 1],
        [40, 0, 0]
    );

    return (
        <motion.div
            className="flex-shrink-0"
            style={{
                opacity,
                scale,
                y,
                width: CARD_WIDTH,
                height: '75%',
            }}
        >
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
            >
                <motion.div
                    className={`h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100/80 flex flex-col ${project.featured ? 'ring-2 ring-amber-200/50' : ''}`}
                    whileHover={{ y: -8, boxShadow: '0 35px 70px rgba(0,0,0,0.15)' }}
                    transition={{ type: 'spring', ...springs.snappy }}
                >
                    {/* Gradient header */}
                    <div className={`h-[35%] bg-gradient-to-br ${color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10" />
                        <span className="absolute top-5 right-5 text-5xl opacity-80">
                            {project.icon}
                        </span>
                        {project.featured && (
                            <span className="absolute top-5 left-5 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                                ⭐ Featured
                            </span>
                        )}
                        <div className="absolute bottom-4 left-5 right-5">
                            <h3 className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    {/* Content area */}
                    <div className="h-[65%] p-5 flex flex-col">
                        <p className="text-stone-600 text-sm leading-relaxed flex-1 line-clamp-4">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {project.techStack.slice(0, 5).map((t) => (
                                <span key={t} className="px-2 py-1 bg-stone-50 text-stone-600 text-xs font-medium rounded-full border border-stone-100">
                                    {t}
                                </span>
                            ))}
                            {project.techStack.length > 5 && (
                                <span className="px-2 py-1 bg-stone-50 text-stone-400 text-xs rounded-full">
                                    +{project.techStack.length - 5}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors mt-4 pt-3 border-t border-stone-100 text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            <span className="font-medium">View on GitHub →</span>
                        </div>
                    </div>
                </motion.div>
            </a>
        </motion.div>
    );
}
