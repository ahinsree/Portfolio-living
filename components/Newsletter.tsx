export default function Newsletter() {
    return (
        <section className="py-24 bg-accent-tan/5" id="newsletter">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-6">
                    Subscribe to the Newsletter
                </h2>
                <p className="text-lg text-gray-600 mb-10">
                    Join a community of 50,000+ readers receiving weekly insights on wealth, career, and communication. No spam, ever.
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 appearance-none border border-gray-300 rounded-md py-3 px-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-tan focus:border-accent-tan"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-accent-tan text-white font-medium py-3 px-8 rounded-md hover:bg-opacity-90 transition-opacity shadow-lg shadow-accent-tan/20"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
}
