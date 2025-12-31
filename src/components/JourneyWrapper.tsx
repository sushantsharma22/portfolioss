'use client';

import { ReactNode, useMemo, memo, useCallback, useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { easings, springs } from '@/lib/animations';

interface JourneyWrapperProps {
    children: ReactNode;
}

// Section configuration with icons and colors
const chapters = [
    { id: 'hero', name: 'Home', number: '01', icon: '🏠', gradient: 'from-amber-400 to-orange-500', color: '#f59e0b' },
    { id: 'about', name: 'About', number: '02', icon: '👤', gradient: 'from-sky-400 to-blue-500', color: '#0ea5e9' },
    { id: 'experience', name: 'Experience', number: '03', icon: '💼', gradient: 'from-amber-500 to-orange-600', color: '#f97316' },
    { id: 'projects', name: 'Projects', number: '04', icon: '🚀', gradient: 'from-violet-400 to-purple-500', color: '#8b5cf6' },
    { id: 'skills', name: 'Skills', number: '05', icon: '⚡', gradient: 'from-teal-400 to-emerald-500', color: '#14b8a6' },
    { id: 'education', name: 'Education', number: '06', icon: '🎓', gradient: 'from-amber-400 to-yellow-500', color: '#eab308' },
    { id: 'certificates', name: 'Certificates', number: '07', icon: '🏆', gradient: 'from-cyan-400 to-blue-500', color: '#06b6d4' },
    { id: 'contact', name: 'Contact', number: '08', icon: '✉️', gradient: 'from-rose-400 to-pink-500', color: '#f43f5e' },
] as const;

type ChapterType = typeof chapters[number];

// Hook to detect active section using IntersectionObserver
function useActiveSection() {
    const [activeId, setActiveId] = useState<string>('hero');

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        chapters.forEach((chapter) => {
            const element = document.getElementById(chapter.id);
            if (element) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                                setActiveId(chapter.id);
                            }
                        });
                    },
                    { threshold: [0.3, 0.5, 0.7], rootMargin: '-10% 0px -10% 0px' }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    return activeId;
}

// Progress counter component
const ProgressCounter = memo(function ProgressCounter({ 
    progress 
}: { 
    progress: number 
}) {
    const percentage = Math.round(progress * 100);
    
    return (
        <motion.div 
            className="mb-6 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easings.apple }}
        >
            <span className="text-2xl font-bold bg-gradient-to-r from-stone-600 to-stone-400 bg-clip-text text-transparent tabular-nums">
                {percentage}%
            </span>
        </motion.div>
    );
});

// Active indicator ring with pulse animation
const ActiveIndicator = memo(function ActiveIndicator({ 
    color,
    isActive 
}: { 
    color: string;
    isActive: boolean;
}) {
    if (!isActive) return null;
    
    return (
        <>
            {/* Outer pulse ring */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color }}
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ 
                    scale: [1, 1.8, 2.2],
                    opacity: [0.4, 0.2, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut'
                }}
            />
            {/* Inner glow */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{ 
                    backgroundColor: color,
                    filter: 'blur(4px)',
                }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />
        </>
    );
});

// Ripple effect component for click animation
const ClickRipple = memo(function ClickRipple({ 
    isAnimating, 
    color 
}: { 
    isAnimating: boolean;
    color: string;
}) {
    if (!isAnimating) return null;
    
    return (
        <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: easings.smoothOut }}
        />
    );
});

// Premium chapter dot component with magnetic hover
const ChapterDot = memo(function ChapterDot({ 
    chapter,
    isActive,
    index,
}: { 
    chapter: ChapterType;
    isActive: boolean;
    index: number;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isRippling, setIsRippling] = useState(false);
    const dotRef = useRef<HTMLAnchorElement>(null);
    
    // Magnetic effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!dotRef.current) return;
        const rect = dotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;
        x.set(deltaX);
        y.set(deltaY);
    }, [x, y]);
    
    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    }, [x, y]);

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 600);
        
        const element = document.getElementById(chapter.id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [chapter.id]);

    const springConfig = { stiffness: 300, damping: 25 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    return (
        <motion.a
            ref={dotRef}
            href={`#${chapter.id}`}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative flex items-center py-2"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5, ease: easings.apple }}
        >
            {/* Main dot container */}
            <motion.div 
                className="relative flex items-center justify-center"
                animate={{
                    scale: isActive ? 1 : isHovered ? 1.6 : 1,
                }}
                transition={{ type: 'spring', ...springs.magnetic }}
            >
                {/* Active indicator rings */}
                <ActiveIndicator color={chapter.color} isActive={isActive} />
                
                {/* Click ripple */}
                <ClickRipple isAnimating={isRippling} color={chapter.color} />
                
                {/* Dot background */}
                <motion.div 
                    className={`relative z-10 rounded-full flex items-center justify-center transition-colors duration-300`}
                    style={{
                        width: isActive ? 36 : isHovered ? 32 : 10,
                        height: isActive ? 36 : isHovered ? 32 : 10,
                        background: isActive || isHovered 
                            ? `linear-gradient(135deg, ${chapter.color}, ${chapter.color}dd)`
                            : '#d6d3d1',
                        boxShadow: isActive 
                            ? `0 0 20px ${chapter.color}60, 0 4px 12px ${chapter.color}40`
                            : isHovered 
                            ? `0 0 15px ${chapter.color}40`
                            : 'none',
                    }}
                    animate={{
                        opacity: isActive ? 1 : isHovered ? 1 : 0.5,
                    }}
                    transition={{ type: 'spring', ...springs.magnetic }}
                >
                    {/* Icon inside dot */}
                    <AnimatePresence>
                        {(isActive || isHovered) && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ type: 'spring', ...springs.bouncy }}
                                className="text-sm"
                            >
                                {chapter.icon}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* Label - slides in from right */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        className="absolute right-12 flex items-center gap-2 whitespace-nowrap pointer-events-none"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3, ease: easings.magnetic }}
                    >
                        <span 
                            className="px-3 py-1.5 rounded-full text-sm font-semibold text-white shadow-lg"
                            style={{ 
                                background: `linear-gradient(135deg, ${chapter.color}, ${chapter.color}cc)`,
                                boxShadow: `0 4px 12px ${chapter.color}40`,
                            }}
                        >
                            {chapter.name}
                        </span>
                        <span className="text-stone-400 text-xs font-medium bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                            {chapter.number}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.a>
    );
});

