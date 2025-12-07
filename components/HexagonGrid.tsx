"use client";

import { useEffect, useRef, useState } from "react";

// Helper to get random neighbors
const getNeighbors = (r: number, c: number) => {
    // Offset coords: odd-r vertical layout (shoved columns)
    const directions = [
        [[+1, 0], [+1, -1], [0, -1], [-1, -1], [-1, 0], [0, +1]], // Even rows
        [[+1, +1], [+1, 0], [0, -1], [-1, 0], [-1, +1], [0, +1]], // Odd rows
    ];
    const parity = r & 1;
    const dir = directions[parity];
    return dir.map(([dr, dc]) => [r + dr, c + dc]);
};

export default function HexagonGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [hexagons, setHexagons] = useState<{ x: number; y: number; r: number; c: number }[]>([]);
    const [activeHexes, setActiveHexes] = useState<Map<string, number>>(new Map());

    // Hexagon size configuration
    const hexSize = 50; // Balanced size
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;
    const xSpacing = hexWidth;
    const ySpacing = hexHeight * 0.75;

    // Mutation refs
    const activeHexesRef = useRef<Map<string, number>>(new Map());
    const animationFrameRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const lastMousePosRef = useRef<{ r: number, c: number } | null>(null);
    const agentRef = useRef({ r: 10, c: 10, targetR: 10, targetC: 10 });

    // Initial Grid Layout
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = () => {
            if (typeof window === 'undefined' || !containerRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            if (clientWidth === 0 || clientHeight === 0) return;

            const cols = Math.ceil(clientWidth / xSpacing) + 2;
            const rows = Math.ceil(clientHeight / ySpacing) + 2;

            const newHexagons = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const xOffset = (r % 2) * (hexWidth / 2);
                    const x = c * xSpacing + xOffset - hexWidth;
                    const y = r * ySpacing - hexHeight;
                    newHexagons.push({ x, y, r, c });
                }
            }
            setHexagons(newHexagons);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Animation Loop
    useEffect(() => {
        const animate = (time: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = time;

            let changed = false;
            const map = activeHexesRef.current;

            // 1. DECAY Logic
            map.forEach((life, key) => {
                const newLife = life - 0.1; // Fast decay
                if (newLife <= 0) {
                    map.delete(key);
                    changed = true;
                } else {
                    map.set(key, newLife);
                    changed = true;
                }
            });

            // 2. AUTONOMOUS AGENT (Devin AI Ghost)
            const agent = agentRef.current;
            const dr = agent.targetR - agent.r;
            const dc = agent.targetC - agent.c;

            // If close to target, pick new random target
            if (Math.abs(dr) < 0.5 && Math.abs(dc) < 0.5) {
                // Pick random spot within bounds
                agent.targetR = Math.floor(Math.random() * 25);
                agent.targetC = Math.floor(Math.random() * 40);
            } else {
                // Smooth move towards target
                agent.r += dr * 0.05;
                agent.c += dc * 0.05;

                // Activate current agent position
                const r = Math.round(agent.r);
                const c = Math.round(agent.c);
                const key = `${r},${c}`;

                // Only activate if not already super active 
                if ((map.get(key) || 0) < 0.8) {
                    map.set(key, 1.0);
                    changed = true;

                    // Agent trail spread
                    if (Math.random() > 0.5) {
                        const neighbors = getNeighbors(r, c);
                        const n = neighbors[Math.floor(Math.random() * neighbors.length)];
                        const nKey = `${n[0]},${n[1]}`;
                        map.set(nKey, Math.random() * 0.6 + 0.4);
                    }
                }
            }

            if (changed) {
                setActiveHexes(new Map(map));
            }

            lastTimeRef.current = time;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, []);

    // Interaction Handler
    useEffect(() => {
        const processInteraction = (clientX: number, clientY: number) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const mouseX = clientX - rect.left;
            const mouseY = clientY - rect.top;

            const r = Math.round(mouseY / ySpacing);
            const c = Math.round((mouseX - (r % 2) * (hexWidth / 2)) / xSpacing);

            const activate = (targetR: number, targetC: number) => {
                const key = `${targetR},${targetC}`;
                activeHexesRef.current.set(key, 1.0);

                // Enhanced DENSITY / MULTIPLE PATTERN logic
                // 1. Always infect immediate neighbors with high probability
                const neighbors = getNeighbors(targetR, targetC);
                neighbors.forEach(([nR, nC]) => {
                    if (Math.random() > 0.3) {
                        const nKey = `${nR},${nC}`;
                        activeHexesRef.current.set(nKey, Math.random() * 0.5 + 0.5);

                        // 2. Chance to spawn a "secondary" spread further out (neighbors of neighbors)
                        if (Math.random() > 0.6) {
                            const subNeighbors = getNeighbors(nR, nC);
                            const subN = subNeighbors[Math.floor(Math.random() * subNeighbors.length)];
                            const subKey = `${subN[0]},${subN[1]}`;
                            activeHexesRef.current.set(subKey, Math.random() * 0.5 + 0.4);
                        }
                    }
                });

                // 3. "Multiple Pattern" / Remote Trigger Logic
                if (Math.random() > 0.85) {
                    const randomR = Math.floor(Math.random() * 25);
                    const randomC = Math.floor(Math.random() * 40);

                    const distR = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 5) + 3);
                    const distC = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 5) + 3);

                    const remoteR = targetR + distR;
                    const remoteC = targetC + distC;

                    const remoteKey = `${remoteR},${remoteC}`;
                    activeHexesRef.current.set(remoteKey, Math.random() * 0.5 + 0.5);

                    const remoteNeighbors = getNeighbors(remoteR, remoteC);
                    remoteNeighbors.forEach(([nr, nc]) => {
                        if (Math.random() > 0.5) {
                            activeHexesRef.current.set(`${nr},${nc}`, Math.random() * 0.4 + 0.3);
                        }
                    });
                }
            };

            activate(r, c);
            lastMousePosRef.current = { r, c };
        };

        const handleMouseMove = (e: MouseEvent) => {
            processInteraction(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                processInteraction(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const handleMouseLeave = () => {
            lastMousePosRef.current = null;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchstart", handleTouchMove, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchstart", handleTouchMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const hexPath = (x: number, y: number) => {
        return `M${x + hexWidth / 2} ${y} L${x + hexWidth} ${y + hexHeight / 4} L${x + hexWidth} ${y + hexHeight * 0.75} L${x + hexWidth / 2} ${y + hexHeight} L${x} ${y + hexHeight * 0.75} L${x} ${y + hexHeight / 4} Z`;
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        >
            <svg width="100%" height="100%">
                <defs>
                    <linearGradient id="gradient-tech" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-primary)" />
                        <stop offset="100%" stopColor="var(--color-secondary)" />
                    </linearGradient>
                </defs>

                {hexagons.map((hex) => {
                    const life = activeHexes.get(`${hex.r},${hex.c}`);
                    if (!life) return null;

                    return (
                        <path
                            key={`${hex.r}-${hex.c}`}
                            d={hexPath(hex.x, hex.y)}
                            fill="none"
                            stroke="url(#gradient-tech)"
                            strokeWidth="3"
                            strokeOpacity={life}
                            className="transition-none"
                        />
                    );
                })}
            </svg>
        </div>
    );
}
