'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { education } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

// Academic color palette with gold accents
const colorConfig = {
    masters: {
        gradient: 'from-amber-400 via-yellow-500 to-orange-500',
        bgGradient: 'from-amber-50/80 via-yellow-50/60 to-orange-50/40',
        accent: '#D4AF37', // Academic gold
        icon: '🎓',
        prestige: 5,
    },
    bachelors: {
        gradient: 'from-sky-400 via-blue-500 to-indigo-500',
        bgGradient: 'from-sky-50/80 via-blue-50/60 to-indigo-50/40',
        accent: '#1E3A5F', // Academic blue
        icon: '🏛️',
        prestige: 4,
    },
};

// Prestige star rating component
const PrestigeStars = ({ level }: { level: number }) => (
    <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
            <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring', ...springs.bouncy }}
                className={`text-sm ${i < level ? 'text-amber-400' : 'text-stone-200'}`}
            >
                ★
            </motion.span>
        ))}
    </div>
);

// Timeline dot component with glow effect
const TimelineDot = ({ isActive, color }: { isActive: boolean; color: string }) => (
    <div className="relative">
        {/* Glow effect */}
        {isActive && (
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{
                    scale: [1, 1.8, 2.2],
                    opacity: [0.6, 0.3, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
        )}
        {/* Main dot */}
        <motion.div
            className="relative z-10 w-4 h-4 rounded-full border-4 border-white shadow-lg"
            style={{ backgroundColor: color }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', ...springs.bouncy, delay: 0.3 }}
        />
    </div>
);

// Degree card component
const DegreeCard = ({
    edu,
    index,
    isFlipped,
    onFlip,
}: {
    edu: typeof education[0];
    index: number;
    isFlipped: boolean;
    onFlip: () => void;
}) => {
    const config = colorConfig[edu.id as keyof typeof colorConfig] || colorConfig.bachelors;
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={cardRef}
            className="relative perspective-1000"
            initial={{ opacity: 0, x: -60, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, ease: easings.cinematic, delay: index * 0.2 }}
        >
            <motion.div
                className="relative cursor-pointer preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: easings.smoothInOut }}
                onClick={onFlip}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front of card */}
                <div
                    className={`relative rounded-3xl overflow-hidden border-2 border-white/60 shadow-2xl backface-hidden`}
                    style={{ 
                        background: `linear-gradient(135deg, rgba(255,252,245,0.95), rgba(255,255,255,0.9))`,
                        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(212,175,55,0.1)`,
                    }}
                >
                    {/* Gold foil border effect */}
                    <div className={`absolute inset-0 rounded-3xl pointer-events-none`}>
                        <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br ${config.gradient} opacity-20`} 
                            style={{ 
                                maskImage: 'linear-gradient(135deg, black, transparent)',
                                WebkitMaskImage: 'linear-gradient(135deg, black, transparent)',
                            }}
                        />
                    </div>

                    {/* Shimmer effect */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            transform: 'skewX(-20deg)',
                        }}
                        initial={{ x: '-200%' }}
                        whileInView={{ x: '200%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: 'easeInOut' }}
                    />

                    <div className="relative p-8 md:p-10">
                        {/* Header with icon and badge */}
                        <div className="flex items-start justify-between mb-8">
                            <motion.div
                                className="text-6xl"
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', ...springs.bouncy, delay: 0.4 + index * 0.1 }}
                            >
                                {config.icon}
                            </motion.div>
                            
                            <div className="flex flex-col items-end gap-2">
                                {/* Status badge */}
                                <motion.span
                                    className={`px-4 py-1.5 text-xs font-bold rounded-full text-white shadow-lg`}
                                    style={{
                                        background: `linear-gradient(135deg, ${config.accent}, ${config.accent}cc)`,
                                        boxShadow: `0 4px 15px ${config.accent}40`,
                                    }}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                >
                                    ✓ {edu.status === 'completed' ? 'Completed' : 'In Progress'}
                                </motion.span>
                                
                                {/* Prestige stars */}
                                <PrestigeStars level={config.prestige} />
                            </div>
                        </div>

                        {/* Degree name - Large serif font */}
                        <motion.h3
                            className="text-2xl md:text-3xl font-bold text-stone-800 mb-3 leading-tight"
                            style={{ fontFamily: 'Georgia, serif' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: easings.apple }}
                        >
                            {edu.degree}
                        </motion.h3>

                        {/* Institution name with gradient */}
                        <motion.p
                            className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-4`}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.8, ease: easings.apple }}
                        >
                            {edu.institution}
                        </motion.p>

                        {/* Location and date */}
                        <div className="flex flex-wrap gap-4 text-stone-500 text-sm mb-6">
                            <span className="flex items-center gap-1.5">
                                <span className="text-base">📍</span> {edu.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="text-base">📅</span> {edu.dateRange}
                            </span>
                        </div>

                        {/* Specialization */}
                        {edu.specialization && (
                            <motion.div
                                className="mb-6 p-4 rounded-2xl border border-amber-200/50"
                                style={{ 
                                    background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.05))',
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                <h4 className="text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
                                    🎯 Specialization
                                </h4>
                                <p className="text-stone-700 font-semibold">{edu.specialization}</p>
                            </motion.div>
                        )}

                        {/* Key coursework preview */}
                        <div>
                            <h4 className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-3">
                                📚 Key Coursework
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {edu.coursework.slice(0, 3).map((course, i) => (
                                    <motion.span
                                        key={course.name}
                                        className="px-3 py-1.5 bg-white/80 text-stone-600 text-xs font-medium rounded-full border border-stone-100 shadow-sm"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6 + i * 0.05 + index * 0.1, type: 'spring', ...springs.bouncy }}
                                    >
                                        {course.icon} {course.name}
                                    </motion.span>
                                ))}
                                {edu.coursework.length > 3 && (
                                    <span className="px-3 py-1.5 bg-stone-100 text-stone-500 text-xs font-medium rounded-full">
                                        +{edu.coursework.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Click to flip hint */}
                        <motion.div
                            className="mt-6 text-center text-stone-400 text-xs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            👆 Click to see full coursework
                        </motion.div>
                    </div>
                </div>

                {/* Back of card - Full coursework */}
                <div
                    className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/60 shadow-2xl backface-hidden"
                    style={{ 
                        background: `linear-gradient(135deg, rgba(255,252,245,0.98), rgba(255,255,255,0.95))`,
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                    }}
                >
                    <div className="p-8 md:p-10 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className={`text-xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                                Complete Coursework
                            </h4>
                            <span className="text-4xl">{config.icon}</span>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {edu.coursework.map((course, i) => (
                                <div
                                    key={course.name}
                                    className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-xl border border-stone-100"
                                >
                                    <span className="text-lg">{course.icon}</span>
                                    <span className="text-stone-700 text-sm font-medium">{course.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Click to flip back hint */}
                        <div className="mt-6 text-center text-stone-400 text-xs">
                            👆 Click to go back
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function Education() {
    const ref = useRef<HTMLDivElement>(null);
    const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(smoothProgress, [0, 0.3], [40, 0]);

    const handleFlip = useCallback((id: string) => {
        setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
    }, []);

    return (
        <section id="education" ref={ref} className="relative min-h-screen py-24 overflow-hidden">
            {/* Premium background with paper texture effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-amber-50/20 to-white" />
            
            {/* Decorative academic elements */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-100/40 to-yellow-100/40 rounded-full blur-[150px]" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-sky-100/40 to-blue-100/40 rounded-full blur-[130px]" />
            
            {/* Subtle paper grain texture */}
            <div 
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <motion.div style={{ opacity, y }} className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
                {/* Header with academic styling */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: easings.apple }}
                    className="text-center mb-20"
                >
                    {/* Floating academic cap */}
                    <motion.div
                        className="text-6xl mb-6"
                        initial={{ y: 0 }}
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        🎓
                    </motion.div>
                    
                    <span className="text-amber-600 text-sm font-bold tracking-[0.3em] uppercase">
                        05 — Academic Journey
                    </span>
                    
                    <h2 className="text-5xl md:text-7xl font-black text-stone-800 mt-4 tracking-tight">
                        Hall of{' '}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500">
                                Excellence
                            </span>
                            {/* Gold underline */}
                            <motion.div
                                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8, ease: easings.apple }}
                            />
                        </span>
                    </h2>
                    
                    <p className="mt-6 text-stone-500 text-lg max-w-2xl mx-auto">
                        Building foundations in AI and Computer Science through world-class education
                    </p>
                </motion.div>

                {/* Timeline layout */}
                <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
                        {/* Background line */}
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-200 via-yellow-200 to-amber-200 rounded-full" />
                        {/* Animated progress line */}
                        <motion.div
                            className="absolute inset-x-0 top-0 bg-gradient-to-b from-amber-400 via-yellow-500 to-orange-400 rounded-full origin-top"
                            style={{ scaleY: smoothProgress }}
                        />
                    </div>

                    {/* Education cards */}
                    <div className="space-y-16">
                        {education.map((edu, index) => {
                            const config = colorConfig[edu.id as keyof typeof colorConfig] || colorConfig.bachelors;
                            const isEven = index % 2 === 0;
                            
                            return (
                                <div 
                                    key={edu.id}
                                    className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20">
                                        <TimelineDot isActive={true} color={config.accent} />
                                    </div>

                                    {/* Card container */}
                                    <div className={`w-full pl-20 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                        <DegreeCard
                                            edu={edu}
                                            index={index}
                                            isFlipped={flippedCards[edu.id] || false}
                                            onFlip={() => handleFlip(edu.id)}
                                        />
                                    </div>

                                    {/* Year badge on opposite side */}
                                    <div className={`hidden md:block absolute ${isEven ? 'right-0 md:right-auto md:left-1/2 md:ml-12' : 'left-1/2 mr-12'} text-center`}>
                                        <motion.div
                                            className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-stone-100"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + index * 0.2, type: 'spring', ...springs.bouncy }}
                                        >
                                            <span className="text-stone-600 font-bold text-sm">
                                                {edu.dateRange.split('–')[0]?.trim()}
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            {/* Bottom transition gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
            
            {/* CSS for 3D transforms */}
            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
            `}</style>
        </section>
    );
}
