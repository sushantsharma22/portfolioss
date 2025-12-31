'use client';

import { motion } from 'framer-motion';
import { easings } from '@/lib/animations';

export default function Footer() {
  return (
    <footer className="relative bg-stone-900 py-8 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easings.apple }}
            className="text-xl font-bold text-white"
          >
            Sushant<span className="text-sky-400">.</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easings.apple, delay: 0.1 }}
            className="text-stone-500 text-sm"
          >
            © 2025 — Built with passion
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
