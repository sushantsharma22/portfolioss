'use client';

import { memo, useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useMouseParallax';

// ============================================
// MANUAL ALIGNMENT CONFIGURATION FOR MOBILE
// You can adjust these values to perfectly align the robot with the human on mobile
// ============================================
const MOBILE_ROBOT_ADJUSTMENT = {
    x: 0,      // Horizontal shift in % (positive = right, negative = left)
    y: -11,      // Vertical shift in % (positive = down, negative = up)
    scale: 1.22,  // Scale factor (e.g. 1.05 to make slightly bigger)
};

function MaskRevealPortrait() {
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [trail, setTrail] = useState<Array<{ x: number, y: number, id: number, time: number }>>([]);

    // Glitch states
    const [isGlitching, setIsGlitching] = useState(false);
    const [glitchData, setGlitchData] = useState({
        path: '',
        offsetX: 0,
        offsetY: 0,
        rgbR: 0,
        rgbB: 0,
        scanlineY: 0,
        showScan: false,
    });

    const trailId = useRef(0);

    // ============================================
    // TUBELIGHT GLITCH - Works on both desktop & mobile
    // ============================================
    useEffect(() => {
        const generatePath = () => {
            const cx = 30 + Math.random() * 40;
            const cy = 20 + Math.random() * 60;
            const numPoints = 6 + Math.floor(Math.random() * 4);
            const points = [];

            for (let i = 0; i < numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;
                const r = 12 + (Math.random() - 0.5) * 12;
                points.push(`${cx + Math.cos(angle) * r}% ${cy + Math.sin(angle) * r * 1.4}%`);
            }
            return `polygon(${points.join(', ')})`;
        };

        const triggerTubelightGlitch = () => {
            // Slightly reduced intensity on mobile for performance
            const multiplier = isMobile ? 0.7 : 1;

            setGlitchData({
                path: generatePath(),
                offsetX: (Math.random() - 0.5) * 8 * multiplier,
                offsetY: (Math.random() - 0.5) * 4 * multiplier,
                rgbR: (Math.random() - 0.5) * 6 * multiplier,
                rgbB: (Math.random() - 0.5) * 6 * multiplier,
                scanlineY: Math.random() * 100,
                showScan: !isMobile && Math.random() < 0.4, // No scanlines on mobile
            });

            // Aggressive twitchy pattern for mobile
            const flickerPattern = isMobile ? [
                { on: true, duration: 80 },   // Longer ON
                { on: false, duration: 40 },
                { on: true, duration: 150 },  // Longer ON
                { on: false, duration: 30 },
                { on: true, duration: 300 },  // Much Longer ON (show robot more)
                { on: false, duration: 0 },
            ] : [
                { on: true, duration: 60 },
                { on: false, duration: 40 },
                { on: true, duration: 80 },
                { on: false, duration: 30 },
                { on: true, duration: 50 },
                { on: false, duration: 60 },
                { on: true, duration: 120 },
                { on: false, duration: 25 },
                { on: true, duration: 200 },
                { on: false, duration: 40 },
                { on: true, duration: 300 },
                { on: false, duration: 0 },
            ];

            let delay = 0;
            flickerPattern.forEach((step) => {
                setTimeout(() => {
                    setIsGlitching(step.on);
                    if (step.on && Math.random() < 0.3) {
                        setGlitchData(prev => ({ ...prev, path: generatePath() }));
                    }
                }, delay);
                delay += step.duration;
            });
        };

        const scheduleNext = () => {
            // Slightly less frequent on mobile for battery
            // Much more frequent on mobile (aggressive robot usage)
            const gap = isMobile
                ? 400 + Math.random() * 800    // 0.4-1.2s on mobile (very fast)
                : 1500 + Math.random() * 2500; // 1.5-4s on desktop
            return setTimeout(() => {
                triggerTubelightGlitch();
                scheduleNext();
            }, gap);
        };

        const initialTimer = setTimeout(() => {
            triggerTubelightGlitch();
            scheduleNext();
        }, 2000);

        return () => clearTimeout(initialTimer);
    }, [isMobile]);

    // ============================================
    // WATER TRAIL (Desktop only)
    // ============================================
    useEffect(() => {
        if (isMobile) return; // Skip trail on mobile

        const decayInterval = setInterval(() => {
            const now = Date.now();
            setTrail(t => t.filter(p => now - p.time < 1200));
        }, 30);
        return () => clearInterval(decayInterval);
    }, [isMobile]);

    // Desktop mouse handler
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || isMobile) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        trailId.current += 1;
        setTrail(t => [...t.slice(-40), { x, y, id: trailId.current, time: Date.now() }]);
        setMousePos({ x, y });
    }, [isMobile]);

    // Mobile touch handler - tap to reveal
    const handleTouch = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        if (!containerRef.current || !isMobile) return;
        const touch = e.touches[0];
        if (!touch) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;

        trailId.current += 1;
        setTrail(t => [...t.slice(-15), { x, y, id: trailId.current, time: Date.now() }]); // Shorter trail on mobile
        setMousePos({ x, y });
    }, [isMobile]);

    const handleMouseLeave = useCallback(() => {
        setMousePos({ x: -100, y: -100 });
    }, []);

    const handleTouchEnd = useCallback(() => {
        // Let trail fade naturally on touch end
        setMousePos({ x: -100, y: -100 });
    }, []);

    // Organic blob mask - liquid flowing shape
    const getWaterMask = () => {
        if (trail.length === 0 && mousePos.x < 0) {
            return 'radial-gradient(circle at 0 0, transparent 0, transparent 0)';
        }
        const now = Date.now();
        const trailLifetime = isMobile ? 800 : 1200;

        // Create organic blob gradients for trail
        const gradients = trail.map((point) => {
            const age = now - point.time;
            const lifeRatio = Math.pow(1 - age / trailLifetime, 0.5);
            // Organic varied sizes for liquid effect
            const baseSize = isMobile ? 35 : 25;
            const maxSize = isMobile ? 55 : 90;
            const size = baseSize + lifeRatio * maxSize;
            const opacity = Math.max(0, lifeRatio);
            // Slightly oval for more organic feel
            return `radial-gradient(ellipse ${size}px ${size * 1.2}px at ${point.x}% ${point.y}%, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,${opacity * 0.7}) 40%, transparent 70%)`;
        });

        // Main cursor blob - LARGE smooth liquid reveal
        if (mousePos.x >= 0) {
            // Much larger for smoother look like Lando site
            const cursorSize = isMobile ? 120 : 200;
            const time = Date.now() / 1000;
            // Very subtle wobble
            const wobbleX = Math.sin(time * 1.5) * 1.5;
            const wobbleY = Math.cos(time * 1.8) * 1.5;
            // Single large soft gradient for smooth liquid feel
            gradients.push(
                `radial-gradient(ellipse ${cursorSize}px ${cursorSize * 1.1}px at ${mousePos.x + wobbleX}% ${mousePos.y + wobbleY}%, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.2) 75%, transparent 100%)`
            );
        }
        return gradients.join(', ');
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouch}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: 'default' }}
        >
            {/* Force landscape aspect ratio on mobile so images align like desktop */}
            <div
                className="relative w-full h-full flex items-end justify-center"
                style={{
                    // On mobile, force a min-aspect-ratio so images are constrained by height (like desktop)
                    minHeight: isMobile ? '100%' : undefined,
                }}
            >

                {/* LAYER 1: HUMAN BASE */}
                <div
                    className="absolute inset-0"
                    style={{
                        transform: isGlitching
                            ? `translate(${glitchData.offsetX}px, ${glitchData.offsetY}px)`
                            : 'none',
                        filter: isGlitching ? 'brightness(0.88) contrast(1.12)' : 'none',
                        transition: 'transform 0.03s, filter 0.03s',
                    }}
                >
                    <Image
                        src="/human.png"
                        alt="Portrait"
                        fill
                        className={isMobile ? "object-contain object-bottom" : "object-contain object-center"}
                        priority
                        sizes="100vw"
                    />

                    {/* RGB Split - same on both desktop and mobile */}
                    {isGlitching && (
                        <>
                            <div
                                className="absolute inset-0 mix-blend-screen"
                                style={{
                                    transform: `translateX(${glitchData.rgbR}px)`,
                                    opacity: 0.5,
                                    filter: 'hue-rotate(-35deg) brightness(1.15)',
                                }}
                            >
                                <Image src="/human.png" alt="" fill className={isMobile ? "object-contain object-bottom" : "object-contain object-center"} sizes="100vw" />
                            </div>
                            <div
                                className="absolute inset-0 mix-blend-screen"
                                style={{
                                    transform: `translateX(${glitchData.rgbB}px)`,
                                    opacity: 0.4,
                                    filter: 'hue-rotate(180deg) brightness(1.1)',
                                }}
                            >
                                <Image src="/human.png" alt="" fill className={isMobile ? "object-contain object-bottom" : "object-contain object-center"} sizes="100vw" />
                            </div>
                        </>
                    )}
                </div>

                {/* LAYER 2: ROBOT WATER REVEAL */}
                <div
                    className="absolute inset-0"
                    style={{
                        WebkitMaskImage: getWaterMask(),
                        maskImage: getWaterMask(),
                        transition: 'mask-image 0.1s linear',
                        // Manual mobile adjustment
                        transform: isMobile
                            ? `translate(${MOBILE_ROBOT_ADJUSTMENT.x}%, ${MOBILE_ROBOT_ADJUSTMENT.y}%) scale(${MOBILE_ROBOT_ADJUSTMENT.scale})`
                            : 'none',
                    }}
                >
                    <Image
                        src="/robot.png"
                        alt="Robot"
                        fill
                        className={isMobile ? "object-contain object-bottom" : "object-contain object-center"}
                        priority
                        sizes="100vw"
                    />
                </div>

                {/* LAYER 3: ROBOT GLITCH TEAR */}
                {isGlitching && (
                    <div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            clipPath: glitchData.path,
                            // Manual mobile adjustment
                            transform: isMobile
                                ? `translate(${MOBILE_ROBOT_ADJUSTMENT.x}%, ${MOBILE_ROBOT_ADJUSTMENT.y}%) scale(${MOBILE_ROBOT_ADJUSTMENT.scale})`
                                : 'none',
                        }}
                    >
                        <Image
                            src="/robot.png"
                            alt=""
                            fill
                            className={isMobile ? "object-contain object-bottom" : "object-contain object-center"}
                            sizes="100vw"
                            style={{
                                filter: 'contrast(1.2) brightness(1.05) saturate(1.1) drop-shadow(0 25px 50px rgba(0,0,0,0.3))',
                            }}
                        />

                        {/* Glow overlay - significantly reduced white */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.08), transparent 60%)',
                                mixBlendMode: 'overlay',
                                opacity: isMobile ? 0.2 : 0.5,
                            }}
                        />

                        {/* RGB aberration - same on desktop and mobile */}
                        <div
                            className="absolute inset-0 mix-blend-screen"
                            style={{
                                transform: `translateX(${glitchData.rgbR * 0.7}px)`,
                                opacity: 0.35,
                                filter: 'hue-rotate(-45deg)',
                            }}
                        >
                            <Image src="/robot.png" alt="" fill className={isMobile ? "object-contain object-bottom" : "object-contain object-center"} sizes="100vw" />
                        </div>
                    </div>
                )}

                {/* SCANLINE - same on desktop and mobile */}
                {isGlitching && glitchData.showScan && (
                    <div
                        className="absolute inset-0 pointer-events-none z-25"
                        style={{
                            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px)',
                        }}
                    >
                        <div
                            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            style={{
                                top: `${glitchData.scanlineY}%`,
                                boxShadow: '0 0 15px rgba(255,255,255,0.4)',
                            }}
                        />
                    </div>
                )}

                {/* Thunder flash */}
                {isGlitching && (
                    <div
                        className="absolute inset-0 pointer-events-none z-30"
                        style={{
                            background: 'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.05), transparent 65%)',
                            mixBlendMode: 'overlay',
                        }}
                    />
                )}

                {/* Cursor glow (desktop only) */}
                {!isMobile && mousePos.x >= 0 && (
                    <div
                        className="absolute w-24 h-24 rounded-full pointer-events-none z-40"
                        style={{
                            left: `${mousePos.x}%`,
                            top: `${mousePos.y}%`,
                            transform: 'translate(-50%, -50%)',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)',
                        }}
                    />
                )}

                {/* Mobile touch hint */}
                {isMobile && trail.length === 0 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-stone-400 text-xs tracking-wider animate-pulse">
                        Touch to reveal
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(MaskRevealPortrait);
