'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { experience } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

const colorMap = [
    { color: 'from-sky-400 to-blue-500', accent: 'sky' },
    { color: 'from-teal-400 to-emerald-500', accent: 'teal' },
    { color: 'from-amber-400 to-orange-500', accent: 'amber' },
    { color: 'from-rose-400 to-pink-500', accent: 'rose' },
    { color: 'from-violet-400 to-purple-500', accent: 'violet' },
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const lastScrollTime = useRef(0);
    const isLocked = useRef(false);
    const scrollAccumulator = useRef(0);
    const [isMounted, setIsMounted] = useState(false);

    // Height: Sufficient to be a section, but lock handles the sticky behavior.
    const itemHeightVh = 100;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // OPTIMIZED SCROLL TRAP
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isMounted) return;

        // Threshold to trigger a card switch (e.g. 50px of virtual scroll)
        const SCROLL_THRESHOLD = 60;

        // Cooldown between switches (ms)
        const SWITCH_COOLDOWN = 600;

        const handleWheel = (e: WheelEvent) => {
            // 1. FAST CHECK: Are we locked?
            // If we are locked, we skip bounds checks and go straight to logic.
            // If NOT locked, we check bounds.

            let shouldBeLocked = isLocked.current;

            if (!shouldBeLocked) {
                const rect = container.getBoundingClientRect();
                const isAtTop = rect.top <= 2 && rect.top >= -2; // Precise entry
                const isInside = rect.top <= 0 && rect.bottom >= window.innerHeight;

                // We only engage lock if we are strictly inside the content zone
                if (isInside) {
                    shouldBeLocked = true;
                    isLocked.current = true;
                    window.lenis?.stop();
                }
            }

            if (!shouldBeLocked) return;

            // We are locked. Intercept EVERYTHING.
            e.preventDefault();
            e.stopPropagation();

            // 2. Accumulate Delta
            // Limit delta per event to prevent massive jumps from single frames
            const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 100);
            scrollAccumulator.current += delta;

            const now = Date.now();
            const timeSinceLast = now - lastScrollTime.current;

            // 3. Check Threshold
            if (Math.abs(scrollAccumulator.current) > SCROLL_THRESHOLD && timeSinceLast > SWITCH_COOLDOWN) {
                const direction = Math.sign(scrollAccumulator.current);
                const nextIndex = activeIndex + direction;

                // CHECK BOUNDARIES for EXIT
                if (nextIndex < 0) {
                    // Exiting UP
                    isLocked.current = false;
                    window.lenis?.start();
                    // No state update, just let go.
                    // We might need to manually scroll lenis up a tiny bit to escape the trap zone?
                    // Usually preventing default stops the scroll, so we are still at 0.
                    // The USER has to scroll again to move up. 
                    // OR we can manually nudge:
                    return;
                }

                if (nextIndex >= experience.length) {
                    // Exiting DOWN
                    isLocked.current = false;
                    window.lenis?.start();
                    return;
                }

                // VALID SWITCH
                setActiveIndex(nextIndex);
                lastScrollTime.current = now;
                scrollAccumulator.current = 0; // Reset bucket
            }

            // Decay/Reset accumulator if user stops scrolling?
            // Or simple approach: just keep growing until threshold.
            // But if user scrolls up then down, we should cancel out. (Already happens with +delta)
        };

        // Passive false for preventDefault
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.lenis?.start(); // Safety unlock
        };
    }, [activeIndex, isMounted]);

    const colorMap = [
        { color: 'from-sky-400 to-blue-500', accent: 'sky' },
        { color: 'from-teal-400 to-emerald-500', accent: 'teal' },
        { color: 'from-amber-400 to-orange-500', accent: 'amber' },
        { color: 'from-rose-400 to-pink-500', accent: 'rose' },
        { color: 'from-violet-400 to-purple-500', accent: 'violet' },
    ];

    return (
        <section
            id="experience"
            ref={containerRef}
            className="relative"
            style={{ height: `${experience.length * itemHeightVh}vh` }}
        >
            {/* Gradient transition from About */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-stone-100" />

            {/* Content is STICKY - it stays fixed while the container scrolls (or while we fake scroll) */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Premium backdrop */}
                <div className="absolute inset-0 bg-stone-50" />

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-sky-100/30 to-blue-100/30 rounded-full blur-[150px]" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-100/30 to-orange-100/30 rounded-full blur-[120px]" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: easings.apple }}
                    className="absolute top-16 left-8 md:left-16 z-30"
                >
                    <span className="text-amber-600 text-xs md:text-sm font-bold tracking-[0.3em]">02 — EXPERIENCE</span>
                    <h2 className="text-3xl md:text-5xl font-black text-stone-800 mt-2 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-amber-500">Journey</span>
                    </h2>
                </motion.div>

                {/* Large background number */}
                <div className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 hidden lg:block">
                    <span className={`text-[20rem] font-black leading-none bg-gradient-to-br ${colorMap[activeIndex % colorMap.length]?.color} bg-clip-text text-transparent opacity-[0.03]`}>
                        {(activeIndex + 1).toString().padStart(2, '0')}
                    </span>
                </div>

                {/* Cards */}
                <div className="absolute inset-0 flex items-center justify-center pt-8">
                    {experience.map((exp, index) => {
                        const colors = colorMap[index % colorMap.length] ?? colorMap[0];
                        const isActive = index === activeIndex;

                        return (
                            <motion.div
                                key={exp.id}
                                className="absolute w-full max-w-4xl px-4 md:px-8"
                                initial={false}
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                    scale: isActive ? 1 : 0.94,
                                    y: isActive ? 0 : 20,
                                }}
                                transition={{ duration: 0.6, ease: easings.apple }}
                                style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                            >
                                <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-stone-200/60 overflow-hidden border border-stone-100/80">
                                    {/* Gradient top bar */}
                                    <div className={`h-1.5 bg-gradient-to-r ${colors?.color}`} />

                                    <div className="p-8 md:p-12">
                                        {/* Header */}
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                            <div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors?.color}`} />
                                                    <span className="text-stone-400 text-sm font-semibold tracking-wide">{exp.dateRange}</span>
                                                </div>
                                                <h3 className="text-3xl md:text-4xl font-bold text-stone-800 mb-2 leading-tight">{exp.title}</h3>
                                                <p className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${colors?.color} bg-clip-text text-transparent`}>
                                                    {exp.company}
                                                </p>
                                                <p className="text-stone-400 text-sm mt-2 flex items-center gap-2">
                                                    <span>📍</span> {exp.location}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-stone-600 text-lg leading-relaxed mb-8">{exp.summary}</p>

                                        {/* Achievements */}
                                        <div className="space-y-3 mb-8">
                                            {exp.achievements.map((a, i) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    <div className={`mt-2 w-2 h-2 rounded-full bg-gradient-to-r ${colors?.color} flex-shrink-0`} />
                                                    <span className="text-stone-500 leading-relaxed">{a}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech stack */}
                                        <div className="flex flex-wrap gap-3">
                                            {exp.techStack.map((t) => (
                                                <span key={t} className="px-4 py-2 bg-stone-50 text-stone-600 text-sm font-medium rounded-full border border-stone-100">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Progress indicator */}
                <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                    {experience.map((exp, i) => {
                        const colors = colorMap[i % colorMap.length] ?? colorMap[0];
                        return (
                            <div key={exp.id} className="flex items-center gap-3">
                                <div
                                    className={`rounded-full transition-all duration-300 ${i === activeIndex
                                        ? `w-3 h-8 bg-gradient-to-b ${colors?.color}`
                                        : 'w-2 h-2 bg-stone-300'
                                        }`}
                                />
                                {i === activeIndex && (
                                    <span className="text-stone-600 text-sm font-medium hidden md:block">
                                        {exp.company.split(' ')[0]}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Counter */}
                <div className="absolute bottom-8 right-8 md:right-16 text-stone-400 font-mono">
                    <span className="text-stone-800 font-bold text-2xl">{(activeIndex + 1).toString().padStart(2, '0')}</span>
                    <span className="mx-2 text-stone-300">/</span>
                    <span className="text-stone-400">{experience.length.toString().padStart(2, '0')}</span>
                </div>
            </div>
        </section>
    );
}
