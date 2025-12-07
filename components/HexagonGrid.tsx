"use client";

import { useEffect, useRef, useState } from "react";

export default function HexagonGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hexagons, setHexagons] = useState<{ x: number; y: number }[]>([]);

    // Hexagon size configuration
    const hexSize = 25; // Slightly smaller for denser grid
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;

    // Spacing
    const xSpacing = hexWidth;
    const ySpacing = hexHeight * 0.75;

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = () => {
            // Only run on client
            if (typeof window === 'undefined' || !containerRef.current) return;

            const { clientWidth, clientHeight } = containerRef.current;
            if (clientWidth === 0 || clientHeight === 0) return;

            setDimensions({ width: clientWidth, height: clientHeight });

            // Calculate grid to cover the area + buffer
            const cols = Math.ceil(clientWidth / xSpacing) + 2;
            const rows = Math.ceil(clientHeight / ySpacing) + 2;

            const newHexagons = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const xOffset = (r % 2) * (hexWidth / 2);
                    const x = c * xSpacing + xOffset - hexWidth;
                    const y = r * ySpacing - hexHeight;
                    newHexagons.push({ x, y });
                }
            }
            setHexagons(newHexagons);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Mouse tracking - Attached to window to capture global movement even with pointer-events: none
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            containerRef.current.style.setProperty("--mouse-x", `${x}px`);
            containerRef.current.style.setProperty("--mouse-y", `${y}px`);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const hexPath = (x: number, y: number) => {
        // Points for hexagon at x,y
        return `M${x + hexWidth / 2} ${y} L${x + hexWidth} ${y + hexHeight / 4} L${x + hexWidth} ${y + hexHeight * 0.75} L${x + hexWidth / 2} ${y + hexHeight} L${x} ${y + hexHeight * 0.75} L${x} ${y + hexHeight / 4} Z`;
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        // Removed static mask so the grid is purely driven by the 'cursor flashlight'
        >
            {/* 
              Active Masked Grid - Only visible where the mouse is.
              The radial gradient at the mouse position reveals the grid. 
              Everything else is transparent (black hidden in mask, transparency in gradient).
            */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    background: "transparent",
                    maskImage: "radial-gradient(400px circle at var(--mouse-x, -9999px) var(--mouse-y, -9999px), black, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(400px circle at var(--mouse-x, -9999px) var(--mouse-y, -9999px), black, transparent 70%)",
                }}
            >
                <svg width="100%" height="100%">
                    <defs>
                        <linearGradient id="gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--color-primary)" />
                            <stop offset="50%" stopColor="var(--color-secondary)" />
                            <stop offset="100%" stopColor="var(--color-accent)" />
                        </linearGradient>
                    </defs>
                    {hexagons.map((hex, i) => (
                        <path
                            key={`active-${i}`}
                            d={hexPath(hex.x, hex.y)}
                            fill="none"
                            stroke="url(#gradient-active)"
                            strokeWidth="1.5"
                            className="transition-colors duration-500"
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
}
