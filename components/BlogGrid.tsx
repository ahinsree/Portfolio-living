"use client";

import Link from "next/link";
import { useState, useMemo, useRef } from "react";
import { type WordPressPost, estimateReadTime } from "@/lib/wordpress";
import { ArrowRight, User, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogGrid({ posts, title }: { posts: WordPressPost[], title?: string }) {
    const [activeTab, setActiveTab] = useState("All");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Define the core pillars as requested
    const corePillars = ["All", "Investment", "Communication", "Career", "Personal Development", "Technology"];

    // Topic-specific fallback images
    const categoryImages: Record<string, string> = {
        "investment": "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=800",
        "communication": "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=800",
        "career": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        "personal development": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
        "technology": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        "all": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800"
    };

    const getPostImage = (post: WordPressPost) => {
        if (post.featuredImage?.node?.sourceUrl) return post.featuredImage.node.sourceUrl;
        const catName = post.categories?.nodes[0]?.name?.toLowerCase() || "all";
        return categoryImages[catName] || categoryImages["all"];
    };

    // Filter posts based on active tab
    const filteredPosts = useMemo(() => {
        const allFiltered = activeTab === "All"
            ? posts
            : posts.filter(post =>
                post.categories?.nodes.some(cat =>
                    cat.name.toLowerCase() === activeTab.toLowerCase()
                )
            );
        return allFiltered;
    }, [posts, activeTab]);

    const featuredPost = filteredPosts[0];
    const sliderPosts = filteredPosts.slice(1, 9); // Show next 8 posts in slider

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
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-8">
                    <div className="text-center md:text-left">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Archive & Insights</span>
                        <h2 className="text-[32px] md:text-[48px] font-bold text-gray-900 font-sans mb-4 tracking-tight leading-tight">
                            {title || "Latest Insights"}
                        </h2>
                        <p className="text-lg text-gray-500 font-light max-w-xl">Deep dives into the intersection of wealth, strategy, and personal growth.</p>
                    </div>
                    <Link
                        href="/blogs"
                        className="hidden md:flex items-center gap-3 text-gray-900 font-black uppercase tracking-[0.2em] text-[11px] hover:text-primary transition-all group"
                    >
                        View all articles <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-16 border-b border-gray-100 pb-8">
                    {corePillars.map((pillar) => (
                        <button
                            key={pillar}
                            onClick={() => setActiveTab(pillar)}
                            className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === pillar
                                ? "bg-primary text-white shadow-2xl shadow-primary/30 scale-105"
                                : "bg-gray-50 text-gray-400 hover:bg-white hover:text-primary hover:shadow-xl border border-transparent hover:border-primary/10"
                                }`}
                        >
                            {pillar}
                        </button>
                    ))}
                </div>


                <AnimatePresence mode="wait">
                    {featuredPost ? (
                        <motion.div
                            key={`content-${activeTab}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Featured Insight Section */}
                            <div className="lg:col-span-12 mb-20">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                    <div className="lg:col-span-7">
                                        <Link href={`/blogs/${featuredPost.slug}`} className="group relative block aspect-[16/9] overflow-hidden rounded-[3rem] shadow-2xl">
                                            <img
                                                src={getPostImage(featuredPost)}
                                                alt={featuredPost.title}
                                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                            <div className="absolute bottom-10 left-10 right-10">
                                                <span className="bg-white/95 backdrop-blur-md text-primary font-black uppercase tracking-[0.2em] text-[10px] px-6 py-2.5 rounded-full inline-block mb-4 shadow-xl">
                                                    Featured Insight {activeTab !== "All" && `in ${activeTab}`}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="lg:col-span-5 space-y-8">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 flex-shrink-0">
                                                    <img
                                                        src={featuredPost.author?.node?.avatar?.url || "/images/authors/sarath.png"}
                                                        alt={featuredPost.author?.node?.name || "Author"}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1.5">Written by</span>
                                                    <span className="text-base font-bold text-gray-900 leading-none">{featuredPost.author?.node?.name || "Sarath V Raj"}</span>
                                                </div>
                                            </div>
                                            <div className="h-8 w-px bg-gray-100" />
                                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                                {estimateReadTime(featuredPost.content || featuredPost.excerpt)}
                                            </div>
                                        </div>
                                        <Link href={`/blogs/${featuredPost.slug}`} className="block group">
                                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight group-hover:text-primary transition-colors tracking-tight" dangerouslySetInnerHTML={{ __html: featuredPost.title }} />
                                            <div className="text-gray-500 text-lg font-light leading-relaxed mb-8 line-clamp-3" dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }} />
                                            <div className="inline-flex items-center gap-3 text-sm font-black text-gray-900 group-hover:text-primary transition-all uppercase tracking-[0.2em]">
                                                Read full insight <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Remaining Posts Slider */}
                            {sliderPosts.length > 0 && (
                                <div className="relative group/slider">
                                    <div className="flex items-center justify-between mb-8">
                                        <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-gray-400">
                                            More {activeTab === "All" ? "Recent Insights" : `in ${activeTab}`}
                                        </h4>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => scroll("left")}
                                                className="w-12 h-12 bg-white rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 hover:shadow-xl transition-all"
                                                aria-label="Scroll left"
                                            >
                                                <ChevronLeft size={24} />
                                            </button>
                                            <button
                                                onClick={() => scroll("right")}
                                                className="w-12 h-12 bg-white rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 hover:shadow-xl transition-all"
                                                aria-label="Scroll right"
                                            >
                                                <ChevronRight size={24} />
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        ref={scrollRef}
                                        className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x snap-mandatory scroll-smooth"
                                    >
                                        {sliderPosts.map((post, index) => (
                                            <motion.div
                                                key={`${post.id}-${index}`}
                                                className="min-w-[320px] md:min-w-[400px] snap-start"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link href={`/blogs/${post.slug}`} className="group/card block h-full">
                                                    <article className="flex flex-col h-full">
                                                        <div className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] mb-8 bg-gray-100 group-hover/card:shadow-2xl transition-all duration-700 border border-gray-50">
                                                            <img
                                                                src={getPostImage(post)}
                                                                alt={post.title}
                                                                className="object-cover w-full h-full group-hover/card:scale-110 transition-transform duration-[1.5s] ease-out"
                                                            />
                                                            <div className="absolute top-6 left-6">
                                                                <span className="bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-primary shadow-lg border border-primary/5">
                                                                    {post.categories?.nodes[0]?.name || "Article"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="px-2">
                                                            <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover/card:text-primary transition-colors line-clamp-2 leading-snug tracking-tight" dangerouslySetInnerHTML={{ __html: post.title }} />
                                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100 flex-shrink-0">
                                                                        <img
                                                                            src={post.author?.node?.avatar?.url || "/images/authors/sarath.png"}
                                                                            alt={post.author?.node?.name || "Author"}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">Written by</span>
                                                                        <span className="text-[12px] font-bold text-gray-900 leading-none">{post.author?.node?.name || "Sarath V Raj"}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">
                                                                    {estimateReadTime(post.content || post.excerpt)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">
                                Coming soon. We are preparing deep insights on {activeTab}.
                            </p>
                        </div>
                    )}
                </AnimatePresence>

                {/* Mobile View All Button */}
                <div className="mt-16 text-center md:hidden">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-3 text-white bg-primary font-black uppercase tracking-[0.2em] text-[11px] px-10 py-5 rounded-full shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
                    >
                        View all articles <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section >
    );
}
