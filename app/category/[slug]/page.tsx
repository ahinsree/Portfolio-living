import Link from "next/link";
import { ArrowRight, BookOpen, Play, TrendingUp, MessageCircle, Briefcase, User, Cpu, type LucideIcon, Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategoryBySlug, getPostsByCategory, getAllCategories, type WordPressPost } from "@/lib/wordpress";

interface CategoryArticle {
    title: string;
    link: string;
    image: string;
}

interface CategoryVideo {
    title: string;
    duration: string;
    link: string;
    thumbnail?: string;
}

interface Category {
    name: string;
    headline: string;
    philosophy: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    service: {
        title: string;
        description: string;
        link: string;
    };
    articles: CategoryArticle[];
    videos: CategoryVideo[];
    related: {
        name: string;
        slug: string;
        message: string;
    };
    image: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
    TrendingUp,
    MessageCircle,
    Briefcase,
    User,
    Cpu,
};

const CATEGORY_DATA: Record<string, Category> = {
    investment: {
        name: "Investment",
        headline: "Investment: Architect Your Financial Freedom",
        philosophy: "Investment is not just about accumulating money; it is the primary engine of your freedom. We believe that mastering asset allocation allows you to decouple your time from your income.",
        icon: TrendingUp,
        color: "text-primary",
        bg: "bg-primary/5",
        service: {
            title: "Unlock Your Wealth Potential",
            description: "Stop guessing. Get a personalized roadmap to financial independence with our Wealth Architecture coaching.",
            link: "/services#investment"
        },
        articles: [],
        videos: [
            { title: "Wealth Building Habits #1", duration: "10:00", link: "/videos" },
            { title: "Understanding Risk vs Reward", duration: "15:30", link: "/videos" }
        ],
        related: {
            name: "Career",
            slug: "career",
            message: "If you are improving your Investment strategy, don't forget your Career. It's your primary funding source."
        },
        image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=1200"
    },
    communication: {
        name: "Communication",
        headline: "Communication: Amplify Your Influence",
        philosophy: "Communication is not just about speaking; it is the bridge between your ideas and reality. We believe that mastering influence allows you to command respect and negotiate the life you deserve.",
        icon: MessageCircle,
        color: "text-primary",
        bg: "bg-primary/5",
        service: {
            title: "Master Executive Presence",
            description: "Stop being ignored. Learn psychological techniques to command the room with our Communication Mastery coaching.",
            link: "/services#communication"
        },
        articles: [],
        videos: [
            { title: "Negotiate Like a Hostage Negotiator", duration: "15:20", link: "/videos" },
            { title: "The Art of the Pause", duration: "06:10", link: "/videos" }
        ],
        related: {
            name: "Personal Development",
            slug: "personal-development",
            message: "If you are mastering Communication, don't forget Personal Development. Inner clarity breeds outer confidence."
        },
        image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1200"
    },
    career: {
        name: "Career",
        headline: "Career: Strategize Your Professional Trajectory",
        philosophy: "Your career is not just a job; it is a business where you are the CEO. We believe that treating your professional life strategically allows you to maximize earnings and accelerate growth.",
        icon: Briefcase,
        color: "text-primary",
        bg: "bg-primary/5",
        service: {
            title: "Accelerate Your Promotion",
            description: "Stop waiting to be noticed. Build a strategic Career Moat with our Professional Acceleration coaching.",
            link: "/services#career"
        },
        articles: [],
        videos: [
            { title: "The 'Career Moat' Concept", duration: "18:00", link: "/videos" },
            { title: "Managing Up: The Secret to Promotion", duration: "10:15", link: "/videos" }
        ],
        related: {
            name: "Communication",
            slug: "communication",
            message: "If you are improving your Career, don't forget Communication. Your skills get you in the room, but your influence keeps you there."
        },
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    "personal-development": {
        name: "Personal Development",
        headline: "Personal Development: Optimize Your Operating System",
        philosophy: "Personal development is not just about feeling good; it is about functioning at your peak. We believe that optimizing your mind and body is the highest leverage activity you can do.",
        icon: User,
        color: "text-primary",
        bg: "bg-primary/5",
        service: {
            title: "Design Your Life Systems",
            description: "Stop relying on willpower. Build a bulletproof system for productivity and health with our High Performance coaching.",
            link: "/services#personal-development"
        },
        articles: [],
        videos: [
            { title: "Energy Management > Time Management", duration: "14:30", link: "/videos" },
            { title: "Designing Your Morning Routine", duration: "09:50", link: "/videos" }
        ],
        related: {
            name: "Investment",
            slug: "investment",
            message: "If you are optimizing your Personal Development, don't forget Investment. Use your clarity to make better financial decisions."
        },
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200"
    },
    technology: {
        name: "Technology",
        headline: "Technology: Future-Proof Your Skillset",
        philosophy: "Technology is not just for geeks; it is the lever that multiplies your output. We believe that staying ahead of the curve is essential to remaining relevant in a rapidly changing world.",
        icon: Cpu,
        color: "text-primary",
        bg: "bg-primary/5",
        service: {
            title: "Leverage AI & Automation",
            description: "Stop doing busy work. Learn to clone yourself with AI tools in our Future Tech workshop.",
            link: "/services#technology"
        },
        articles: [],
        videos: [
            { title: "AI for the Non-Technical", duration: "22:15", link: "/videos" },
            { title: "Crypto & Blockchain: Signal vs. Noise", duration: "16:40", link: "/videos" }
        ],
        related: {
            name: "Career",
            slug: "career",
            message: "If you are mastering Technology, don't forget your Career. Use these new skills to negotiate a higher salary."
        },
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
    }
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const wpCategory = await getCategoryBySlug(slug);
    const wpPosts = await getPostsByCategory(slug);
    const fallback = CATEGORY_DATA[slug];

    if (!fallback && !wpCategory) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Hub Not Found</h1>
                    <p className="text-gray-500 mb-8 font-light">The directory you are looking for does not exist in our ecosystem.</p>
                    <Link href="/category" className="text-primary font-bold hover:underline">Explore All Hubs</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const category: Category = {
        name: wpCategory?.name || fallback?.name || "",
        headline: wpCategory?.acfFields?.headline || fallback?.headline || "",
        philosophy: wpCategory?.acfFields?.philosophy || wpCategory?.description || fallback?.philosophy || "",
        icon: ICON_MAP[wpCategory?.acfFields?.iconName || ""] || fallback?.icon || TrendingUp,
        color: wpCategory?.acfFields?.colorClass || fallback?.color || "text-primary",
        bg: wpCategory?.acfFields?.bgClass || fallback?.bg || "bg-primary/5",
        service: {
            title: wpCategory?.acfFields?.serviceTitle || fallback?.service?.title || "",
            description: wpCategory?.acfFields?.serviceDescription || fallback?.service?.description || "",
            link: wpCategory?.acfFields?.serviceLink || fallback?.service?.link || "/contact"
        },
        articles: wpPosts.map((p) => ({
            title: p.title,
            link: `/blogs/${p.slug}`,
            image: p.featuredImage?.node?.sourceUrl || ""
        })),
        videos: fallback?.videos || [],
        related: {
            name: wpCategory?.acfFields?.relatedCategorySlug || fallback?.related?.name || "",
            slug: wpCategory?.acfFields?.relatedCategorySlug || fallback?.related?.slug || "",
            message: wpCategory?.acfFields?.relatedMessage || fallback?.related?.message || ""
        },
        image: fallback?.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200"
    };

    const Icon = category.icon;

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Header />

            <main className="pt-32 pb-24">
                {/* 1. Hero Section */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
                    <div className="relative rounded-[3rem] overflow-hidden aspect-[21/9] mb-16 shadow-2xl border border-gray-100 group">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                            <div className={`w-20 h-20 ${category.bg} rounded-[1.5rem] flex items-center justify-center mb-8 shadow-xl backdrop-blur-md border border-white/20`}>
                                <Icon className={`w-10 h-10 ${category.color}`} />
                            </div>
                            <span className="text-white/90 text-xs font-black uppercase tracking-[0.4em] mb-4">The Hub Portfolio</span>
                            <h1 className="text-[44px] md:text-[72px] font-display font-bold text-white leading-[1.1] tracking-tight" dangerouslySetInnerHTML={{ __html: category.headline }} />
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-gray-100">
                        <p className="text-[20px] md:text-[22px] text-gray-400 font-light leading-relaxed tracking-tight">
                            {category.philosophy}
                        </p>
                    </div>
                </section>

                {/* 2. Service Highlight */}
                <section className="bg-gray-50 py-32 mb-32 border-y border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="lg:w-2/3">
                            <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-6 block">Coaching Opportunities</span>
                            <h2 className="text-[32px] md:text-[48px] font-sans font-bold text-gray-900 mb-6">{category.service.title}</h2>
                            <p className="text-gray-500 text-xl font-light leading-relaxed">{category.service.description}</p>
                        </div>
                        <div>
                            <Link href={category.service.link} className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:shadow-2xl active:scale-[0.98] whitespace-nowrap">
                                Explore Coaching <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 3. Content Grid */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-2 gap-24 font-sans">
                    {/* Top Reads */}
                    <div>
                        <div className="flex items-center gap-4 mb-12">
                            <BookOpen className="w-8 h-8 text-primary" />
                            <h2 className="text-sm font-sans font-black uppercase tracking-[0.2em] text-gray-900">Curated Insights</h2>
                        </div>
                        <div className="space-y-10">
                            {category.articles.length > 0 ? (
                                category.articles.map((article: CategoryArticle, idx: number) => (
                                    <Link href={article.link} key={idx} className="flex gap-8 group items-start">
                                        <div className="w-32 h-32 rounded-[1.5rem] overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                            <img
                                                src={article.image || category.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-sans font-bold text-gray-900 group-hover:text-primary transition-colors mb-3 leading-tight" dangerouslySetInnerHTML={{ __html: article.title }} />
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-primary group-hover:underline underline-offset-4 decoration-2 transition-all">Read Insight</span>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="p-10 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                                    <p className="text-gray-400 font-medium text-center">No live articles in this hub yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Watch & Learn */}
                    {/* <div>
                        <div className="flex items-center gap-4 mb-12">
                            <Play className="w-8 h-8 text-primary" />
                            <h2 className="text-sm font-sans font-black uppercase tracking-[0.2em] text-gray-900">Visual Learning</h2>
                        </div>
                        <div className="space-y-10">
                            {category.videos.map((video: CategoryVideo, idx: number) => (
                                <Link href={video.link} key={idx} className="block group">
                                    <div className="relative aspect-video bg-gray-100 rounded-[2rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-gray-100">
                                        <div className="absolute top-4 left-4 z-20">
                                            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                                                <span className="relative flex h-1.5 w-1.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                                </span>
                                                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white">Coming Soon</span>
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/0 transition-all z-10">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                                <Play fill="currentColor" className="w-6 h-6 text-primary ml-1" />
                                            </div>
                                        </div>
                                        <img
                                            src={video.thumbnail || category.image}
                                            alt={video.title}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                                        />
                                    </div>
                                    <h3 className="text-xl font-sans font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 leading-tight">
                                        {video.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <span>Masterclass</span>
                                        <div className="w-1 h-1 bg-primary rounded-full" />
                                        <span>{video.duration}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div> */}
                </section>

                {/* 4. Cross-Pollination */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="bg-white border-2 border-primary/10 p-16 rounded-[3rem] text-center shadow-2xl shadow-primary/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">Expand Your Portfolio</span>
                        <h2 className="text-3xl font-sans font-bold text-gray-900 mb-6">Balance Your Perspective</h2>
                        <p className="text-gray-500 mb-10 max-w-xl mx-auto font-light leading-relaxed">
                            {category.related.message}
                        </p>
                        <Link href={`/category/${category.related.slug}`} className="inline-flex items-center gap-3 bg-gray-50 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all group">
                            Explore {category.related.name} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export async function generateStaticParams() {
    const categories = await getAllCategories().catch(() => []);
    const liveSlugs = categories.map(c => ({ slug: c.slug }));
    const fallbackSlugs = Object.keys(CATEGORY_DATA).map((slug) => ({ slug }));

    return [...liveSlugs, ...fallbackSlugs];
}
