'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { stats, certificates } from '@/lib/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // GSAP ScrollTrigger - pinned for BOTH mobile and desktop
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // DESKTOP: Pinned scroll with staggered reveal
            mm.add("(min-width: 768px)", () => {
                // Only header visible initially, rest hidden
                gsap.set('.about-header', { opacity: 1, y: 0 });
                gsap.set('.about-story', { opacity: 0, x: -40 });
                gsap.set('.about-stats', { opacity: 0, x: 40 });
                gsap.set('.stat-card', { opacity: 0, y: 30, scale: 0.9 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top top',
                        end: '+=180vh',  // Longer scroll distance for slower animation
                        pin: true,
                        scrub: 2,        // Higher scrub value = slower
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Staggered reveal animation - slower durations
                tl
                    .to('.about-story', { opacity: 1, x: 0, duration: 1.5 }, 0.5)
                    .to('.about-stats', { opacity: 1, x: 0, duration: 1.5 }, 0.8)
                    .to('.stat-card', {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.2,
                        duration: 1,
                        ease: 'back.out(1.4)'
                    }, 1.2)
                    .to({}, { duration: 1.2 }); // Longer hold at end

                return () => tl.kill();
            });

            // MOBILE: Also pinned with staggered reveal
            mm.add("(max-width: 767px)", () => {
                // Only header visible initially
                gsap.set('.about-header', { opacity: 1, y: 0 });
                gsap.set('.about-story', { opacity: 0, y: 30 });
                gsap.set('.about-stats', { opacity: 0, y: 30 });
                gsap.set('.stat-card', { opacity: 0, y: 20, scale: 0.95 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top top',
                        end: '+=150vh',  // Longer scroll distance
                        pin: true,
                        scrub: 2,        // Slower scrub
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Staggered reveal - slower
                tl
                    .to('.about-story', { opacity: 1, y: 0, duration: 1.5 }, 0.4)
                    .to('.about-stats', { opacity: 1, y: 0, duration: 1.5 }, 0.7)
                    .to('.stat-card', {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.15,
                        duration: 0.8
                    }, 1.1)
                    .to({}, { duration: 1 }); // Hold

                return () => tl.kill();
            });

            return () => mm.revert();
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
            className="relative min-h-screen md:h-screen bg-gradient-to-b from-white via-stone-50/50 to-white overflow-hidden z-20 py-16 md:py-0 md:flex md:items-center"
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-64 h-64 bg-sky-100/40 rounded-full blur-[80px]" />
                <div className="absolute bottom-20 left-10 w-56 h-56 bg-amber-100/40 rounded-full blur-[80px]" />
            </div>

            <div
                ref={contentRef}
                className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 w-full"
            >
                {/* Section header */}
                <div className="about-header mb-8 md:mb-16 text-center md:text-left">
                    <span className="text-sky-500 text-xs md:text-sm font-bold tracking-[0.3em]">01 — ABOUT ME</span>
                    <h2 className="text-3xl md:text-6xl font-black text-stone-800 mt-2 md:mt-4 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-violet-500 to-amber-500">Story</span>
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">
                    {/* Left: Story */}
                    <div className="about-story space-y-4 md:space-y-6">
                        <div className="relative">
                            <div className="absolute -left-3 md:-left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 via-violet-400 to-amber-400 rounded-full" />
                            <p className="text-base md:text-2xl text-stone-700 leading-relaxed font-medium pl-4 md:pl-6">
                                I'm an <span className="text-sky-600 font-bold">AI Research Engineer</span> pursuing my Master's at University of Windsor,
                                specializing in <span className="text-violet-600 font-bold">AI</span> and <span className="text-amber-600 font-bold">Finance</span>.
                            </p>
                        </div>

                        <p className="text-stone-500 leading-relaxed text-sm md:text-lg">
                            With experience at <span className="font-semibold text-stone-700">JLR North America</span> and <span className="font-semibold text-stone-700">TD Bank</span>, I build production-ready ML systems for fintech and automotive.
                        </p>

                        <p className="text-stone-500 leading-relaxed text-sm md:text-lg">
                            Coordinated <span className="font-semibold text-stone-700">50+ AI hackathons</span> engaging
                            <span className="font-semibold text-stone-700"> 200+ developers</span> in innovation.
                        </p>

                        {/* Action items */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-sky-500 to-violet-500 text-white text-sm md:text-base font-semibold rounded-full shadow-lg"
                            >
                                Let's Connect →
                            </motion.a>
                            <motion.a
                                href="#experience"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-5 md:px-6 py-2.5 md:py-3 border-2 border-stone-200 text-stone-700 text-sm md:text-base font-semibold rounded-full"
                            >
                                View Journey
                            </motion.a>
                        </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="about-stats grid grid-cols-2 gap-3 md:gap-4">
                        {aboutStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="stat-card bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-stone-100 shadow-md hover:shadow-lg transition-shadow duration-300"
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
