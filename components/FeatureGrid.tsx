import { TrendingUp, MessageCircle, Briefcase, User, Cpu } from "lucide-react";

const features = [
    {
        name: "Investment",
        description: "Strategies for building and managing long-term wealth.",
        icon: TrendingUp,
    },
    {
        name: "Communication",
        description: "Enhance your interpersonal and professional influence.",
        icon: MessageCircle,
    },
    {
        name: "Career",
        description: "Navigate career growth and professional milestones.",
        icon: Briefcase,
    },
    {
        name: "Personal Development",
        description: "Systems to improve yourself and achieve your goals.",
        icon: User,
    },
    {
        name: "Technology",
        description: "Staying ahead in the rapidly evolving digital landscape.",
        icon: Cpu,
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[40px] font-sans font-bold text-gray-900">
                        Core Pillars
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to build a balanced and successful life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-gray-100 flex flex-col items-center text-center group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary/20 transition-colors">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-sans">
                                {feature.name}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
