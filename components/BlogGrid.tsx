"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { type WordPressPost } from "@/lib/wordpress";
import { ArrowRight, User, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export default function BlogGrid({ posts }: { posts: WordPressPost[] }) {
    const [activeTab, setActiveTab] = useState("All");

    // Define the core pillars as requested
    const corePillars = ["All", "Investment", "Communication", "Career", "Personal Development", "Technology"];

    // Filter posts based on active tab
    const scrollRef = useRef<HTMLDivElement>(null);

    // Topic-specific fallback images - Premium Selection
    const categoryImages: Record<string, string> = {
        "investment": "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=800",
        "communication": "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=800", // Structural Connection
        "career": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", // Skyscraper Strategy
        "personal development": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800", // Focus/Mindset
        "technology": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", // Cyber/Tech Minimal
        "all": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800"
    };

    const getPostImage = (post: WordPressPost) => {
        if (post.featuredImage?.node?.sourceUrl) return post.featuredImage.node.sourceUrl;
        const catName = post.categories?.nodes[0]?.name?.toLowerCase() || "all";
        return categoryImages[catName] || categoryImages["all"];
    };

    // Filter posts based on active tab - show more for slider
    const filteredPosts = useMemo(() => {
        if (activeTab === "All") return posts.slice(0, 8);

        return posts.filter(post =>
            post.categories?.nodes.some(cat =>
                cat.name.toLowerCase() === activeTab.toLowerCase()
            )
        ).slice(0, 8);
    }, [posts, activeTab]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-24 bg-white" id="blog">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-[32px] md:text-[40px] font-bold text-gray-900 font-sans mb-4">
                            Latest Insights
                        </h2>
                        <p className="text-lg text-gray-500 font-light">Fresh thinking on wealth and life.</p>
                    </div>
                    <Link
                        href="/blogs"
                        className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                    >
                        View all articles <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-16 border-b border-gray-100 pb-8">
                    {corePillars.map((pillar) => (
                        <button
                            key={pillar}
                            onClick={() => setActiveTab(pillar)}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === pillar
                                ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                                : "bg-gray-50 text-gray-500 hover:bg-white hover:text-primary hover:shadow-lg border border-transparent hover:border-primary/20"
                                }`}
                        >
                            {pillar}
                        </button>
                    ))}
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="relative group/slider px-4">
                        {/* Navigation Buttons - Always Visible on Hover, Subtle but Premium */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-2 lg:-left-6 z-20 transition-all opacity-0 group-hover/slider:opacity-100">
                            <button
                                onClick={() => scroll("left")}
                                className="w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all outline-none"
                                aria-label="Previous posts"
                            >
                                <ChevronLeft size={28} />
                            </button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-2 lg:-right-6 z-20 transition-all opacity-0 group-hover/slider:opacity-100">
                            <button
                                onClick={() => scroll("right")}
                                className="w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all outline-none"
                                aria-label="Next posts"
                            >
                                <ChevronRight size={28} />
                            </button>
                        </div>

                        {/* Slider Container */}
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x snap-mandatory scroll-smooth"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredPosts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="min-w-[300px] md:min-w-[420px] snap-start"
                                    >
                                        <Link href={`/blogs/${post.slug}`} className="group/card block h-full">
                                            <article className="flex flex-col h-full">
                                                <div className="relative overflow-hidden rounded-[3rem] aspect-[16/10] mb-8 bg-gray-100 shadow-sm group-hover/card:shadow-2xl transition-all duration-700 border border-gray-50">
                                                    <img
                                                        src={getPostImage(post)}
                                                        alt={post.title}
                                                        className="object-cover w-full h-full group-hover/card:scale-110 transition-transform duration-[1.5s] ease-out"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                                                    <div className="absolute top-6 left-6">
                                                        <span className="bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-xl">
                                                            {post.categories?.nodes[0]?.name || "Article"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 px-4">
                                                    <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                                        <span className="flex items-center gap-2 group-hover/card:text-gray-600 transition-colors">
                                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                                                <User size={12} className="text-primary" />
                                                            </div>
                                                            {post.author?.node?.name || "Sarath V Raj"}
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                                                            5 min read
                                                        </span>
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover/card:text-primary transition-colors line-clamp-2 leading-tight font-sans tracking-tight" dangerouslySetInnerHTML={{ __html: post.title }} />
                                                    <div className="text-gray-500 font-light line-clamp-3 text-base leading-relaxed mb-6 opacity-80" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                                    <div className="flex items-center gap-3 text-sm font-black text-gray-900 group-hover/card:text-primary transition-all uppercase tracking-[0.2em]">
                                                        Explore Insight <ArrowRight size={18} className="group-hover/card:translate-x-2 transition-transform duration-500" />
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Custom Scroll Progress Bar */}
                        <div className="max-w-md mx-auto h-1.5 bg-gray-100 rounded-full overflow-hidden mt-4 relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-primary rounded-full shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                                initial={{ width: "20%" }}
                                animate={{ width: `${(1 / Math.ceil(filteredPosts.length / 3)) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">No insights found in this category yet. Check back soon.</p>
                    </div>
                )}

                <div className="mt-16 text-center md:hidden">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-primary font-bold px-8 py-4 rounded-full border-2 border-primary/10 hover:bg-primary hover:text-white transition-all"
                    >
                        View all articles <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
