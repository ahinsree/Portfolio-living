const posts = [
    {
        id: 1,
        title: "How to Start Investing with Small Amounts",
        excerpt:
            "You don't need a fortune to start building wealth. Here is a step-by-step guide to getting started.",
        category: "INVESTMENT",
        imageUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "The Importance of Active Listening",
        excerpt:
            "Communication isn't just about speaking. Learn how active listening can transform your relationships.",
        category: "COMMUNICATION",
        imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Navigating the Tech Layoff Landscape",
        excerpt:
            "Strategies to protect your career and pivot during uncertain times in the tech industry.",
        category: "CAREER",
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
    },
];

export default function BlogGrid() {
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
                    <a
                        href="#"
                        className="hidden md:block text-red-600 font-medium hover:text-opacity-80"
                    >
                        View all articles &rarr;
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative overflow-hidden rounded-xl aspect-video mb-4 bg-gray-100">
                                {/* Placeholder Image using Unsplash */}
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex-1">
                                <span className="text-xs font-bold tracking-wider text-red-600 uppercase mb-2 block">
                                    {post.category}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a
                        href="#"
                        className="text-red-600 font-medium hover:text-opacity-80"
                    >
                        View all articles &rarr;
                    </a>
                </div>
            </div>
        </section>
    );
}
