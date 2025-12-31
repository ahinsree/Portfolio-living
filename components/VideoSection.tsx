import { PlayCircle } from "lucide-react";

export default function VideoSection({ title }: { title?: string }) {
    return (
        <section className="py-20 bg-gray-900 text-white" id="videos">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-sans text-white">
                        {title || "Watch & Learn"}
                    </h2>
                    <p className="mt-4 text-gray-400">
                        Deep dives into complex topics, simplified.
                    </p>
                </div>

                {/* Featured Video - Large */}
                <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-gray-800 shadow-2xl mb-12 group cursor-pointer border-8 border-gray-800/50">
                    {/* Coming Soon Tag */}
                    <div className="absolute top-8 left-8 z-30">
                        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full shadow-2xl">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Coming Soon</span>
                        </div>
                    </div>

                    {/* Placeholder for video frame choice */}
                    <img
                        src="https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=1600"
                        alt="Featured Video"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <PlayCircle size={64} className="text-white fill-white/20" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
                        <span className="text-red-500 text-sm font-bold tracking-wider uppercase">Featured</span>
                        <h3 className="text-2xl md:text-3xl font-bold mt-2">Effective Communication Strategies for Leaders</h3>
                    </div>
                </div>

                {/* Horizontal Scroll of other videos */}
                <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex-none w-80 snap-start bg-gray-800 rounded-xl overflow-hidden group cursor-pointer border border-gray-700">
                            <div className="relative aspect-video bg-gray-700">
                                {/* Coming Soon Tag Small */}
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                        </span>
                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white">Coming Soon</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <PlayCircle size={40} className="text-white fill-white/20" />
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-lg text-white group-hover:text-red-500 transition-colors">Wealth Building Habits #{i}</h4>
                                <p className="text-sm text-gray-400 mt-2">10 min watch</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
