"use client";

import { useEffect, useState, useRef, useImperativeHandle, forwardRef, memo } from "react";
import { motion } from "framer-motion";

// Interface for Hexagon Grid Items
interface HexData {
    x: number;
    y: number;
    r: number;
    c: number;
}

// Interface for Hexagon Ref
interface HexHandle {
    flash: () => void;
}

// Child Component for Individual Hexagon
const Hexagon = memo(forwardRef<HexHandle, { x: number; y: number }>(({ x, y }, ref) => {
    const [isFlashing, setIsFlashing] = useState(false);

    useImperativeHandle(ref, () => ({
        flash: () => {
            setIsFlashing(true);
            setTimeout(() => setIsFlashing(false), 300); // Reset after flash duration
        }
    }));

    return (
        <motion.path
            d="M25 0 L50 14.43 L50 43.3 L25 57.74 L0 43.3 L0 14.43 Z"
            transform={`translate(${x}, ${y}) scale(${typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 1})`}
            fill={isFlashing ? "white" : "transparent"}
            stroke={isFlashing ? "cyan" : "rgba(0, 243, 255, 0.1)"}
            strokeWidth={isFlashing ? 3 : 1}
            initial={false}
            animate={{
                fill: isFlashing ? "white" : "transparent",
                stroke: isFlashing ? "#00ffff" : "rgba(0, 243, 255, 0.1)",
                strokeWidth: isFlashing ? 3 : 1,
                filter: isFlashing ? "drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))" : "none",
                opacity: isFlashing ? 1 : 0.2
            }}
            transition={{
                duration: isFlashing ? 0.05 : 0.5, // Fast attack, slower decay
                ease: "easeOut"
            }}
        />
    );
}));

Hexagon.displayName = "Hexagon";

const HoneycombHero = () => {
    const [hexagons, setHexagons] = useState<HexData[]>([]);
    const hexRefs = useRef<(HexHandle | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize Grid
    useEffect(() => {
        const generateGrid = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const hexSize = width < 768 ? 30 : 50;
            const hexWidth = Math.sqrt(3) * hexSize;
            const hexHeight = 2 * hexSize;
            const xStep = hexWidth;
            const yStep = hexHeight * 0.75;

            const cols = Math.ceil(width / xStep) + 2;
            const rows = Math.ceil(height / yStep) + 2;

            const newHexagons: HexData[] = [];

            for (let r = -1; r < rows; r++) {
                for (let c = -1; c < cols; c++) {
                    const xOffset = (r % 2) * (hexWidth / 2);
                    const x = c * xStep + xOffset;
                    const y = r * yStep;
                    newHexagons.push({ x, y, r, c });
                }
            }
            setHexagons(newHexagons);
            hexRefs.current = new Array(newHexagons.length).fill(null);
        };

        generateGrid();
        window.addEventListener("resize", generateGrid);
        return () => window.removeEventListener("resize", generateGrid);
    }, []);

    // Lightning Loop
    useEffect(() => {
        if (hexagons.length === 0) return;

        const triggerLightning = () => {
            // 1. Pick a random start point
            const startIndex = Math.floor(Math.random() * hexagons.length);

            // 2. Decide length of "bolt" (e.g. 3-8 hexes)
            const boltLength = Math.floor(Math.random() * 5) + 3;

            let currentIndex = startIndex;

            // Trigger flash sequence
            for (let i = 0; i < boltLength; i++) {
                setTimeout(() => {
                    const ref = hexRefs.current[currentIndex];
                    if (ref) ref.flash();

                    // Move to a neighbor? 
                    // Simple random walk logic based on grid structure is complex without neighbor map.
                    // Fallback: Just picking nearby index in array is okayish for visual noise, 
                    // but let's try to be smarter or just use random random logic for now.
                    // True neighbor logic: 
                    // odd rows: +1, -1, +cols, -cols, +cols+1, -cols+1 ... too complex for this snippet.
                    // Let's just pick another random nearby index to simulate a "cluster" or "jump".

                    const jump = Math.floor(Math.random() * 10) - 5; // -5 to +5 index jump
                    let nextIndex = currentIndex + jump;
                    if (nextIndex < 0) nextIndex = 0;
                    if (nextIndex >= hexagons.length) nextIndex = hexagons.length - 1;
                    currentIndex = nextIndex;

                }, i * 50); // 50ms delay between steps in the bolt
            }

            // Schedule next lightning strike
            const nextStrikeDelay = Math.random() * 2000 + 500; // 0.5s to 2.5s
            timeoutId = setTimeout(triggerLightning, nextStrikeDelay);
        };

        let timeoutId = setTimeout(triggerLightning, 1000);

        return () => clearTimeout(timeoutId);
    }, [hexagons]);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#020210]">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020210] via-[#0b0515] to-[#12051c] opacity-90" />

            <svg className="absolute inset-0 w-full h-full">
                {hexagons.map((hex, i) => (
                    <Hexagon
                        key={`${hex.r}-${hex.c}`}
                        x={hex.x}
                        y={hex.y}
                        ref={(el) => { if (el) hexRefs.current[i] = el; }}
                    />
                ))}
            </svg>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                >
                    <h1 className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 tracking-tighter filter drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] mb-6">
                        Portfolio Living
                    </h1>
                    <p className="text-cyan-100 text-lg md:text-2xl tracking-[0.2em] font-light uppercase opacity-80 filter drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">
                        High Voltage Interface
                    </p>
                </motion.div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#020210_80%)] z-10" />
        </div>
    );
};

export default HoneycombHero;
