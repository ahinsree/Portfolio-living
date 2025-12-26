"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { type WordPressPost } from "@/lib/wordpress";
import { ArrowRight } from "lucide-react";

export default function BlogGrid({ posts }: { posts: WordPressPost[] }) {
    const [activeTab, setActiveTab] = useState("All");

    // Define the core pillars as requested
    const corePillars = ["All", "Investment", "Communication", "Career", "Personal Development", "Technology"];

    // Filter posts based on active tab
    const filteredPosts = useMemo(() => {
        if (activeTab === "All") return posts.slice(0, 3);

        return posts.filter(post =>
            post.categories?.nodes.some(cat =>
                cat.name.toLowerCase() === activeTab.toLowerCase()
            )
        ).slice(0, 3);
    }, [posts, activeTab]);

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredPosts.map((post) => (
                            <Link href={`/blogs/${post.slug}`} key={post.id} className="group">
                                <article className="flex flex-col h-full">
                                    <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/3] mb-8 bg-gray-100 shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-gray-100">
                                        <img
                                            src={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=800"}
                                            alt={post.title}
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                                                {post.categories?.nodes[0]?.name || "Article"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1 px-2">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight font-sans" dangerouslySetInnerHTML={{ __html: post.title }} />
                                        <div className="text-gray-500 font-light line-clamp-3 text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                        <div className="flex items-center gap-3 text-sm font-black text-gray-900 group-hover:text-primary transition-all uppercase tracking-widest">
                                            Read Insights <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
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
