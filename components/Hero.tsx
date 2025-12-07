import ColorPattern from "./ColorPattern";
import HexagonGrid from "./HexagonGrid";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden min-h-[80vh]">
            <ColorPattern />
            <HexagonGrid />

            <div className="relative z-10 w-full flex flex-col items-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto cursor-default">
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-gray-900 hover:text-transparent transition-colors duration-300 cursor-pointer">
                        Simple systems for wealth, career & communication
                    </span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                    Practical advice on how to grow your wealth, improve your communication
                    skills, advance your career, and navigate tech.
                </p>

                <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="flex-1 appearance-none border border-gray-300 rounded-md py-3 px-4 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-tan focus:border-transparent"
                    />
                    <button className="bg-accent-tan text-white font-medium py-3 px-6 rounded-md hover:opacity-90 transition-opacity whitespace-nowrap">
                        Subscribe
                    </button>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                    Join 10,000+ readers. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
