'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { about, stats, certificates } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const y = useTransform(smoothProgress, [0, 0.2], [80, 0]);
    const scale = useTransform(smoothProgress, [0, 0.2], [0.94, 1]);
    // Subtle 3D rotation as section enters
    const rotateX = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [8, 0, 0, -4]);

    // GSAP ScrollTrigger for staggered content reveal
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate individual elements with scroll
            gsap.fromTo('.about-header', 
                { opacity: 0, y: 60 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.about-header',
                        start: 'top 85%',
                        end: 'top 50%',
                        scrub: 1,
                    }
                }
            );

            gsap.fromTo('.about-story', 
                { opacity: 0, x: -60 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.about-story',
                        start: 'top 80%',
                        end: 'top 45%',
                        scrub: 1,
                    }
                }
            );

            gsap.fromTo('.about-stats', 
                { opacity: 0, x: 60 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.about-stats',
                        start: 'top 80%',
                        end: 'top 45%',
                        scrub: 1,
                    }
                }
            );

            // Stagger stat cards
            gsap.fromTo('.stat-card', 
                { opacity: 0, y: 40, scale: 0.9 },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.about-stats',
                        start: 'top 75%',
                        end: 'top 40%',
                        scrub: 1,
                    }
                }
            );
        }, ref);

        return () => ctx.revert();
    }, []);

    // Compute dynamic stats
    const aboutStats = [
        { value: '6+', label: 'Years of Coding', color: 'from-sky-400 to-blue-500', icon: '💻' },
        { value: `${stats[2]?.value || 50}+`, label: 'Hackathons Led', color: 'from-violet-400 to-purple-500', icon: '🚀' },
        { value: `${stats[0]?.value || 17}+`, label: 'GitHub Projects', color: 'from-amber-400 to-orange-500', icon: '📦' },
        { value: `${certificates.length}+`, label: 'Certifications', color: 'from-teal-400 to-emerald-500', icon: '🏆' },
    ];

    return (
        <section
            id="about"
            ref={ref}
            className="relative min-h-screen bg-gradient-to-b from-white via-stone-50/50 to-white py-20 md:py-0 md:flex md:items-center overflow-hidden z-20"
        >
            {/* Decorative background elements - static for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-64 h-64 bg-sky-100/40 rounded-full blur-[80px]" />
                <div className="absolute bottom-20 left-10 w-56 h-56 bg-amber-100/40 rounded-full blur-[80px]" />
            </div>

            <div 
                ref={contentRef}
                className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 w-full"
            >
                {/* Section header */}
                <div className="about-header mb-10 md:mb-16">
                    <span className="text-sky-500 text-sm font-bold tracking-[0.3em]">01 — ABOUT ME</span>
                    <h2 className="text-3xl md:text-6xl font-black text-stone-800 mt-3 md:mt-4 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500">Story</span>
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
                    {/* Left: Story */}
                    <div className="about-story space-y-5 md:space-y-6">
                        <div className="relative">
                            <div className="absolute -left-3 md:-left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 via-violet-400 to-amber-400 rounded-full" />
                            <p className="text-lg md:text-2xl text-stone-700 leading-relaxed font-medium pl-5 md:pl-6">
                                I'm an <span className="text-sky-600 font-bold">AI Research Engineer</span> pursuing my Master of Applied Computing at the University of Windsor,
                                specializing in <span className="text-violet-600 font-bold">Artificial Intelligence</span> and <span className="text-amber-600 font-bold">Finance</span>.
                            </p>
                        </div>

                        <p className="text-stone-500 leading-relaxed text-base md:text-lg">
                            With hands-on experience at <span className="font-semibold text-stone-700">JLR North America</span> and <span className="font-semibold text-stone-700">TD Bank</span>, I've developed production-ready
                            ML systems for credit-lending predictions, predictive analytics for industrial operations,
                            and cutting-edge AI research in the automotive sector.
                        </p>

                        <p className="text-stone-500 leading-relaxed text-base md:text-lg">
                            Beyond work, I've coordinated <span className="font-semibold text-stone-700">50+ AI & coding hackathons</span> at Gravity LPU, engaging over
                            <span className="font-semibold text-stone-700"> 200 participants</span> and fostering a community of innovation and learning.
                        </p>

                        {/* Action items */}
                        <div className="flex flex-wrap gap-3 md:gap-4 pt-3 md:pt-4">
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.03, boxShadow: '0 15px 35px rgba(14, 165, 233, 0.2)' }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', ...springs.snappy }}
                                className="px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-sky-500 to-violet-500 text-white text-sm md:text-base font-semibold rounded-full shadow-lg shadow-sky-200/50"
                            >
                                Let's Connect →
                            </motion.a>
                            <motion.a
                                href="#experience"
                                whileHover={{ scale: 1.03, borderColor: '#a8a29e' }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', ...springs.snappy }}
                                className="px-5 md:px-6 py-2.5 md:py-3 border-2 border-stone-200 text-stone-700 text-sm md:text-base font-semibold rounded-full"
                            >
                                View Journey
                            </motion.a>
                        </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="about-stats grid grid-cols-2 gap-3 md:gap-4 mt-6 lg:mt-0">
                        {aboutStats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className="stat-card bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-stone-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="text-2xl md:text-3xl mb-2 md:mb-3 block">{stat.icon}</span>
                                <div className={`text-3xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                                <div className="text-stone-500 text-xs md:text-sm mt-1.5 md:mt-2 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
