"use client";

import { useEffect, useRef, useState } from "react";

export default function FinancePattern() {
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
         Use the same successful masking strategy but with a candlestick pattern.
         Background: Dynamic Linear Gradient based on cursor.
         Mask 1 (Outer): Radial Gradient (flashlight).
         Mask 2 (Inner): SVG Pattern of Candlesticks.
      */}

            {/* The Glow Container */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    opacity: isHovering ? 1 : 0,
                    maskImage: `radial-gradient(350px circle at ${cursor.x}px ${cursor.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(350px circle at ${cursor.x}px ${cursor.y}px, black, transparent)`,
                }}
            >
                {/* The Pattern */}
                <div
                    className="absolute inset-0"
                    style={{
                        // Dynamic Gradient Color
                        background: `linear-gradient(${cursor.x / 5}deg, #4285F4, #9B72CB, #EA4335, #4285F4)`,
                        backgroundSize: "200% 200%",

                        // Candlestick SVG Pattern
                        // Creating a simple repeatable tile with various candlestick shapes
                        maskImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3C!-- Candle 1: Up --%3E%3Crect x='10' y='30' width='8' height='40' fill='black'/%3E%3Cline x1='14' y1='10' x2='14' y2='90' stroke='black' stroke-width='2'/%3E%3C!-- Candle 2: Down (small) --%3E%3Crect x='35' y='40' width='8' height='20' fill='black'/%3E%3Cline x1='39' y1='30' x2='39' y2='70' stroke='black' stroke-width='2'/%3E%3C!-- Candle 3: Long Up --%3E%3Crect x='60' y='20' width='8' height='60' fill='black'/%3E%3Cline x1='64' y1='5' x2='64' y2='95' stroke='black' stroke-width='2'/%3E%3C!-- Candle 4: Doji --%3E%3Crect x='85' y='48' width='8' height='4' fill='black'/%3E%3Cline x1='89' y1='20' x2='89' y2='80' stroke='black' stroke-width='2'/%3E%3C/svg%3E")`,
                        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3C!-- Candle 1: Up --%3E%3Crect x='10' y='30' width='8' height='40' fill='black'/%3E%3Cline x1='14' y1='10' x2='14' y2='90' stroke='black' stroke-width='2'/%3E%3C!-- Candle 2: Down (small) --%3E%3Crect x='35' y='40' width='8' height='20' fill='black'/%3E%3Cline x1='39' y1='30' x2='39' y2='70' stroke='black' stroke-width='2'/%3E%3C!-- Candle 3: Long Up --%3E%3Crect x='60' y='20' width='8' height='60' fill='black'/%3E%3Cline x1='64' y1='5' x2='64' y2='95' stroke='black' stroke-width='2'/%3E%3C!-- Candle 4: Doji --%3E%3Crect x='85' y='48' width='8' height='4' fill='black'/%3E%3Cline x1='89' y1='20' x2='89' y2='80' stroke='black' stroke-width='2'/%3E%3C/svg%3E")`,
                        maskSize: "100px 100px",
                        WebkitMaskSize: "100px 100px",
                    }}
                />
            </div>

            {/* Background Dim Pattern */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    background: "#000",
                    maskImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10' y='30' width='8' height='40' fill='black'/%3E%3Cline x1='14' y1='10' x2='14' y2='90' stroke='black' stroke-width='2'/%3E%3Crect x='35' y='40' width='8' height='20' fill='black'/%3E%3Cline x1='39' y1='30' x2='39' y2='70' stroke='black' stroke-width='2'/%3E%3Crect x='60' y='20' width='8' height='60' fill='black'/%3E%3Cline x1='64' y1='5' x2='64' y2='95' stroke='black' stroke-width='2'/%3E%3Crect x='85' y='48' width='8' height='4' fill='black'/%3E%3Cline x1='89' y1='20' x2='89' y2='80' stroke='black' stroke-width='2'/%3E%3C/svg%3E")`,
                    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10' y='30' width='8' height='40' fill='black'/%3E%3Cline x1='14' y1='10' x2='14' y2='90' stroke='black' stroke-width='2'/%3E%3Crect x='35' y='40' width='8' height='20' fill='black'/%3E%3Cline x1='39' y1='30' x2='39' y2='70' stroke='black' stroke-width='2'/%3E%3Crect x='60' y='20' width='8' height='60' fill='black'/%3E%3Cline x1='64' y1='5' x2='64' y2='95' stroke='black' stroke-width='2'/%3E%3Crect x='85' y='48' width='8' height='4' fill='black'/%3E%3Cline x1='89' y1='20' x2='89' y2='80' stroke='black' stroke-width='2'/%3E%3C/svg%3E")`,
                    maskSize: "100px 100px",
                    WebkitMaskSize: "100px 100px",
                }}
            />
        </div>
    );
}
