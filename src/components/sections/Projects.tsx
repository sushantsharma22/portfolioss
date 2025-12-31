'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

export default function Projects() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, springs.smooth);
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(smoothProgress, [0, 0.2], [0.96, 1]);
    const y = useTransform(smoothProgress, [0, 0.2], [50, 0]);

    const colorMap: Record<string, string> = {
        'ai-ml': 'from-violet-500 to-purple-600',
        'data': 'from-emerald-500 to-teal-600',
        'web': 'from-sky-500 to-blue-600',
        'mobile': 'from-amber-500 to-orange-600',
    };

    return (
        <section 
            id="projects" 
            ref={ref} 
            className="relative min-h-screen py-24 overflow-hidden"
        >
            {/* Gradient transition from previous section */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50/30 to-violet-50/20" />

            {/* Decorative blobs */}
            <div className="absolute top-40 -left-20 w-80 h-80 bg-gradient-to-br from-violet-200/30 to-purple-200/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-40 -right-20 w-96 h-96 bg-gradient-to-br from-sky-200/30 to-blue-200/30 rounded-full blur-[120px]" />

            <motion.div style={{ opacity, scale, y }} className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.9, ease: easings.apple }}
                    className="text-center mb-16"
                >
                    <span className="text-sky-500 text-sm font-bold tracking-[0.3em]">03 — WORK</span>
                    <h2 className="text-5xl md:text-7xl font-black text-stone-800 mt-4 tracking-tight">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-sky-500 to-amber-500">Projects</span>
                    </h2>
                    <p className="text-stone-500 mt-4 max-w-lg mx-auto">Innovative solutions showcasing expertise in AI and full-stack development</p>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.a
                            key={project.id}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.06, duration: 0.8, ease: easings.apple }}
                            whileHover={{ y: -8, scale: 1.02, boxShadow: '0 25px 50px rgba(0,0,0,0.12)' }}
                            whileTap={{ scale: 0.98 }}
                            className={`group relative bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-lg transition-colors duration-400 ${project.featured ? 'ring-2 ring-amber-200/50' : ''}`}
                        >
                            {/* Gradient header */}
                            <div className={`h-24 md:h-28 bg-gradient-to-br ${colorMap[project.category] || 'from-stone-500 to-stone-600'} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10" />
                                <motion.span 
                                    className="absolute top-4 right-4 text-4xl md:text-5xl opacity-80"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: 'spring', ...springs.snappy }}
                                >
                                    {project.icon}
                                </motion.span>
                                {project.featured && (
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-sky-600 transition-all duration-400">
                                    {project.title}
                                </h3>
                                <p className="text-stone-500 text-sm mb-4 leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((t) => (
                                        <span key={t} className="px-2.5 py-1 bg-stone-50 text-stone-600 text-xs font-medium rounded-full border border-stone-100">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: easings.apple }}
                    className="text-center mt-12"
                >
                    <motion.a
                        href="https://github.com/sushantsharma22"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', ...springs.snappy }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white font-semibold rounded-full"
                    >
                        <span>View All on GitHub</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Bottom transition gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
