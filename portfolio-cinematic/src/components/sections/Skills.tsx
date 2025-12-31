'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const skillSections = [
  {
    title: 'Languages',
    icon: '💻',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/20',
    skills: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: 'AI/ML',
    icon: '🧠',
    color: 'from-emerald-500 to-cyan-500',
    bgColor: 'bg-emerald-500/20',
    skills: ['PyTorch', 'TensorFlow', 'LLMs', 'NLP', 'Computer Vision', 'Deep Learning'],
  },
  {
    title: 'Frameworks',
    icon: '⚡',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/20',
    skills: ['HuggingFace', 'Scikit-learn', 'OpenCV', 'LangChain', 'FastAPI', 'React'],
  },
  {
    title: 'Tools',
    icon: '🛠️',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/20',
    skills: ['Docker', 'Git', 'AWS', 'Linux', 'Kubernetes', 'MLOps'],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Globe rotation
  const globeRotate = useTransform(smoothProgress, [0, 1], [0, 360]);

  // Which section is active (0-3)
  const activeSection = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative bg-black"
      style={{ height: '500vh' }} // Long scroll for 4 sections
    >
      {/* Section 1: Languages */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />

        {/* Central Globe */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{ rotate: globeRotate }}
            className="relative w-48 h-48 md:w-64 md:h-64"
          >
            {/* Globe sphere */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-cyan-500 to-emerald-500 opacity-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-transparent to-white/30" />
            </div>
            {/* Globe lines */}
            <div className="absolute inset-2 rounded-full border border-white/20" />
            <div className="absolute inset-4 rounded-full border border-dashed border-white/10" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
          </motion.div>
        </div>

        {/* Header */}
        <motion.div
          className="absolute top-8 left-0 right-0 z-20 px-8"
          style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0.5]) }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <span className="text-emerald-400/50 text-xs tracking-[0.5em] uppercase">Chapter 05</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mt-2">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Arsenal</span>
            </h2>
          </div>
        </motion.div>

        {/* 4 Skill Cards - positioned around globe */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-6xl h-full">
            {skillSections.map((section, index) => {
              // Calculate when this section should be active
              const startProgress = index * 0.25;
              const endProgress = (index + 1) * 0.25;

              // Position: 0=left, 1=right, 2=left, 3=right
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={section.title}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{
                    left: isLeft ? '5%' : 'auto',
                    right: isLeft ? 'auto' : '5%',
                    scale: useTransform(
                      smoothProgress,
                      [startProgress, startProgress + 0.1, endProgress - 0.1, endProgress],
                      [0.7, 1.1, 1.1, 0.7]
                    ),
                    opacity: useTransform(
                      smoothProgress,
                      [startProgress, startProgress + 0.05, endProgress - 0.05, endProgress],
                      [0.3, 1, 1, 0.3]
                    ),
                    x: useTransform(
                      smoothProgress,
                      [startProgress, startProgress + 0.1, endProgress - 0.1, endProgress],
                      [isLeft ? -100 : 100, 0, 0, isLeft ? -100 : 100]
                    ),
                    zIndex: useTransform(
                      smoothProgress,
                      [startProgress, startProgress + 0.05, endProgress - 0.05, endProgress],
                      [0, 10, 10, 0]
                    ),
                  }}
                >
                  {/* Skill Card */}
                  <div className={`relative w-[350px] md:w-[450px] p-8 rounded-3xl bg-gradient-to-br from-white/[0.1] to-white/[0.02] border border-white/[0.15] backdrop-blur-xl overflow-hidden`}>
                    {/* Background glow */}
                    <div className={`absolute inset-0 ${section.bgColor} blur-3xl opacity-30`} />

                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-6xl">{section.icon}</span>
                        <div>
                          <span className="text-white/40 text-sm">0{index + 1}/04</span>
                          <h3 className="text-3xl font-bold text-white">{section.title}</h3>
                        </div>
                      </div>

                      {/* Skills Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {section.skills.map((skill, i) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`px-4 py-3 rounded-xl bg-gradient-to-r ${section.color} bg-opacity-20 border border-white/10 text-center`}
                          >
                            <span className="text-white font-medium text-lg">{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {skillSections.map((section, index) => (
            <motion.div
              key={section.title}
              className="w-3 h-3 rounded-full bg-white/20"
              style={{
                scale: useTransform(
                  activeSection,
                  [index - 0.5, index, index + 0.5],
                  [1, 1.5, 1]
                ),
                backgroundColor: useTransform(
                  activeSection,
                  [index - 0.5, index, index + 0.5],
                  ['rgba(255,255,255,0.2)', 'rgba(16,185,129,1)', 'rgba(255,255,255,0.2)']
                ),
              }}
            />
          ))}
        </div>

        {/* Current section label */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
        >
          <motion.p className="text-white/50 text-sm">
            Scroll to explore all skill domains
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
