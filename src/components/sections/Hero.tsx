'use client';

import { useRef, memo, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { personalInfo } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

// Memoized decorative orbs to prevent re-renders
const DecorativeOrbs = memo(function DecorativeOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 left-[10%] w-32 h-32 bg-sky-200/30 rounded-full blur-2xl"
            />
            <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-32 right-[15%] w-48 h-48 bg-amber-200/30 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/3 right-[20%] w-24 h-24 bg-teal-200/20 rounded-full blur-2xl"
            />
        </div>
    );
});

// Memoized scroll indicator with smoother animation
const ScrollIndicator = memo(function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: easings.apple }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-stone-400 text-xs tracking-widest">SCROLL</span>
            <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-5 h-8 border-2 border-stone-300 rounded-full flex justify-center pt-1"
            >
                <motion.div 
                    className="w-1 h-2 bg-stone-400 rounded-full"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </motion.div>
    );
});

function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    // Smooth spring for parallax
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const y = useTransform(smoothProgress, [0, 1], ['0%', '25%']);
    const opacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.97]);
    
    // Page curl effect - the section "curls up" as you scroll
    const rotateX = useTransform(smoothProgress, [0, 1], [0, -12]);
    const clipPath = useTransform(
        smoothProgress,
        [0, 0.3, 0.6, 1],
        [
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            'polygon(0% 0%, 100% 0%, 100% 90%, 0% 95%)',
            'polygon(0% 0%, 100% 0%, 100% 60%, 0% 75%)',
            'polygon(0% 0%, 100% 0%, 100% 0%, 0% 15%)',
        ]
    );
    
    // Shadow that follows the curl
    const shadowOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.25, 0.35, 0]);

    return (
        <motion.section
            id="hero"
            ref={ref}
            className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FEFCF6] via-[#FDF8EE] to-[#F5EFE6]"
            style={{
                clipPath,
                transformOrigin: 'top center',
                perspective: 1200,
            }}
        >
            {/* Page curl shadow */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    opacity: shadowOpacity,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                }}
            />
            
            <DecorativeOrbs />

            {/* Content */}
            <motion.div 
                style={{ y, opacity, scale, rotateX, transformStyle: 'preserve-3d' }} 
                className="relative z-10 text-center px-4 max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: easings.apple }}
                    className="mb-6"
                >
                    <span className="text-stone-400 text-sm md:text-base tracking-[0.3em] font-medium">
                        {personalInfo.titles[0]?.toUpperCase() ?? ''}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: easings.apple }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black text-stone-800 tracking-tight leading-[0.9]"
                >
                    {personalInfo.firstName.toUpperCase()}
                    <br />
                    <motion.span 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-teal-400 to-amber-500"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: easings.apple }}
                    >
                        {personalInfo.lastName.toUpperCase()}
                    </motion.span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.8, ease: easings.apple }}
                    className="text-stone-500 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed"
                >
                    Crafting intelligent solutions through Machine Learning, Deep Learning & Distributed Systems.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.0, ease: easings.apple }}
                    className="mt-12 flex flex-wrap justify-center gap-4"
                >
                    <motion.a
                        href="#contact"
                        className="px-8 py-4 bg-stone-900 text-white font-semibold rounded-full transition-all duration-300"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', ...springs.snappy }}
                    >
                        Get in Touch
                    </motion.a>
                    <motion.a
                        href="#experience"
                        className="px-8 py-4 border-2 border-stone-300 text-stone-700 font-semibold rounded-full transition-all duration-300"
                        whileHover={{ scale: 1.03, borderColor: '#a8a29e' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', ...springs.snappy }}
                    >
                        View My Journey
                    </motion.a>
                </motion.div>
            </motion.div>

            <ScrollIndicator />
        </motion.section>
    );
}

export default memo(Hero);
