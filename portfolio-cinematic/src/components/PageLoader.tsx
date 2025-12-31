'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 300);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-indigo-950" />

                    {/* Animated background orbs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]"
                    />

                    {/* Content */}
                    <div className="relative z-10 text-center">
                        {/* Logo / Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-2">
                                SS<span className="text-emerald-400">.</span>
                            </h1>
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-white/40 text-sm tracking-[0.3em] uppercase mb-12"
                        >
                            Loading Experience
                        </motion.p>

                        {/* Progress bar */}
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: '200px' }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mx-auto"
                        >
                            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-white/30 text-xs mt-3"
                            >
                                {Math.round(Math.min(progress, 100))}%
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Decorative elements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <p className="text-white/20 text-xs tracking-[0.2em]">
                            PORTFOLIO 2025
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
