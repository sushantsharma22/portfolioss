'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const certificates = [
  { title: 'Machine Learning', issuer: 'Stanford / Coursera', icon: '🎓', color: 'from-sky-500 to-blue-600' },
  { title: 'Deep Learning Specialization', issuer: 'deeplearning.ai', icon: '🧠', color: 'from-purple-500 to-pink-600' },
  { title: 'Reinforcement Learning', issuer: 'Coursera', icon: '🎮', color: 'from-orange-500 to-red-600' },
  { title: 'AI with Deep Learning', issuer: 'Udemy', icon: '🤖', color: 'from-emerald-500 to-teal-600' },
  { title: 'ML A-Z with ChatGPT', issuer: 'Udemy', icon: '💬', color: 'from-cyan-500 to-blue-600' },
  { title: 'Unix Essential Training', issuer: 'LinkedIn Learning', icon: '🐧', color: 'from-green-500 to-emerald-600' },
  { title: 'DSA Self Paced', issuer: 'GeeksforGeeks', icon: '📚', color: 'from-yellow-500 to-orange-600' },
  { title: 'Python Essential Training', issuer: 'LinkedIn Learning', icon: '🐍', color: 'from-blue-500 to-indigo-600' },
  { title: 'SQL Programming', issuer: 'LinkedIn Learning', icon: '🗄️', color: 'from-indigo-500 to-purple-600' },
  { title: 'AWS Essential Training', issuer: 'LinkedIn Learning', icon: '☁️', color: 'from-amber-500 to-orange-600' },
  { title: 'Android Java Masterclass', issuer: 'Udemy', icon: '📱', color: 'from-lime-500 to-green-600' },
  { title: 'Data Science Python', issuer: 'Simplilearn', icon: '📊', color: 'from-rose-500 to-pink-600' },
  { title: 'Master Java', issuer: 'Udemy', icon: '☕', color: 'from-orange-500 to-amber-600' },
  { title: 'Complete JavaScript', issuer: 'Udemy', icon: '📜', color: 'from-yellow-500 to-lime-600' },
  { title: 'R Programming', issuer: 'Udemy', icon: '📈', color: 'from-blue-500 to-cyan-600' },
  { title: 'Web Security OAuth', issuer: 'LinkedIn Learning', icon: '🛡️', color: 'from-red-500 to-rose-600' },
  { title: 'Learning Hadoop', issuer: 'LinkedIn Learning', icon: '🐘', color: 'from-yellow-500 to-amber-600' },
  { title: 'Relational Databases', issuer: 'LinkedIn Learning', icon: '🗃️', color: 'from-slate-500 to-gray-600' },
  { title: 'Regular Expressions', issuer: 'LinkedIn Learning', icon: '🔍', color: 'from-purple-500 to-violet-600' },
  { title: 'Agile Project Management', issuer: 'LinkedIn Learning', icon: '📋', color: 'from-blue-500 to-sky-600' },
  { title: 'Selenium Testing', issuer: 'LinkedIn Learning', icon: '🧪', color: 'from-green-500 to-teal-600' },
  { title: 'RESTful APIs', issuer: 'LinkedIn Learning', icon: '🌐', color: 'from-cyan-500 to-emerald-600' },
  { title: 'HTTP Training', issuer: 'LinkedIn Learning', icon: '📡', color: 'from-indigo-500 to-blue-600' },
  { title: 'Bash Scripting', issuer: 'LinkedIn Learning', icon: '💻', color: 'from-gray-500 to-slate-600' },
  { title: 'Spark SQL', issuer: 'LinkedIn Learning', icon: '⚡', color: 'from-orange-500 to-red-600' },
  { title: 'API Testing', issuer: 'LinkedIn Learning', icon: '✅', color: 'from-teal-500 to-cyan-600' },
];

export default function Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Horizontal scroll for certificates
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-85%']);

  // Progress
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Counter animation
  const counter = useTransform(smoothProgress, [0, 1], [1, certificates.length]);

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="relative bg-black"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/20 to-black" />

        {/* Animated glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px]"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
            scale: useTransform(smoothProgress, [0, 0.5, 1], [0.5, 1.5, 0.8]),
          }}
        />

        {/* Header */}
        <div className="absolute top-8 left-0 right-0 z-20 px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <span className="text-emerald-400/50 text-xs tracking-[0.5em] uppercase">Chapter 06</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Credentials</span>
              </h2>
            </div>

            {/* Counter - fixed to show integers */}
            <div className="hidden md:block text-right">
              <div className="text-5xl font-black text-white/20">
                {certificates.length}
              </div>
              <div className="text-white/30 text-sm">Certificates</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="max-w-7xl mx-auto mt-6">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Horizontal scrolling certificates */}
        <motion.div
          style={{ x }}
          className="absolute top-1/2 -translate-y-1/2 flex gap-6 pl-[5%]"
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group flex-shrink-0 w-[300px] md:w-[350px] h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              {/* Card background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] to-white/[0.02] border border-white/[0.1]" />

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-between">
                {/* Top */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <motion.span
                      className="text-6xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {cert.icon}
                    </motion.span>
                    <span className="text-4xl font-black text-white/10">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-white/50 text-sm">{cert.issuer}</p>
                </div>

                {/* Bottom */}
                <div className="flex items-center gap-2 text-white/30 group-hover:text-cyan-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-white/30 text-sm"
          >
            <span>Scroll to explore credentials</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>

        {/* Stats at bottom edges */}
        <motion.div
          className="absolute bottom-20 left-8 right-8"
          style={{ opacity: useTransform(smoothProgress, [0.8, 1], [0, 1]) }}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4 text-center">
            {[
              { value: '27+', label: 'Certificates' },
              { value: '8+', label: 'Platforms' },
              { value: '500+', label: 'Hours' },
              { value: '∞', label: 'Learning' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-white/40 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
