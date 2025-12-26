"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Layers, ShieldCheck, Zap, TrendingUp, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function About() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Header />

            <main>
                {/* Hero / Hook Section */}
                <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
                    <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-8 block">The Paradigm Shift</span>
                    <h1 className="text-[54px] md:text-[60px] font-display font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight">
                        Playing It Safe Is <br />
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold">The Riskiest Move.</span>
                    </h1>

                    <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-gray-100">
                        <p className="text-[20px] md:text-[22px] text-gray-400 font-light leading-relaxed tracking-tight">
                            Old wealth was about accumulation. <span className="text-gray-900 font-medium whitespace-nowrap">New wealth is about optimization.</span>
                        </p>
                    </div>
                </section>

                {/* The Philosophy Section */}
                <section className="py-20 bg-gray-50 rounded-[4rem] mx-4 md:mx-12 overflow-hidden border border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div>
                                <h2 className="text-[32px] md:text-[40px] font-sans font-bold text-gray-900 mb-8 leading-tight">True Diversification</h2>
                                <p className="text-gray-500 text-lg mb-8 leading-relaxed font-light">
                                    Most advisors tell you to diversify your stocks. We tell you to <span className="text-primary font-bold">diversify your life</span>. A robust portfolio requires two types of capital:
                                </p>
                                <div className="space-y-10">
                                    <div className="flex gap-6 group">
                                        <div className="w-16 h-16 bg-white shadow-xl rounded-[1.25rem] flex items-center justify-center flex-shrink-0 border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <TrendingUp className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="font-sans font-bold text-gray-900 text-xl mb-2">Hard Assets</h3>
                                            <p className="text-gray-500 font-light leading-relaxed text-base">Smart Investments & Cutting-Edge Technology. This is your infrastructure.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group">
                                        <div className="w-16 h-16 bg-white shadow-xl rounded-[1.25rem] flex items-center justify-center flex-shrink-0 border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Users className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="font-sans font-bold text-gray-900 text-xl mb-2">Soft Assets</h3>
                                            <p className="text-gray-500 font-light leading-relaxed text-base">Communication, Career Strategy, & Mindset. This is your growth engine.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm relative text-gray-500 font-light">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-full" />
                                    &quot;Neglecting one exposes you to risk. Mastering both makes you antifragile.&quot;
                                </div>
                            </div>

                            {/* Abstract Visual Representation */}
                            <div className="relative h-[600px] w-full bg-white rounded-[3rem] shadow-2xl p-12 overflow-hidden border border-gray-100">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white z-0" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[100px]" />
                                <div className="relative z-10 flex flex-col justify-center h-full">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 transform translate-y-10 hover:-translate-y-2 transition-transform duration-500 cursor-pointer group">
                                            <Zap className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                                            <div className="h-2 w-24 bg-gray-100 rounded-full mb-3" />
                                            <div className="h-2 w-16 bg-gray-100 rounded-full" />
                                        </div>
                                        <div className="bg-primary p-8 rounded-[2rem] shadow-2xl shadow-primary/30 transform -translate-y-6 hover:-translate-y-10 transition-transform duration-500 cursor-pointer group">
                                            <ShieldCheck className="w-10 h-10 text-white mb-6 group-hover:scale-110 transition-transform" />
                                            <div className="h-2 w-24 bg-white/20 rounded-full mb-3" />
                                            <div className="h-2 w-16 bg-white/20 rounded-full" />
                                        </div>
                                        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 transform translate-y-4 hover:-translate-y-6 transition-transform duration-500 cursor-pointer group">
                                            <Layers className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                                            <div className="h-2 w-24 bg-gray-100 rounded-full mb-3" />
                                            <div className="h-2 w-16 bg-gray-100 rounded-full" />
                                        </div>
                                        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 transform -translate-y-12 hover:-translate-y-16 transition-transform duration-500 cursor-pointer group">
                                            <TrendingUp className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                                            <div className="h-2 w-24 bg-gray-100 rounded-full mb-3" />
                                            <div className="h-2 w-16 bg-gray-100 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="text-center mt-16 font-serif font-black text-gray-200 uppercase tracking-[0.4em] text-xs">The Asset Matrix</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Mission */}
                <section className="py-24 text-center px-4 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 -z-10 skew-y-3" />
                    <div className="max-w-4xl mx-auto">
                        <div className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-10 border border-gray-100">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-[32px] md:text-[48px] font-sans font-bold mb-10 text-gray-900">Our Mission</h2>
                        <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-500 max-w-4xl mx-auto">
                            To help you become a <span className="text-gray-900 font-bold border-b-4 border-primary/20 pb-1">Complete Asset</span>—a person who commands wealth, influence, and purpose. We engineer the architecture of your ultimate life.
                        </p>
                    </div>
                </section>

                {/* The Portfolio approach */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4 block">The Methodology</span>
                        <h2 className="text-[32px] md:text-[40px] font-sans font-bold text-gray-900 mb-6 tracking-tight">Systematic Growth.</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">We don&apos;t offer band-aids. We offer lifetime system upgrades.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/5 transition-colors">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-sans font-bold text-2xl text-gray-900 mb-4">Holistic Integration</h3>
                            <p className="text-gray-500 font-light leading-relaxed">
                                You don&apos;t just fix your finances; you optimize your psychology. Every part of the system feeds the others.
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/5 transition-colors">
                                <Layers className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-sans font-bold text-2xl text-gray-900 mb-4">Compounding Growth</h3>
                            <p className="text-gray-500 font-light leading-relaxed">
                                You don&apos;t just get a promotion; you upgrade your communication to hold that room. Improvements compound.
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/5 transition-colors">
                                <TrendingUp className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-sans font-bold text-2xl text-gray-900 mb-4">Engineered Freedom</h3>
                            <p className="text-gray-500 font-light leading-relaxed">
                                We don&apos;t believe in luck. We believe in constructing a life that is designed to succeed by default.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="pb-20 text-center">
                    <Link href="/contact" className="inline-flex items-center gap-3 bg-primary text-white font-bold text-xl px-12 py-6 rounded-full hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:shadow-2xl active:scale-[0.98]">
                        Build Your Portfolio <ArrowRight size={20} />
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}
