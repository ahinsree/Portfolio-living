"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, ArrowRight, ShieldCheck } from "lucide-react";

export default function ContactPage() {
    const [selectedInterest, setSelectedInterest] = useState("");

    const interestOptions = [
        { id: "wealth", label: "I need help with my Wealth (Investment)" },
        { id: "communication", label: "I want to improve my Speaking (Communication)" },
        { id: "career", label: "I need a Career Strategy" },
        { id: "tech", label: "I want to upgrade my Tech Stack" },
        { id: "growth", label: "I'm looking for Personal Growth" },
    ];

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Header />

            <main className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-24 relative">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

                    {/* Left Column - Hero & Form */}
                    <div className="lg:col-span-7">
                        <section className="mb-16">
                            <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-6 block">Get in Touch</span>
                            <h1 className="text-[54px] md:text-[68px] font-display font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight">
                                Ready to <br />
                                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold">Diversify?</span>
                            </h1>
                            <div className="max-w-2xl mt-4 pt-4 border-t border-gray-100">
                                <p className="text-[20px] md:text-[22px] text-gray-400 font-light leading-relaxed tracking-tight">
                                    Start the conversation. We guarantee a personalized response from a senior strategist <span className="text-gray-900 font-medium">within 24 hours.</span>
                                </p>
                            </div>
                        </section>

                        <form className="space-y-10 group">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input type="text" id="name" placeholder="John Doe" className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-5 focus:border-primary focus:bg-white outline-none transition-all font-medium text-gray-900 rounded-t-2xl" />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input type="email" id="email" placeholder="john@example.com" className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-5 focus:border-primary focus:bg-white outline-none transition-all font-medium text-gray-900 rounded-t-2xl" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">How can we help you upgrade?</label>
                                <div className="grid gap-4">
                                    {interestOptions.map((option) => (
                                        <label key={option.id} className={`flex items-center p-6 rounded-2xl cursor-pointer transition-all border ${selectedInterest === option.id ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5' : 'border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5'}`}>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedInterest === option.id ? 'border-primary bg-primary' : 'border-gray-200 bg-white'}`}>
                                                {selectedInterest === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <input
                                                type="radio"
                                                name="interest"
                                                value={option.id}
                                                checked={selectedInterest === option.id}
                                                onChange={(e) => setSelectedInterest(e.target.value)}
                                                className="hidden"
                                            />
                                            <span className={`ml-4 font-bold text-sm tracking-tight transition-colors ${selectedInterest === option.id ? 'text-primary' : 'text-gray-600'}`}>
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Short Brief</label>
                                <textarea id="message" rows={5} placeholder="Tell us about your goals..." className="w-full bg-gray-50 border-b-2 border-gray-100 px-6 py-5 focus:border-primary focus:bg-white outline-none transition-all font-medium text-gray-900 rounded-t-2xl resize-none"></textarea>
                            </div>

                            <button type="button" className="inline-flex items-center justify-center w-full md:w-auto bg-primary text-white font-bold text-lg px-12 py-5 rounded-full hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:shadow-2xl active:scale-[0.98] gap-3">
                                Request Strategy Session <Send size={20} />
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Trust & Info */}
                    <div className="lg:col-span-5 space-y-16">
                        {/* What Happens Next */}
                        <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-2xl shadow-gray-200/50">
                            <h3 className="text-2xl font-sans font-bold text-gray-900 mb-10 flex items-center gap-4">
                                <div className="w-8 h-1 bg-primary rounded-full" />
                                Next Steps
                            </h3>
                            <ul className="space-y-10">
                                <li className="flex gap-6 relative group">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 font-black text-lg border border-gray-100 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                        1
                                    </div>
                                    <div className="h-full w-[1px] bg-gray-100 absolute left-6 top-10 -bottom-10" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base mb-2">Profile Review</h4>
                                        <p className="text-sm text-gray-500 font-light leading-relaxed">Our team analyzes your goals to match you with a specialist.</p>
                                    </div>
                                </li>
                                <li className="flex gap-6 relative group">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 font-black text-lg border border-gray-100 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                        2
                                    </div>
                                    <div className="h-full w-[1px] bg-gray-100 absolute left-6 top-10 -bottom-10" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base mb-2">Strategy Call</h4>
                                        <p className="text-sm text-gray-500 font-light leading-relaxed">Receive a personal link to book your discovery session.</p>
                                    </div>
                                </li>
                                <li className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 font-black text-lg border border-gray-100 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base mb-2">The Architecture</h4>
                                        <p className="text-sm text-gray-500 font-light leading-relaxed">Walk away with a clear, actionable plan to upgrade your life.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Direct Contact Info */}
                        <div className="px-6">
                            <h3 className="text-[10px] font-black tracking-[0.3em] text-gray-300 uppercase mb-8">Direct Channels</h3>
                            <div className="space-y-10">
                                <div className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-xl shadow-gray-200/30 group-hover:border-primary group-hover:text-primary transition-all">
                                        <Mail className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Email Us</p>
                                        <p className="text-gray-900 font-bold text-lg group-hover:text-primary transition-colors tracking-tight">hello@portfolioliving.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-xl shadow-gray-200/30 group-hover:border-primary group-hover:text-primary transition-all">
                                        <Phone className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Call Us</p>
                                        <p className="text-gray-900 font-bold text-lg group-hover:text-primary transition-colors tracking-tight">+1 (888) 123-PORT</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-xl shadow-gray-200/30 group-hover:border-primary group-hover:text-primary transition-all">
                                        <MapPin className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Visit HQ</p>
                                        <p className="text-gray-900 font-bold text-lg group-hover:text-primary transition-colors tracking-tight">100 Wealth Blvd, New York, NY</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center gap-6">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <ShieldCheck className="text-primary w-6 h-6" />
                            </div>
                            <p className="text-sm text-gray-500 font-medium leading-tight">
                                Your information is encrypted and never shared. We value your privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
