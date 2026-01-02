'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { experience } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

const colorMap = [
    { color: 'from-sky-400 to-blue-500', accent: 'sky' },
    { color: 'from-teal-400 to-emerald-500', accent: 'teal' },
    { color: 'from-amber-400 to-orange-500', accent: 'amber' },
    { color: 'from-rose-400 to-pink-500', accent: 'rose' },
    { color: 'from-violet-400 to-purple-500', accent: 'violet' },
];

export default function Experience() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Hydration-safe mobile detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({ target: targetRef });
    const smoothProgress = useSpring(scrollYProgress, springs.smooth);

    // Mobile: shorter scroll height per card
    const heightPerCard = isMobile ? 70 : 100; // vh per card

    // Map progress to active index (0 to experience.length - 1)
    const activeIndexFloat = useTransform(smoothProgress, [0, 1], [0, experience.length - 1]);

    return (
        <section
            ref={targetRef}
            className="relative"
            style={{ height: `${experience.length * heightPerCard}vh` }}
            id="experience"
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-stone-100" />

            {/* STICKY CONTAINER - exactly like Certificates */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-sky-100/30 to-blue-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-100/30 to-orange-100/30 rounded-full blur-3xl" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: easings.apple }}
                    className="absolute top-8 md:top-16 left-4 md:left-16 z-30"
                >
                    <span className="text-amber-600 text-xs md:text-sm font-bold tracking-[0.3em]">02 — EXPERIENCE</span>
                    <h2 className="text-3xl md:text-5xl font-black text-stone-800 mt-2 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-amber-500">Journey</span>
                    </h2>
                </motion.div>

                {/* Cards Container - Centered */}
                <div className="absolute inset-0 flex items-center justify-center pt-8">
                    {experience.map((exp, index) => (
                        <ExperienceCard
                            key={exp.id}
                            exp={exp}
                            index={index}
                            activeIndexFloat={activeIndexFloat}
                        />
                    ))}
                </div>

                {/* Progress Indicators - Left side (hidden on mobile to save space) */}
                <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 flex-col gap-4 hidden md:flex">
                    {experience.map((exp, i) => (
                        <ProgressIndicator
                            key={exp.id}
                            index={i}
                            activeIndexFloat={activeIndexFloat}
                        />
                    ))}
                </div>

                {/* Counter */}
                <div className="absolute bottom-8 md:bottom-16 right-4 md:right-16 text-stone-400 font-mono text-sm md:text-base">
                    <ProgressCounter progress={smoothProgress} total={experience.length} />
                    <span className="mx-1 md:mx-2 text-stone-300">/</span>
                    <span className="text-stone-400">{experience.length.toString().padStart(2, '0')}</span>
                </div>
            </div>
        </section>
    );
}

// Individual card component
function ExperienceCard({
    exp,
    index,
    activeIndexFloat
}: {
    exp: typeof experience[0];
    index: number;
    activeIndexFloat: MotionValue<number>;
}) {
    const colors = colorMap[index % colorMap.length] ?? colorMap[0];

    // Card is fully visible when activeIndexFloat equals this index
    // Fades out as we move away
    const cardOpacity = useTransform(
        activeIndexFloat,
        [index - 0.5, index, index + 0.5],
        [0, 1, 0]
    );

    const cardScale = useTransform(
        activeIndexFloat,
        [index - 0.5, index, index + 0.5],
        [0.9, 1, 0.9]
    );

    const cardY = useTransform(
        activeIndexFloat,
        [index - 0.5, index, index + 0.5],
        [50, 0, -50]
    );

    return (
        <motion.div
            className="absolute w-full max-w-4xl px-2 md:px-8"
            style={{
                opacity: cardOpacity,
                scale: cardScale,
                y: cardY,
            }}
        >
            <div className="bg-white/95 rounded-2xl md:rounded-[2rem] shadow-2xl shadow-stone-200/60 overflow-hidden border border-stone-100/80 max-h-[85vh] md:max-h-none overflow-y-auto">
                {/* Gradient top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${colors?.color}`} />

                <div className="p-4 md:p-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors?.color}`} />
                                <span className="text-stone-400 text-sm font-semibold tracking-wide">{exp.dateRange}</span>
                            </div>
                            <h3 className="text-xl md:text-4xl font-bold text-stone-800 mb-1 md:mb-2 leading-tight">{exp.title}</h3>
                            <p className={`text-base md:text-2xl font-bold bg-gradient-to-r ${colors?.color} bg-clip-text text-transparent`}>
                                {exp.company}
                            </p>
                            <p className="text-stone-400 text-sm mt-2 flex items-center gap-2">
                                <span>📍</span> {exp.location}
                            </p>
                        </div>
                    </div>

                    {/* Description - hidden on mobile to save space */}
                    <p className="hidden md:block text-stone-600 text-lg leading-relaxed mb-8">{exp.summary}</p>

                    {/* Achievements - show only first 2 on mobile */}
                    <div className="space-y-2 md:space-y-3 mb-4 md:mb-8">
                        {exp.achievements.slice(0, 3).map((a, i) => (
                            <div key={i} className="flex items-start gap-2 md:gap-4">
                                <div className={`mt-1.5 md:mt-2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r ${colors?.color} flex-shrink-0`} />
                                <span className="text-stone-500 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">{a}</span>
                            </div>
                        ))}
                        {exp.achievements.length > 3 && (
                            <p className="text-stone-400 text-xs md:hidden pl-4">+{exp.achievements.length - 3} more</p>
                        )}
                    </div>

                    {/* Tech stack - show fewer on mobile */}
                    <div className="flex flex-wrap gap-1.5 md:gap-3">
                        {exp.techStack.slice(0, 4).map((t) => (
                            <span key={t} className="px-2 py-1 md:px-4 md:py-2 bg-stone-50 text-stone-600 text-xs md:text-sm font-medium rounded-full border border-stone-100">
                                {t}
                            </span>
                        ))}
                        {exp.techStack.length > 4 && (
                            <span className="px-2 py-1 md:hidden bg-stone-100 text-stone-400 text-xs rounded-full">
                                +{exp.techStack.length - 4}
                            </span>
                        )}
                        {exp.techStack.slice(4).map((t) => (
                            <span key={t} className="hidden md:inline-block px-4 py-2 bg-stone-50 text-stone-600 text-sm font-medium rounded-full border border-stone-100">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Progress indicator
function ProgressIndicator({
    index,
    activeIndexFloat
}: {
    index: number;
    activeIndexFloat: MotionValue<number>;
}) {
    const colors = colorMap[index % colorMap.length] ?? colorMap[0];

    const indicatorHeight = useTransform(
        activeIndexFloat,
        [index - 0.3, index, index + 0.3],
        [8, 32, 8]
    );

    const indicatorOpacity = useTransform(
        activeIndexFloat,
        [index - 0.5, index, index + 0.5],
        [0.4, 1, 0.4]
    );

    return (
        <motion.div className="flex items-center gap-3">
            <motion.div
                className={`rounded-full bg-gradient-to-b ${colors?.color}`}
                style={{
                    width: 12,
                    height: indicatorHeight,
                    opacity: indicatorOpacity,
                }}
            />
        </motion.div>
    );
}

// Counter
function ProgressCounter({ progress, total }: { progress: MotionValue<number>; total: number }) {
    const index = useTransform(progress, [0, 1], [1, total]);
    const rounded = useTransform(index, (v) => Math.round(v).toString().padStart(2, '0'));
    return <motion.span className="text-stone-800 font-bold text-2xl">{rounded}</motion.span>;
}
