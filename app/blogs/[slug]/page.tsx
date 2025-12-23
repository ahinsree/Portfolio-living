import { getPostBySlug, getAllPosts } from "@/lib/wordpress";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />

            <main className="pt-32 pb-20">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back button */}
                    <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Articles
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            {post.categories?.nodes.map((cat: any) => (
                                <span key={cat.slug} className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight mb-8" dangerouslySetInnerHTML={{ __html: post.title }} />

                        <div className="flex flex-wrap items-center gap-6 text-gray-500 border-y border-gray-100 py-6">
                            <div className="flex items-center gap-2">
                                <User size={18} />
                                <span className="font-medium text-gray-900">{post.author?.node?.name || "Ahin Sree"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>8 min read</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.featuredImage && (
                        <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl">
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
                    <div
                        className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-2xl prose-img:shadow-lg"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>

            <Footer />
        </div>
    );
}
