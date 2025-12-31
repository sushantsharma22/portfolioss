'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { education } from '@/lib/constants';

const colorMap = [
    { color: 'from-sky-400 to-blue-500', bgColor: 'bg-gradient-to-br from-sky-50 to-blue-50', icon: '🎓' },
    { color: 'from-amber-400 to-orange-500', bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50', icon: '🏛️' },
];

export default function Education() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const x = useTransform(scrollYProgress, [0, 0.3], [-30, 0]);

    return (
        <section id="education" ref={ref} className="relative min-h-screen py-24 overflow-hidden">
            {/* Gradient transition from previous section */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-white to-sky-50/30" />

            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-sky-100/50 to-blue-100/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-full blur-[100px]" />

            <motion.div style={{ opacity, x }} className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-600 text-sm font-bold tracking-[0.3em]">05 — EDUCATION</span>
                    <h2 className="text-5xl md:text-7xl font-black text-stone-800 mt-4 tracking-tight">
                        Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-amber-500">Foundation</span>
                    </h2>
                </motion.div>

                {/* Cards */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {education.map((edu, i) => {
                        const colors = colorMap[i % colorMap.length];
                        return (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                whileHover={{ y: -5 }}
                                className={`${colors.bgColor} rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
                            >
                                {/* Decorative corner gradient */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${colors.color} opacity-10 rounded-bl-full`} />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <span className="text-5xl">{colors.icon}</span>
                                        <span className={`px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r ${colors.color} text-white shadow-lg`}>
                                            ✓ Completed
                                        </span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">{edu.degree}</h3>
                                    <p className={`text-xl font-semibold bg-gradient-to-r ${colors.color} bg-clip-text text-transparent`}>{edu.institution}</p>

                                    <div className="flex flex-wrap gap-4 mt-4 text-stone-500 text-sm">
                                        <span>📍 {edu.location}</span>
                                        <span>📅 {edu.dateRange}</span>
                                    </div>

                                    {edu.specialization && (
                                        <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
                                            <h4 className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Specialization</h4>
                                            <p className="text-stone-700 font-semibold">{edu.specialization}</p>
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <h4 className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-3">Key Coursework</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {edu.coursework.map((c) => (
                                                <span key={c.name} className="px-3 py-1.5 bg-white/80 text-stone-600 text-xs font-medium rounded-full border border-white shadow-sm">
                                                    {c.icon} {c.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Bottom transition gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
