'use client';

import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import PageLoader from '@/components/PageLoader';
import JourneyWrapper from '@/components/JourneyWrapper';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';

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
                        <About />
                        <Experience />
                        <Projects />
                        <Skills />
                        <Education />
                        <Certificates />
                        <Contact />
                    </JourneyWrapper>
                </div>
            )}
        </main>
    );
}
