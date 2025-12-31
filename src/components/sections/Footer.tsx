'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-stone-900 py-8 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-white"
          >
            Sushant<span className="text-sky-400">.</span>
          </motion.div>

          <div className="text-stone-500 text-sm">
            © 2025 — Built with passion
          </div>
        </div>
      </div>
    </footer>
  );
}
