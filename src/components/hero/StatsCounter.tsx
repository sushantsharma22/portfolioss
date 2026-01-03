'use client';

import { memo, useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
    label: string;
    value: number;
    suffix?: string;
    prefix?: string;
}

const stats: Stat[] = [
    { label: 'Projects Built', value: 50, suffix: '+' },
    { label: 'AI Models Trained', value: 25, suffix: '+' },
    { label: 'Lines of Code', value: 100, suffix: 'K+' },
];

interface CounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    delay?: number;
}

function Counter({ value, suffix = '', prefix = '', duration = 2, delay = 0 }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const timeoutId = setTimeout(() => {
            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

                // EaseOut cubic for smooth deceleration
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * value));

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setCount(value);
                }
            };

            animationFrame = requestAnimationFrame(animate);
        }, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [isInView, value, duration, delay]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{count}{suffix}
        </span>
    );
}

function StatsCounter() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={containerRef}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                >
                    <div className="text-3xl md:text-5xl font-bold text-white font-mono tracking-tight">
                        <Counter
                            value={stat.value}
                            suffix={stat.suffix}
                            prefix={stat.prefix}
                            duration={2}
                            delay={0.5 + i * 0.2}
                        />
                    </div>
                    <div className="mt-2 text-xs md:text-sm text-white/50 tracking-widest uppercase">
                        {stat.label}
                    </div>

                    {/* Decorative line */}
                    <motion.div
                        className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4ff00]/50 to-transparent mx-auto mt-3"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}

export default memo(StatsCounter);
