'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface StoryTransitionProps {
  chapter: string;
  title: string;
  subtitle?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export default function StoryTransition({ chapter, title, subtitle, direction = 'up' }: StoryTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  
  const getTransform = () => {
    switch (direction) {
      case 'left': return { x: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-100, 0, 0, 100]) };
      case 'right': return { x: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]) };
      case 'down': return { y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]) };
      default: return { y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-100, 0, 0, 100]) };
    }
  };

  const transform = getTransform();

  return (
    <div
      ref={ref}
      className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black"
    >
      {/* Cinematic lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>

      <motion.div
        style={{ opacity, scale, ...transform }}
        className="text-center z-10"
      >
        <motion.span
          className="block text-emerald-400/60 text-xs tracking-[0.5em] uppercase mb-4"
        >
          {chapter}
        </motion.span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/40 mt-4 text-lg">{subtitle}</p>
        )}
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
      />
    </div>
  );
}
