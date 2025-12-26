import { getAllPosts, getAllCategories, type WordPressPost, type WordPressCategory } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";

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

export default async function BlogsPage() {
    const posts: WordPressPost[] = await getAllPosts();
    const categories: WordPressCategory[] = await getAllCategories();

    // Featured post is the most recent one
    const featuredPost = posts?.[0];
    const otherPosts = posts?.slice(1);

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Header />

            <main className="pt-24 pb-20">
                {/* Hero Section - Featured Article */}
                {featuredPost && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                        <Link href={`/blogs/${featuredPost.slug}`}>
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[21/10] group cursor-pointer bg-gray-100">
                                <Image
                                    src={getPostImage(featuredPost)}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-3/4 text-white">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="bg-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                                            Featured insight
                                        </span>
                                        <span className="text-white/80 text-sm flex items-center gap-2 font-medium">
                                            <Clock size={16} className="text-primary" /> 10 min read
                                        </span>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6 drop-shadow-lg" dangerouslySetInnerHTML={{ __html: featuredPost.title }} />
                                    <div className="text-white/90 text-lg mb-8 line-clamp-2 leading-relaxed max-w-2xl font-light" dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }} />
                                    <span className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xl">
                                        Read Full Article <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Filter System */}
                <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 mb-16 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href="/blogs"
                                className="px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105"
                            >
                                All Insights
                            </Link>
                            {["Investment", "Communication", "Career", "Personal Development", "Technology"].map((pillar) => (
                                <Link
                                    key={pillar}
                                    href={`/category/${pillar.toLowerCase().replace(/ /g, '-')}`}
                                    className="px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-lg"
                                >
                                    {pillar}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Grid */}
                        <div className="lg:col-span-8">
                            <div className="grid md:grid-cols-2 gap-12">
                                {otherPosts?.map((article: WordPressPost) => (
                                    <Link href={`/blogs/${article.slug}`} key={article.id} className="group block">
                                        <article className="flex flex-col h-full">
                                            <div className="relative h-64 rounded-3xl overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500 bg-gray-100">
                                                <Image
                                                    src={getPostImage(article)}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                                                        {article.categories?.nodes[0]?.name || "Article"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col flex-grow px-2">
                                                <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                                    <span className="flex items-center gap-1.5"><User size={12} className="text-primary" /> {article.author?.node?.name || "Sarath V Raj"}</span>
                                                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {new Date(article.date).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> 5 min read</span>
                                                </div>
                                                <h2 className="text-[22px] font-sans font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight" dangerouslySetInnerHTML={{ __html: article.title }} />
                                                <div className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 font-light" dangerouslySetInnerHTML={{ __html: article.excerpt }} />
                                                <div className="flex items-center gap-3 text-sm font-bold text-gray-900 mt-auto group-hover:text-primary transition-all">
                                                    Read Insights <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>

                            {(!posts || posts.length < 2) && (
                                <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                                    <p className="text-gray-400 font-medium">More articles coming soon...</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 lg:pl-8">
                            <div className="sticky top-40 space-y-12">
                                {/* Newsletter Widget */}
                                <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                                    <h3 className="font-sans font-bold text-2xl text-gray-900 mb-4">The Monday <span className="text-primary">Manifesto</span></h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                        Join 50,000+ top performers receiving our weekly blueprint for wealth and influence.
                                    </p>
                                    <form className="space-y-4">
                                        <input
                                            type="email"
                                            placeholder="Your best email"
                                            className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50"
                                        />
                                        <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-all shadow-lg shadow-primary/20 hover:shadow-xl active:scale-[0.98]">
                                            Subscribe Now
                                        </button>
                                    </form>
                                    <p className="text-[10px] text-gray-400 mt-6 text-center font-medium uppercase tracking-widest">
                                        No spam • Opt-out anytime
                                    </p>
                                </div>

                                {/* Popular Topics */}
                                <div className="bg-gray-50 p-10 rounded-[2rem]">
                                    <h3 className="font-sans font-bold text-xl text-gray-900 mb-8 flex items-center gap-3">
                                        <div className="w-8 h-1 bg-primary rounded-full" />
                                        Popular Topics
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {categories?.slice(0, 6).map((cat) => (
                                            <Link
                                                key={cat.slug}
                                                href={`/category/${cat.slug}`}
                                                className="px-5 py-2 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm"
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
