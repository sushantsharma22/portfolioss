'use client';

import { useRef } from 'react';
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

    // EXACTLY like Certificates: useScroll with just target, no offset
    const { scrollYProgress } = useScroll({ target: targetRef });
    const smoothProgress = useSpring(scrollYProgress, springs.smooth);

    // Map progress to active index (0 to experience.length - 1)
    // When scrollYProgress = 0 → index 0, when = 1 → index (length - 1)
    const activeIndexFloat = useTransform(smoothProgress, [0, 1], [0, experience.length - 1]);

    return (
        <section
            ref={targetRef}
            // EXACTLY like Certificates: h-[300vh] for 3 items, so use experience.length * 100vh
            className={`relative`}
            style={{ height: `${experience.length * 100}vh` }}
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
                    className="absolute top-16 left-8 md:left-16 z-30"
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

                {/* Progress Indicators - Left side */}
                <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                    {experience.map((exp, i) => (
                        <ProgressIndicator
                            key={exp.id}
                            index={i}
                            activeIndexFloat={activeIndexFloat}
                        />
                    ))}
                </div>

                {/* Counter */}
                <div className="absolute bottom-16 right-8 md:right-16 text-stone-400 font-mono">
                    <ProgressCounter progress={smoothProgress} total={experience.length} />
                    <span className="mx-2 text-stone-300">/</span>
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
            className="absolute w-full max-w-4xl px-4 md:px-8"
            style={{
                opacity: cardOpacity,
                scale: cardScale,
                y: cardY,
            }}
        >
            <div className="bg-white/95 rounded-[2rem] shadow-2xl shadow-stone-200/60 overflow-hidden border border-stone-100/80">
                {/* Gradient top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${colors?.color}`} />

                <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors?.color}`} />
                                <span className="text-stone-400 text-sm font-semibold tracking-wide">{exp.dateRange}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-stone-800 mb-2 leading-tight">{exp.title}</h3>
                            <p className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${colors?.color} bg-clip-text text-transparent`}>
                                {exp.company}
                            </p>
                            <p className="text-stone-400 text-sm mt-2 flex items-center gap-2">
                                <span>📍</span> {exp.location}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-stone-600 text-lg leading-relaxed mb-8">{exp.summary}</p>

                    {/* Achievements */}
                    <div className="space-y-3 mb-8">
                        {exp.achievements.map((a, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className={`mt-2 w-2 h-2 rounded-full bg-gradient-to-r ${colors?.color} flex-shrink-0`} />
                                <span className="text-stone-500 leading-relaxed">{a}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-3">
                        {exp.techStack.map((t) => (
                            <span key={t} className="px-4 py-2 bg-stone-50 text-stone-600 text-sm font-medium rounded-full border border-stone-100">
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
