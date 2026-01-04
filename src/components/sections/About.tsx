'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { about, stats, certificates } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const y = useTransform(smoothProgress, [0, 0.2], [80, 0]);
    const scale = useTransform(smoothProgress, [0, 0.2], [0.94, 1]);
    // Subtle 3D rotation as section enters
    const rotateX = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [8, 0, 0, -4]);

    // Compute dynamic stats
    const aboutStats = [
        { value: '6+', label: 'Years of Coding', color: 'from-sky-400 to-blue-500', icon: '💻' },
        { value: `${stats[2]?.value || 50}+`, label: 'Hackathons Led', color: 'from-violet-400 to-purple-500', icon: '🚀' },
        { value: `${stats[0]?.value || 17}+`, label: 'GitHub Projects', color: 'from-amber-400 to-orange-500', icon: '📦' },
        { value: `${certificates.length}+`, label: 'Certifications', color: 'from-teal-400 to-emerald-500', icon: '🏆' },
    ];

    return (
        <section
            id="about"
            ref={ref}
            className="relative h-screen bg-gradient-to-b from-white via-stone-50/50 to-white flex items-center overflow-hidden z-20"
        >
            {/* Decorative background elements - static for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-64 h-64 bg-sky-100/40 rounded-full blur-[80px]" />
                <div className="absolute bottom-20 left-10 w-56 h-56 bg-amber-100/40 rounded-full blur-[80px]" />
            </div>

            <motion.div 
                style={{ opacity, y, scale, rotateX, transformPerspective: 1200 }} 
                className="relative z-10 max-w-6xl mx-auto px-4 md:px-8"
            >
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.9, ease: easings.apple }}
                    className="mb-16"
                >
                    <span className="text-sky-500 text-sm font-bold tracking-[0.3em]">01 — ABOUT ME</span>
                    <h2 className="text-4xl md:text-6xl font-black text-stone-800 mt-4 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500">Story</span>
                    </h2>
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 0.9, ease: easings.apple }}
                        className="space-y-6"
                    >
                        <div className="relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 via-violet-400 to-amber-400 rounded-full" />
                            <p className="text-xl md:text-2xl text-stone-700 leading-relaxed font-medium pl-6">
                                I'm an <span className="text-sky-600 font-bold">AI Research Engineer</span> pursuing my Master of Applied Computing at the University of Windsor,
                                specializing in <span className="text-violet-600 font-bold">Artificial Intelligence</span> and <span className="text-amber-600 font-bold">Finance</span>.
                            </p>
                        </div>

                        <p className="text-stone-500 leading-relaxed text-lg">
                            With hands-on experience at <span className="font-semibold text-stone-700">JLR North America</span> and <span className="font-semibold text-stone-700">TD Bank</span>, I've developed production-ready
                            ML systems for credit-lending predictions, predictive analytics for industrial operations,
                            and cutting-edge AI research in the automotive sector.
                        </p>

                        <p className="text-stone-500 leading-relaxed text-lg">
                            Beyond work, I've coordinated <span className="font-semibold text-stone-700">50+ AI & coding hackathons</span> at Gravity LPU, engaging over
                            <span className="font-semibold text-stone-700"> 200 participants</span> and fostering a community of innovation and learning.
                        </p>

                        {/* Action items */}
                        <div className="flex flex-wrap gap-4 pt-4">
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

                    {/* Right: Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 0.9, ease: easings.apple, delay: 0.15 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {aboutStats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.8, ease: easings.apple }}
                                whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                                className="bg-white rounded-2xl p-6 border border-stone-100 shadow-lg transition-shadow duration-400"
                            >
                                <span className="text-3xl mb-3 block">{stat.icon}</span>
                                <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                                <div className="text-stone-500 text-sm mt-2 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
