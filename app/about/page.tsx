"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { TrendingUp, MessageCircle, Cpu, Zap, Briefcase, BookOpen, FileText, Video } from "lucide-react";

export default function About() {
    return (
        <main className="min-h-screen bg-white selection:bg-brand-blue/20">
            <Header />

            {/* Hero / Mission Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-8">
                    Simple Systems for Wealth, Career & Communication
                </h1>
                <div className="prose prose-lg mx-auto text-gray-600">
                    <p className="text-xl leading-relaxed">
                        At <strong>Portfolio Living</strong>, our goal is to help you think better, work smarter, and build wealth.
                        We are dedicated to providing simple systems for wealth, work, and life.
                    </p>
                </div>
            </section>

            {/* What We Cover Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Cover</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Investment */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center mb-6 text-brand-blue">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Investment</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We provide strategies for building and managing wealth. Whether you are looking for a beginner's guide to building wealth or a plan for asset allocation and risk, we simplify the process.
                            </p>
                        </div>

                        {/* Communication */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100/50 rounded-xl flex items-center justify-center mb-6 text-brand-purple">
                                <MessageCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Communication</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We believe effective communication is vital. We share resources on enhancing your interpersonal and professional skills, with a focus on listening, speaking, and nonverbal strategies.
                            </p>
                        </div>

                        {/* Career */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-red-100/50 rounded-xl flex items-center justify-center mb-6 text-brand-red">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Career</h3>
                            <p className="text-gray-600 leading-relaxed">
                                From setting goals for personal growth to developing leadership skills, we offer roadmaps for your professional path. We also provide guidance on mastering job interviews and navigating career transitions.
                            </p>
                        </div>

                        {/* Personal Development */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-orange-100/50 rounded-xl flex items-center justify-center mb-6 text-orange-500">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Development</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We offer insights on improving yourself and achieving your goals, including practical tips on productivity and improving sleep habits.
                            </p>
                        </div>

                        {/* Technology */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-100/50 rounded-xl flex items-center justify-center mb-6 text-indigo-500">
                                <Cpu size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Technology</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We explore the impact of technology on various industries, including the future of cryptocurrency and using AI in the workplace.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Our Resources Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-700">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Guides</h3>
                        <p className="text-gray-600">In-depth articles and helpful tools.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-700">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Blog</h3>
                        <p className="text-gray-600">Regular updates on the latest trends and strategies.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-700">
                            <Video size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Videos</h3>
                        <p className="text-gray-600">Visual content focused on effective communication and passive income strategies.</p>
                    </div>
                </div>
            </section>

            {/* Join Community / Newsletter */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Subscribe to our newsletter to get the latest updates, tips, and insights delivered directly to your inbox. Get one insight weekly—no spam, just clarity.
                    </p>
                </div>
                <Newsletter />
            </div>

            <Footer />
        </main>
    );
}
