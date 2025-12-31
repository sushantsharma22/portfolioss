'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { stats, certificates } from '@/lib/constants';
import { springs } from '@/lib/animations';

export default function About() {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ target: targetRef });
    const smoothProgress = useSpring(scrollYProgress, springs.smooth);

    // Compute dynamic stats
    const aboutStats = [
        { value: '6+', label: 'Years of Coding', color: 'from-sky-400 to-blue-500', icon: '💻' },
        { value: `${stats[2]?.value || 50}+`, label: 'Hackathons Led', color: 'from-violet-400 to-purple-500', icon: '🚀' },
        { value: `${stats[0]?.value || 17}+`, label: 'GitHub Projects', color: 'from-amber-400 to-orange-500', icon: '📦' },
        { value: `${certificates.length}+`, label: 'Certifications', color: 'from-teal-400 to-emerald-500', icon: '🏆' },
    ];

    // Scroll-driven animations for different elements
    const headerOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);
    const headerY = useTransform(smoothProgress, [0, 0.15], [30, 0]);

    const leftContentOpacity = useTransform(smoothProgress, [0.1, 0.35], [0, 1]);
    const leftContentX = useTransform(smoothProgress, [0.1, 0.35], [-50, 0]);

    const rightContentOpacity = useTransform(smoothProgress, [0.2, 0.45], [0, 1]);
    const rightContentX = useTransform(smoothProgress, [0.2, 0.45], [50, 0]);

    return (
        <section
            ref={targetRef}
            className="relative h-[200vh]"
            id="about"
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50/50 to-white" />

            {/* STICKY CONTAINER */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-sky-100/60 to-blue-100/60 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-100/60 to-orange-100/60 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-violet-50/40 to-purple-50/40 rounded-full blur-3xl" />

                    {/* Floating shapes */}
                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-32 left-[15%] w-16 h-16 bg-gradient-to-br from-sky-200/50 to-blue-200/50 rounded-2xl blur-sm"
                    />
                    <motion.div
                        animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-40 right-[20%] w-20 h-20 bg-gradient-to-br from-amber-200/50 to-orange-200/50 rounded-full blur-sm"
                    />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 w-full">
                    {/* Section header - animates first */}
                    <motion.div
                        style={{ opacity: headerOpacity, y: headerY }}
                        className="mb-12"
                    >
                        <span className="text-sky-500 text-sm font-bold tracking-[0.3em]">01 — ABOUT ME</span>
                        <h2 className="text-4xl md:text-6xl font-black text-stone-800 mt-4 tracking-tight">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500">Story</span>
                        </h2>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left: Story - slides in from left */}
                        <motion.div
                            style={{ opacity: leftContentOpacity, x: leftContentX }}
                            className="space-y-5"
                        >
                            <div className="relative">
                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 via-violet-400 to-amber-400 rounded-full" />
                                <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-medium pl-6">
                                    I'm an <span className="text-sky-600 font-bold">AI Research Engineer</span> pursuing my Master of Applied Computing at the University of Windsor,
                                    specializing in <span className="text-violet-600 font-bold">Artificial Intelligence</span> and <span className="text-amber-600 font-bold">Finance</span>.
                                </p>
                            </div>

                            <p className="text-stone-500 leading-relaxed">
                                With hands-on experience at <span className="font-semibold text-stone-700">JLR North America</span> and <span className="font-semibold text-stone-700">TD Bank</span>, I've developed production-ready
                                ML systems for credit-lending predictions, predictive analytics for industrial operations,
                                and cutting-edge AI research in the automotive sector.
                            </p>

                            <p className="text-stone-500 leading-relaxed">
                                Beyond work, I've coordinated <span className="font-semibold text-stone-700">50+ AI & coding hackathons</span> at Gravity LPU, engaging over
                                <span className="font-semibold text-stone-700"> 200 participants</span> and fostering a community of innovation and learning.
                            </p>

                            {/* Action items */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.03, boxShadow: '0 15px 35px rgba(14, 165, 233, 0.2)' }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: 'spring', ...springs.snappy }}
                                    className="px-6 py-3 bg-gradient-to-r from-sky-500 to-violet-500 text-white font-semibold rounded-full shadow-lg shadow-sky-200/50"
                                >
                                    Let's Connect →
                                </motion.a>
                                <motion.a
                                    href="#experience"
                                    whileHover={{ scale: 1.03, borderColor: '#a8a29e' }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: 'spring', ...springs.snappy }}
                                    className="px-6 py-3 border-2 border-stone-200 text-stone-700 font-semibold rounded-full"
                                >
                                    View Journey
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Right: Stats - slides in from right with stagger */}
                        <motion.div
                            style={{ opacity: rightContentOpacity, x: rightContentX }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {aboutStats.map((stat, i) => (
                                <StatCard
                                    key={stat.label}
                                    stat={stat}
                                    index={i}
                                    smoothProgress={smoothProgress}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}

// Stat card with individual animation
function StatCard({
    stat,
    index,
    smoothProgress
}: {
    stat: { value: string; label: string; color: string; icon: string };
    index: number;
    smoothProgress: MotionValue<number>;
}) {
    // Each stat animates in with a stagger
    const startProgress = 0.35 + (index * 0.08);
    const endProgress = startProgress + 0.15;

    const opacity = useTransform(smoothProgress, [startProgress, endProgress], [0, 1]);
    const y = useTransform(smoothProgress, [startProgress, endProgress], [30, 0]);
    const scale = useTransform(smoothProgress, [startProgress, endProgress], [0.9, 1]);

    return (
        <motion.div
            style={{ opacity, y, scale }}
            whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            className="bg-white rounded-2xl p-5 border border-stone-100 shadow-lg"
        >
            <span className="text-2xl mb-2 block">{stat.icon}</span>
            <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
            <div className="text-stone-500 text-sm mt-1 font-medium">{stat.label}</div>
        </motion.div>
    );
}
