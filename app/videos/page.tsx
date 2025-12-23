"use client";

import { Play, Lock, Clock, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PLAYLISTS = [
    {
        title: "The Wealth Architect Series",
        category: "Investment",
        description: "Build an asset allocation that grows wealth automatically.",
        videos: [
            {
                title: "The 'Sleep Well' Portfolio Strategy",
                duration: "12:34",
                thumbnail: "/video-wealth-1.jpg"
            },
            {
                title: "First $100k: The Hardest Milestone",
                duration: "08:45",
                thumbnail: "/video-wealth-2.jpg"
            }
        ]
    },
    {
        title: "Mastering Influence & Connection",
        category: "Communication",
        description: "Psychological techniques to command respect and negotiate.",
        videos: [
            {
                title: "Negotiate Like a Hostage Negotiator",
                duration: "15:20",
                thumbnail: "/video-comm-1.jpg"
            },
            {
                title: "The Art of the Pause",
                duration: "06:10",
                thumbnail: "/video-comm-2.jpg"
            }
        ]
    },
    {
        title: "Strategic Career Acceleration",
        category: "Career",
        description: "Build unique skills that make you irreplaceable.",
        videos: [
            {
                title: "The 'Career Moat' Concept",
                duration: "18:00",
                thumbnail: "/video-career-1.jpg"
            },
            {
                title: "Managing Up: The Secret to Promotion",
                duration: "10:15",
                thumbnail: "/video-career-2.jpg"
            }
        ]
    },
    {
        title: "The High-Performance Blueprint",
        category: "Personal Development",
        description: "Systems to 10x your productivity and energy.",
        videos: [
            {
                title: "Energy Management > Time Management",
                duration: "14:30",
                thumbnail: "/video-personal-1.jpg"
            },
            {
                title: "Designing Your Morning Routine",
                duration: "09:50",
                thumbnail: "/video-personal-2.jpg"
            }
        ]
    },
    {
        title: "Future-Proofing Your Skillset",
        category: "Technology",
        description: "Stay relevant with essential tech insights.",
        videos: [
            {
                title: "AI for the Non-Technical",
                duration: "22:15",
                thumbnail: "/video-tech-1.jpg"
            },
            {
                title: "Crypto & Blockchain: Signal vs. Noise",
                duration: "16:40",
                thumbnail: "/video-tech-2.jpg"
            }
        ]
    }
];

export default function VideosPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-accent-tan selection:text-gray-900">
            <Header /> {/* Note: Header might need dark mode adaptation or explicit styling overrides if it's not transparent/adaptive */}

            <main className="pt-24 pb-20">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-primary/20 blur-[120px] rounded-full -z-10" />
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent pb-2">
                        The Knowledge Vault.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Visual blueprints to upgrade your wealth, career, and mindset. <br className="hidden md:block" />
                        Watch masterclasses designed to give you an <span className="text-white font-medium">unfair advantage</span>.
                    </p>
                </section>

                {/* Featured Video - Manifesto */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-800 group cursor-pointer bg-gray-950">
                        {/* Placeholder for Featured Video Thumbnail */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-500">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <Play fill="white" className="w-8 h-8 text-white translate-x-1" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-3xl">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-accent-tan font-bold tracking-wider text-xs uppercase">Start Here</span>
                                <div className="h-px w-12 bg-gray-700"></div>
                            </div>
                            <h2 className="text-4xl font-display font-bold text-white mb-4">The Portfolio Living Manifesto</h2>
                            <p className="text-gray-300 text-lg">Why your life is your most valuable asset class—and how to manage it for maximum return.</p>
                        </div>
                    </div>
                </section>

                {/* Playlists */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                    {PLAYLISTS.map((playlist, idx) => (
                        <div key={idx}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-800 pb-4">
                                <div>
                                    <span className="text-accent-tan font-mono text-sm tracking-widest uppercase mb-2 block">{playlist.category}</span>
                                    <h3 className="text-3xl font-serif text-white">{playlist.title}</h3>
                                </div>
                                <p className="text-gray-500 text-sm max-w-xs text-right md:text-left">{playlist.description}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {playlist.videos.map((video, vIdx) => (
                                    <div key={vIdx} className="group cursor-pointer">
                                        <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-4 border border-gray-800 hover:border-gray-600 transition-colors">
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                                            <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono px-2 py-1 rounded z-20 flex items-center gap-1">
                                                <Clock size={10} /> {video.duration}
                                            </div>
                                            {/* Abstract thumbnail placeholder generator */}
                                            <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${idx % 2 === 0 ? 'from-blue-900 to-slate-900' : 'from-purple-900 to-slate-900'
                                                }`}></div>

                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                                <Play fill="white" className="w-12 h-12 text-white drop-shadow-lg" />
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-medium text-gray-200 group-hover:text-white transition-colors">{video.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* CTA / Membership Tease */}
                <section className="mt-32 border-t border-gray-800 bg-gray-950">
                    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
                        <Lock className="w-12 h-12 text-gray-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to Apply These Systems?</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                            Information is potential power. Execution is real power. Let&apos;s build your custom roadmap together.
                        </p>
                        <Link href="#contact" className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                            Book Your Strategy Session <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>
            </main>

            {/* Dark Mode Footer Adaptation Wrapper (if footer isn't dark aware, we might need a wrapper or just let it be light) */}
            <div className="bg-white">
                <Footer />
            </div>
        </div>
    );
}
