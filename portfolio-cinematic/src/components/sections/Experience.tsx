'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'AI Research Intern',
    company: 'JLR North America',
    location: 'Michigan, USA',
    period: 'May 2025 - Aug 2025',
    description: 'Leading AI research initiatives for next-generation autonomous vehicle systems. Developing cutting-edge ML models for real-time perception and decision-making.',
    tech: ['PyTorch', 'Computer Vision', 'Edge AI', 'ADAS'],
    color: 'emerald',
    icon: '🚗',
  },
  {
    id: 2,
    role: 'Machine Learning Intern',
    company: 'University of Windsor × TD Bank',
    location: 'Windsor, Canada',
    period: 'Jan 2025 - Apr 2025',
    description: 'Building ML solutions for financial services. Developed fraud detection systems and customer analytics models processing millions of transactions.',
    tech: ['TensorFlow', 'NLP', 'Big Data', 'MLOps'],
    color: 'cyan',
    icon: '🏦',
  },
  {
    id: 3,
    role: 'ML Engineer',
    company: 'S.S. Engineering Works',
    location: 'India',
    period: 'Jun 2023 - Apr 2024',
    description: 'Architected end-to-end ML pipelines for manufacturing optimization. Implemented predictive maintenance systems reducing downtime by 40%.',
    tech: ['Python', 'Scikit-learn', 'IoT', 'Data Analytics'],
    color: 'sky',
    icon: '⚙️',
  },
  {
    id: 4,
    role: 'Data Science Intern',
    company: 'S.S. Engineering Works',
    location: 'India',
    period: 'Jun 2022 - Jun 2023',
    description: 'Started my journey in data science. Built dashboards, automated reporting systems, and developed foundational ML models for business insights.',
    tech: ['Python', 'SQL', 'Tableau', 'Statistics'],
    color: 'violet',
    icon: '📊',
  },
];

// Color class mappings for Tailwind - dynamic classes don't work with purge
const colorClasses: Record<string, { dot: string; ping: string; badge: string; badgeBorder: string; text: string; glow: string }> = {
  emerald: {
    dot: 'bg-emerald-500 shadow-emerald-500/50',
    ping: 'bg-emerald-500',
    badge: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/20',
    text: 'text-emerald-400',
    glow: 'from-emerald-500/10',
  },
  cyan: {
    dot: 'bg-cyan-500 shadow-cyan-500/50',
    ping: 'bg-cyan-500',
    badge: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/20',
    text: 'text-cyan-400',
    glow: 'from-cyan-500/10',
  },
  sky: {
    dot: 'bg-sky-500 shadow-sky-500/50',
    ping: 'bg-sky-500',
    badge: 'bg-sky-500/10',
    badgeBorder: 'border-sky-500/20',
    text: 'text-sky-400',
    glow: 'from-sky-500/10',
  },
  violet: {
    dot: 'bg-violet-500 shadow-violet-500/50',
    ping: 'bg-violet-500',
    badge: 'bg-violet-500/10',
    badgeBorder: 'border-violet-500/20',
    text: 'text-violet-400',
    glow: 'from-violet-500/10',
  },
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // Timeline progress
  const lineHeight = useTransform(smoothProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-gradient-to-b from-black via-slate-950 to-black py-32 overflow-hidden"
    >
      {/* Chapter header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 relative z-10"
      >
        <span className="text-emerald-400/50 text-xs tracking-[0.5em] uppercase">Chapter 03</span>
        <h2 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-black text-white">
          The
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"> Journey</span>
        </h2>
        <p className="text-white/40 mt-6 text-lg max-w-2xl mx-auto">
          A timeline of growth, learning, and building intelligent systems
        </p>
      </motion.div>

      {/* Removed giant background text */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Animated timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.05]">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-emerald-500 via-cyan-500 to-violet-500"
          />
        </div>

        {/* Experience cards */}
        <div className="relative space-y-24">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const colors = colorClasses[exp.color];

            return (
              <motion.div
                key={exp.id}
                initial={{
                  opacity: 0,
                  x: isLeft ? -100 : 100,
                  rotateY: isLeft ? -20 : 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ perspective: '1000px' }}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className={`absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full ${colors.dot} shadow-lg z-10`}
                >
                  <div className={`absolute inset-0 rounded-full ${colors.ping} animate-ping opacity-20`} />
                </motion.div>

                {/* Card */}
                <div className={`w-full md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-12 ml-12 md:ml-0' : 'md:pl-12 ml-12 md:ml-0'}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      rotateY: isLeft ? 3 : -3,
                    }}
                    transition={{ duration: 0.3 }}
                    className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-500"
                  >
                    {/* Icon */}
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, type: 'spring' }}
                      className="text-5xl block mb-6"
                    >
                      {exp.icon}
                    </motion.span>

                    {/* Period badge */}
                    <div className={`inline-block px-3 py-1 rounded-full ${colors.badge} border ${colors.badgeBorder} mb-4`}>
                      <span className={`${colors.text} text-sm font-medium`}>{exp.period}</span>
                    </div>

                    {/* Role & Company */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className={`${colors.text} font-medium mb-1`}>{exp.company}</p>
                    <p className="text-white/40 text-sm mb-4">{exp.location}</p>

                    {/* Description */}
                    <p className="text-white/60 leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-white/[0.05] border border-white/[0.08] rounded-full text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colors.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* End of timeline indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mt-20 flex justify-center"
        >
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <p className="text-white/30 text-sm ml-12 md:ml-0 md:mt-12">And the journey continues...</p>
        </motion.div>
      </div>
    </section>
  );
}
