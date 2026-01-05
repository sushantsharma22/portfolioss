'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { easings, springs } from '@/lib/animations';

// Section offsets to scroll to visible content (negative = scroll less, positive = scroll more)
// These values are added to the section's top position
const sectionOffsets: Record<string, { mobile: number; desktop: number }> = {
  '#hero': { mobile: 0, desktop: 0 },
  '#about': { mobile: 100, desktop: 150 }, // Scroll past header to show content
  '#experience': { mobile: 100, desktop: 150 },
  '#projects': { mobile: 200, desktop: 300 }, // Scroll further to show first cards
  '#skills': { mobile: 100, desktop: 150 },
  '#education': { mobile: 100, desktop: 150 },
  '#certificates': { mobile: 100, desktop: 150 },
  '#contact': { mobile: 0, desktop: 0 },
};

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

      // Check if at the very top (first 100px) or contact (bottom)
      const isAtTop = scrollTop < 100;
      const inContact = scrollTop > documentHeight - windowHeight * 1.5;

      setIsInHeroOrContact(isAtTop || inContact);
      setIsScrolled(scrollTop > 50);

      // Reset idle timer on scroll
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      // If not at top and not in contact, hide nav immediately on scroll
      if (!isAtTop && !inContact) {
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

  // Custom scroll handler with section-specific offsets
  const scrollToSection = (href: string) => {
    // Special case for Home/Hero: Always scroll to very top to avoid offset issues
    if (href === '#hero') {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const element = document.querySelector(href);
    if (!element) return;

    const isMobile = window.innerWidth < 768;
    const offsets = sectionOffsets[href] || { mobile: 0, desktop: 0 };
    const offset = isMobile ? offsets.mobile : offsets.desktop;

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const targetPosition = elementTop + offset;

    // Use Lenis if available, otherwise native scroll
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.scrollTo(targetPosition, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

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
                {/* Empty space - no logo text */}
                <div className="w-16" />

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.href)}
                      className="relative px-4 py-2 text-sm text-stone-600 hover:text-stone-900 transition-colors group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
                    </button>
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
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: easings.apple }}
                  onClick={() => {
                    setIsOpen(false);
                    scrollToSection(link.href);
                  }}
                  className="text-3xl font-bold text-stone-800 hover:text-sky-500 transition-colors duration-300"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
