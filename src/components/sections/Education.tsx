'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { education } from '@/lib/constants';
import { springs } from '@/lib/animations';

// Academic color palette
const colorConfig = {
    masters: {
        gradient: 'from-amber-400 via-yellow-500 to-orange-500',
        bgGradient: 'from-amber-50 to-orange-50',
        accent: '#D4AF37',
        icon: '🎓',
    },
    bachelors: {
        gradient: 'from-sky-400 via-blue-500 to-indigo-500',
        bgGradient: 'from-sky-50 to-blue-50',
        accent: '#1E3A5F',
        icon: '🏛️',
    },
};

export default function Education() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

    const { scrollYProgress } = useScroll({ target: targetRef });
    const smoothProgress = useSpring(scrollYProgress, springs.smooth);

    // Header animation
    const headerOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
    const headerY = useTransform(smoothProgress, [0, 0.1], [50, 0]);

    // Timeline drawing animation
    const timelineProgress = useTransform(smoothProgress, [0.05, 0.9], [0, 1]);

    // Graduation cap follows scroll down the timeline
    const capY = useTransform(smoothProgress, [0.1, 0.85], [0, 400]);
    const capScale = useTransform(smoothProgress, [0.1, 0.2, 0.8, 0.9], [0.8, 1.2, 1.2, 1]);
    const capRotate = useTransform(smoothProgress, [0.1, 0.9], [0, 15]);

    const handleFlip = useCallback((id: string) => {
        setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
    }, []);

    return (
        <section
            ref={targetRef}
            className="relative h-[300vh]"
            id="education"
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50" />

            {/* STICKY CONTAINER */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-100/40 to-yellow-100/40 rounded-full blur-[150px]" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-sky-100/40 to-blue-100/40 rounded-full blur-[130px]" />

                {/* Header - animates first */}
                <motion.div
                    style={{ opacity: headerOpacity, y: headerY }}
                    className="absolute top-12 left-8 md:left-16 z-30"
                >
                    <span className="text-amber-600 text-sm font-bold tracking-[0.3em]">05 — EDUCATION</span>
                    <h2 className="text-3xl md:text-5xl font-black text-stone-800 mt-2 tracking-tight">
                        Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500">Journey</span>
                    </h2>
                </motion.div>

                {/* Floating Graduation Cap - follows timeline */}
                <motion.div
                    style={{
                        y: capY,
                        scale: capScale,
                        rotate: capRotate,
                    }}
                    className="absolute left-1/2 -translate-x-1/2 top-32 text-6xl z-20 pointer-events-none"
                >
                    🎓
                </motion.div>

                {/* Central Timeline */}
                <div className="absolute left-1/2 -translate-x-1/2 top-48 bottom-24 w-1">
                    {/* Background line */}
                    <div className="absolute inset-0 bg-amber-100 rounded-full" />
                    {/* Animated progress line */}
                    <motion.div
                        style={{ scaleY: timelineProgress }}
                        className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-amber-400 via-yellow-500 to-orange-400 rounded-full origin-top"
                    />

                    {/* Timeline dots for each education */}
                    {education.map((_, index) => {
                        const dotPosition = ((index + 1) / (education.length + 1)) * 100;
                        return (
                            <TimelineDot
                                key={index}
                                index={index}
                                position={dotPosition}
                                smoothProgress={smoothProgress}
                            />
                        );
                    })}
                </div>

                {/* Education Cards - positioned on alternating sides */}
                <div className="absolute inset-x-8 md:inset-x-16 top-48 bottom-24 flex flex-col justify-around">
                    {education.map((edu, index) => (
                        <EducationCard
                            key={edu.id}
                            edu={edu}
                            index={index}
                            totalCards={education.length}
                            smoothProgress={smoothProgress}
                            isFlipped={flippedCards[edu.id] || false}
                            onFlip={() => handleFlip(edu.id)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

// Timeline dot that lights up based on progress
function TimelineDot({
    index,
    position,
    smoothProgress
}: {
    index: number;
    position: number;
    smoothProgress: MotionValue<number>;
}) {
    const eduPhase = (index + 0.5) / (education.length + 0.5);

    const dotScale = useTransform(
        smoothProgress,
        [eduPhase - 0.1, eduPhase, eduPhase + 0.1],
        [0.5, 1.5, 1]
    );

    const dotOpacity = useTransform(
        smoothProgress,
        [eduPhase - 0.15, eduPhase],
        [0.3, 1]
    );

    return (
        <motion.div
            style={{
                top: `${position}%`,
                scale: dotScale,
                opacity: dotOpacity,
            }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
            <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full border-4 border-white shadow-lg" />
        </motion.div>
    );
}

// Education card with scroll-driven reveal
function EducationCard({
    edu,
    index,
    totalCards,
    smoothProgress,
    isFlipped,
    onFlip,
}: {
    edu: typeof education[0];
    index: number;
    totalCards: number;
    smoothProgress: MotionValue<number>;
    isFlipped: boolean;
    onFlip: () => void;
}) {
    const config = colorConfig[edu.id as keyof typeof colorConfig] || colorConfig.bachelors;
    const isLeft = index % 2 === 0;

    // Calculate animation phase for this card
    const phaseStart = (index + 0.3) / (totalCards + 1);
    const phaseMid = (index + 0.7) / (totalCards + 1);

    const cardOpacity = useTransform(smoothProgress, [phaseStart, phaseMid], [0, 1]);
    const cardScale = useTransform(smoothProgress, [phaseStart, phaseMid], [0.85, 1]);
    const cardX = useTransform(
        smoothProgress,
        [phaseStart, phaseMid],
        [isLeft ? -100 : 100, 0]
    );
    const cardRotate = useTransform(
        smoothProgress,
        [phaseStart, phaseMid],
        [isLeft ? -5 : 5, 0]
    );

    return (
        <motion.div
            style={{
                opacity: cardOpacity,
                scale: cardScale,
                x: cardX,
                rotate: cardRotate,
            }}
            className={`w-full md:w-[45%] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
        >
            <motion.div
                onClick={onFlip}
                whileHover={{ y: -5, boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}
                className="relative cursor-pointer"
                style={{ perspective: 1000 }}
            >
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front of card */}
                    <div
                        className="relative bg-white/95 backdrop-blur rounded-2xl overflow-hidden border border-stone-100 shadow-xl"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        {/* Gold accent bar */}
                        <div className={`h-1.5 bg-gradient-to-r ${config.gradient}`} />

                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-4xl">{config.icon}</span>
                                <span
                                    className="px-3 py-1 text-xs font-bold rounded-full text-white"
                                    style={{ background: config.accent }}
                                >
                                    {edu.status === 'completed' ? '✓ Completed' : '⏳ In Progress'}
                                </span>
                            </div>

                            {/* Degree */}
                            <h3 className="text-xl md:text-2xl font-bold text-stone-800 mb-2 leading-tight">
                                {edu.degree}
                            </h3>

                            {/* Institution */}
                            <p className={`text-lg font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-3`}>
                                {edu.institution}
                            </p>

                            {/* Meta */}
                            <div className="flex flex-wrap gap-3 text-stone-500 text-sm mb-4">
                                <span className="flex items-center gap-1">📍 {edu.location}</span>
                                <span className="flex items-center gap-1">📅 {edu.dateRange}</span>
                            </div>

                            {/* Specialization */}
                            {edu.specialization && (
                                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 mb-4">
                                    <span className="text-amber-700 text-xs font-bold">🎯 SPECIALIZATION</span>
                                    <p className="text-stone-700 font-medium mt-1">{edu.specialization}</p>
                                </div>
                            )}

                            {/* Coursework preview */}
                            <div className="flex flex-wrap gap-1.5">
                                {edu.coursework.slice(0, 3).map((course) => (
                                    <span
                                        key={course.name}
                                        className="px-2.5 py-1 bg-stone-50 text-stone-600 text-xs font-medium rounded-full border border-stone-100"
                                    >
                                        {course.icon} {course.name}
                                    </span>
                                ))}
                                {edu.coursework.length > 3 && (
                                    <span className="px-2.5 py-1 bg-stone-100 text-stone-400 text-xs rounded-full">
                                        +{edu.coursework.length - 3}
                                    </span>
                                )}
                            </div>

                            <p className="text-stone-400 text-xs text-center mt-4">
                                👆 Click to see all coursework
                            </p>
                        </div>
                    </div>

                    {/* Back of card - full coursework */}
                    <div
                        className="absolute inset-0 bg-white/95 backdrop-blur rounded-2xl overflow-hidden border border-stone-100 shadow-xl"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <div className={`h-1.5 bg-gradient-to-r ${config.gradient}`} />

                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className={`text-lg font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                                    Full Coursework
                                </h4>
                                <span className="text-3xl">{config.icon}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                                {edu.coursework.map((course) => (
                                    <div
                                        key={course.name}
                                        className="flex items-center gap-2 px-2 py-1.5 bg-stone-50 rounded-lg text-sm"
                                    >
                                        <span>{course.icon}</span>
                                        <span className="text-stone-700 text-xs font-medium truncate">{course.name}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-stone-400 text-xs text-center mt-4">
                                👆 Click to go back
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
