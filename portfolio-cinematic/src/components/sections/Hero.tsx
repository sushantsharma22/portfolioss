'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Simple gradient background - no animations */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-indigo-950" />

      {/* Static glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Chapter indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-white/30 text-xs tracking-[0.5em] uppercase font-light">Chapter 01 — The Beginning</span>
        </motion.div>

        {/* Main title - simple fade in */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-7xl md:text-9xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter"
        >
          SUSHANT
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
        >
          SHARMA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-white/50 mt-8 font-light"
        >
          AI/ML Engineer · Building the Future with Intelligence
        </motion.p>

        {/* Role badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {['LLM Specialist', 'Deep Learning', 'Computer Vision', 'NLP Expert'].map((role) => (
            <span
              key={role}
              className="px-4 py-2 text-sm text-white/60 border border-white/10 rounded-full hover:border-emerald-500/30 hover:text-emerald-400 transition-colors duration-200"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-3 gap-12 md:gap-20 mt-16"
        >
          {[
            { value: '17+', label: 'Projects Built' },
            { value: '3+', label: 'Years Experience' },
            { value: '50+', label: 'Events Organized' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white">
                {stat.value.replace('+', '')}<span className="text-emerald-400">+</span>
              </div>
              <div className="text-white/40 text-sm mt-2 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator - simple CSS animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-white/20 text-xs tracking-[0.3em] uppercase">Scroll to Explore</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
