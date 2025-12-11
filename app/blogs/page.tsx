"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { ArrowRight, Clock, Tag } from "lucide-react";

const CATEGORIES = ["All", "Investment", "Communication", "Career", "Personal Development", "Technology"];

const ARTICLES = [
    {
        id: 1,
        title: "The Compound Effect: Small Habits, Big Wealth",
        category: "Investment",
        description: "How consistency outperforms intensity when building your financial portfolio over time.",
        image: "/blog-1.jpg", // Placeholder, will rely on generated image if possible or generic placeholders
        readTime: "5 min read",
        date: "Dec 10, 2025"
    },
    {
        id: 2,
        title: "Mastering the Art of Negotiation",
        category: "Career",
        description: "Strategies to get what you deserve in your next salary review without burning bridges.",
        image: "/blog-2.jpg",
        readTime: "7 min read",
        date: "Dec 08, 2025"
    },
    {
        id: 3,
        title: "Digital Minimalism in an AI World",
        category: "Technology",
        description: "Reclaiming your attention span while leveraging the latest tools for productivity.",
        image: "/blog-3.jpg",
        readTime: "4 min read",
        date: "Dec 05, 2025"
    },
    {
        id: 4,
        title: "Active Listening: The Underrated Skill",
        category: "Communication",
        description: "Why the best communicators talk less and listen more.",
        image: "/blog-4.jpg",
        readTime: "6 min read",
        date: "Dec 01, 2025"
    },
    {
        id: 5,
        title: "Sleep Optimization for High Performers",
        category: "Personal Development",
        description: "The science-backed routine to wake up energized and ready to tackle complex problems.",
        image: "/blog-5.jpg",
        readTime: "8 min read",
        date: "Nov 28, 2025"
    },
    {
        id: 6,
        title: "Diversification 101: Beyond Stocks",
        category: "Investment",
        description: "Exploring real estate, bonds, and alternative assets to bulletproof your portfolio.",
        image: "/blog-6.jpg",
        readTime: "6 min read",
        date: "Nov 25, 2025"
    },
];

export default function BlogsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredArticles = selectedCategory === "All"
        ? ARTICLES
        : ARTICLES.filter(article => article.category === selectedCategory);

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-navy-900 selection:text-white">
            <Header />

            <main className="pt-24 pb-16">
                {/* Hero Section - Featured Article */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[21/9] group cursor-pointer">
                        {/* Use the generated image here if mapped properly, else use a placeholder or color block */}
                        <div className="absolute inset-0 bg-gray-200">
                            {/* We will rely on Next.js Image optimization if we had real paths. For now, simulating with a gradient or placehold */}
                            <div className="w-full h-full bg-slate-800 relative">
                                {/* Ideally we would put <Image src="..." /> here. Since I cannot move the artifact image easily to public without correct path, I will use a colored placeholder or just standard img tag if local.
                                   I'll use a placeholder div that LOOKS like an image for now, or if I can access the generated image.
                                   I'll assume I can copy the generated image to public. I will do that in a separate step. For now, standard placehold.
                                */}
                                <Image
                                    src="/featured-hero.png" // I will rename the generated artifact to this location in the next step
                                    alt="Featured Article"
                                    fill
                                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white border border-white/30">
                                    Featured Insight
                                </span>
                                <span className="text-gray-300 text-sm flex items-center gap-1">
                                    <Clock size={14} /> 10 min read
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4 drop-shadow-sm">
                                The Psychology of Money: Why Behavior Matters More Than Math
                            </h1>
                            <p className="text-gray-200 text-lg mb-6 line-clamp-2 leading-relaxed opacity-90">
                                Discover why your relationship with money dictates your financial success more than any spreadsheet ever could.
                            </p>
                            <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all duration-300 border-b border-transparent group-hover:border-white pb-0.5">
                                Read Article <ArrowRight size={18} />
                            </span>
                        </div>
                    </div>
                </section>

                {/* Filter System */}
                <div className="sticky top-16 z-40 bg-[#FDFDFD]/90 backdrop-blur-md border-b border-gray-100 mb-12 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
                        <div className="flex space-x-2 md:justify-center min-w-max">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === category
                                        ? "bg-gray-900 text-white border-gray-900 shadow-md"
                                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Main Grid - 3 Columns */}
                    <div className="lg:col-span-3">
                        <div className="grid md:grid-cols-2 gap-8">
                            {filteredArticles.map((article) => (
                                <Link href={`/blogs/${article.id}`} key={article.id} className="group block h-full">
                                    <article className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                        <div className="relative h-48 overflow-hidden bg-gray-100">
                                            {/* Placeholder for card images */}
                                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                                                <Image src={article.image} alt={article.title} width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide text-gray-900 shadow-sm">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                                <span>{article.date}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                                            </div>
                                            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {article.title}
                                            </h2>
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                                                {article.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mt-auto">
                                                Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                        {filteredArticles.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No articles found in this category yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        {/* Newsletter Widget */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-36">
                            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-2">Weekly Wisdom</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Join 50,000+ readers building their portfolio of life assets.
                            </p>
                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
                                />
                                <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-xs text-gray-400 mt-4 text-center">
                                No spam. Unsubscribe anytime.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
