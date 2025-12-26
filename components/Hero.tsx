import ColorPattern from "./ColorPattern";
import HexagonGrid from "./HexagonGrid";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden min-h-[80vh]">
            <ColorPattern />
            <HexagonGrid />

            <div className="relative z-10 w-full flex flex-col items-center">
                <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-8 block">The Portfolio Living</span>
                <h1 className="text-[48px] md:text-[60px] font-display font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight max-w-5xl mx-auto">
                    Simple systems for <br />
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold">wealth, career & communication.</span>
                </h1>

                <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-gray-100 flex flex-col items-center">
                    <p className="text-[20px] md:text-[22px] text-gray-400 font-light leading-relaxed tracking-tight mb-10 max-w-2xl">
                        Practical advice on how to <span className="text-gray-900 font-medium">grow your wealth</span>, improve your lead, and navigate tech.
                    </p>

                    <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 appearance-none border border-gray-200 rounded-xl py-4 px-6 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        />
                        <button className="bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-secondary transition-all shadow-lg shadow-primary/20 hover:shadow-xl whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>

                    <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Join 10,000+ top performers. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}
