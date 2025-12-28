import { TrendingUp, MessageCircle, Briefcase, User, Cpu, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllServices } from "@/lib/wordpress";

export default async function ServicesPage() {
    const cmsServices = await getAllServices();

    const getIcon = (title: string) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes("investment")) return <TrendingUp className="w-8 h-8" />;
        if (lowerTitle.includes("communication")) return <MessageCircle className="w-8 h-8" />;
        if (lowerTitle.includes("career")) return <Briefcase className="w-8 h-8" />;
        if (lowerTitle.includes("personality") || lowerTitle.includes("personal")) return <User className="w-8 h-8" />;
        if (lowerTitle.includes("technology")) return <Cpu className="w-8 h-8" />;
        return <CheckCircle className="w-8 h-8" />;
    };

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Header />

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
                    <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-8 block">Our Ecosystem</span>
                    <h1 className="text-[54px] md:text-[60px] font-display font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight">
                        Design Your Life. <br />
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold">Master Your Wealth.</span>
                    </h1>

                    <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-gray-100">
                        <p className="text-[20px] md:text-[22px] text-gray-400 font-light leading-relaxed tracking-tight">
                            A <span className="text-gray-900 font-medium">comprehensive ecosystem</span> for ambitious individuals who want <span className="text-primary font-bold">more than just a job.</span>
                        </p>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {cmsServices.map((service, index) => (
                            <Link
                                href={`/services/${service.slug}`}
                                key={index}
                                className="group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden block"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

                                <div className={`mb-8 w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shadow-primary/10`}>
                                    {service.serviceFields.serviceIcon?.sourceUrl ? (
                                        <img
                                            src={service.serviceFields.serviceIcon.sourceUrl}
                                            alt={service.serviceFields.serviceIcon.altText}
                                            className="w-8 h-8 object-contain group-hover:invert transition-all"
                                        />
                                    ) : (
                                        getIcon(service.title)
                                    )}
                                </div>
                                <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-3 text-left">
                                    {service.serviceFields.serviceKey || "Core Wealth"}
                                </div>
                                <h3 className="text-[22px] font-sans font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors text-left">
                                    {service.title}
                                </h3>
                                <div className="text-[16px] text-gray-600 font-normal leading-relaxed mb-8 line-clamp-3 text-left">
                                    {service.serviceFields.shortIntro}
                                </div>
                                <div className="inline-flex items-center gap-2 text-sm font-black text-gray-900 group-hover:text-primary transition-colors uppercase tracking-widest">
                                    Explore Service <ArrowRight size={16} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Why Us Section */}
                <div className="bg-gray-50 py-20 rounded-[4rem] mx-4 md:mx-12 mb-20 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 opacity-50 blur-3xl" />
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="text-center mb-20">
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">Why Us</span>
                            <h2 className="text-[32px] font-sans font-bold text-gray-900 tracking-tight">Why Choose Portfolio Living?</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-16">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-100">
                                    <CheckCircle className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="text-[24px] font-sans font-bold text-gray-900 mb-4">Holistic Growth</h4>
                                <p className="text-[16px] text-gray-600 font-normal leading-relaxed">We don&apos;t just fix your finances; we upgrade your entire operating system.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-100">
                                    <CheckCircle className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="text-[24px] font-sans font-bold text-gray-900 mb-4">System-Based</h4>
                                <p className="text-[16px] text-gray-600 font-normal leading-relaxed">No vague advice. Just proven, repeatable frameworks that actually work.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-100">
                                    <CheckCircle className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="text-[24px] font-sans font-bold text-gray-900 mb-4">Modern Relevance</h4>
                                <p className="text-[16px] text-gray-600 font-normal leading-relaxed">Strategies specifically tailored for the connected, digital age.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center pb-20">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-primary text-white text-[18px] font-bold px-10 py-5 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-[0.98] mb-6"
                    >
                        Start My Transformation
                    </Link>
                    <p className="text-[14px] font-medium text-gray-900">
                        Upgrade My Life • Get The Blueprint
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}

