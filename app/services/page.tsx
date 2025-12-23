import { TrendingUp, MessageCircle, Briefcase, User, Cpu, CheckCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function ServicesPage() {
    const services = [
        {
            title: "Investment",
            theme: "Growth",
            hook: "Stop saving. Start building real wealth.",
            value: "Data-driven strategies to grow your portfolio exponentially without the stress of day trading.",
            icon: <TrendingUp className="w-8 h-8 text-primary" />,
        },
        {
            title: "Communication",
            theme: "Connection",
            hook: "Speak so others actually listen.",
            value: "Psychology-backed techniques to command respect, negotiate better, and influence outcomes in any room.",
            icon: <MessageCircle className="w-8 h-8 text-secondary" />,
        },
        {
            title: "Career",
            theme: "Strategy",
            hook: "Don't just climb the ladder. Own it.",
            value: "Strategic frameworks to navigate corporate politics, negotiate raises, and fast-track your promotions.",
            icon: <Briefcase className="w-8 h-8 text-accent" />,
        },
        {
            title: "Personal Development",
            theme: "Balance",
            hook: "Optimize your most valuable asset: You.",
            value: "Actionable systems to boost productivity, mental clarity, and emotional resilience for peak performance.",
            icon: <User className="w-8 h-8 text-primary" />,
        },
        {
            title: "Technology",
            theme: "Innovation",
            hook: "Future-proof your skillset today.",
            value: "Stay ahead of the curve with essential tech insights that keep you relevant and in demand.",
            icon: <Cpu className="w-8 h-8 text-secondary" />,
        },
    ];

    const whyUs = [
        "Holistic Growth: We don&apos;t just fix your finances; we upgrade your entire operating system.",
        "System-Based: No vague advice. Just proven, repeatable frameworks that actually work.",
        "Modern Relevance: Strategies specifically tailored for the connected, digital age.",
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">
                        Design Your Life. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                            Master Your Wealth.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A comprehensive ecosystem for ambitious individuals who want more than just a job.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                            >
                                <div className="mb-6 p-3 bg-gray-50 rounded-xl inline-block group-hover:bg-white group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">
                                    {service.theme}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-lg font-medium text-gray-800 mb-3 italic">
                                    &quot;{service.hook}&quot;
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Us Section */}
                <div className="bg-white py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mb-20 shadow-sm border border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Why Choose Portfolio Living?</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            {whyUs.map((item, index) => {
                                const [title, desc] = item.split(": ");
                                return (
                                    <div key={index} className="flex flex-col items-center text-center">
                                        <CheckCircle className="w-12 h-12 text-accent-tan mb-4" />
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
                                        <p className="text-gray-600">{desc}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center pb-12">
                    <Link
                        href="#contact"
                        className="inline-block bg-accent-tan text-white text-lg font-bold px-10 py-5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        Start My Transformation
                    </Link>
                    <div className="mt-4 flex justify-center gap-4 text-sm text-gray-500 font-medium">
                        <span>Upgrade My Life</span>
                        <span>•</span>
                        <span>Get The Blueprint</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
