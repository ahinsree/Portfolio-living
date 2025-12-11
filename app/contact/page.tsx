"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, CheckCircle, ArrowRight, Send } from "lucide-react";

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
        <div className="min-h-screen bg-white font-sans selection:bg-accent-tan selection:text-white">
            <Header />

            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Column - Hero & Form */}
                    <div className="lg:col-span-7">
                        <section className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                                Ready to Diversify Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                    Life Assets?
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed font-light">
                                Start the conversation. We guarantee a personalized response from a senior strategist within 24 hours. No bots, just solutions.
                            </p>
                        </section>

                        <form className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-gray-900 uppercase tracking-wide">Name</label>
                                    <input type="text" id="name" placeholder="Your Name" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-gray-900 uppercase tracking-wide">Email</label>
                                    <input type="email" id="email" placeholder="your@email.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-900 uppercase tracking-wide block">How can we help you upgrade?</label>
                                <div className="grid gap-3">
                                    {interestOptions.map((option) => (
                                        <label key={option.id} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all group ${selectedInterest === option.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                                            <input
                                                type="radio"
                                                name="interest"
                                                value={option.id}
                                                checked={selectedInterest === option.id}
                                                onChange={(e) => setSelectedInterest(e.target.value)}
                                                className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                            />
                                            <span className={`ml-3 font-medium ${selectedInterest === option.id ? 'text-primary' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-gray-900 uppercase tracking-wide">Additional Details</label>
                                <textarea id="message" rows={4} placeholder="Tell us a bit more about your current situation..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"></textarea>
                            </div>

                            <button type="button" className="inline-flex items-center justify-center w-full md:w-auto bg-gray-900 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-800 transition-all hover:shadow-lg transform hover:-translate-y-1 gap-2">
                                Request Strategy Session <Send size={18} />
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Trust & Info */}
                    <div className="lg:col-span-5 space-y-12 lg:pt-32">
                        {/* What Happens Next */}
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">What Happens Next?</h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <span className="font-bold text-sm">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">We Review Your Profile</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">Our team analyzes your request to match you with the right specialist.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                        <span className="font-bold text-sm">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">Strategy Call Scheduling</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">You'll receive a personal calendar link to book your 1-on-1 session.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <span className="font-bold text-sm">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">The Roadmap</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">We walk away with a clear, actionable plan to upgrade your asset.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Direct Contact Info */}
                        <div>
                            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">Direct Channels</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm group-hover:border-primary/30 transition-colors">
                                        <Mail className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium mb-0.5">Email Us</p>
                                        <p className="text-gray-900 font-bold">concierge@portfolioliving.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm group-hover:border-primary/30 transition-colors">
                                        <Phone className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium mb-0.5">Call Us</p>
                                        <p className="text-gray-900 font-bold">+1 (555) 012-3456</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm">
                                        <MapPin className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium mb-0.5">Visit HQ</p>
                                        <p className="text-gray-900 font-bold">100 Wealth Blvd, New York, NY</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