// Main JourneyWrapper component
function JourneyWrapper({ children }: JourneyWrapperProps) {
    const { scrollYProgress } = useScroll();
    const activeSection = useActiveSection();
    
    // Smooth spring for progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Transform progress for visual indicator
    const progressValue = useTransform(smoothProgress, [0, 1], [0, 1]);
    const [displayProgress, setDisplayProgress] = useState(0);
    
    useEffect(() => {
        const unsubscribe = progressValue.on('change', (latest) => {
            setDisplayProgress(latest);
        });
        return () => unsubscribe();
    }, [progressValue]);

    // Get active section index
    const activeIndex = useMemo(() => 
        chapters.findIndex(c => c.id === activeSection),
    [activeSection]);

    // Get active color
    const activeColor = useMemo(() => 
        chapters[activeIndex]?.color || chapters[0]?.color || '#f59e0b',
    [activeIndex]);

    // Memoize chapter dots
    const chapterDots = useMemo(() => 
        chapters.map((chapter, index) => (
            <ChapterDot 
                key={chapter.id} 
                chapter={chapter}
                isActive={chapter.id === activeSection}
                index={index}
            />
        )), 
    [activeSection]);

    return (
        <div className="relative">
            {/* Premium Journey Navigation - Fixed Right Side */}
            <nav
                className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end"
                aria-label="Page sections"
            >
                {/* Glass container */}
                <motion.div 
                    className="relative p-4 rounded-2xl"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: easings.apple }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)`,
                    }}
                >
                    {/* Progress counter */}
                    <ProgressCounter progress={displayProgress} />
                    
                    {/* Chapter dots */}
                    <div className="relative flex flex-col items-center">
                        {chapterDots}
                        
                        {/* Progress line (background) */}
                        <div className="absolute top-4 bottom-4 right-[19px] w-[2px] bg-stone-200/50 -z-10 rounded-full" />
                        
                        {/* Progress line (active) */}
                        <motion.div
                            className="absolute top-4 right-[19px] w-[2px] origin-top rounded-full"
                            style={{ 
                                scaleY: smoothProgress,
                                background: `linear-gradient(180deg, ${chapters[0]?.color || '#f59e0b'}, ${activeColor})`,
                                height: 'calc(100% - 32px)',
                                boxShadow: `0 0 10px ${activeColor}40`,
                            }}
                        />

                        {/* Active section indicator dot on progress line */}
                        <motion.div
                            className="absolute right-[15px] w-[10px] h-[10px] rounded-full z-20"
                            style={{
                                background: activeColor,
                                boxShadow: `0 0 12px ${activeColor}`,
                                top: `${16 + (activeIndex / (chapters.length - 1)) * (100 - 32)}%`,
                            }}
                            transition={{ type: 'spring', ...springs.smooth }}
                        />
                    </div>

                    {/* Current section name at bottom */}
                    <motion.div 
                        className="mt-4 pt-4 border-t border-stone-200/50 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.span 
                            key={activeSection}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs font-semibold tracking-wider uppercase"
                            style={{ color: activeColor }}
                        >
                            {chapters.find(c => c.id === activeSection)?.name}
                        </motion.span>
                    </motion.div>
                </motion.div>
            </nav>

            {/* Mobile progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 z-50 lg:hidden"
                style={{
                    background: `linear-gradient(90deg, ${chapters[0]?.color || '#f59e0b'}, ${activeColor})`,
                    scaleX: smoothProgress,
                    transformOrigin: 'left',
                }}
            />

            {/* Content */}
            <div className="relative">
                {children}
            </div>
        </div>
    );
}

export default memo(JourneyWrapper);
