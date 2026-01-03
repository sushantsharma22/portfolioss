'use client';

import { memo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import MaskRevealPortrait from './MaskRevealPortrait';
import { personalInfo, socialLinks } from '@/lib/constants';

// Animated organic flowing lines (magazine style)
function FlowingLines() {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
        >
            <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d1d5db" stopOpacity="0" />
                    <stop offset="50%" stopColor="#9ca3af" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#d1d5db" stopOpacity="0" />
                </linearGradient>
            </defs>

            {[0, 1, 2, 3].map((i) => (
                <motion.path
                    key={i}
                    d={`M${-100 + i * 50} ${200 + i * 120} Q ${400 + i * 100} ${100 + i * 80}, ${700 + i * 50} ${220 + i * 100} T ${1100 + i * 50} ${180 + i * 90} T ${1500 + i * 30} ${250 + i * 80}`}
                    stroke="url(#lineGrad)"
                    strokeWidth={1 + i * 0.2}
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: 1,
                        opacity: 0.3 - i * 0.05,
                    }}
                    transition={{ duration: 2 + i * 0.3, delay: 0.5 + i * 0.2, ease: 'easeOut' }}
                />
            ))}
        </svg>
    );
}

// Social icons
const socialIcons: Record<string, React.ReactNode> = {
    github: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    ),
    linkedin: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    email: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
};

function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const opacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
    const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMouseX(x * 20);
        setMouseY(y * 20);
    };

    return (
        <section
            id="hero"
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#fafaf9] via-white to-[#f5f5f4]"
        >
            {/* Flowing organic lines - magazine aesthetic */}
            <FlowingLines />

            {/* Soft radial vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,_transparent_30%,_rgba(250,250,249,0.97)_75%)] pointer-events-none z-10" />

            {/* FULL VIEWPORT Portrait with glitch + fluid mask */}
            <motion.div
                style={{ opacity, scale }}
                className="absolute inset-0 z-0"
            >
                <MaskRevealPortrait />
            </motion.div>

            {/* MAGAZINE COVER LAYOUT */}

            {/* Title - Top-left on all screens */}
            <motion.div
                className="absolute top-6 left-4 sm:top-8 sm:left-8 md:top-12 md:left-12 z-20"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    transform: `perspective(1000px) translate3d(${mouseX * 0.6}px, ${mouseY * 0.4}px, 30px) rotateY(${mouseX * 0.15}deg)`,
                    transition: 'transform 0.15s ease-out',
                }}
            >
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.85]"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                    <span className="text-stone-900 block drop-shadow-sm">
                        {personalInfo.firstName.toUpperCase()}
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 block">
                        {personalInfo.lastName.toUpperCase()}
                    </span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    className="mt-3 sm:mt-4 text-stone-500 text-xs sm:text-sm md:text-base font-medium tracking-wide max-w-[200px] sm:max-w-xs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    AI/ML Engineer & Full-Stack Developer
                </motion.p>

                {/* Decorative accent line */}
                <motion.div
                    className="mt-4 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-transparent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: 100 }}
                    transition={{ duration: 0.8, delay: 1 }}
                />
            </motion.div>

            {/* Left sidebar info - Magazine style column (hidden on very small mobile) */}
            <motion.div
                className="absolute bottom-20 left-4 sm:bottom-24 sm:left-8 md:bottom-28 md:left-12 z-20 hidden xs:block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    transform: `perspective(1000px) translate3d(${mouseX * 0.4}px, ${mouseY * 0.3}px, 20px)`,
                    transition: 'transform 0.2s ease-out',
                }}
            >
                {/* Focus area */}
                <div className="mb-4">
                    <span className="text-[10px] text-stone-400 tracking-[0.3em] uppercase font-semibold">Focus</span>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="text-xl">🤖</span>
                        <span className="text-stone-700 font-bold text-sm">Machine Learning</span>
                    </div>
                </div>

                {/* Experience */}
                <div className="mb-4">
                    <span className="text-[10px] text-stone-400 tracking-[0.3em] uppercase font-semibold">Since</span>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="text-xl">💼</span>
                        <span className="text-stone-700 font-bold text-sm">2020</span>
                    </div>
                </div>

                {/* Social links - vertical stack */}
                <div className="flex gap-2 mt-4">
                    {socialLinks.slice(0, 3).map((link, i) => (
                        <motion.a
                            key={link.platform}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-900 hover:text-white transition-all duration-300"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 200 }}
                            whileHover={{ scale: 1.15, y: -3 }}
                        >
                            {socialIcons[link.icon] || socialIcons.email}
                        </motion.a>
                    ))}
                </div>
            </motion.div>



            {/* Bottom center - Scroll hint */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <span className="text-stone-400 text-[10px] tracking-[0.25em] uppercase mb-2">Scroll</span>
                <motion.div
                    className="w-5 h-8 border border-stone-300 rounded-full flex justify-center pt-1.5"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <motion.div
                        className="w-1 h-1.5 bg-stone-400 rounded-full"
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>

            {/* Magazine-style accent elements (hidden on mobile) */}
            <motion.div
                className="absolute top-1/2 right-8 md:right-12 -translate-y-1/2 z-10 hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ delay: 1.2, duration: 1 }}
                style={{
                    transform: `translateY(-50%) translate3d(${mouseX * -0.2}px, ${mouseY * 0.2}px, 0)`,
                }}
            >
                <div className="text-[120px] md:text-[180px] font-black text-stone-200 tracking-tighter leading-none select-none">
                    AI
                </div>
            </motion.div>
        </section>
    );
}

export default memo(HeroSection);
