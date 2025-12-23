import Link from "next/link";

interface Post {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    featuredImage?: {
        node: {
            sourceUrl: string;
        };
    };
    categories?: {
        nodes: {
            name: string;
        }[];
    };
}

export default function BlogGrid({ posts }: { posts: Post[] }) {
    // If no posts are provided, we could use the hardcoded ones as fallback or show nothing
    const displayPosts = posts?.length > 0 ? posts.slice(0, 3) : [];

    if (displayPosts.length === 0) return null;

    return (
        <section className="py-20 bg-white" id="blog">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 font-display">
                            Latest Insights
                        </h2>
                        <p className="mt-2 text-gray-600">Fresh thinking on wealth and life.</p>
                    </div>
                    <Link
                        href="/blogs"
                        className="hidden md:block text-red-600 font-medium hover:text-opacity-80"
                    >
                        View all articles &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayPosts.map((post) => (
                        <Link href={`/blogs/${post.slug}`} key={post.id}>
                            <article
                                className="group cursor-pointer flex flex-col h-full"
                            >
                                <div className="relative overflow-hidden rounded-xl aspect-video mb-4 bg-gray-100">
                                    <img
                                        src={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=800"}
                                        alt={post.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs font-bold tracking-wider text-red-600 uppercase mb-2 block">
                                        {post.categories?.nodes[0]?.name || "Article"}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
                                    <div className="text-gray-600 line-clamp-3 text-sm" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/blogs"
                        className="text-red-600 font-medium hover:text-opacity-80"
                    >
                        View all articles &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
