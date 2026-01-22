import { Play, Lock, Clock, ArrowRight, Video } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllVideos, type WordPressVideo } from "@/lib/wordpress";

interface VideoItem {
    title: string;
    duration: string;
    thumbnail: string;
    url?: string;
}

interface Playlist {
    title: string;
    category: string;
    description: string;
    videos: VideoItem[];
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
                thumbnail: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "First $100k: The Hardest Milestone",
                duration: "08:45",
                thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    {
        title: "The Optimized Individual",
        category: "Personal Development",
        description: "Systems to upgrade your mental and physical operating capacity.",
        videos: [
            {
                title: "Energy Management vs Time Management",
                duration: "14:30",
                thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
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
                thumbnail: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=800"
            }
        ]
    }
];

export default async function VideosPage() {
    // 1. Fetch live videos from WordPress
    const wpVideos = await getAllVideos();

    // 2. Group WP videos into playlists
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
                category: "Insights",
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

    // Temporary: Hide content
    const isHidden = true;

    if (isHidden) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main className="pt-48 pb-24 text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Video className="w-10 h-10 text-primary opacity-20" />
                        </div>
                        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Masterclass Library</h1>
                        <p className="text-gray-400 text-lg font-light max-w-xl mx-auto mb-12">
                            We are currently re-curating our video library to provide the highest quality visual blueprints.
                            The library will be back online shortly.
                        </p>
                        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                            Return Home <ArrowRight size={16} />
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Header />

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
                    <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-8 block">The Masterclass Library</span>
                    <h1 className="text-[54px] md:text-[60px] font-display font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight">
                        Insights <br />
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold">Visualized.</span>
                    </h1>

                    <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-gray-100">
                        <p className="text-[20px] md:text-[22px] text-gray-400 font-light leading-relaxed tracking-tight">
                            Visual blueprints designed to upgrade your wealth, career, and mindset. Watch masterclasses that give you an <span className="text-gray-900 font-medium">unfair advantage.</span>
                        </p>
                    </div>
                </section>

                {/* Featured Video - Manifesto */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group cursor-pointer bg-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-all duration-500">
                                <Play fill="white" className="w-10 h-10 text-white translate-x-1" />
                            </div>
                        </div>

                        <div className="absolute top-12 left-12 z-30">
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-2xl">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                </span>
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Coming Soon</span>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 p-12 md:p-16 z-20 max-w-3xl text-white">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/30">Start Here</span>
                                <div className="h-[2px] w-12 bg-primary"></div>
                            </div>
                            <h2 className="text-[32px] md:text-[48px] font-sans font-bold mb-4">The Portfolio Living Manifesto</h2>
                            <p className="text-white/80 text-lg font-light leading-relaxed">Why your life is your most valuable asset class—and how to manage it for maximum return.</p>
                        </div>
                    </div>
                </section>

                {/* Playlists */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
                    {displayPlaylists.map((playlist, idx) => (
                        <div key={idx}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 border-b border-gray-100 pb-12">
                                <div className="max-w-xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        <span className="text-primary font-black text-xs tracking-[0.2em] uppercase">{playlist.category}</span>
                                    </div>
                                    <h3 className="text-3xl font-sans font-bold text-gray-900 mb-4">{playlist.title}</h3>
                                    <p className="text-gray-500 text-lg font-light leading-relaxed">{playlist.description}</p>
                                </div>
                                <div className="flex items-center gap-2 text-primary font-bold text-sm hover:underline cursor-pointer group">
                                    View full series <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                {playlist.videos.map((video, vIdx) => (
                                    <div key={vIdx} className="group cursor-pointer">
                                        <div className="relative aspect-video bg-gray-100 rounded-[2rem] overflow-hidden mb-6 shadow-sm border border-gray-100 group-hover:shadow-2xl transition-all duration-500">
                                            {/* Coming Soon Tag */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                                                    <span className="relative flex h-1.5 w-1.5">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                                    </span>
                                                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white">Coming Soon</span>
                                                </div>
                                            </div>

                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all z-10" />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full z-20 shadow-sm">
                                                {video.duration}
                                            </div>
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl">
                                                    <Play fill="white" className="w-6 h-6 text-white translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="text-[22px] font-sans font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">{video.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Final CTA */}
                <section className="mt-40 bg-gray-50 rounded-[4rem] mx-4 md:mx-12 overflow-hidden border border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 py-32 text-center relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32 blur-3xl" />

                        <div className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-10 border border-gray-100">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 mb-6 px-4">Ready to apply these systems?</h2>
                        <p className="text-xl text-gray-500 mb-12 max-w-xl mx-auto font-light leading-relaxed">
                            Information is potential power. Execution is real power. Let&apos;s build your custom roadmap together.
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:shadow-2xl active:scale-[0.98]">
                            Book Strategy Session <ArrowRight size={20} />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
