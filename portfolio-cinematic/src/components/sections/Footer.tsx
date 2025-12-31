'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black py-20 border-t border-white/[0.03] overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-6xl font-black text-white mb-4">
              Sushant<span className="text-emerald-400"> Sharma</span>
            </h3>
            <p className="text-white/30 text-lg max-w-md">
              Building the future with artificial intelligence, one line of code at a time.
            </p>
          </motion.div>
        </div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ y: -3, color: '#34d399' }}
              className="text-white/40 hover:text-emerald-400 transition-colors duration-200"
            >
              {link}
            </motion.a>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-6 mb-16"
        >
          {[
            { name: 'GitHub', url: 'https://github.com/SushantSharma29' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sushant-sharma-dev/' },
            { name: 'Twitter', url: 'https://x.com/Sushant399' },
            { name: 'Email', url: 'mailto:sharmasj53@gmail.com' },
          ].map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-4 py-2 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-emerald-500/30 transition-all duration-300 text-sm"
            >
              {social.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/20 text-sm"
          >
            © {currentYear} Sushant Sharma. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/20 text-sm flex items-center gap-2"
          >
            Crafted with <span className="text-red-500">♥</span> using Next.js & Framer Motion
          </motion.p>
        </div>


      </div>
    </footer>
  );
}
