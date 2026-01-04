'use client';

/**
 * ═══════════════════════════════════════════════════════════════════════
 * HERO SECTION - LANDO NORRIS COLLAPSE EFFECT (EXACT REPLICA)
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * EXACT ANIMATION FLOW (matching Lando Norris site):
 * 1. Hero starts with ENTRANCE ANIMATIONS - elements fade in smoothly
 * 2. Background MARQUEE TEXT scrolls horizontally (like Lando's "WE DID IT")
 * 3. On scroll: hero PINS (doesn't scroll down) 
 * 4. All text/UI fades out while portrait SHRINKS into square box
 * 5. SVG signature DRAWS stroke-by-stroke OVER the portrait (like signing)
 * 6. After signature complete: UNPIN and About section scrolls up normally
 * 
 * NO FADE OUT at end - portrait+signature stay visible, just unpin!
 * ═══════════════════════════════════════════════════════════════════════
 */

import { memo, useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskRevealPortrait from './MaskRevealPortrait';
import SplashCursor from './SplashCursor';
import { personalInfo, socialLinks } from '@/lib/constants';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════════════════════════
// BACKGROUND SCROLLING MARQUEE TEXT (Like Lando's "WE DID IT AT HOME" etc)
// ═══════════════════════════════════════════════════════════════════════
function ScrollingMarqueeText() {
    const marqueeLines = [
        { text: 'MACHINE LEARNING • ARTIFICIAL INTELLIGENCE • DEEP LEARNING • NEURAL NETWORKS • ', direction: 'left', speed: 25, gradient: 'from-cyan-400/40 via-sky-400/40 to-blue-400/40', rotation: -8 },
        { text: 'PYTHON • TENSORFLOW • PYTORCH • REACT • NEXT.JS • TYPESCRIPT • ', direction: 'right', speed: 30, gradient: 'from-violet-400/40 via-purple-400/40 to-fuchsia-400/40', rotation: 3 },
        { text: 'NLP • COMPUTER VISION • TRANSFORMERS • LLM • RAG SYSTEMS • ', direction: 'left', speed: 22, gradient: 'from-emerald-400/40 via-teal-400/40 to-green-400/40', rotation: -4 },
        { text: 'FULL STACK • AWS • DOCKER • KUBERNETES • FASTAPI • ', direction: 'right', speed: 28, gradient: 'from-amber-400/40 via-orange-400/40 to-rose-400/40', rotation: 6 },
    ];

    return (
        <div className="heroMarqueeBackground absolute inset-0 z-[1] overflow-hidden">
            {marqueeLines.map((line, index) => (
                <div
                    key={index}
                    className="absolute w-full whitespace-nowrap"
                    style={{
                        top: `${12 + index * 23}%`,
                        transform: `rotate(${line.rotation}deg)`,
                    }}
                >
                    <div
                        className={`marquee-track flex gap-8 ${line.direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
                        style={{
                            animationDuration: `${line.speed}s`,
                        }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <span
                                key={i}
                                className={`text-[50px] sm:text-[80px] md:text-[120px] lg:text-[160px] font-black bg-gradient-to-r ${line.gradient} bg-clip-text text-transparent tracking-tighter select-none`}
                                style={{
                                    WebkitTextStroke: '0.5px rgba(0,0,0,0.02)',
                                }}
                            >
                                {line.text}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Animated organic flowing lines (magazine style) - WITHOUT Framer Motion
function FlowingLines() {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none flowingLines opacity-0"
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
        >
            <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d1d5db" stopOpacity="0" />
                    <stop offset="50%" stopColor="#9ca3af" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#d1d5db" stopOpacity="0" />
                </linearGradient>
            </defs>

            {[0, 1, 2, 3].map((i) => (
                <path
                    key={i}
                    className={`flowingLine flowingLine-${i}`}
                    d={`M${-100 + i * 50} ${200 + i * 120} Q ${400 + i * 100} ${100 + i * 80}, ${700 + i * 50} ${220 + i * 100} T ${1100 + i * 50} ${180 + i * 90} T ${1500 + i * 30} ${250 + i * 80}`}
                    stroke="url(#lineGrad)"
                    strokeWidth={1 + i * 0.2}
                    fill="none"
                    style={{ opacity: 0.3 - i * 0.05 }}
                />
            ))}
        </svg>
    );
}

// Social icons
const socialIcons: Record<string, React.ReactNode> = {
    github: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    ),
    linkedin: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    email: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
};

function HeroSection() {
    // Refs for GSAP animations
    const heroRef = useRef<HTMLDivElement>(null);
    // No ref needed - we'll query all paths directly
    const [isLoaded, setIsLoaded] = useState(false);

    // Mouse parallax state
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    // ============================================
    // INITIAL ENTRANCE ANIMATIONS - Everything appears smoothly on load
    // ============================================
    useEffect(() => {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (!heroRef.current || !isLoaded) return;

        // Create entrance timeline - everything fades in smoothly
        const entranceTl = gsap.timeline({
            defaults: { ease: 'power3.out' }
        });

        // Staggered entrance - elements appear one after another
        entranceTl
            // First: Background marquee starts visible at 100% opacity
            .set('.heroMarqueeBackground', {
                opacity: 1,
            })
            // Flowing lines appear
            .to('.flowingLines', {
                opacity: 1,
                duration: 1.2,
            }, 0.2)
            // Hero content wrapper is visible
            .set('.heroContentWrapper', {
                opacity: 1,
            })
            // Left side typography slides in
            .fromTo('.heroTypography', {
                x: -60,
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                duration: 1.2,
            }, 0.5)
            // Decorative text elements
            .fromTo('.heroDecorativeText', {
                scale: 0.8,
                opacity: 0,
            }, {
                scale: 1,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
            }, 0.6)
            // Mobile hero info card (centered over portrait)
            .fromTo('.mobileHeroInfo', {
                scale: 0.9,
                opacity: 0,
                y: 20,
            }, {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'back.out(1.2)',
            }, 0.8)
            // Right side elements
            .fromTo('#heroQuoteWrapper', {
                x: 40,
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                duration: 1,
            }, 0.7)
            .fromTo('.heroStats', {
                y: 30,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
            }, 0.8)
            // Social links pop up
            .fromTo('.heroSocialLinks', {
                y: 20,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
            }, 0.9)
            // Tech stack at bottom
            .fromTo('.heroTechStack', {
                y: 20,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
            }, 1);

    }, { dependencies: [isLoaded], scope: heroRef });

    // ============================================
    // GSAP SCROLL TRIGGER - EXACT LANDO NORRIS EFFECT
    // ============================================
    useGSAP(() => {
        if (!heroRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Get ALL signature paths for drawing animation
            const signaturePaths = gsap.utils.toArray('.signatureSvg path') as SVGPathElement[];

            // Setup EACH path for drawing animation
            signaturePaths.forEach((path) => {
                const pathLength = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                });
            });

            // Create master timeline with ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '+=500vh', // Even longer for ultra-slow premium feel
                    pin: true,
                    scrub: 2.5,     // Smoother scrub
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // ═══════════════════════════════════════════════════════════
            // PHASE 1: HERO SHRINK TO SQUARE ASPECT RATIO
            // Scale and set fixed dimensions to make it square
            // ═══════════════════════════════════════════════════════════
            tl.to('.heroContentWrapper', {
                scale: 0.48,
                width: '100vh',
                height: '100vh',
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                borderRadius: '32px',
                duration: 4,
                ease: 'power2.inOut',
            }, 0);

            // ═══════════════════════════════════════════════════════════
            // PHASE 2: CONTENT VISIBILITY CONTROL
            // - VISIBLE: Name (heroTypography), Roles (heroDecorativeText)
            // - HIDDEN: Everything else (DetailedInfo, social, stats, etc)
            // ═══════════════════════════════════════════════════════════

            // 1. Fade out secondary elements
            // Note: Including heroVignette and flowingLines in this group or separate is fine
            tl.to('.heroSocialLinks, .heroTechStack, .heroStats, .heroDetailedInfo, .heroVignette, .flowingLines', {
                opacity: 0,
                duration: 2.5,
                ease: 'power2.inOut',
            }, 0.5)

                // Fade out Quote card
                .to('#heroQuoteWrapper', {
                    opacity: 0,
                    duration: 2.5,
                    ease: 'power2.inOut',
                }, 0.5)

                // 2. Roles ("AI ENGINEER", etc.) - Keep Visible & TRANSITION COLOR
                // We use css variables or direct color interpolation. 
                // To ensure smoothness, we set the initial color in the tween properly.

                // AI Role - Cyan
                .fromTo('.heroRoleAI', {
                    color: '#f5f5f4', // Start: stone-100 (approx)
                    scale: 1,
                    filter: 'brightness(1)',
                }, {
                    color: '#22d3ee', // Cyan-400
                    scale: 1.1,
                    filter: 'brightness(1.2)',
                    duration: 4, // Slower duration for "slowly slowly"
                    ease: 'power1.inOut', // Linear/Sine ease for smoother color mix
                }, 0.5)

                // ML Role - Purple
                .fromTo('.heroRoleML', {
                    color: '#f5f5f4', // Start: stone-100
                    scale: 1,
                    filter: 'brightness(1)',
                }, {
                    color: '#c084fc', // Purple-400
                    scale: 1.1,
                    filter: 'brightness(1.2)',
                    duration: 4,
                    ease: 'power1.inOut',
                }, 0.5)

                // Data Role - Emerald
                .fromTo('.heroRoleData', {
                    color: '#f5f5f4', // Start: stone-100
                    scale: 1,
                    filter: 'brightness(1)',
                }, {
                    color: '#34d399', // Emerald-400
                    scale: 1.1,
                    filter: 'brightness(1.2)',
                    duration: 4,
                    ease: 'power1.inOut',
                }, 0.5)

                // Software Role - Amber (scale DOWN slightly to fit better)
                .fromTo('.heroRoleSoftware', {
                    color: '#f5f5f4', // Start: stone-100
                    scale: 1,
                    filter: 'brightness(1)',
                }, {
                    color: '#fbbf24', // Amber-400
                    scale: 0.85,      // Scale DOWN to fit in shrunk view
                    filter: 'brightness(1.2)',
                    duration: 4,
                    ease: 'power1.inOut',
                }, 0.5)

                // 3. Typography Name - Keep Visible
                .to('.heroTypography', {
                    opacity: 1,
                    duration: 3,
                    ease: 'power2.inOut',
                }, 0.5);

            // ═══════════════════════════════════════════════════════════
            // PHASE 3: Signature DRAWS stroke-by-stroke (starts LATE)
            // Bigger and Tilted - Tilted slightly upwards for style
            // ═══════════════════════════════════════════════════════════
            tl.to('.signatureSvg', {
                opacity: 1,
                scale: 1.6,       // Better Scale
                rotation: -8,     // Subtle tilt
                x: 0,             // Centered
                transformOrigin: 'center center',
                duration: 0.5,
                ease: 'power2.in',
            }, 3.2);  // Fade in just before drawing starts

            // Draw ALL paths SEQUENTIALLY for smooth handwriting effect
            if (signaturePaths.length > 0) {
                signaturePaths.forEach((path, index) => {
                    tl.to(path, {
                        strokeDashoffset: 0,
                        duration: 2.5,  // Slowed down for continuous paths
                        ease: 'power1.inOut', // Smooth ease
                    }, 3.5 + (index * 0.5));  // Slower stagger
                });
            }

            // ═══════════════════════════════════════════════════════════
            // PHASE 4 (95% - 100%): HOLD then UNPIN
            // Portrait + signature stay visible, section unpins
            // About section scrolls up naturally over it
            // ═══════════════════════════════════════════════════════════
            // No fade! Just hold the final state until unpin

            return () => {
                tl.kill();
            };
        });

        // ═══════════════════════════════════════════════════════════
        // MOBILE: Full hero experience with shrink + signature
        // Optimized for portrait mode on phones
        // ═══════════════════════════════════════════════════════════
        mm.add("(max-width: 767px)", () => {
            // Get ALL signature paths for mobile
            const signaturePaths = gsap.utils.toArray('.signatureSvg path') as SVGPathElement[];

            // Setup EACH path
            signaturePaths.forEach((path) => {
                const pathLength = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                });
            });

            // Set initial state for signature - diagonal and MUCH bigger
            gsap.set('.signatureSvg', { opacity: 0, rotation: -12, scale: 1.2 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '+=300vh',
                    pin: true,
                    scrub: 1.5,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // PHASE 1: Shrink hero content wrapper on mobile
            tl.to('.heroContentWrapper', {
                scale: 0.4,
                width: '85vw',
                height: '55vh',
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                borderRadius: '20px',
                duration: 4,
                ease: 'power2.inOut',
            }, 0);

            // PHASE 2: Fade out secondary elements (keep mobileHeroInfo visible initially, fade later)
            tl.to('.heroDetailedInfo, .heroSocialLinks, .heroTechStack, .heroStats, #heroQuoteWrapper, .heroRoleML, .heroRoleAI', {
                opacity: 0,
                duration: 2,
                ease: 'power2.inOut',
            }, 0.5)
                .to('.heroTypography', {
                    scale: 0.6,
                    opacity: 0,
                    duration: 3,
                    ease: 'power2.inOut',
                }, 0.5)
                .to('.mobileHeroInfo', {
                    opacity: 0,
                    scale: 0.8,
                    y: -30,
                    duration: 2,
                    ease: 'power2.inOut',
                }, 0.8)
                .to('.heroVignette, .flowingLines', {
                    opacity: 0,
                    duration: 2,
                }, 0.3);

            // PHASE 3: Show signature - MORE DIAGONAL and MUCH BIGGER/BOLDER
            tl.to('.signatureSvg', {
                opacity: 1,
                rotation: -12,      // Moderate tilt
                scale: 1.2,         // Fits nicely on mobile
                duration: 1.5,
            }, 2.5);

            // Draw ALL paths SEQUENTIALLY on mobile
            if (signaturePaths.length > 0) {
                signaturePaths.forEach((path, index) => {
                    tl.to(path, {
                        strokeDashoffset: 0,
                        duration: 2.0,  // Slower animation for continuous paths
                        ease: 'power1.inOut',
                    }, 2.8 + (index * 0.5));
                });
            }

            return () => tl.kill();
        });

        return () => mm.revert();
    }, { dependencies: [], scope: heroRef });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMouseX(x * 20);
        setMouseY(y * 20);
    };

    return (
        <section
            id="hero"
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="heroPin relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#f5f1e8] via-[#faf8f3] to-[#f0ebe3] z-10"
        >
            {/* ═══════════════════════════════════════════════════════════
                BACKGROUND LAYER - Scrolling skills (BEHIND hero content)
                This is visible when hero shrinks
            ═══════════════════════════════════════════════════════════ */}
            <ScrollingMarqueeText />

            {/* ═══════════════════════════════════════════════════════════
                HERO CONTENT WRAPPER - This entire div shrinks as one unit
                Contains all hero content that collapses together
            ═══════════════════════════════════════════════════════════ */}
            <div
                className="heroContentWrapper absolute inset-0 z-[5]"
                style={{
                    willChange: 'transform',
                    transformOrigin: 'center center',
                    backgroundColor: 'inherit',
                    background: 'linear-gradient(to bottom right, #f5f1e8, #faf8f3, #f0ebe3)',
                }}
            >
                {/* Flowing organic lines - magazine aesthetic */}
                <FlowingLines />
                <div className="heroVignette absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,_transparent_30%,_rgba(250,250,249,0.97)_75%)] pointer-events-none z-[5]" />

                <div className="absolute inset-0 flex items-center justify-center z-[5]">
                    <div
                        className="portraitWrapper relative"
                        style={{
                            width: '100%',
                            height: '100%',
                            willChange: 'transform',
                        }}
                    >
                        <div className="absolute inset-0">
                            <MaskRevealPortrait />
                        </div>

                        {/* YOUR ORIGINAL SIGNATURE SVG - Updated with strokeLinecap="round" strokeLinejoin="round" */}
                        <svg
                            className="signatureSvg absolute inset-0 w-full h-full pointer-events-none z-30 opacity-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="29.09131622314453 11.906000137329102 133.1426773071289 172.80099487304688"
                            preserveAspectRatio="xMidYMid meet"
                            style={{ transformOrigin: 'center center' }}
                        >
                            <path
                                d="M 34.145,179.707 C 33.979,172.443 34.242,172.453 34.340,165.199 C 35.181,149.680 35.112,149.685 36.410,134.191 C 38.345,113.899 38.023,113.874 40.023,93.586 C 41.373,77.229 41.375,77.231 42.469,60.855 C 43.095,51.113 43.121,51.118 43.520,41.363 C 43.746,35.136 43.790,35.139 43.859,28.906 C 44.488,22.320 43.916,25.788 43.859,22.668 C 41.972,26.488 43.013,23.137 40.910,30.539 C 39.468,36.757 39.300,36.679 38.516,43.051 C 37.176,51.434 37.249,51.423 36.473,59.871 C 35.413,68.317 35.773,68.263 35.711,76.707 C 35.909,84.185 35.971,84.038 37.590,91.313 C 39.539,98.291 39.232,98.275 42.355,104.887 C 44.644,109.593 44.398,109.670 47.309,114.070 C 49.308,116.915 49.084,117.054 51.234,119.809 C 52.879,121.982 52.732,122.058 54.156,124.355 C 56.421,127.076 55.596,127.029 56.668,129.902 C 56.787,133.314 56.874,132.267 55.063,134.738 C 52.055,135.849 52.934,136.496 48.961,136.266 C 45.599,137.436 46.342,136.618 43.637,136.277 C 40.191,132.245 41.724,135.147 41.211,131.688 C 45.149,132.134 42.728,130.858 48.711,133.504 C 51.970,137.112 51.431,134.550 53.773,136.520 C 54.803,133.845 55.528,135.944 55.828,131.168 C 56.320,126.112 57.352,127.190 58.871,123.211 C 62.344,123.145 60.632,121.208 64.453,121.359 C 65.618,117.436 66.969,119.229 68.121,115.379 C 70.771,113.864 69.946,113.879 73.109,114.246 C 75.890,117.607 75.433,114.626 77.445,116.902 C 77.801,112.568 79.421,116.007 80.172,111.047 C 84.305,109.482 83.014,109.223 87.871,110.211 C 91.868,115.170 90.717,110.793 92.996,113.668 C 94.619,107.360 95.333,110.556 94.801,100.984 C 94.389,91.475 95.070,91.510 93.898,81.969 C 93.543,72.612 93.416,72.623 92.855,63.281 C 92.359,56.705 92.371,56.712 91.555,50.168 C 90.968,45.620 90.996,45.625 90.129,41.121 C 89.487,34.987 89.650,38.551 88.918,36.031 C 86.800,42.023 87.567,38.509 86.289,48.164 C 85.992,55.525 85.687,55.404 86.691,62.793 C 87.344,70.634 87.436,70.529 89.176,78.172 C 91.037,83.747 90.557,83.856 93.117,89.238 C 94.738,93.492 94.728,93.489 96.559,97.656 C 97.275,102.587 97.779,100.447 99.199,103.148 C 102.203,102.014 101.077,103.696 104.164,99.875 C 105.447,95.955 106.619,97.198 108.031,93.516 C 110.629,91.446 110.080,91.581 113.430,91.129 C 116.696,92.912 116.285,90.806 119.344,92.234 C 121.980,90.567 122.038,91.545 124.113,88.395 C 126.453,85.392 126.764,85.694 128.910,82.488 C 133.131,76.465 131.287,79.679 133.781,76.969 C 132.253,80.712 134.480,77.510 131.609,84.578 C 131.160,90.078 131.167,87.237 131.609,90.020 C 131.371,85.635 132.104,89.955 133.496,84.332 C 137.580,83.822 136.393,82.555 141.652,83.859 C 145.743,85.987 144.611,83.887 147.559,84.461 C 149.627,80.547 150.200,82.241 150.566,76.367 C 151.369,71.310 151.676,71.426 151.656,66.219 C 152.234,58.596 152.085,58.626 152.000,51.000 C 151.957,44.086 151.790,44.184 150.770,37.395 C 149.605,32.572 149.912,32.561 147.910,27.949 C 146.604,24.437 146.634,24.470 144.828,21.191 C 141.896,15.964 143.583,18.915 141.867,16.906 C 143.076,21.913 141.810,18.766 144.656,26.797 C 145.829,30.178 145.755,30.193 147.227,33.465 C 149.025,37.578 148.981,37.592 150.961,41.625 C 152.808,45.369 152.762,45.390 154.699,49.090 C 155.831,51.608 155.944,51.539 157.234,53.965"
                                stroke="#0ea5e9"
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M 133.531,36.523 C 136.279,34.183 136.301,34.209 139.070,31.895 C 141.406,29.978 141.406,29.980 143.785,28.117 C 146.288,26.135 146.298,26.152 148.855,24.242 C 151.166,22.484 151.188,22.522 153.586,20.891"
                                stroke="#0ea5e9"
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Splash Cursor Effect */}
                <SplashCursor />

                {/* MOBILE INFO - Above portrait on mobile only */}
                <div className="mobileHeroInfo absolute top-30 left-1/2 -translate-x-1/2 w-[90%] max-w-sm sm:hidden z-[13] opacity-0 text-center">
                    {/* Main Title with gradient */}
                    <h3 className="text-4xl font-black leading-tight mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400">
                            AI/ML ENGINEER
                        </span>
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-stone-700 font-semibold tracking-wide mb-3">
                        Full Stack Developer • AI Research
                    </p>

                    {/* Expertise badges */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-2">
                        <span className="px-3.5 py-1.5 bg-cyan-400/20 border border-cyan-400/40 rounded-full text-[9px] text-cyan-600 font-semibold">
                            NLP Research
                        </span>
                        <span className="px-3.5 py-1.5 bg-sky-400/20 border border-sky-400/40 rounded-full text-[9px] text-sky-600 font-semibold">
                            Vision Expert
                        </span>
                        <span className="px-3.5 py-1.5 bg-teal-400/20 border border-teal-400/40 rounded-full text-[9px] text-teal-600 font-semibold">
                            Generative AI
                        </span>
                    </div>

                    {/* Specialized in - simple text */}
                    <div className="flex flex-wrap justify-center gap-2 text-[12px] text-stone-600 font-medium">
                        <span>🤖 LLMs</span>
                        <span>•</span>
                        <span>📚 RAG Systems</span>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════
                LEFT SIDE - Name, Tagline, Roles (Fades out on scroll)
            ═══════════════════════════════════════════════════════════ */}
                <div
                    className="heroTypography absolute top-4 left-3 sm:top-8 sm:left-4 md:top-12 md:left-5 z-[12] opacity-0"
                    style={{
                        transform: `perspective(1000px) translate3d(${mouseX * 0.6}px, ${mouseY * 0.4}px, 30px) rotateY(${mouseX * 0.15}deg)`,
                        transition: 'transform 0.15s ease-out',
                        willChange: 'transform, opacity',
                    }}
                >
                    <h1
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.85]"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    >
                        <span className="text-stone-900 block drop-shadow-sm">
                            {personalInfo.firstName.toUpperCase()}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 block">
                            {personalInfo.lastName.toUpperCase()}
                        </span>
                    </h1>

                    {/* Primary Tagline - WRAPPED IN heroDetailedInfo TO FADE OUT */}
                    <div className="heroDetailedInfo hidden sm:block">
                        <p className="mt-3 sm:mt-4 text-stone-500 text-xs sm:text-sm md:text-base font-medium tracking-wide">
                            AI/ML Engineer & Full-Stack Developer
                        </p>

                        {/* Decorative accent line */}
                        <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-cyan-400 via-sky-400 to-transparent rounded-full" />

                        {/* Creative Stacked AI/ML Roles with Icons */}
                        <div className="mt-8 space-y-6">
                            {/* Role Block 1 - Core Focus */}
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-stone-800 flex items-center gap-2">
                                    AI/ML Engineer
                                </h2>
                                <div className="flex items-center gap-3 mt-1 text-stone-600 font-medium">
                                    <span>NLP Research</span>
                                    <span className="text-amber-400 text-lg">⚡</span>
                                    <span>Vision Expert</span>
                                </div>
                            </div>

                            {/* Role Block 2 - Tech Specialization */}
                            <div>
                                <div className="text-stone-700 font-bold mb-1">Specialized In</div>
                                <div className="text-stone-500 font-medium flex flex-wrap gap-x-4 gap-y-1">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                                        Large Language Models
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1 h-1 bg-sky-400 rounded-full" />
                                        RAG Systems
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1 h-1 bg-teal-400 rounded-full" />
                                        Generative AI
                                    </span>
                                </div>
                            </div>

                            {/* Role Block 3 - Impact/Mission */}
                            <div className="max-w-sm">
                                <div className="text-stone-700 font-bold mb-1">Impact & Innovation</div>
                                <p className="text-stone-400 text-sm leading-relaxed">
                                    Architecting scalable AI solutions that transform complex data into actionable intelligence. Bridging the gap between cutting-edge research and production systems.
                                </p>
                            </div>
                        </div>

                        {/* Creative Quote */}
                        <div className="mt-6 pt-6 border-t border-stone-100">
                            <div className="max-w-sm text-stone-400 text-sm italic leading-relaxed">
                                &quot;The best AI doesn&apos;t replace human thinking — it amplifies it.&quot;
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />
                                <span className="text-stone-300 text-xs uppercase tracking-widest">Motto</span>
                            </div>
                        </div>
                    </div>

                    {/* ML Engineer - matching right side AI Engineer - HIDDEN ON MOBILE */}
                    <div className="mt-4 sm:mt-8 heroRoleML opacity-100 hidden sm:block">
                        <div className="text-[40px] sm:text-[60px] lg:text-[120px] font-black text-stone-100 leading-none tracking-tighter select-none transition-all duration-500 hover:text-stone-200">
                            ML
                        </div>
                        <div className="text-stone-200 text-xl sm:text-2xl lg:text-4xl font-black tracking-tighter -mt-1 sm:-mt-2 select-none">
                            ENGINEER
                        </div>
                    </div>
                </div>

                {/* Left sidebar info - Social links */}
                <div className="heroSocialLinks absolute bottom-32 left-2 sm:bottom-36 sm:left-4 md:bottom-40 md:left-5 z-[12] hidden xs:block opacity-0">
                    <div className="flex gap-2">
                        {socialLinks.slice(0, 3).map((link) => (
                            <a
                                key={link.platform}
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-sm hover:scale-110 hover:-translate-y-1"
                            >
                                {socialIcons[link.icon] || socialIcons.email}
                            </a>
                        ))}
                    </div>
                </div>

                {/* BOTTOM SCROLLING TECH STACK */}
                <div className="heroTechStack absolute bottom-0 left-0 right-0 h-12 flex items-center overflow-hidden z-[12] opacity-0">
                    <div className="flex items-center gap-8 animate-marquee whitespace-nowrap px-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex items-center gap-8">
                                {['Python', 'TensorFlow', 'PyTorch', 'React', 'Next.js', 'Typescript', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Node.js', 'FastAPI'].map((tech) => (
                                    <span key={tech} className="text-stone-400 font-medium text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== RIGHT SIDE DECORATIVE CONTENT ===== */}

                {/* Quote card - top right - VISIBLE BY DEFAULT */}
                <div
                    id="heroQuoteWrapper"
                    className="heroQuote absolute top-24 right-2 sm:right-4 md:right-5 z-[12] hidden lg:block max-w-xs opacity-0"
                >
                    <div
                        style={{
                            transform: `translate3d(${mouseX * -0.3}px, ${mouseY * 0.2}px, 0)`,
                            willChange: 'transform',
                        }}
                    >
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-stone-100 shadow-sm group hover:bg-white/80 transition-all duration-300">
                            <p className="text-stone-600 text-sm leading-relaxed italic group-hover:text-stone-900 transition-colors">
                                &quot;Building intelligent systems that bridge the gap between data and decisions.&quot;
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="w-8 h-0.5 bg-gradient-to-r from-sky-400 to-transparent rounded-full" />
                                <span className="text-stone-400 text-xs uppercase tracking-wider">Philosophy</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI ENGINEER - middle right */}
                <div
                    className="heroRoleAI absolute top-1/2 right-2 sm:right-4 md:right-5 -translate-y-1/2 z-[12] hidden sm:block opacity-100"
                    style={{
                        transform: `translateY(-50%) translate3d(${mouseX * -0.25}px, ${mouseY * 0.15}px, 0)`,
                        transition: 'transform 0.15s ease-out',
                        willChange: 'transform, opacity',
                    }}
                >
                    <div className="text-right">
                        <div className="text-[50px] sm:text-[80px] lg:text-[120px] font-black text-stone-100 leading-none tracking-tighter select-none transition-all duration-500 hover:text-stone-200">
                            AI
                        </div>
                        <div className="text-stone-200 text-xl sm:text-2xl lg:text-4xl font-black tracking-tighter -mt-1 sm:-mt-2 select-none">
                            ENGINEER
                        </div>
                    </div>
                </div>

                {/* DATA SCIENTIST - Center-Relative Positioning */}
                <div className="heroRoleData absolute top-[25%] left-1/2 -translate-x-[370px] z-[8] hidden lg:block text-right opacity-100">
                    <div className="text-[50px] xl:text-[70px] font-black text-stone-100/80 leading-none tracking-tighter select-none">
                        DATA
                    </div>
                    <div className="text-stone-200/70 text-2xl xl:text-3xl font-black tracking-tighter -mt-1 select-none">
                        SCIENTIST
                    </div>
                </div>

                {/* SOFTWARE ENGINEER - Center-Relative Positioning */}
                <div className="heroRoleSoftware absolute top-[32%] left-1/2 translate-x-[140px] z-[8] hidden lg:block text-left opacity-100">
                    <div className="text-[50px] xl:text-[70px] font-black text-stone-100/80 leading-none tracking-tighter select-none">
                        SOFTWARE
                    </div>
                    <div className="text-stone-200/70 text-2xl xl:text-3xl font-black tracking-tighter -mt-1 select-none">
                        ENGINEER
                    </div>
                </div>

                {/* Bottom right - Stats & Location */}
                <div className="heroStats absolute bottom-20 right-2 sm:bottom-24 sm:right-4 md:bottom-28 md:right-5 z-[12] hidden md:block text-right opacity-0">
                    {/* Stats Block */}
                    <div className="mb-8 flex flex-col items-end gap-4">
                        <div className="flex gap-8 border-b border-stone-100 pb-4">
                            <div className="text-right">
                                <div className="text-3xl font-black text-stone-800">4+</div>
                                <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Years Exp</div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-black text-stone-800">50+</div>
                                <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Projects</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-stone-700">Global Client Base</div>
                            <div className="text-xs text-stone-400">Serving clients across 3 continents</div>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                        <div className="flex items-center justify-end gap-2 mb-1">
                            <span className="text-[10px] text-stone-400 tracking-[0.3em] uppercase font-semibold">Status</span>
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                        </div>
                        <span className="text-stone-700 font-bold text-sm bg-white/50 backdrop-blur-md px-3 py-1 rounded-full border border-stone-100">
                            Open to Opportunities
                        </span>
                    </div>

                    {/* Location */}
                    <div>
                        <span className="text-[10px] text-stone-400 tracking-[0.3em] uppercase font-semibold">Location</span>
                        <div className="mt-1 flex items-center justify-end gap-2">
                            <span className="text-stone-700 font-bold text-sm">Windsor, Canada</span>
                            <span className="text-lg">📍</span>
                        </div>
                    </div>
                </div>
            </div>{/* End heroContentWrapper */}
        </section >
    );
}

export default memo(HeroSection);
