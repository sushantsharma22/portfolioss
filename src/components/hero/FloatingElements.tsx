'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

// Tech icons as SVG paths for crisp rendering
const techIcons = [
    { name: 'React', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z', color: '#61DAFB' },
    { name: 'Python', path: 'M12 2c-1.1 0-2 .9-2 2v2H7c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-2h3c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-3V4c0-1.1-.9-2-2-2h-1z', color: '#3776AB' },
    { name: 'TensorFlow', path: 'M12 2L4 6v6l8 4 8-4V6l-8-4zm0 2.18l5.91 2.95L12 10.08 6.09 7.13 12 4.18zM6 8.68l5 2.5v5.64l-5-2.5V8.68zm12 0v5.64l-5 2.5v-5.64l5-2.5z', color: '#FF6F00' },
    { name: 'Node', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', color: '#339933' },
    { name: 'AWS', path: 'M12 2l-8 4v8l8 4 8-4V6l-8-4z', color: '#FF9900' },
    { name: 'Docker', path: 'M4 8h3v3H4V8zm4 0h3v3H8V8zm4 0h3v3h-3V8zm-8 4h3v3H4v-3zm4 0h3v3H8v-3zm4 0h3v3h-3v-3z', color: '#2496ED' },
];

// Geometric shapes for background
const shapes = [
    { type: 'circle', size: 8, x: '10%', y: '20%', delay: 0 },
    { type: 'circle', size: 6, x: '85%', y: '15%', delay: 0.5 },
    { type: 'square', size: 10, x: '15%', y: '75%', delay: 1 },
    { type: 'square', size: 6, x: '90%', y: '65%', delay: 1.5 },
    { type: 'circle', size: 4, x: '75%', y: '85%', delay: 2 },
    { type: 'triangle', size: 12, x: '5%', y: '45%', delay: 0.3 },
    { type: 'triangle', size: 8, x: '95%', y: '40%', delay: 0.8 },
];

function FloatingElements() {
    // Circuit pattern as background
    const circuitPattern = useMemo(() => (
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    {/* Horizontal lines */}
                    <line x1="0" y1="25" x2="40" y2="25" stroke="#d4ff00" strokeWidth="0.5" />
                    <line x1="60" y1="25" x2="100" y2="25" stroke="#d4ff00" strokeWidth="0.5" />
                    <line x1="0" y1="75" x2="30" y2="75" stroke="#00d9ff" strokeWidth="0.5" />
                    <line x1="70" y1="75" x2="100" y2="75" stroke="#00d9ff" strokeWidth="0.5" />

                    {/* Vertical lines */}
                    <line x1="50" y1="0" x2="50" y2="40" stroke="#d4ff00" strokeWidth="0.5" />
                    <line x1="50" y1="60" x2="50" y2="100" stroke="#d4ff00" strokeWidth="0.5" />

                    {/* Nodes */}
                    <circle cx="50" cy="50" r="3" fill="none" stroke="#d4ff00" strokeWidth="0.5" />
                    <circle cx="25" cy="25" r="2" fill="#00d9ff" />
                    <circle cx="75" cy="75" r="2" fill="#d4ff00" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
    ), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Circuit pattern background */}
            {circuitPattern}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />

            {/* Floating geometric shapes */}
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: shape.x,
                        top: shape.y,
                        width: shape.size * 4,
                        height: shape.size * 4,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                        y: [0, -20, 0],
                        rotate: shape.type === 'square' ? [0, 90, 0] : [0, 360, 0],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        delay: shape.delay,
                        ease: 'easeInOut',
                    }}
                >
                    {shape.type === 'circle' && (
                        <div className="w-full h-full rounded-full border border-[#d4ff00]/30" />
                    )}
                    {shape.type === 'square' && (
                        <div className="w-full h-full border border-[#00d9ff]/30 rotate-45" />
                    )}
                    {shape.type === 'triangle' && (
                        <div
                            className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-[#d4ff00]/20"
                        />
                    )}
                </motion.div>
            ))}

            {/* Floating tech icons */}
            {techIcons.map((icon, i) => {
                const positions = [
                    { x: '8%', y: '30%' },
                    { x: '92%', y: '25%' },
                    { x: '5%', y: '60%' },
                    { x: '95%', y: '55%' },
                    { x: '12%', y: '85%' },
                    { x: '88%', y: '80%' },
                ];
                const pos = positions[i % positions.length];

                return (
                    <motion.div
                        key={icon.name}
                        className="absolute hidden md:block"
                        style={{
                            left: pos!.x,
                            top: pos!.y,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: [0.2, 0.5, 0.2],
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: 'easeInOut',
                        }}
                    >
                        <div
                            className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                            title={icon.name}
                        >
                            <span className="text-lg" style={{ color: icon.color }}>
                                {icon.name.charAt(0)}
                            </span>
                        </div>
                    </motion.div>
                );
            })}

            {/* Animated lines */}
            <motion.div
                className="absolute left-0 top-1/4 w-32 h-px bg-gradient-to-r from-transparent via-[#d4ff00]/30 to-transparent"
                animate={{
                    x: ['-100%', '400%'],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
            <motion.div
                className="absolute right-0 top-2/3 w-24 h-px bg-gradient-to-r from-transparent via-[#00d9ff]/30 to-transparent"
                animate={{
                    x: ['100%', '-400%'],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    delay: 2,
                    ease: 'linear',
                }}
            />

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l border-t border-[#d4ff00]/20" />
            <div className="absolute top-8 right-8 w-24 h-24 border-r border-t border-[#d4ff00]/20" />
            <div className="absolute bottom-8 left-8 w-24 h-24 border-l border-b border-[#00d9ff]/20" />
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r border-b border-[#00d9ff]/20" />
        </div>
    );
}

export default memo(FloatingElements);
