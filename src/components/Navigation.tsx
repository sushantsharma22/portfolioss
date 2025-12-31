'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { easings, springs } from '@/lib/animations';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isInHeroOrContact, setIsInHeroOrContact] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if in hero (top) or contact (bottom)
      const inHero = scrollTop < windowHeight * 0.8;
      const inContact = scrollTop > documentHeight - windowHeight * 1.5;

      setIsInHeroOrContact(inHero || inContact);
      setIsScrolled(scrollTop > 50);

      // Reset idle timer on scroll
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      // If not in hero/contact, hide nav immediately on scroll
      if (!inHero && !inContact) {
        setShowNav(false);
        // Show nav after 30 seconds of no scrolling
        idleTimerRef.current = setTimeout(() => {
          setShowNav(true);
        }, 30000);
      } else {
        setShowNav(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const shouldShow = isInHeroOrContact || showNav;

  return (
    <>
      <AnimatePresence>
        {shouldShow && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: easings.apple }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/70 backdrop-blur-xl border-b border-stone-200/50' : 'bg-transparent'}`}
          >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <a href="#hero" className="text-xl font-bold text-stone-800">
                  Sushant<span className="text-sky-500"></span>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="relative px-4 py-2 text-sm text-stone-600 hover:text-stone-900 transition-colors group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
                    </a>
                  ))}
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden p-2 text-stone-600"
                >
                  <div className="w-6 h-5 flex flex-col justify-between">
                    <span className={`h-0.5 bg-current transform transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`h-0.5 bg-current transform transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                  </div>
                </button>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: easings.apple }}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-stone-800 hover:text-sky-500 transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
