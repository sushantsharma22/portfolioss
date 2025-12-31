'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Self-Learning LLMs',
    description: 'Advanced framework for fine-tuning Large Language Models using PEFT/LoRA techniques with RLHF.',
    tech: ['PyTorch', 'HuggingFace', 'PEFT/LoRA', 'DeepSpeed'],
    github: 'https://github.com/SushantSharma29/self-learning-LLMS',
    image: '🧠',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 2,
    title: 'IntelliCity Architecture',
    description: 'Real-time smart city data pipeline processing millions of IoT sensor readings.',
    tech: ['Apache NiFi', 'Kafka', 'Hadoop', 'Spark'],
    github: 'https://github.com/SushantSharma29/IntelliCity-Architecture',
    image: '🏙️',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    id: 3,
    title: 'Project Synth',
    description: 'Personal AI assistant powered by state-of-the-art language models.',
    tech: ['OpenAI API', 'LangChain', 'Whisper', 'FastAPI'],
    github: 'https://github.com/SushantSharma29/project-synth',
    image: '🤖',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    id: 4,
    title: 'EmotionSentimentNet',
    description: 'Multi-label emotion and sentiment classifier using DeBERTa-v3.',
    tech: ['DeBERTa-v3', 'PyTorch', 'HuggingFace'],
    github: 'https://github.com/SushantSharma29/EmotionSentimentNet',
    image: '😊',
    color: 'from-yellow-600 to-orange-600',
  },
  {
    id: 5,
    title: 'EdgeAI Optimizer',
    description: 'C++ framework for deploying optimized ML models on edge devices.',
    tech: ['C++', 'ONNX Runtime', 'TensorRT', 'OpenVINO'],
    github: 'https://github.com/SushantSharma29/EdgeAIOptimizer',
    image: '⚡',
    color: 'from-red-600 to-rose-600',
  },
  {
    id: 6,
    title: 'SmartPay UPI',
    description: 'Blockchain-based secure payment system with UPI integration.',
    tech: ['Solidity', 'Web3.js', 'Node.js', 'Ethereum'],
    github: 'https://github.com/SushantSharma29/SmartPay-UPI',
    image: '💳',
    color: 'from-indigo-600 to-violet-600',
  },
  {
    id: 7,
    title: 'SS Engineering Works',
    description: 'Modern futuristic website with glassmorphism UI and motion-first design.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind', 'GSAP'],
    github: 'https://github.com/sushantsharma22/ssengineeringworks_website',
    image: '🏢',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 8,
    title: 'Aurora Alert System',
    description: 'Real-Time Event Notification Pipeline for aurora borealis alerts.',
    tech: ['Python', 'REST API', 'Google Sheets', 'SMTP'],
    github: 'https://github.com/sushantsharma22/Aurora-Alert',
    image: '🛰️',
    color: 'from-green-500 to-teal-500',
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Horizontal scroll - calculated for exactly 8 projects
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-87.5%']);

  // Progress bar
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-black"
      style={{ height: '400vh' }} // Fixed height for 8 projects
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-slate-950" />

        {/* Header */}
        <div className="absolute top-8 left-0 right-0 z-20 px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <span className="text-emerald-400/50 text-xs tracking-[0.5em] uppercase">Chapter 04</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Creations</span>
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-5xl font-black text-white/10">08</div>
              <div className="text-white/30 text-sm">Projects</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="max-w-7xl mx-auto mt-6">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Horizontal scrolling projects */}
        <motion.div
          style={{ x }}
          className="absolute top-1/2 -translate-y-1/2 flex gap-8 pl-[5%]"
        >
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -10 }}
              className="group relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[50vw] h-[65vh] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Card background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1]" />

              {/* Content */}
              <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-7xl">{project.image}</span>
                    <span className="text-6xl font-black text-white/10">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-lg max-w-xl">{project.description}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-4 py-2 text-sm bg-white/[0.05] border border-white/[0.1] rounded-full text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-white/40 group-hover:text-emerald-400 transition-colors">
                    <span>View on GitHub</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-white/30 text-sm"
          >
            <span>Scroll to explore</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
