'use client';

import { AnimatePresence } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import PageLoader from '@/components/PageLoader';
import JourneyWrapper from '@/components/JourneyWrapper';
import ErrorBoundary from '@/components/ErrorBoundary';
import Hero from '@/components/sections/Hero';

// Lazy load below-the-fold sections for faster initial load
const About = lazy(() => import('@/components/sections/About'));
const Experience = lazy(() => import('@/components/sections/Experience'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Skills = lazy(() => import('@/components/sections/Skills'));
const Education = lazy(() => import('@/components/sections/Education'));
const Certificates = lazy(() => import('@/components/sections/Certificates'));
const Contact = lazy(() => import('@/components/sections/Contact'));

// Skeleton loader for better perceived performance
const SectionLoader = () => (
    <div className="min-h-screen flex flex-col justify-center p-8 md:p-16 animate-pulse">
        {/* Header skeleton */}
        <div className="h-4 w-32 bg-stone-200 rounded mb-4" />
        <div className="h-12 w-1/3 bg-stone-200 rounded mb-8" />
        
        {/* Content lines skeleton */}
        <div className="space-y-3 mb-12">
            <div className="h-4 w-full bg-stone-200 rounded" />
            <div className="h-4 w-5/6 bg-stone-200 rounded" />
            <div className="h-4 w-4/6 bg-stone-200 rounded" />
        </div>
        
        {/* Cards grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-stone-200 rounded-2xl" />
            ))}
        </div>
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
                        <ErrorBoundary>
                            <Suspense fallback={<SectionLoader />}>
                                <About />
                            </Suspense>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Suspense fallback={<SectionLoader />}>
                                <Experience />
                            </Suspense>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Suspense fallback={<SectionLoader />}>
                                <Projects />
                            </Suspense>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Suspense fallback={<SectionLoader />}>
                                <Skills />
                            </Suspense>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Suspense fallback={<SectionLoader />}>
                                <Education />
                            </Suspense>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Suspense fallback={<SectionLoader />}>
                                <Certificates />
                            </Suspense>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Suspense fallback={<SectionLoader />}>
                                <Contact />
                            </Suspense>
                        </ErrorBoundary>
                    </JourneyWrapper>
                </div>
            )}
        </main>
    );
}
