import Link from "next/link";
import { TrendingUp, MessageCircle, Briefcase, User, Cpu, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CATEGORIES = [
    {
        name: "Investment",
        slug: "investment",
        description: "Architect your financial freedom.",
        icon: TrendingUp,
        color: "bg-blue-100 text-blue-600",
    },
    {
        name: "Communication",
        slug: "communication",
        description: "Amplify your influence and connection.",
        icon: MessageCircle,
        color: "bg-purple-100 text-purple-600",
    },
    {
        name: "Career",
        slug: "career",
        description: "Strategize your professional trajectory.",
        icon: Briefcase,
        color: "bg-red-100 text-red-600",
    },
    {
        name: "Personal Development",
        slug: "personal-development",
        description: "Optimize your operating system.",
        icon: User,
        color: "bg-orange-100 text-orange-600",
    },
    {
        name: "Technology",
        slug: "technology",
        description: "Future-proof your skillset.",
        icon: Cpu,
        color: "bg-indigo-100 text-indigo-600",
    },
];

export default function CategoriesHub() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent pb-2">Explore by Category</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Dive deep into the five pillars of the Portfolio Living ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CATEGORIES.map((cat) => (
                        <Link href={`/category/${cat.slug}`} key={cat.slug} className="group block h-full">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                <div className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center mb-6`}>
                                    <cat.icon size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{cat.name}</h2>
                                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{cat.description}</p>
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mt-auto group-hover:gap-4 transition-all">
                                    View Hub <ArrowRight size={16} />
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
