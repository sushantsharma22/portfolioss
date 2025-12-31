'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader({ onComplete }: { onComplete?: () => void }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="fixed inset-0 z-[10000] bg-[#FEFCF6] flex items-center justify-center"
                >
                    {/* Warm cream background matching Hero */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FEFCF6] via-[#FDF8EE] to-[#F5EFE6]" />

                    {/* Animated circles */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-64 h-64 bg-sky-200/40 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute w-48 h-48 bg-amber-100/50 rounded-full blur-3xl"
                    />

                    {/* Content */}
                    <div className="relative z-10 text-center">
                        {/* Name reveal */}
                        <div className="overflow-hidden">
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="flex justify-center gap-4"
                            >
                                <motion.span
                                    initial={{ x: -30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl md:text-6xl font-black text-stone-800"
                                >
                                    SUSHANT
                                </motion.span>
                                <motion.span
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-teal-500"
                                >
                                    SHARMA
                                </motion.span>
                            </motion.div>
                        </div>

                        {/* Loading bar */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="h-0.5 bg-gradient-to-r from-sky-400 to-teal-400 mt-6 w-48 mx-auto origin-left"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
