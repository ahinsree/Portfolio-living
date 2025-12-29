import { getPostBySlug, getAllPosts, type WordPressPost, estimateReadTime } from "@/lib/wordpress";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Calendar, User, ArrowLeft, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    try {
        const posts = await getAllPosts();
        if (!posts || posts.length === 0) {
            return [{ slug: "welcome-to-portfolio-living" }];
        }
        return posts.map((post: WordPressPost) => ({
            slug: post.slug,
        }));
    } catch (e) {
        console.error("Error generating static params for blogs:", e);
        return [{ slug: "welcome-to-portfolio-living" }];
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Header />

            <main className="pt-32 pb-24">
                <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs / Back button */}
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/blogs" className="inline-flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-primary transition-all group">
                            <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            </div>
                            Back to Insights
                        </Link>

                        <div className="flex items-center gap-4">
                            <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                <Share2 size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                <MessageCircle size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Header */}
                    <header className="mb-16">
                        <div className="flex flex-wrap gap-2 mb-8">
                            {post.categories?.nodes.map((cat: { slug: string; name: string }) => (
                                <Link
                                    key={cat.slug}
                                    href={`/category/${cat.slug}`}
                                    className="bg-primary/5 text-primary px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                        <h1 className="text-[36px] md:text-[60px] font-display font-bold text-gray-900 leading-[1.1] mb-10 tracking-tight" dangerouslySetInnerHTML={{ __html: post.title }} />

                        <div className="flex flex-wrap items-center gap-10 text-gray-400 border-y border-gray-50 py-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-md">
                                    <Image
                                        src={post.author?.node?.avatar?.url || "/images/authors/sarath.png"}
                                        alt={post.author?.node?.name || "Author"}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-1">Written by</p>
                                    <span className="font-bold text-gray-900 text-base">{post.author?.node?.name}</span>
                                </div>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-100 hidden md:block" />
                            <div className="flex items-center gap-3">
                                <Calendar size={20} className="text-primary" />
                                <div className="text-sm">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-1">Published</p>
                                    <span className="font-bold text-gray-600 uppercase tracking-wider">{new Date(post.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-100 hidden md:block" />
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="text-primary" />
                                <div className="text-sm">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-1">Reading time</p>
                                    <span className="font-bold text-gray-600 uppercase tracking-wider">{estimateReadTime(post.content || post.excerpt)}</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.featuredImage && (
                        <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-20 shadow-2xl bg-gray-100 border-8 border-white">
                            <Image
                                src={post.featuredImage.node.sourceUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
                        {/* Left sidebar space / table of contents placeholder */}
                        <div className="hidden lg:block lg:col-span-1" />

                        <div className="lg:col-span-8">
                            <div
                                className="prose prose-xl prose-slate max-w-none 
                                prose-headings:font-sans prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                                prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:font-light
                                prose-a:text-primary prose-a:no-underline prose-a:font-bold hover:prose-a:underline
                                prose-strong:text-gray-900 prose-strong:font-bold
                                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-3xl prose-blockquote:text-2xl prose-blockquote:font-sans
                                prose-img:rounded-[2rem] prose-img:shadow-2xl"
                                dangerouslySetInnerHTML={{ __html: post.content || "" }}
                            />

                            {/* Author Bio Section */}
                            <div className="mt-24 p-12 bg-gray-50 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-xl bg-white">
                                    <Image
                                        src={post.author?.node?.avatar?.url || "/images/authors/sarath.png"}
                                        alt={post.author?.node?.name || "Author"}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-sans font-bold text-gray-900 mb-4">About {post.author?.node?.name}</h3>
                                    <p className="text-gray-500 leading-relaxed max-w-xl font-light">
                                        Building systems for wealth, career, and communications. Dedicated to helping professionals architect a life of freedom and influence.
                                    </p>
                                    <div className="mt-6 flex justify-center md:justify-start gap-4">
                                        <button className="text-sm font-bold text-primary hover:underline">Follow on Twitter</button>
                                        <button className="text-sm font-bold text-primary hover:underline">View Portfolio</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right sidebar space / related links placeholder */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-40 space-y-12">
                                <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-gray-200/50">
                                    <h4 className="font-sans font-bold text-lg mb-6 text-gray-900">Inside the Issue</h4>
                                    <div className="space-y-4">
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="w-1/3 h-full bg-primary" />
                                        </div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">35% through</p>
                                    </div>
                                </div>
                                <div className="p-8 bg-primary rounded-[2rem] shadow-xl shadow-primary/20 text-white">
                                    <h4 className="font-sans font-bold text-xl mb-4 leading-tight">Master your money?</h4>
                                    <p className="text-white/80 text-sm mb-8 leading-relaxed">Join our Wealth Architecture program for personalized guidance.</p>
                                    <Link href="/services" className="inline-block bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
