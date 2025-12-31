'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { certificates } from '@/lib/constants';
import { springs } from '@/lib/animations';

const colorMap = [
    { bg: 'from-violet-500 to-purple-600', light: 'from-violet-100 to-purple-100', accent: 'violet' },
    { bg: 'from-sky-500 to-blue-600', light: 'from-sky-100 to-blue-100', accent: 'sky' },
    { bg: 'from-emerald-500 to-teal-600', light: 'from-emerald-100 to-teal-100', accent: 'emerald' },
    { bg: 'from-amber-500 to-orange-600', light: 'from-amber-100 to-orange-100', accent: 'amber' },
    { bg: 'from-rose-500 to-pink-600', light: 'from-rose-100 to-pink-100', accent: 'rose' },
    { bg: 'from-cyan-500 to-teal-600', light: 'from-cyan-100 to-teal-100', accent: 'cyan' },
];

const iconMap: Record<string, string> = {
    'graduation-cap': '🎓', 'robot': '🤖', 'brain': '🧠', 'chart-line': '📊',
    'terminal': '💻', 'code': '🔢', 'mobile-alt': '📱', 'coffee': '☕',
    'globe': '🌐', 'chart-bar': '📈', 'shield-alt': '🔒', 'database': '💾',
    'search': '🔍', 'tasks': '📋', 'bug': '🧪', 'cloud': '☁️',
    'network-wired': '🌐', 'fire': '⚡', 'vial': '🧪',
};

const highlightedProviders = ['Stanford University (Coursera)', 'deeplearning.ai'];

export default function Certificates() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const smoothProgress = useSpring(scrollYProgress, springs.smooth);

    // Simple horizontal scroll - all cards visible, just move left
    const x = useTransform(smoothProgress, [0, 1], ['1%', '-83%']);

    return (
        <section
            ref={targetRef}
            className="relative h-[300vh]"
            id="certificates"
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-white to-stone-50" />

            {/* STICKY CONTAINER */}
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-violet-100/50 to-purple-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-sky-100/50 to-blue-100/50 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-50/30 to-orange-50/30 rounded-full blur-3xl" />

                {/* Header */}
                <div className="pt-12 px-8 md:px-16 z-30">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-amber-600 text-sm font-bold tracking-[0.3em]">06 — CERTIFICATIONS</span>
                        <div className="flex items-center gap-1">
                            <span className="text-2xl">🏆</span>
                            <span className="text-stone-500 text-sm font-medium">{certificates.length}+ verified</span>
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-stone-800 tracking-tight">
                        Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500">Expertise</span>
                    </h2>
                    <p className="text-stone-500 mt-3 text-lg max-w-2xl">
                        Continuous learning through industry-recognized certifications from top platforms
                    </p>
                </div>

                {/* Cards Container - ALL VISIBLE, just horizontal scroll */}
                <div className="flex-1 relative mt-8 overflow-hidden">
                    <motion.div
                        style={{ x }}
                        className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-6 items-center px-8 md:px-16"
                    >
                        {certificates.map((cert, i) => {
                            const colors = colorMap[i % colorMap.length]!;
                            const icon = iconMap[cert.icon] || '📜';
                            const isHighlight = highlightedProviders.some(p => cert.provider.includes(p));

                            return (
                                <motion.a
                                    key={cert.id}
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -12, scale: 1.02, boxShadow: '0 35px 70px rgba(0,0,0,0.15)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-shrink-0 w-[320px] md:w-[380px] h-[420px] md:h-[480px] rounded-3xl overflow-hidden cursor-pointer transition-shadow duration-300 ${isHighlight
                                        ? 'ring-4 ring-amber-200/60 shadow-2xl shadow-amber-100/50'
                                        : 'shadow-xl'
                                        }`}
                                >
                                    {/* Top gradient section */}
                                    <div className={`h-[42%] bg-gradient-to-br ${colors.bg} relative overflow-hidden`}>
                                        {/* Decorative shapes */}
                                        <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                                        {/* Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-7xl md:text-8xl filter drop-shadow-lg">
                                                {icon}
                                            </span>
                                        </div>

                                        {/* Verified badge - light glassmorphism is OK on small elements */}
                                        <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-full flex items-center gap-1.5">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            <span className="text-white text-xs font-bold">Verified</span>
                                        </div>

                                        {/* Highlight badge */}
                                        {isHighlight && (
                                            <div className="absolute top-4 left-4 px-2.5 py-1 bg-amber-500 backdrop-blur-sm rounded-full shadow-lg">
                                                <span className="text-white text-xs font-bold">⭐ Premium</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bottom content */}
                                    <div className="h-[58%] bg-white p-5 md:p-6 flex flex-col">
                                        <h3 className="text-lg md:text-xl font-bold text-stone-800 leading-tight mb-2 line-clamp-2">
                                            {cert.title}
                                        </h3>

                                        <div className="flex items-center gap-2 mb-3">
                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.bg}`} />
                                            <span className="text-stone-500 text-sm font-medium">{cert.provider}</span>
                                        </div>

                                        <div className="flex-1" />

                                        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                                            <span className="text-stone-400 text-sm">Click to verify →</span>
                                            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${colors.light}`}>
                                                <span className="text-stone-600 text-xs font-bold">Certificate</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}

                        {/* Final CTA card */}
                        <div className="flex-shrink-0 w-[320px] h-[420px] rounded-3xl bg-gradient-to-br from-stone-100 to-stone-50 border-2 border-dashed border-stone-300 flex flex-col items-center justify-center gap-4 p-8">
                            <span className="text-6xl">🎯</span>
                            <p className="text-stone-600 font-bold text-xl text-center">Always Learning</p>
                            <p className="text-stone-400 text-center text-sm">More certifications in progress...</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
