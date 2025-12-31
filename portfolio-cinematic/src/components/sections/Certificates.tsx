'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const certificates = [
    { title: 'Machine Learning', issuer: 'Stanford / Coursera', instructor: 'Andrew Ng', highlight: true, icon: '🎓', date: '2023', color: 'from-sky-400 to-blue-500' },
    { title: 'Deep Learning Specialization', issuer: 'deeplearning.ai', instructor: 'Andrew Ng', highlight: true, icon: '🧠', date: '2023', color: 'from-violet-400 to-purple-500' },
    { title: 'AI with Deep Learning', issuer: 'Udemy', icon: '🤖', date: '2022', color: 'from-emerald-400 to-teal-500' },
    { title: 'ML A-Z: AI, Python & R', issuer: 'Udemy', icon: '📊', date: '2022', color: 'from-amber-400 to-orange-500' },
    { title: 'Reinforcement Learning', issuer: 'Coursera', icon: '🎮', date: '2023', color: 'from-rose-400 to-pink-500' },
    { title: 'Unix Essential Training', issuer: 'LinkedIn Learning', icon: '💻', date: '2024', color: 'from-slate-400 to-gray-500' },
    { title: 'DSA Self Paced', issuer: 'GeeksforGeeks', icon: '🔢', date: '2021', color: 'from-green-400 to-emerald-500' },
    { title: 'Python Essential Training', issuer: 'LinkedIn Learning', icon: '🐍', date: '2021', color: 'from-yellow-400 to-amber-500' },
    { title: 'AWS Essential Training', issuer: 'LinkedIn Learning', icon: '☁️', date: '2023', color: 'from-orange-400 to-red-500' },
    { title: 'Android Java Masterclass', issuer: 'Udemy', icon: '📱', date: '2020', color: 'from-lime-400 to-green-500' },
    { title: 'Data Science with Python', issuer: 'Simplilearn', icon: '📈', date: '2022', color: 'from-cyan-400 to-sky-500' },
    { title: 'Master Java Programming', issuer: 'Udemy', icon: '☕', date: '2020', color: 'from-red-400 to-rose-500' },
    { title: 'Complete JavaScript', issuer: 'Udemy', icon: '🌐', date: '2021', color: 'from-yellow-400 to-orange-500' },
    { title: 'R Programming', issuer: 'Udemy', icon: '📉', date: '2022', color: 'from-blue-400 to-indigo-500' },
    { title: 'Web Security & OAuth', issuer: 'LinkedIn Learning', icon: '🔒', date: '2023', color: 'from-gray-400 to-slate-500' },
    { title: 'Learning Hadoop', issuer: 'LinkedIn Learning', icon: '🐘', date: '2022', color: 'from-yellow-500 to-amber-600' },
    { title: 'RESTful APIs', issuer: 'LinkedIn Learning', icon: '🔗', date: '2023', color: 'from-teal-400 to-cyan-500' },
    { title: 'Selenium Testing', issuer: 'LinkedIn Learning', icon: '🧪', date: '2021', color: 'from-purple-400 to-violet-500' },
    { title: 'Bash Scripting', issuer: 'LinkedIn Learning', icon: '⌨️', date: '2024', color: 'from-stone-400 to-stone-600' },
    { title: 'Spark SQL', issuer: 'LinkedIn Learning', icon: '⚡', date: '2022', color: 'from-amber-400 to-yellow-500' },
];

export default function Certificates() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

    return (
        <section ref={targetRef} className="relative h-[350vh]" id="certificates">
            {/* Gradient transition from previous section */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-amber-50/30" />

            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-sky-100/40 to-blue-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-full blur-[100px]" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-16 left-8 md:left-20 z-10"
                >
                    <span className="text-amber-600 text-sm font-bold tracking-[0.3em]">06 — CERTIFICATIONS</span>
                    <h2 className="text-4xl md:text-6xl font-black text-stone-800 mt-2">
                        Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-amber-500">Expertise</span>
                    </h2>
                    <p className="text-stone-500 mt-2">{certificates.length}+ professional certifications</p>
                </motion.div>

                {/* Horizontal scroll */}
                <motion.div style={{ x }} className="flex gap-6 md:gap-8 px-8 md:px-20 items-center w-max pt-24">
                    {certificates.map((cert, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.02, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            className={`relative w-[340px] md:w-[420px] h-[260px] md:h-[300px] rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden ${cert.highlight
                                    ? 'bg-gradient-to-br from-stone-50 to-sky-50 border-2 border-sky-200/50 shadow-xl shadow-sky-100/30'
                                    : 'bg-white border border-stone-100 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {/* Gradient accent */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color}`} />

                            <div className="flex justify-between items-start">
                                <span className="text-5xl">{cert.icon}</span>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-500 border border-stone-200">
                                    {cert.date}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-stone-800 leading-tight mb-2">{cert.title}</h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-stone-500">{cert.issuer}</span>
                                    {cert.instructor && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-stone-300" />
                                            <span className={`text-sm font-semibold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>
                                                {cert.instructor}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {cert.highlight && (
                                <div className="absolute top-6 right-6 w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-300" />
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Progress bar */}
                <div className="absolute bottom-16 left-8 md:left-20 right-8 md:right-20 h-1 bg-stone-200/50 rounded-full overflow-hidden">
                    <motion.div style={{ scaleX: scrollYProgress }} className="h-full bg-gradient-to-r from-sky-500 to-amber-500 origin-left" />
                </div>
            </div>
        </section>
    );
}
