'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { skillCategories, stats } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

const colorMap: Record<string, { color: string; bgColor: string }> = {
    'languages': { color: 'from-sky-400 to-blue-500', bgColor: 'bg-gradient-to-br from-sky-50 to-blue-50' },
    'ai-ml': { color: 'from-violet-400 to-purple-500', bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50' },
    'frameworks': { color: 'from-amber-400 to-orange-500', bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50' },
    'tools': { color: 'from-teal-400 to-emerald-500', bgColor: 'bg-gradient-to-br from-teal-50 to-emerald-50' },
};

export default function Skills() {
    const targetRef = useRef<HTMLDivElement>(null);

    // Same pattern as Experience/Certificates
    const { scrollYProgress } = useScroll({ target: targetRef });
    const smoothProgress = useSpring(scrollYProgress, springs.smooth);

    return (
        <section
            ref={targetRef}
            className="relative h-[200vh]"
            id="skills"
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/20 to-teal-50/20" />

            {/* STICKY CONTAINER */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-sky-100/40 to-blue-100/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-full blur-[120px]" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: easings.apple }}
                        className="text-center mb-12"
                    >
                        <span className="text-teal-500 text-sm font-bold tracking-[0.3em]">04 — EXPERTISE</span>
                        <h2 className="text-4xl md:text-6xl font-black text-stone-800 mt-4 tracking-tight">
                            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500">Arsenal</span>
                        </h2>
                    </motion.div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {skillCategories.map((group, i) => {
                            const defaultColor = { color: 'from-sky-400 to-blue-500', bgColor: 'bg-gradient-to-br from-sky-50 to-blue-50' };
                            const colors = colorMap[group.id] ?? defaultColor;
                            return (
                                <motion.div
                                    key={group.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.8, ease: easings.apple }}
                                    whileHover={{ y: -4, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
                                    className={`${colors?.bgColor} rounded-2xl p-6 shadow-lg border border-white/50`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <motion.span
                                            className="text-3xl"
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            transition={{ type: 'spring', ...springs.snappy }}
                                        >
                                            {group.icon}
                                        </motion.span>
                                        <h3 className={`text-lg font-bold bg-gradient-to-r ${colors?.color} bg-clip-text text-transparent`}>{group.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {group.skills.map((skill, skillIndex) => (
                                            <motion.span
                                                key={skill.name}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: skillIndex * 0.02, duration: 0.4, ease: easings.apple }}
                                                whileHover={{ scale: 1.05, boxShadow: '0 6px 15px rgba(0,0,0,0.08)' }}
                                                className="px-3 py-1.5 bg-white/80 backdrop-blur-sm text-stone-700 text-sm font-medium rounded-full shadow-sm border border-white cursor-default"
                                            >
                                                {skill.name}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: easings.apple }}
                        className="mt-12 flex flex-wrap justify-center gap-12 md:gap-20"
                    >
                        {[
                            { label: 'Technologies', value: '40+', color: 'from-sky-500 to-blue-500' },
                            { label: 'Years Coding', value: '6+', color: 'from-violet-500 to-purple-500' },
                            { label: 'Projects Built', value: `${stats[0]?.value || 50}+`, color: 'from-amber-500 to-orange-500' },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.7, ease: easings.apple }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                                <div className="text-stone-500 text-sm mt-1 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-6 left-8 md:left-16 right-8 md:right-16 h-1 bg-stone-200/50 rounded-full overflow-hidden">
                    <motion.div
                        style={{ scaleX: smoothProgress }}
                        className="h-full bg-gradient-to-r from-teal-500 to-amber-500 origin-left"
                    />
                </div>
            </div>
        </section>
    );
}
