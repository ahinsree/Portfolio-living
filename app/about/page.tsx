"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Layers, ShieldCheck, Zap, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function About() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-navy-900 selection:text-white">
            <Header />

            <main>
                {/* Hero / Hook Section */}
                <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                    <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">The Paradigm Shift</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                        Playing It Safe Is <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent pb-1">The Riskiest Move You Can Make.</span>
                    </h1>
                    <div className="prose prose-lg mx-auto text-gray-600">
                        <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                            The era of the single-track career and the passive retirement plan is over.
                            To thrive in the modern world, you cannot just maximize one variable.
                            Old wealth was about accumulation. New wealth is about <strong>optimization</strong>.
                        </p>
                    </div>
                </section>

                {/* The Philosophy Section - Diversification Metaphor */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">True Diversification</h2>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    Most advisors tell you to diversify your stocks. We tell you to <span className="text-gray-900 font-bold">diversify your life</span>.
                                </p>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    A robust portfolio requires two types of capital:
                                </p>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <TrendingUp className="text-blue-600 w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">Hard Assets</h3>
                                            <p className="text-gray-500">Smart Investments & Cutting-Edge Technology. This is your infrastructure.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Users className="text-purple-600 w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">Soft Assets</h3>
                                            <p className="text-gray-500">Communication, Career Strategy, & Mindset. This is your growth engine.</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-8 text-gray-600 italic border-l-4 border-primary pl-4">
                                    "Neglecting one exposes you to risk. Mastering both makes you antifragile."
                                </p>
                            </div>
                            {/* Abstract Visual Representation */}
                            <div className="relative h-[500px] w-full bg-white rounded-3xl shadow-2xl p-8 overflow-hidden border border-gray-100">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white z-0" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
                                <div className="relative z-10 flex flex-col justify-center h-full">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform translate-y-8">
                                            <Zap className="w-8 h-8 text-accent mb-4" />
                                            <div className="h-2 w-20 bg-gray-200 rounded mb-2" />
                                            <div className="h-2 w-12 bg-gray-200 rounded" />
                                        </div>
                                        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg transform -translate-y-4">
                                            <ShieldCheck className="w-8 h-8 text-white mb-4" />
                                            <div className="h-2 w-20 bg-gray-700 rounded mb-2" />
                                            <div className="h-2 w-12 bg-gray-700 rounded" />
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform translate-y-4">
                                            <Layers className="w-8 h-8 text-secondary mb-4" />
                                            <div className="h-2 w-20 bg-gray-200 rounded mb-2" />
                                            <div className="h-2 w-12 bg-gray-200 rounded" />
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform -translate-y-8">
                                            <TrendingUp className="w-8 h-8 text-primary mb-4" />
                                            <div className="h-2 w-20 bg-gray-200 rounded mb-2" />
                                            <div className="h-2 w-12 bg-gray-200 rounded" />
                                        </div>
                                    </div>
                                    <div className="text-center mt-8 font-serif font-bold text-gray-400">The Asset Matrix</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Mission */}
                <section className="bg-gray-900 text-white py-24 text-center px-4">
                    <div className="max-w-4xl mx-auto">
                        <ShieldCheck className="w-16 h-16 text-accent mx-auto mb-8" />
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Our Mission</h2>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200">
                            To help you become a <span className="text-white font-medium border-b-2 border-accent">Complete Asset</span>—a person who commands wealth, influence, and purpose in equal measure. We exist to engineer the architecture of your ultimate life.
                        </p>
                    </div>
                </section>

                {/* The Portfolio Approach */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">The Portfolio Approach</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">We don't offer band-aids. We offer system upgrades.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-primary/20 transition-colors">
                            <h3 className="font-bold text-xl text-gray-900 mb-4">Holistic Integration</h3>
                            <p className="text-gray-600">
                                You don't just fix your finances; you optimize your psychology. Every part of the system feeds the others.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-primary/20 transition-colors">
                            <h3 className="font-bold text-xl text-gray-900 mb-4">Compounding Growth</h3>
                            <p className="text-gray-600">
                                You don't just get a promotion; you upgrade your communication to hold that room. Improvements compound over time.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-primary/20 transition-colors">
                            <h3 className="font-bold text-xl text-gray-900 mb-4">Engineered Freedom</h3>
                            <p className="text-gray-600">
                                We don't believe in luck. We believe in constructing a life that is designed to succeed by default.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="pb-24 text-center">
                    <Link href="/contact" className="inline-block bg-gray-900 text-white font-bold text-lg px-10 py-5 rounded-full hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-1">
                        Build Your Complete Portfolio
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}
