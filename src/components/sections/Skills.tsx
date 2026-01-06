'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import { skillCategories } from '@/lib/constants';

// --- Style Configuration ---
const SKILL_STYLES = {
    'ai-ml': {
        baseR: 50,
        className: 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 ring-1 ring-violet-400/50'
    },
    'data-backend': {
        baseR: 42,
        className: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/50'
    },
    'languages': {
        baseR: 38,
        className: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-400/20 ring-1 ring-amber-400/50'
    },
    'default': {
        baseR: 34,
        className: 'bg-white border border-stone-200 text-stone-700 shadow-md hover:shadow-lg transition-shadow'
    },
};

type Point = { x: number; y: number; r: number; vx: number; vy: number; id: number };

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [dims, setDims] = useState({ w: 0, h: 0 });
    const [layoutPositions, setLayoutPositions] = useState<{ x: number, y: number; r: number }[]>([]);

    // Scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Taut spring for direct control
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
        restDelta: 0.0001
    });

    // 1. Prepare Skills
    const skills = useMemo(() => {
        let processed = skillCategories.flatMap(cat =>
            cat.skills.map(skill => {
                const key = ['ai-ml', 'data-backend', 'languages'].includes(cat.id) ? cat.id : 'default';
                const len = skill.name.length;
                const style = SKILL_STYLES[key as keyof typeof SKILL_STYLES] || SKILL_STYLES.default;
                return {
                    name: skill.name,
                    category: cat.id,
                    style: style,
                    textLen: len,
                };
            })
        );

        if (isMobile) {
            const aiMl = processed.filter(s => s.category === 'ai-ml');
            const data = processed.filter(s => s.category === 'data-backend');
            const others = processed.filter(s => !['ai-ml', 'data-backend'].includes(s.category)).slice(0, 16);
            processed = [...aiMl, ...data, ...others];
        }

        return processed;
    }, [isMobile]);

    // 2. Handle Resize
    useEffect(() => {
        const update = () => {
            setIsMobile(window.innerWidth < 768);
            setDims({ w: window.innerWidth, h: window.innerHeight });
        };
        update();
        let timeout: NodeJS.Timeout;
        const debouncedUpdate = () => {
            clearTimeout(timeout);
            timeout = setTimeout(update, 200);
        };
        window.addEventListener('resize', debouncedUpdate);
        return () => window.removeEventListener('resize', debouncedUpdate);
    }, []);

    // 3. PHYSICS LAYOUT
    useEffect(() => {
        if (dims.w === 0 || dims.h === 0) return;

        // Init grid
        const cols = Math.ceil(Math.sqrt(skills.length * (dims.w / dims.h)));
        const rows = Math.ceil(skills.length / cols);
        const cellW = dims.w / cols;
        const cellH = dims.h / rows;

        // Randomize slots
        const slots = Array.from({ length: cols * rows }, (_, i) => i);
        // Fisher-Yates shuffle with TYPE SAFETY FIX
        for (let i = slots.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = slots[i];
            const target = slots[j];
            if (temp !== undefined && target !== undefined) {
                slots[i] = target;
                slots[j] = temp;
            }
        }

        const nodes: Point[] = skills.map((s, i) => {
            let baseR = s.style.baseR;
            if (isMobile) baseR *= 0.65;
            const minRforText = Math.max(28, s.textLen * (isMobile ? 3.2 : 4.0));
            const r = Math.max(baseR, minRforText);

            const slot = slots[i % slots.length]!; // Non-null assertion safe due to loop bounds
            const col = slot % cols;
            const row = Math.floor(slot / cols);

            return {
                x: (col * cellW) + (cellW / 2) + (Math.random() - 0.5) * 20,
                y: (row * cellH) + (cellH / 2) + (Math.random() - 0.5) * 20,
                r: r + (isMobile ? 4 : 8),
                vx: 0,
                vy: 0,
                id: i
            };
        });

        const iterations = 180;
        const drag = 0.08;
        const strength = 0.20;

        // Header Dimensions for "Notch" - MUCH smaller on mobile to allow top corners
        const headerW = isMobile ? 120 : 320; // Reduced from 320 effectively for mobile
        const headerH = isMobile ? 80 : 140;  // Reduced from 140 for mobile

        for (let iter = 0; iter < iterations; iter++) {
            // Collisions
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const n1 = nodes[i];
                    const n2 = nodes[j];
                    if (!n1 || !n2) continue;

                    const dx = n2.x - n1.x;
                    const dy = n2.y - n1.y;
                    const distSq = dx * dx + dy * dy;
                    const minDist = n1.r + n2.r;

                    if (distSq < minDist * minDist) {
                        const dist = Math.sqrt(distSq) || 1;
                        const overlap = minDist - dist;
                        const force = overlap * strength;
                        const nx = dx / dist;
                        const ny = dy / dist;

                        n1.vx -= nx * force;
                        n1.vy -= ny * force;
                        n2.vx += nx * force;
                        n2.vy += ny * force;
                    }
                }
            }

            // Boundary + "Notch"
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                if (!n) continue;
                n.x += n.vx;
                n.y += n.vy;
                n.vx *= (1 - drag);
                n.vy *= (1 - drag);

                const r = n.r;
                // Side bounds
                const sideMargin = isMobile ? 10 : 15;
                if (n.x < r + sideMargin) { n.x = r + sideMargin; n.vx *= -1; }
                if (n.x > dims.w - r - sideMargin) { n.x = dims.w - r - sideMargin; n.vx *= -1; }

                // Top Boundary with Notch
                // Check if in central column
                const centerX = dims.w / 2;
                const isCentral = Math.abs(n.x - centerX) < (headerW / 2 + r);

                // If central, push down. If corner, allow high.
                const topLimit = isCentral ? (headerH + r) : (r + sideMargin);

                if (n.y < topLimit) { n.y = topLimit; n.vy *= -1; }

                // Bottom bound
                const botLimit = dims.h - r - (isMobile ? 20 : 30);
                if (n.y > botLimit) { n.y = botLimit; n.vy *= -1; }
            }
        }

        setLayoutPositions(nodes.map(n => ({ x: n.x, y: n.y, r: n.r })));
    }, [dims, skills, isMobile]);

    // 4. ANIMATION LOOP: STRICT SEQUENTIAL
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || layoutPositions.length === 0) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = dims.w;
        canvas.height = dims.h;

        let frameId: number;

        const render = () => {
            const scroll = smoothScroll.get();
            ctx.clearRect(0, 0, dims.w, dims.h);
            const N = skills.length;

            // Logic: strictly sequential
            // Total steps = N nodes + (N-1) lines = 2N - 1
            const totalSteps = (N * 2) - 1;
            const stepSize = 0.99 / totalSteps; // Use 99% of scroll range - unpin almost immediately after

            // Helper to get progress 0-1 for a specific step index
            const getStepProgress = (stepIndex: number) => {
                const start = stepIndex * stepSize;
                const end = start + stepSize;
                if (scroll < start) return 0;
                if (scroll >= end) return 1;
                return (scroll - start) / stepSize;
            };

            // Draw Lines First
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = '#d6d3d1';

            for (let i = 0; i < N - 1; i++) {
                // Line i -> i+1 is step index (2*i + 1)
                const lineStepIndex = (i * 2) + 1;
                const prog = getStepProgress(lineStepIndex);

                if (prog <= 0) continue;

                const p1 = layoutPositions[i];
                const p2 = layoutPositions[i + 1];
                if (!p1 || !p2) continue;

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                const mx = p1.x + (p2.x - p1.x) * prog;
                const my = p1.y + (p2.y - p1.y) * prog;
                ctx.lineTo(mx, my);
                ctx.stroke();
            }

            // Draw Nodes
            for (let i = 0; i < N; i++) {
                // Node i is step index (2*i)
                const nodeStepIndex = i * 2;
                const prog = getStepProgress(nodeStepIndex);

                const el = document.getElementById(`sk-${i}`);
                if (!el) continue;
                const p = layoutPositions[i];
                if (!p) continue;

                // Pop effect
                let scale = prog;
                if (prog > 0.8 && prog < 1.0) scale = 1.1;
                else if (prog >= 1.0) scale = 1.0;

                el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${scale})`;
                el.style.opacity = prog > 0.01 ? '1' : '0';
            }

            frameId = requestAnimationFrame(render);
        };

        const cleanup = () => cancelAnimationFrame(frameId);
        render();
        return cleanup;
    }, [dims, skills, layoutPositions, smoothScroll]);

    return (
        <section
            ref={containerRef}
            className="relative bg-stone-50"
            style={{ height: `${Math.max(300, skills.length * 40)}vh` }} // Reverted to 40 as per user request (long scroll), animation timing handles the "no wait"
            id="skills"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Header: Centered */}
                <div className="absolute top-6 left-0 right-0 z-30 text-center pointer-events-none select-none w-full flex justify-center">
                    <div className="max-w-md w-full">
                        <span className="text-stone-400 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase block mb-2">04 — Intelligence</span>
                        <h2 className="text-3xl md:text-5xl font-black text-stone-800 tracking-tight">
                            Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-emerald-500">Cloud</span>
                        </h2>
                    </div>
                </div>

                <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

                <div className="absolute inset-0 z-10 pointer-events-none">
                    {layoutPositions.length > 0 && skills.map((skill, i) => {
                        const pos = layoutPositions[i];
                        if (!pos) return null;
                        const r = pos.r - (isMobile ? 4 : 8);
                        const fontSize = Math.max(10, r / 3.2);

                        return (
                            <div
                                key={i}
                                id={`sk-${i}`}
                                className={`absolute rounded-full flex items-center justify-center text-center will-change-transform shadow-xl ${skill.style.className}`}
                                style={{
                                    width: r * 2,
                                    height: r * 2,
                                    fontSize: `${fontSize}px`,
                                    fontWeight: 600,
                                    opacity: 0,
                                    left: 0,
                                    top: 0,
                                    padding: '4px'
                                }}
                            >
                                <span className="truncate w-full block leading-tight select-none px-1">
                                    {skill.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
