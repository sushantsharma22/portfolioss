'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Creative scroll animations - left/right/up/down
  const leftX = useTransform(smoothProgress, [0, 0.5], [-200, 0]);
  const rightX = useTransform(smoothProgress, [0, 0.5], [200, 0]);
  const upY = useTransform(smoothProgress, [0, 0.5], [100, 0]);
  const downY = useTransform(smoothProgress, [0.3, 0.7], [-50, 0]);
  const rotateCard = useTransform(smoothProgress, [0, 0.5], [-15, 0]);
  const scaleImage = useTransform(smoothProgress, [0, 0.4], [0.8, 1]);
  const fadeIn = useTransform(smoothProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-slate-950" />

      {/* Floating orbs */}
      <motion.div
        style={{ x: leftX, opacity: fadeIn }}
        className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]"
      />
      <motion.div
        style={{ x: rightX, opacity: fadeIn }}
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - slides down */}
        <motion.div
          style={{ y: downY, opacity: fadeIn }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400/50 text-xs tracking-[0.5em] uppercase">Chapter 02</span>
          <h2 className="mt-4 text-5xl md:text-7xl font-black text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual card slides in from left with rotation */}
          <motion.div
            style={{ x: leftX, rotate: rotateCard, scale: scaleImage, opacity: fadeIn }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-blue-500/20 rounded-3xl blur-2xl" />

              {/* Card */}
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] p-8 flex flex-col items-center justify-center overflow-hidden">
                {/* Animated rings */}
                <motion.div
                  className="absolute inset-8 border-2 border-dashed border-white/10 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-16 border border-dashed border-white/5 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />

                {/* Content */}
                <div className="relative text-8xl mb-6">🧠</div>
                <h3 className="text-2xl font-bold text-white mb-2">AI/ML Engineer</h3>
                <p className="text-white/40 text-center">Building intelligent systems</p>

                {/* Status */}
                <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 text-sm">Available for opportunities</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Text slides in from right */}
          <motion.div
            style={{ x: rightX, opacity: fadeIn }}
            className="space-y-8"
          >
            <motion.div style={{ y: upY }}>
              <span className="text-emerald-400 text-sm tracking-[0.3em] uppercase">Who I Am</span>
              <h3 className="mt-2 text-3xl md:text-4xl font-bold text-white">
                Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Intelligence</span>
              </h3>
            </motion.div>

            <div className="space-y-4 text-lg text-white/60 leading-relaxed">
              <motion.p style={{ x: rightX }}>
                I'm a <span className="text-white font-medium">Master's student in Applied Computing</span> at the
                University of Windsor, specializing in artificial intelligence.
              </motion.p>
              <motion.p style={{ x: useTransform(smoothProgress, [0.1, 0.6], [150, 0]) }}>
                My journey spans from <span className="text-emerald-400">AI Research at JLR North America</span> to
                building ML solutions at <span className="text-cyan-400">TD Bank</span>.
              </motion.p>
              <motion.p style={{ x: useTransform(smoothProgress, [0.2, 0.7], [150, 0]) }}>
                From fine-tuning LLMs to deploying edge AI systems, I transform complex
                problems into elegant solutions.
              </motion.p>
            </div>

            {/* Tech pills - staggered from bottom */}
            <motion.div
              style={{ y: upY }}
              className="flex flex-wrap gap-3"
            >
              {['PyTorch', 'TensorFlow', 'HuggingFace', 'LLMs', 'NLP', 'Computer Vision'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-4 py-2 text-sm bg-white/[0.03] border border-white/[0.08] rounded-full text-white/70 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats - slide up from bottom */}
        <motion.div
          style={{ y: useTransform(smoothProgress, [0.4, 0.8], [100, 0]), opacity: useTransform(smoothProgress, [0.4, 0.6], [0, 1]) }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/[0.05]"
        >
          {[
            { value: '17', suffix: '+', label: 'Projects', icon: '📦' },
            { value: '3', suffix: '+', label: 'Years', icon: '⏱️' },
            { value: '50', suffix: '+', label: 'Events', icon: '🎯' },
            { value: '27', suffix: '+', label: 'Certs', icon: '🏆' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/20 transition-all"
            >
              <span className="text-3xl block mb-3">{stat.icon}</span>
              <div className="text-4xl font-black text-white">
                {stat.value}<span className="text-emerald-400">{stat.suffix}</span>
              </div>
              <div className="text-white/40 text-sm mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
