import { TrendingUp, MessageCircle, Zap, Cpu } from "lucide-react";

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
        name: "Personal Development",
        description: "Systems to improve yourself and achieve your goals.",
        icon: Zap,
    },
    {
        name: "Career & Tech",
        description: "Navigate career growth and staying ahead in tech.",
        icon: Cpu,
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 font-display">
                        Core Pillars
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to build a balanced and successful life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-accent-tan/10 rounded-lg flex items-center justify-center mb-6 text-accent-tan">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
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
