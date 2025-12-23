import { Play, Lock, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllVideos, type WordPressVideo } from "@/lib/wordpress";

interface Video {
    title: string;
    duration: string;
    thumbnail: string;
    url?: string;
}

interface Playlist {
    title: string;
    category: string;
    description: string;
    videos: Video[];
}

const FALLBACK_PLAYLISTS: Playlist[] = [
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
            }
        ]
    }
];

export default async function VideosPage() {
    // 1. Fetch live videos from WordPress
    const wpVideos = await getAllVideos();

    // 2. Group WP videos into playlists (by category/group name if provided)
    const playlists: Playlist[] = [];

    if (wpVideos.length > 0) {
        const groups: Record<string, WordPressVideo[]> = {};
        wpVideos.forEach(v => {
            const groupName = v.videoFields?.playlistName || "Uncategorized Series";
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(v);
        });

        Object.keys(groups).forEach(name => {
            const groupVideos = groups[name];
            playlists.push({
                title: name,
                category: "Insights", // Could be dynamic
                description: groupVideos[0].videoFields?.playlistDescription || "A curated series of deep dives.",
                videos: groupVideos.map(v => ({
                    title: v.title,
                    duration: v.videoFields?.duration || "0:00",
                    thumbnail: v.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1492619335414-99bc699badae?auto=format&fit=crop&q=80&w=800",
                    url: v.videoFields?.videoUrl || "#"
                }))
            });
        });
    }

    // 3. Use fallbacks if no WP videos exist
    const displayPlaylists = playlists.length > 0 ? playlists : FALLBACK_PLAYLISTS;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-accent-tan selection:text-gray-900">
            <Header />

            <main className="pt-24 pb-20">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-red-900/20 blur-[120px] rounded-full -z-10" />
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
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-500">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <Play fill="white" className="w-8 h-8 text-white translate-x-1" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-3xl">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-red-500 font-bold tracking-wider text-xs uppercase">Start Here</span>
                                <div className="h-px w-12 bg-gray-700"></div>
                            </div>
                            <h2 className="text-4xl font-display font-bold text-white mb-4">The Portfolio Living Manifesto</h2>
                            <p className="text-gray-300 text-lg">Why your life is your most valuable asset class—and how to manage it for maximum return.</p>
                        </div>
                    </div>
                </section>

                {/* Playlists */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                    {displayPlaylists.map((playlist, idx) => (
                        <div key={idx}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-800 pb-4">
                                <div>
                                    <span className="text-red-500 font-mono text-sm tracking-widest uppercase mb-2 block">{playlist.category}</span>
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
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                            />
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

                {/* CTA */}
                <section className="mt-32 border-t border-gray-800 bg-gray-950">
                    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
                        <Lock className="w-12 h-12 text-gray-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to Apply These Systems?</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                            Information is potential power. Execution is real power. Let&apos;s build your custom roadmap together.
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                            Book Your Strategy Session <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>
            </main>

            <div className="bg-white">
                <Footer />
            </div>
        </div>
    );
}
