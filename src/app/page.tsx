'use client';

import { AnimatePresence } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import PageLoader from '@/components/PageLoader';
import JourneyWrapper from '@/components/JourneyWrapper';
import Hero from '@/components/sections/Hero';

// Lazy load below-the-fold sections for faster initial load
const About = lazy(() => import('@/components/sections/About'));
const Experience = lazy(() => import('@/components/sections/Experience'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Skills = lazy(() => import('@/components/sections/Skills'));
const Education = lazy(() => import('@/components/sections/Education'));
const Certificates = lazy(() => import('@/components/sections/Certificates'));
const Contact = lazy(() => import('@/components/sections/Contact'));

// Simple loading fallback
const SectionLoader = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-sky-500 rounded-full animate-spin" />
    </div>
);

export default function Home() {
    const [loading, setLoading] = useState(true);

    return (
        <main className="bg-white min-h-screen">
            <AnimatePresence mode="wait">
                {loading && <PageLoader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {!loading && (
                <div className="relative">
                    <Navigation />
                    <JourneyWrapper>
                        <Hero />
                        <Suspense fallback={<SectionLoader />}>
                            <About />
                        </Suspense>
                        <Suspense fallback={<SectionLoader />}>
                            <Experience />
                        </Suspense>
                        <Suspense fallback={<SectionLoader />}>
                            <Projects />
                        </Suspense>
                        <Suspense fallback={<SectionLoader />}>
                            <Skills />
                        </Suspense>
                        <Suspense fallback={<SectionLoader />}>
                            <Education />
                        </Suspense>
                        <Suspense fallback={<SectionLoader />}>
                            <Certificates />
                        </Suspense>
                        <Suspense fallback={<SectionLoader />}>
                            <Contact />
                        </Suspense>
                    </JourneyWrapper>
                </div>
            )}
        </main>
    );
}
