'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { personalInfo, socialLinks, contactInfo } from '@/lib/constants';
import { easings, springs } from '@/lib/animations';

const iconMap: Record<string, string> = {
    linkedin: '💼',
    github: '🐙',
    email: '📧',
};

export default function Contact() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, springs.smooth);
    const scale = useTransform(smoothProgress, [0, 0.3], [0.97, 1]);
    const opacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);

    // Find location from contactInfo
    const locationInfo = contactInfo.find(c => c.type === 'location');

    return (
        <section id="contact" ref={ref} className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden py-24">
            <div className="absolute top-20 left-20 w-96 h-96 bg-sky-100/50 rounded-full blur-[150px]" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-100/50 rounded-full blur-[120px]" />

            <motion.div style={{ scale, opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.8, ease: easings.apple }}
                    className="text-amber-600 text-sm font-medium tracking-[0.3em]"
                >
                    07 — GET IN TOUCH
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: easings.apple, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-stone-800 mt-6 tracking-tight leading-[1.1]"
                >
                    Let&apos;s Build
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-teal-500 to-amber-500">Something Great</span>
                    <br />
                    <span className="text-stone-400">Together</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: easings.apple, delay: 0.2 }}
                    className="text-stone-500 text-lg md:text-xl mt-8 max-w-2xl mx-auto"
                >
                    Available for full-time opportunities, collaborations, and exciting AI projects.
                </motion.p>

                <motion.a
                    href={`mailto:${personalInfo.email}`}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: easings.apple, delay: 0.3 }}
                    whileHover={{ scale: 1.03, y: -4, boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-4 mt-12 px-8 py-5 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-lg md:text-xl font-semibold rounded-full shadow-xl"
                >
                    <span>📧</span>
                    <span>{personalInfo.email}</span>
                    <span>→</span>
                </motion.a>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: easings.apple, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12"
                >
                    {socialLinks.map((link, i) => (
                        <motion.a
                            key={link.platform}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.05, duration: 0.6, ease: easings.apple }}
                            whileHover={{ y: -6, scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-5 py-3 bg-stone-50 border border-stone-200 rounded-full text-stone-600 hover:text-stone-800 hover:border-stone-300 transition-colors duration-300"
                        >
                            <span className="text-xl">{iconMap[link.icon] || '🔗'}</span>
                            <span className="text-sm font-medium">{link.platform}</span>
                        </motion.a>
                    ))}
                    {/* Add phone link */}
                    <motion.a
                        href={`tel:${personalInfo.phone.replace(/[^+\d]/g, '')}`}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.65, duration: 0.6, ease: easings.apple }}
                        whileHover={{ y: -6, scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-3 bg-stone-50 border border-stone-200 rounded-full text-stone-600 hover:text-stone-800 hover:border-stone-300 transition-colors duration-300"
                    >
                        <span className="text-xl">📞</span>
                        <span className="text-sm font-medium">Phone</span>
                    </motion.a>
                    {/* Add portfolio link */}
                    <motion.a
                        href={personalInfo.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.6, ease: easings.apple }}
                        whileHover={{ y: -6, scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-3 bg-stone-50 border border-stone-200 rounded-full text-stone-600 hover:text-stone-800 hover:border-stone-300 transition-colors duration-300"
                    >
                        <span className="text-xl">🌐</span>
                        <span className="text-sm font-medium">Portfolio</span>
                    </motion.a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.8, ease: easings.apple }}
                    className="mt-16 flex flex-col items-center gap-4"
                >
                    <div className="flex items-center gap-3 text-stone-500">
                        <span>📍</span>
                        <span>{locationInfo?.value || personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-3 h-3 bg-green-400 rounded-full" />
                        <span className="text-green-600 font-medium">{personalInfo.availability}</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
