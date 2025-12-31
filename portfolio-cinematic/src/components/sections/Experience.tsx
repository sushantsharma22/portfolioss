'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const experiences = [
    {
        role: 'AI Research Intern',
        company: 'JLR North America',
        location: 'Windsor, Ontario (Remote)',
        period: 'May 2025 – August 2025',
        description: 'Leading cutting-edge AI research initiatives for a global automotive leader, advancing innovative solutions through state-of-the-art AI technologies.',
        achievements: [
            'Drove impactful research initiatives for a global automotive leader',
            'Designed sophisticated experiments with advanced computational tools',
            'Developed streamlined workflows for data processing and evaluation',
            'Collaborated with cross-functional teams including University academic partners',
        ],
        tech: ['AI Research', 'Machine Learning', 'Python', 'Data Analysis'],
        color: 'from-sky-400 to-blue-500',
        accent: 'sky',
    },
    {
        role: 'Machine Learning Intern',
        company: 'University of Windsor × TD Bank',
        location: 'Windsor, Ontario',
        period: 'January 2025 – April 2025',
        description: 'Collaborated directly with TD Bank as project client, developing ML systems for credit-lending decision predictions.',
        achievements: [
            'Collaborated directly with TD Bank, holding regular meetings',
            'Designed and implemented full backend system and data pipelines',
            'Developed ML modules for credit-lending predictions',
            'Contributed to model validation and testing workflows',
        ],
        tech: ['Python', 'Scikit-learn', 'XGBoost', 'SQL', 'Agile'],
        color: 'from-teal-400 to-emerald-500',
        accent: 'teal',
    },
    {
        role: 'Machine Learning Engineer',
        company: 'S.S. Engineering Works',
        location: 'Una, India',
        period: 'June 2023 – April 2024',
        description: 'Developed AI-based predictive analytics and deep learning models for industrial operations.',
        achievements: [
            'Developed AI-based predictive analytics, reducing inventory costs by 15%',
            'Implemented deep learning models for anomaly detection',
            'Automated data pipelines, improving efficiency by 20%',
        ],
        tech: ['PyTorch', 'TensorFlow', 'Python', 'Pandas'],
        color: 'from-amber-400 to-orange-500',
        accent: 'amber',
    },
    {
        role: 'Data Science Intern',
        company: 'S.S. Engineering Works',
        location: 'Una, India',
        period: 'June 2022 – June 2023',
        description: 'Built custom data processing solutions for enterprise-scale operations.',
        achievements: [
            'Built custom data loaders for enterprise-scale workloads',
            'Automated and documented feed generation pipelines',
        ],
        tech: ['Python', 'Data Processing', 'Pipeline Automation'],
        color: 'from-rose-400 to-pink-500',
        accent: 'rose',
    },
    {
        role: 'Tech Event Coordinator',
        company: 'Gravity LPU',
        location: 'Punjab, India',
        period: 'October 2019 – April 2022',
        description: 'Led coordination of major tech events and hackathons.',
        achievements: [
            'Managed 50+ AI & coding hackathons',
            'Engaged 200+ participants across events',
        ],
        tech: ['Project Management', 'Event Coordination', 'Team Leadership'],
        color: 'from-violet-400 to-purple-500',
        accent: 'violet',
    },
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 50,
        restDelta: 0.0001
    });

    useEffect(() => {
        const unsubscribe = smoothProgress.on('change', (latest) => {
            const index = Math.min(
                Math.floor(latest * experiences.length),
                experiences.length - 1
            );
            if (index >= 0) setActiveIndex(index);
        });
        return () => unsubscribe();
    }, [smoothProgress]);

    return (
        <section
            id="experience"
            ref={containerRef}
            className="relative"
            style={{ height: `${experiences.length * 100}vh` }}
        >
            {/* Gradient transition from About */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-stone-100" />

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
                    transition={{ duration: 0.8 }}
                    className="absolute top-16 left-8 md:left-16 z-30"
                >
                    <span className="text-amber-600 text-xs md:text-sm font-bold tracking-[0.3em]">02 — EXPERIENCE</span>
                    <h2 className="text-3xl md:text-5xl font-black text-stone-800 mt-2 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-amber-500">Journey</span>
                    </h2>
                </motion.div>

                {/* Large background number */}
                <div className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 hidden lg:block">
                    <span className={`text-[20rem] font-black leading-none bg-gradient-to-br ${experiences[activeIndex]?.color} bg-clip-text text-transparent opacity-[0.03]`}>
                        {(activeIndex + 1).toString().padStart(2, '0')}
                    </span>
                </div>

                {/* Cards */}
                <div className="absolute inset-0 flex items-center justify-center pt-8">
                    {experiences.map((exp, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <motion.div
                                key={exp.role}
                                className="absolute w-full max-w-4xl px-4 md:px-8"
                                initial={false}
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                    scale: isActive ? 1 : 0.92,
                                }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                            >
                                <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-stone-200/60 overflow-hidden border border-stone-100/80">
                                    {/* Gradient top bar */}
                                    <div className={`h-1.5 bg-gradient-to-r ${exp.color}`} />

                                    <div className="p-8 md:p-12">
                                        {/* Header */}
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                            <div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${exp.color}`} />
                                                    <span className="text-stone-400 text-sm font-semibold tracking-wide">{exp.period}</span>
                                                </div>
                                                <h3 className="text-3xl md:text-4xl font-bold text-stone-800 mb-2 leading-tight">{exp.role}</h3>
                                                <p className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                                                    {exp.company}
                                                </p>
                                                <p className="text-stone-400 text-sm mt-2 flex items-center gap-2">
                                                    <span>📍</span> {exp.location}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-stone-600 text-lg leading-relaxed mb-8">{exp.description}</p>

                                        {/* Achievements */}
                                        <div className="space-y-3 mb-8">
                                            {exp.achievements.map((a, i) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    <div className={`mt-2 w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} flex-shrink-0`} />
                                                    <span className="text-stone-500 leading-relaxed">{a}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech stack */}
                                        <div className="flex flex-wrap gap-3">
                                            {exp.tech.map((t) => (
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
                    {experiences.map((exp, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div
                                className={`rounded-full transition-all duration-300 ${i === activeIndex
                                        ? `w-3 h-8 bg-gradient-to-b ${exp.color}`
                                        : 'w-2 h-2 bg-stone-300'
                                    }`}
                            />
                            {i === activeIndex && (
                                <span className="text-stone-600 text-sm font-medium hidden md:block">
                                    {exp.company.split(' ')[0]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Counter */}
                <div className="absolute bottom-8 right-8 md:right-16 text-stone-400 font-mono">
                    <span className="text-stone-800 font-bold text-2xl">{(activeIndex + 1).toString().padStart(2, '0')}</span>
                    <span className="mx-2 text-stone-300">/</span>
                    <span className="text-stone-400">{experiences.length.toString().padStart(2, '0')}</span>
                </div>
            </div>
        </section>
    );
}
