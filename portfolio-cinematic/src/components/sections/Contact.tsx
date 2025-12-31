'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/sushantsharma22', icon: '💼' },
    { name: 'GitHub', url: 'https://github.com/sushantsharma22', icon: '🐙' },
    { name: 'Email', url: 'mailto:sharmasj53@gmail.com', icon: '📧' },
    { name: 'Phone', url: 'tel:+12269615873', icon: '📞' },
    { name: 'Portfolio', url: 'https://sushantsharma22.github.io/Portfolio', icon: '🌐' },
];

export default function Contact() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section id="contact" ref={ref} className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden py-24">
            <div className="absolute top-20 left-20 w-96 h-96 bg-sky-100/50 rounded-full blur-[150px]" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-100/50 rounded-full blur-[120px]" />

            <motion.div style={{ scale, opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-amber-600 text-sm font-medium tracking-[0.3em]"
                >
                    07 — GET IN TOUCH
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-stone-800 mt-6 tracking-tight leading-[1.1]"
                >
                    Let's Build
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-teal-500 to-amber-500">Something Great</span>
                    <br />
                    <span className="text-stone-400">Together</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-stone-500 text-lg md:text-xl mt-8 max-w-2xl mx-auto"
                >
                    Available for full-time opportunities, collaborations, and exciting AI projects.
                </motion.p>

                <motion.a
                    href="mailto:sharmasj53@gmail.com"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="inline-flex items-center gap-4 mt-12 px-8 py-5 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-lg md:text-xl font-semibold rounded-full shadow-xl"
                >
                    <span>📧</span>
                    <span>sharmasj53@gmail.com</span>
                    <span>→</span>
                </motion.a>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12"
                >
                    {socialLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target={link.url.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="flex items-center gap-2 px-5 py-3 bg-stone-50 border border-stone-200 rounded-full text-stone-600 hover:text-stone-800 hover:border-stone-300 hover:shadow-md transition-all"
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span className="text-sm font-medium">{link.name}</span>
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 flex flex-col items-center gap-4"
                >
                    <div className="flex items-center gap-3 text-stone-500">
                        <span>📍</span>
                        <span>Windsor, Ontario, Canada</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-3 h-3 bg-green-400 rounded-full" />
                        <span className="text-green-600 font-medium">Available Now</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
