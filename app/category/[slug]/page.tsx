import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Play, TrendingUp, MessageCircle, Briefcase, User, Cpu } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Data content for the categories
const CATEGORY_DATA: Record<string, any> = {
    investment: {
        name: "Investment",
        headline: "Investment: Architect Your Financial Freedom",
        philosophy: "Investment is not just about accumulating money; it is the primary engine of your freedom. We believe that mastering asset allocation allows you to decouple your time from your income.",
        icon: TrendingUp,
        color: "text-brand-blue",
        bg: "bg-blue-50",
        service: {
            title: "Unlock Your Wealth Potential",
            description: "Stop guessing. Get a personalized roadmap to financial independence with our Wealth Architecture coaching.",
            link: "/services#investment"
        },
        articles: [
            { title: "The 'Sleep Well' Portfolio", link: "/blogs/1", image: "/blog-1.jpg" },
            { title: "First $100k: The Hardest Milestone", link: "/blogs/2", image: "/blog-2.jpg" },
            { title: "Diversification 101", link: "/blogs/6", image: "/blog-6.jpg" }
        ],
        videos: [
            { title: "Wealth Building Habits #1", duration: "10:00", link: "/videos" },
            { title: "Understanding Risk vs Reward", duration: "15:30", link: "/videos" }
        ],
        related: {
            name: "Career",
            slug: "career",
            message: "If you are improving your Investment strategy, don't forget your Career. It's your primary funding source."
        }
    },
    communication: {
        name: "Communication",
        headline: "Communication: Amplify Your Influence",
        philosophy: "Communication is not just about speaking; it is the bridge between your ideas and reality. We believe that mastering influence allows you to command respect and negotiate the life you deserve.",
        icon: MessageCircle,
        color: "text-brand-purple",
        bg: "bg-purple-50",
        service: {
            title: "Master Executive Presence",
            description: "Stop being ignored. Learn psychological techniques to command the room with our Communication Mastery coaching.",
            link: "/services#communication"
        },
        articles: [
            { title: "Active Listening: The Underrated Skill", link: "/blogs/4", image: "/blog-4.jpg" },
            { title: "Negotiation Tactics for Everyday Life", link: "/blogs/7", image: "/blog-3.jpg" }, // Reuse placeholder
            { title: "Public Speaking for Introverts", link: "/blogs/8", image: "/blog-1.jpg" }
        ],
        videos: [
            { title: "Negotiate Like a Hostage Negotiator", duration: "15:20", link: "/videos" },
            { title: "The Art of the Pause", duration: "06:10", link: "/videos" }
        ],
        related: {
            name: "Personal Development",
            slug: "personal-development",
            message: "If you are mastering Communication, don't forget Personal Development. Inner clarity breeds outer confidence."
        }
    },
    career: {
        name: "Career",
        headline: "Career: Strategize Your Professional Trajectory",
        philosophy: "Your career is not just a job; it is a business where you are the CEO. We believe that treating your professional life strategically allows you to maximize earnings and accelerate growth.",
        icon: Briefcase,
        color: "text-brand-red",
        bg: "bg-red-50",
        service: {
            title: "Accelerate Your Promotion",
            description: "Stop waiting to be noticed. Build a strategic Career Moat with our Professional Acceleration coaching.",
            link: "/services#career"
        },
        articles: [
            { title: "Mastering the Art of Negotiation", link: "/blogs/2", image: "/blog-2.jpg" },
            { title: "Managing Up Explained", link: "/blogs/9", image: "/blog-1.jpg" },
            { title: "The Future of Work", link: "/blogs/10", image: "/blog-4.jpg" }
        ],
        videos: [
            { title: "The 'Career Moat' Concept", duration: "18:00", link: "/videos" },
            { title: "Managing Up: The Secret to Promotion", duration: "10:15", link: "/videos" }
        ],
        related: {
            name: "Communication",
            slug: "communication",
            message: "If you are improving your Career, don't forget Communication. Your skills get you in the room, but your influence keeps you there."
        }
    },
    "personal-development": {
        name: "Personal Development",
        headline: "Personal Development: Optimize Your Operating System",
        philosophy: "Personal development is not just about feeling good; it is about functioning at your peak. We believe that optimizing your mind and body is the highest leverage activity you can do.",
        icon: User,
        color: "text-orange-500",
        bg: "bg-orange-50",
        service: {
            title: "Design Your Life Systems",
            description: "Stop relying on willpower. Build a bulletproof system for productivity and health with our High Performance coaching.",
            link: "/services#personal-development"
        },
        articles: [
            { title: "Sleep Optimization for High Performers", link: "/blogs/5", image: "/blog-5.jpg" },
            { title: "Digital Minimalism", link: "/blogs/3", image: "/blog-3.jpg" },
            { title: "The Power of Atomic Habits", link: "/blogs/11", image: "/blog-2.jpg" }
        ],
        videos: [
            { title: "Energy Management > Time Management", duration: "14:30", link: "/videos" },
            { title: "Designing Your Morning Routine", duration: "09:50", link: "/videos" }
        ],
        related: {
            name: "Investment",
            slug: "investment",
            message: "If you are optimizing your Personal Development, don't forget Investment. Use your clarity to make better financial decisions."
        }
    },
    technology: {
        name: "Technology",
        headline: "Technology: Future-Proof Your Skillset",
        philosophy: "Technology is not just for geeks; it is the lever that multiplies your output. We believe that staying ahead of the curve is essential to remaining relevant in a rapidly changing world.",
        icon: Cpu,
        color: "text-indigo-500",
        bg: "bg-indigo-50",
        service: {
            title: "Leverage AI & Automation",
            description: "Stop doing busy work. Learn to clone yourself with AI tools in our Future Tech workshop.",
            link: "/services#technology"
        },
        articles: [
            { title: "Digital Minimalism in an AI World", link: "/blogs/3", image: "/blog-3.jpg" },
            { title: "AI Tools You Need Now", link: "/blogs/12", image: "/blog-4.jpg" },
            { title: "The Blockchain Revolution", link: "/blogs/13", image: "/blog-1.jpg" }
        ],
        videos: [
            { title: "AI for the Non-Technical", duration: "22:15", link: "/videos" },
            { title: "Crypto & Blockchain: Signal vs. Noise", duration: "16:40", link: "/videos" }
        ],
        related: {
            name: "Career",
            slug: "career",
            message: "If you are mastering Technology, don't forget your Career. Use these new skills to negotiate a higher salary."
        }
    }
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const category = CATEGORY_DATA[slug];


    if (!category) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
                    <p className="text-gray-600 mb-8">The category you are looking for does not exist.</p>
                    <Link href="/category" className="text-primary hover:underline">View All Categories</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const Icon = category.icon;

    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />

            <main className="pt-24 pb-20">
                {/* 1. Hero Section */}
                <section className={`px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 text-center ${category.bg} py-20 rounded-3xl mx-4`}>
                    <div className={`w-20 h-20 ${category.bg} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm bg-white`}>
                        <Icon className={`w-10 h-10 ${category.color}`} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
                        {category.headline}
                    </h1>
                </section>

                {/* 2. The Philosophy */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20 text-center">
                    <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">The Philosophy</h2>
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                        {category.philosophy}
                    </p>
                </section>

                {/* 3. Service Highlight */}
                <section className="bg-gray-900 text-white py-20 mb-20">
                    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-serif font-bold mb-4">{category.service.title}</h2>
                            <p className="text-gray-300 text-lg mb-0">{category.service.description}</p>
                        </div>
                        <div>
                            <Link href={category.service.link} className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors whitespace-nowrap">
                                Explore Coaching <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 4. Curated Content */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Top Reads */}
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <BookOpen className="w-6 h-6 text-gray-400" />
                            <h2 className="text-2xl font-bold text-gray-900">Top Reads</h2>
                        </div>
                        <div className="space-y-6">
                            {category.articles.map((article: any, idx: number) => (
                                <Link href={article.link} key={idx} className="flex gap-4 group items-start">
                                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        {/* Placeholder for image */}
                                        <div className="w-full h-full bg-slate-200"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                                            {article.title}
                                        </h3>
                                        <span className="text-sm text-gray-500 underline decoration-gray-300 group-hover:decoration-primary">Read Article</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Watch & Learn */}
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <Play className="w-6 h-6 text-gray-400" />
                            <h2 className="text-2xl font-bold text-gray-900">Watch & Learn</h2>
                        </div>
                        <div className="space-y-6">
                            {category.videos.map((video: any, idx: number) => (
                                <Link href={video.link} key={idx} className="block group">
                                    <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-3 border border-gray-100 shadow-sm">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Play fill="white" className="w-5 h-5 text-white ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                                        {video.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">{video.duration} • Watch Masterclass</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Cross-Pollination */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-12 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Balance Your Portfolio</h2>
                        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                            {category.related.message}
                        </p>
                        <Link href={`/category/${category.related.slug}`} className="text-primary font-bold hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                            Explore {category.related.name} <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export async function generateStaticParams() {
    return Object.keys(CATEGORY_DATA).map((slug) => ({
        slug: slug,
    }));
}
