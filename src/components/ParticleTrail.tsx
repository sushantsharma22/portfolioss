'use client';

import { useRef, useEffect, useCallback, memo } from 'react';
import { prefersReducedMotion } from '@/lib/sectionTransitions';

interface Particle {
    x: number;
    y: number;
    size: number;
    opacity: number;
    life: number;
    maxLife: number;
    color: string;
    // Bezier curve control points
    startX: number;
    startY: number;
    cp1X: number;
    cp1Y: number;
    cp2X: number;
    cp2Y: number;
    endX: number;
    endY: number;
    speed: number;
}

interface ParticleTrailProps {
    startPos: { x: number; y: number } | null;
    endPos: { x: number; y: number } | null;
    startColor: string;
    endColor: string;
    trigger: number; // Changes to trigger new particles
}

// Cubic bezier interpolation
function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
    const oneMinusT = 1 - t;
    return (
        oneMinusT * oneMinusT * oneMinusT * p0 +
        3 * oneMinusT * oneMinusT * t * p1 +
        3 * oneMinusT * t * t * p2 +
        t * t * t * p3
    );
}

// Ease out cubic
function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

// Interpolate colors (simple RGB interpolation)
function interpolateColor(color1: string, color2: string, t: number): string {
    // Convert hex to RGB
    const hex2rgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1] ?? '0', 16),
            g: parseInt(result[2] ?? '0', 16),
            b: parseInt(result[3] ?? '0', 16)
        } : { r: 255, g: 255, b: 255 };
    };

    const c1 = hex2rgb(color1);
    const c2 = hex2rgb(color2);

    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
}

function ParticleTrail({ startPos, endPos, startColor, endColor, trigger }: ParticleTrailProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | null>(null);
    const lastTriggerRef = useRef<number>(0);

    // Spawn particles
    const spawnParticles = useCallback(() => {
        if (!startPos || !endPos || prefersReducedMotion()) return;

        const particleCount = window.innerWidth < 768 ? 4 : 6; // Fewer on mobile
        const baseDuration = 800; // ms

        for (let i = 0; i < particleCount; i++) {
            // Random variations
            const sizeVariation = 3 + Math.random() * 4; // 3-7px
            const speedVariation = 0.8 + Math.random() * 0.4; // 0.8-1.2x speed
            const curveOffset = 30;

            // Calculate bezier control points with random offset
            const midY = (startPos.y + endPos.y) / 2;
            const cp1X = startPos.x + (Math.random() - 0.5) * curveOffset;
            const cp1Y = startPos.y + (endPos.y - startPos.y) * 0.3 + (Math.random() - 0.5) * curveOffset;
            const cp2X = endPos.x + (Math.random() - 0.5) * curveOffset;
            const cp2Y = endPos.y - (endPos.y - startPos.y) * 0.3 + (Math.random() - 0.5) * curveOffset;

            // Stagger spawn
            setTimeout(() => {
                const particle: Particle = {
                    x: startPos.x + (Math.random() - 0.5) * 6,
                    y: startPos.y + (Math.random() - 0.5) * 6,
                    size: sizeVariation,
                    opacity: 0.9,
                    life: 0,
                    maxLife: baseDuration * speedVariation,
                    color: startColor,
                    startX: startPos.x,
                    startY: startPos.y,
                    cp1X,
                    cp1Y,
                    cp2X,
                    cp2Y,
                    endX: endPos.x,
                    endY: endPos.y,
                    speed: speedVariation,
                };

                particlesRef.current.push(particle);
            }, i * 50); // Stagger by 50ms
        }
    }, [startPos, endPos, startColor]);

    // Animation loop
    const animate = useCallback((timestamp: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particlesRef.current = particlesRef.current.filter((particle) => {
            // Update life
            particle.life += 16; // Approximate frame time

            // Calculate progress (0 to 1)
            const progress = Math.min(particle.life / particle.maxLife, 1);
            const easedProgress = easeOutCubic(progress);

            // Update position along bezier curve
            particle.x = cubicBezier(
                easedProgress,
                particle.startX,
                particle.cp1X,
                particle.cp2X,
                particle.endX
            );
            particle.y = cubicBezier(
                easedProgress,
                particle.startY,
                particle.cp1Y,
                particle.cp2Y,
                particle.endY
            );

            // Update opacity (fade out towards end)
            const opacityCurve = progress < 0.7 ? 1 : 1 - ((progress - 0.7) / 0.3);
            particle.opacity = 0.9 * opacityCurve;

            // Update size (grow then shrink)
            const sizeCurve = progress < 0.5 
                ? 1 + progress * 0.3 
                : 1.15 - (progress - 0.5) * 0.5;
            const currentSize = particle.size * sizeCurve;

            // Update color
            particle.color = interpolateColor(startColor, endColor, easedProgress);

            // Draw glow (outer)
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentSize * 2, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace('rgb', 'rgba').replace(')', `, ${particle.opacity * 0.3})`);
            ctx.fill();

            // Draw core (inner)
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace('rgb', 'rgba').replace(')', `, ${particle.opacity})`);
            ctx.fill();

            // Keep particle if still alive
            return progress < 1;
        });

        // Continue animation if particles exist
        if (particlesRef.current.length > 0) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            animationRef.current = null;
        }
    }, [startColor, endColor]);

    // Start animation when there are particles
    useEffect(() => {
        if (particlesRef.current.length > 0 && !animationRef.current) {
            animationRef.current = requestAnimationFrame(animate);
        }
    }, [animate]);

    // Handle trigger changes
    useEffect(() => {
        if (trigger !== lastTriggerRef.current && trigger > 0) {
            lastTriggerRef.current = trigger;
            spawnParticles();
            
            // Start animation
            if (!animationRef.current) {
                animationRef.current = requestAnimationFrame(animate);
            }
        }
    }, [trigger, spawnParticles, animate]);

    // Resize canvas to match window
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[60]"
            style={{ 
                mixBlendMode: 'screen',
                opacity: 0.9,
            }}
        />
    );
}

export default memo(ParticleTrail);
