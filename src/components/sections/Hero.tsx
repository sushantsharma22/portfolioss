'use client';

import { useRef, memo, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '@/lib/constants';

// Memoized decorative orbs to prevent re-renders
const DecorativeOrbs = memo(function DecorativeOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 left-[10%] w-32 h-32 bg-sky-200/30 rounded-full blur-2xl"
                style={{ willChange: 'transform' }}
            />
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-32 right-[15%] w-48 h-48 bg-amber-200/30 rounded-full blur-3xl"
                style={{ willChange: 'transform' }}
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/3 right-[20%] w-24 h-24 bg-teal-200/20 rounded-full blur-2xl"
                style={{ willChange: 'transform' }}
            />
        </div>
    );
});

// Memoized scroll indicator
const ScrollIndicator = memo(function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-stone-400 text-xs tracking-widest">SCROLL</span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-8 border-2 border-stone-300 rounded-full flex justify-center pt-1"
            >
                <div className="w-1 h-2 bg-stone-400 rounded-full" />
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

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Memoize animation variants
    const fadeUpVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    }), []);

    return (
        <section
            id="hero"
            ref={ref}
            className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FEFCF6] via-[#FDF8EE] to-[#F5EFE6]"
        >
            <DecorativeOrbs />

            {/* Content */}
            <motion.div 
                style={{ y, opacity, willChange: 'transform, opacity' }} 
                className="relative z-10 text-center px-4 max-w-5xl mx-auto"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariants}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                >
                    <span className="text-stone-400 text-sm md:text-base tracking-[0.3em] font-medium">
                        {personalInfo.titles[0].toUpperCase()}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black text-stone-800 tracking-tight leading-[0.9]"
                >
                    {personalInfo.firstName.toUpperCase()}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-teal-400 to-amber-500">
                        {personalInfo.lastName.toUpperCase()}
                    </span>
                </motion.h1>

                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariants}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-stone-500 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed"
                >
                    Crafting intelligent solutions through Machine Learning, Deep Learning & Distributed Systems.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-12 flex flex-wrap justify-center gap-4"
                >
                    <a
                        href="#contact"
                        className="px-8 py-4 bg-stone-900 text-white font-semibold rounded-full hover:bg-stone-800 transition-colors"
                    >
                        Get in Touch
                    </a>
                    <a
                        href="#experience"
                        className="px-8 py-4 border-2 border-stone-300 text-stone-700 font-semibold rounded-full hover:border-stone-400 transition-colors"
                    >
                        View My Journey
                    </a>
                </motion.div>
            </motion.div>

            <ScrollIndicator />
        </section>
    );
}

export default memo(Hero);
