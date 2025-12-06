"use client";

import { useEffect, useRef, useState } from "react";

export default function HexagonPattern() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setCursor({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseenter", () => setIsHovering(true));
            container.addEventListener("mouseleave", () => setIsHovering(false));
        }

        return () => {
            if (container) {
                container.removeEventListener("mousemove", handleMouseMove);
                container.removeEventListener("mouseenter", () => setIsHovering(true));
                container.removeEventListener("mouseleave", () => setIsHovering(false));
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
        >
            {/* 
         Strategy:
         1. We want lines that look like the brand gradient.
         2. We want those lines to be visible only near the cursor.
      */}

            {/* The Glow Container - This is masked by the radial gradient around cursor */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    opacity: isHovering ? 1 : 0,
                    // Mask 1: The flashlight beam (Radial Gradient)
                    maskImage: `radial-gradient(350px circle at ${cursor.x}px ${cursor.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(350px circle at ${cursor.x}px ${cursor.y}px, black, transparent)`,
                }}
            >
                {/* The Pattern - This is masked by the SVG shape, and has the Gradient Color Background */}
                <div
                    className="absolute inset-0"
                    style={{
                        // The Color of the lines - Dynamic based on cursor position for 'active' feel
                        background: `linear-gradient(${cursor.x / 5}deg, #4285F4, #9B72CB, #EA4335, #4285F4)`,
                        backgroundSize: "200% 200%",

                        // Mask 2: The Hexagon Shapes (SVG Pattern)
                        // Use a simpler known honeycomb svg
                        maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='none' stroke='%23000' stroke-width='2' opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v13.2l11 6.5 11-6.5V17.9l-11-6.5-11 6.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='none' stroke='%23000' stroke-width='2' opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v13.2l11 6.5 11-6.5V17.9l-11-6.5-11 6.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Background Dim Pattern (always visible slightly?) */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    background: "#000",
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='none' stroke='%23000' stroke-width='2' opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v13.2l11 6.5 11-6.5V17.9l-11-6.5-11 6.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='none' stroke='%23000' stroke-width='2' opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v13.2l11 6.5 11-6.5V17.9l-11-6.5-11 6.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
