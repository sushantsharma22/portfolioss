'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { skillCategories, stats } from '@/lib/constants';

const colorMap: Record<string, { color: string; bgColor: string }> = {
    'languages': { color: 'from-sky-400 to-blue-500', bgColor: 'bg-gradient-to-br from-sky-50 to-blue-50' },
    'ai-ml': { color: 'from-violet-400 to-purple-500', bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50' },
    'frameworks': { color: 'from-amber-400 to-orange-500', bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50' },
    'tools': { color: 'from-teal-400 to-emerald-500', bgColor: 'bg-gradient-to-br from-teal-50 to-emerald-50' },
};

export default function Skills() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);

    return (
        <section id="skills" ref={ref} className="relative min-h-screen py-24 overflow-hidden">
            {/* Gradient transition from previous section */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/20 to-teal-50/20" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-sky-100/40 to-blue-100/40 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-full blur-[120px]" />

            <motion.div style={{ opacity, y }} className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-teal-500 text-sm font-bold tracking-[0.3em]">04 — EXPERTISE</span>
                    <h2 className="text-5xl md:text-7xl font-black text-stone-800 mt-4 tracking-tight">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500">Arsenal</span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {skillCategories.map((group, i) => {
                        const colors = colorMap[group.id] || { color: 'from-sky-400 to-blue-500', bgColor: 'bg-gradient-to-br from-sky-50 to-blue-50' };
                        return (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -5 }}
                                className={`${colors.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50`}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-4xl">{group.icon}</span>
                                    <h3 className={`text-xl font-bold bg-gradient-to-r ${colors.color} bg-clip-text text-transparent`}>{group.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <motion.span
                                            key={skill.name}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-4 py-2 bg-white/80 backdrop-blur-sm text-stone-700 text-sm font-medium rounded-full shadow-sm border border-white hover:shadow-md transition-all duration-300 cursor-default"
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 flex flex-wrap justify-center gap-12 md:gap-20"
                >
                    {[
                        { label: 'Technologies', value: '40+', color: 'from-sky-500 to-blue-500' },
                        { label: 'Years Coding', value: '6+', color: 'from-violet-500 to-purple-500' },
                        { label: 'Projects Built', value: `${stats[0]?.value || 50}+`, color: 'from-amber-500 to-orange-500' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                            <div className="text-stone-500 text-sm mt-2 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Bottom transition gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent" />
        </section>
    );
}
