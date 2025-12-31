'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { certificates } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

const colorMap = [
    'from-sky-400 to-blue-500',
    'from-violet-400 to-purple-500',
    'from-emerald-400 to-teal-500',
    'from-amber-400 to-orange-500',
    'from-rose-400 to-pink-500',
    'from-slate-400 to-gray-500',
    'from-green-400 to-emerald-500',
    'from-yellow-400 to-amber-500',
    'from-orange-400 to-red-500',
    'from-lime-400 to-green-500',
    'from-cyan-400 to-sky-500',
    'from-red-400 to-rose-500',
];

const iconMap: Record<string, string> = {
    'graduation-cap': '🎓',
    'robot': '🤖',
    'brain': '🧠',
    'chart-line': '📊',
    'terminal': '💻',
    'code': '🔢',
    'mobile-alt': '📱',
    'coffee': '☕',
    'globe': '🌐',
    'chart-bar': '📈',
    'shield-alt': '🔒',
    'database': '💾',
    'search': '🔍',
    'tasks': '📋',
    'bug': '🧪',
    'cloud': '☁️',
    'network-wired': '🌐',
    'fire': '⚡',
    'vial': '🧪',
};

// Determine which certs are highlighted (Andrew Ng courses)
const highlightedProviders = ['Stanford University (Coursera)', 'deeplearning.ai'];

export default function Certificates() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const smoothProgress = useSpring(scrollYProgress, springs.smooth);
    const x = useTransform(smoothProgress, [0, 1], ['0%', '-75%']);

    return (
        <section 
            ref={targetRef} 
            className="relative h-[300vh]" 
            id="certificates"
        >
            {/* Gradient background - seamless from Education */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-white to-stone-50" />

            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-sky-100/40 to-blue-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-full blur-[100px]" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: easings.apple }}
                    className="absolute top-16 left-8 md:left-20 z-10"
                >
                    <span className="text-amber-600 text-sm font-bold tracking-[0.3em]">06 — CERTIFICATIONS</span>
                    <h2 className="text-4xl md:text-6xl font-black text-stone-800 mt-2">
                        Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-amber-500">Expertise</span>
                    </h2>
                    <p className="text-stone-500 mt-2">{certificates.length}+ professional certifications</p>
                </motion.div>

                {/* Horizontal scroll */}
                <motion.div style={{ x }} className="flex gap-6 md:gap-8 px-8 md:px-20 items-center w-max pt-24">
                    {certificates.map((cert, i) => {
                        const color = colorMap[i % colorMap.length];
                        const icon = iconMap[cert.icon] || '📜';
                        const isHighlight = highlightedProviders.some(p => cert.provider.includes(p));
                        
                        return (
                            <motion.a
                                key={cert.id}
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.02, duration: 0.7, ease: easings.apple }}
                                whileHover={{ y: -10, scale: 1.02, boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative w-[340px] md:w-[420px] h-[260px] md:h-[300px] rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-colors duration-400 cursor-pointer overflow-hidden ${isHighlight
                                        ? 'bg-gradient-to-br from-stone-50 to-sky-50 border-2 border-sky-200/50 shadow-xl shadow-sky-100/30'
                                        : 'bg-white border border-stone-100 shadow-lg'
                                    }`}
                            >
                                {/* Gradient accent */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`} />

                                <div className="flex justify-between items-start">
                                    <motion.span 
                                        className="text-5xl"
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        transition={{ type: 'spring', ...springs.snappy }}
                                    >
                                        {icon}
                                    </motion.span>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-500 border border-stone-200">
                                        Verified
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-stone-800 leading-tight mb-2">{cert.title}</h3>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-stone-500">{cert.provider}</span>
                                    </div>
                                </div>

                                {isHighlight && (
                                    <motion.div 
                                        className="absolute top-6 right-6 w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-300"
                                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                )}
                            </motion.a>
                        );
                    })}
                </motion.div>

                {/* Progress bar */}
                <div className="absolute bottom-16 left-8 md:left-20 right-8 md:right-20 h-1 bg-stone-200/50 rounded-full overflow-hidden">
                    <motion.div style={{ scaleX: smoothProgress }} className="h-full bg-gradient-to-r from-sky-500 to-amber-500 origin-left" />
                </div>
            </div>
        </section>
    );
}
