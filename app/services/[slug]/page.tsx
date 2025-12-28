import { getServiceBySlug, getAllServices } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Props {
    params: {
        slug: string;
    }
}

export async function generateStaticParams() {
    try {
        const services = await getAllServices();
        return services.map((service) => ({
            slug: service.slug,
        }));
    } catch (error) {
        console.error("Error in generateStaticParams for /services/[slug]:", error);
        return [];
    }
}

export default async function ServicePage(props: Props) {
    const params = await props.params;
    const { slug } = params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const { serviceFields } = service;

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Header />

            <main className="pt-32 pb-20">
                {/* Back Button */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-black uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} /> Back to Ecosystem
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
                    <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-8 block">Design Your Life</span>
                    <h1 className="text-[54px] md:text-[72px] font-display font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                        {serviceFields.heroTitle || service.title}
                    </h1>

                    <div className="max-w-3xl mx-auto">
                        <p className="text-[20px] md:text-[24px] text-gray-400 font-light leading-relaxed tracking-tight">
                            {serviceFields.shortIntro}
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="bg-white rounded-[3rem] p-12 md:p-20 border border-gray-100 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />

                        <h2 className="text-[32px] md:text-[42px] font-bold text-gray-900 mb-10 leading-tight tracking-tight">
                            {serviceFields.sectionHeading || `Why ${service.title} Matters`}
                        </h2>

                        <div
                            className="prose prose-lg prose-primary max-w-none text-gray-600 font-light leading-relaxed mb-16
                            prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                            prose-strong:text-gray-900 prose-strong:font-bold
                            prose-p:mb-6"
                            dangerouslySetInnerHTML={{ __html: serviceFields.detailedContent }}
                        />

                        {/* CTA Section */}
                        <div className="border-t border-gray-100 pt-16 mt-16 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{serviceFields.ctaHeading || "Start Your Transformation"}</h3>
                            <Link
                                href={serviceFields.ctaLink || "/contact"}
                                className="inline-flex items-center gap-3 bg-primary text-white text-[16px] font-black px-10 py-5 rounded-full shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-[0.98] uppercase tracking-widest"
                            >
                                {serviceFields.ctaText || "Get Started"} <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Proof / Why Us Highlight */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "Personalized Strategy", desc: "No cookie-cutter advice. Every framework is tailored to your unique situation." },
                            { title: "Proven Frameworks", desc: "Built on years of research and real-world application with hundreds of clients." },
                            { title: "Continuous Support", desc: "We don't just give you a plan; we stay with you as you navigate the implementation." }
                        ].map((item, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                    <CheckCircle size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
