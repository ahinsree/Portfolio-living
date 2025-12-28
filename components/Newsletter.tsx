export default function Newsletter({ heading, text, cta }: { heading?: string, text?: string, cta?: string }) {
    return (
        <section className="py-24 bg-accent-tan/5" id="newsletter">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 mb-6">
                    {heading || "Subscribe to the Newsletter"}
                </h2>
                <p className="text-lg text-gray-600 mb-10">
                    {text || "Join a community of 50,000+ readers receiving weekly insights on wealth, career, and communication. No spam, ever."}
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 appearance-none border border-gray-200 rounded-xl py-4 px-6 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-secondary transition-all shadow-lg shadow-primary/20 hover:shadow-xl active:scale-[0.98]"
                    >
                        {cta || "Subscribe"}
                    </button>
                </form>
            </div>
        </section>
    );
}
