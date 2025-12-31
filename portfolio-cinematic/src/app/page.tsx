'use client';

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import PageLoader from '@/components/PageLoader';
import JourneyWrapper from '@/components/JourneyWrapper';

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <JourneyWrapper>
        <main className="relative bg-slate-950">
          <Navigation />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certificates />
          <Contact />
          <Footer />
        </main>
      </JourneyWrapper>
    </>
  );
}
