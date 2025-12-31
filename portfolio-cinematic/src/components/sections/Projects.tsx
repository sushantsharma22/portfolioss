'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
    {
        title: 'Image Caption Generator',
        description: 'Deep learning model using CNN-LSTM architecture for automated image captioning with attention mechanisms.',
        tech: ['Python', 'PyTorch', 'CNN', 'LSTM', 'NLP'],
        github: 'https://github.com/sushantsharma22/Image-Caption-Generator',
        featured: true,
        color: 'from-violet-500 to-purple-600',
        icon: '🖼️',
    },
    {
        title: 'Aurora Alert System',
        description: 'Real-time aurora borealis notification system with weather API integration and SMS alerts.',
        tech: ['Python', 'APIs', 'Automation', 'Twilio'],
        github: 'https://github.com/sushantsharma22/Aurora-Alert-System',
        color: 'from-emerald-500 to-teal-600',
        icon: '🌌',
    },
    {
        title: 'Flight Fare Prediction',
        description: 'ML model predicting flight prices using Random Forest with 85%+ accuracy.',
        tech: ['Python', 'Scikit-learn', 'Random Forest', 'Flask'],
        github: 'https://github.com/sushantsharma22/Flight-Fare-Prediction',
        featured: true,
        color: 'from-sky-500 to-blue-600',
        icon: '✈️',
    },
    {
        title: 'Facial Recognition System',
        description: 'Real-time face detection and recognition using OpenCV and deep learning models.',
        tech: ['Python', 'OpenCV', 'Deep Learning', 'Computer Vision'],
        github: 'https://github.com/sushantsharma22/Facial-Recognition-System',
        color: 'from-amber-500 to-orange-600',
        icon: '👤',
    },
    {
        title: 'Portfolio Website',
        description: 'Modern portfolio with smooth animations, scroll effects, and responsive design.',
        tech: ['Next.js', 'React', 'Framer Motion', 'Tailwind'],
        github: 'https://github.com/sushantsharma22/Portfolio',
        color: 'from-rose-500 to-pink-600',
        icon: '🌐',
    },
    {
        title: 'SS Engineering Website',
        description: 'Business website for industrial engineering company with modern UI/UX.',
        tech: ['React', 'Node.js', 'CSS', 'Responsive'],
        github: 'https://github.com/sushantsharma22/SS-Engineering-Website',
        color: 'from-indigo-500 to-blue-600',
        icon: '🏭',
    },
];

export default function Projects() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

    return (
        <section id="projects" ref={ref} className="relative min-h-screen py-24 overflow-hidden">
            {/* Gradient transition from previous section */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50/30 to-violet-50/20" />

            {/* Decorative blobs */}
            <div className="absolute top-40 -left-20 w-80 h-80 bg-gradient-to-br from-violet-200/30 to-purple-200/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-40 -right-20 w-96 h-96 bg-gradient-to-br from-sky-200/30 to-blue-200/30 rounded-full blur-[120px]" />

            <motion.div style={{ opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-sky-500 text-sm font-bold tracking-[0.3em]">03 — WORK</span>
                    <h2 className="text-5xl md:text-7xl font-black text-stone-800 mt-4 tracking-tight">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-sky-500 to-amber-500">Projects</span>
                    </h2>
                    <p className="text-stone-500 mt-4 max-w-lg mx-auto">Passion projects and professional work</p>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.a
                            key={project.title}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.08, duration: 0.6 }}
                            whileHover={{ y: -8 }}
                            className={`group relative bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-lg hover:shadow-2xl transition-all duration-500 ${project.featured ? 'ring-2 ring-amber-200/50' : ''
                                }`}
                        >
                            {/* Gradient header */}
                            <div className={`h-24 md:h-28 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10" />
                                <span className="absolute top-4 right-4 text-4xl md:text-5xl opacity-80">{project.icon}</span>
                                {project.featured && (
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-sky-600 transition-all duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-stone-500 text-sm mb-4 leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-2.5 py-1 bg-stone-50 text-stone-600 text-xs font-medium rounded-full border border-stone-100">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            {/* Bottom transition gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
