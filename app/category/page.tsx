import Link from "next/link";
import { TrendingUp, MessageCircle, Briefcase, User, Cpu, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CATEGORIES = [
    {
        name: "Investment",
        slug: "investment",
        description: "Architect your financial freedom with data-driven asset allocation.",
        icon: TrendingUp,
    },
    {
        name: "Communication",
        slug: "communication",
        description: "Amplify your influence and command every room you enter.",
        icon: MessageCircle,
    },
    {
        name: "Career",
        slug: "career",
        description: "Strategize your professional trajectory and own your path.",
        icon: Briefcase,
    },
    {
        name: "Personal Development",
        slug: "personal-development",
        description: "Optimize your operating system for peak performance.",
        icon: User,
    },
    {
        name: "Technology",
        slug: "technology",
        description: "Future-proof your skillset with high-leverage outputs.",
        icon: Cpu,
    },
];

export default function CategoriesHub() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Header />
            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-20 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
                    <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-8 block">The Ecosystem Hub</span>
                    <h1 className="text-[54px] md:text-[80px] font-display font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight">
                        Explore by <br />
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold">Category.</span>
                    </h1>

                    <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-gray-100">
                        <p className="text-[20px] md:text-[22px] text-gray-400 font-light leading-relaxed tracking-tight">
                            Dive deep into the <span className="text-gray-900 font-medium">five core pillars</span> of the Portfolio Living ecosystem. Each hub is a dedicated space for mastering your life.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {CATEGORIES.map((cat) => (
                        <Link href={`/category/${cat.slug}`} key={cat.slug} className="group block h-full">
                            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

                                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-10 text-primary border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <cat.icon size={32} />
                                </div>
                                <h2 className="text-3xl font-sans font-bold text-gray-900 mb-6 group-hover:text-primary transition-colors">{cat.name}</h2>
                                <p className="text-gray-500 leading-relaxed mb-10 flex-grow font-light text-lg">&quot;{cat.description}&quot;</p>
                                <div className="flex items-center gap-3 text-sm font-black text-gray-900 mt-auto group-hover:text-primary uppercase tracking-widest transition-all">
                                    View Hub Portfolio <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
