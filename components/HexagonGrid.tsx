"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { TrendingUp, MessageCircle, User, Cpu } from "lucide-react";

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
    const [iconPositions, setIconPositions] = useState<Map<string, React.ElementType>>(new Map());

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

            // Distribute icons ensuring no adjacent duplicates (Graph Coloring)
            const newIcons = new Map<string, React.ElementType>();
            const allIcons = [TrendingUp, MessageCircle, User, Cpu];

            newHexagons.forEach(hex => {
                // Find used icons in neighbors (assignments happen sequentially)
                const neighbors = getNeighbors(hex.r, hex.c);
                const usedIcons = new Set<React.ElementType>();

                neighbors.forEach(([nr, nc]) => {
                    const neighborIcon = newIcons.get(`${nr},${nc}`);
                    if (neighborIcon) {
                        usedIcons.add(neighborIcon);
                    }
                });

                // Filter available icons
                const validIcons = allIcons.filter(icon => !usedIcons.has(icon));

                // Pick random from valid, or fallback to any if stuck (unlikely with 4 items)
                const pickedIcon = validIcons.length > 0
                    ? validIcons[Math.floor(Math.random() * validIcons.length)]
                    : allIcons[Math.floor(Math.random() * allIcons.length)];

                newIcons.set(`${hex.r},${hex.c}`, pickedIcon);
            });
            setIconPositions(newIcons);
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

            // 2. AUTONOMOUS AGENT REMOVED (Hover only)
            // The ghostly Devin agent has been exorcised to reduce visual noise.

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

                    const Icon = iconPositions.get(`${hex.r},${hex.c}`);

                    return (
                        <g key={`${hex.r}-${hex.c}`}>
                            <path
                                d={hexPath(hex.x, hex.y)}
                                fill="none"
                                stroke="url(#gradient-tech)"
                                strokeWidth="3"
                                strokeOpacity={life}
                                className="transition-none"
                            />
                            {Icon && (
                                <foreignObject
                                    x={hex.x}
                                    y={hex.y}
                                    width={hexWidth}
                                    height={hexHeight}
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <div className="flex items-center justify-center w-full h-full">
                                        <Icon
                                            size={24}
                                            className="text-primary"
                                            style={{ opacity: life }}
                                        />
                                    </div>
                                </foreignObject>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
