"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

import { WordPressTestimonial } from "@/lib/wordpress";

const defaultTestimonials = [
    {
        name: "Alex Reed",
        role: "Tech Entrepreneur",
        content: "The Portfolio Living has completely transformed my approach to personal finance. The strategies are easy to follow and incredibly effective.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=alex"
    },
    {
        name: "Sarah Chen",
        role: "Marketing Director",
        content: "The focus on communication and personal development is what sets this apart. It's not just about money, it's about building a better life.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        name: "James Wilson",
        role: "Software Engineer",
        content: "I've tried many systems, but the Core Pillars here are the most holistic and practical I've found. Highly recommended!",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=james"
    }
];

interface TestimonialsProps {
    data?: WordPressTestimonial[];
}

export default function Testimonials({ data }: TestimonialsProps) {
    const mappedTestimonials = data?.filter(node => node && node.testimonialFields).map(node => ({
        name: node.testimonialFields.personName || "Community Member",
        role: node.testimonialFields.personRole || "Professional",
        content: node.testimonialFields.testimonialText || "Great experience with the systems.",
        rating: node.testimonialFields.rating || 5,
        image: node.testimonialFields?.personImage?.node?.sourceUrl || `https://i.pravatar.cc/150?u=${node.testimonialFields?.personName || 'user'}`
    }));

    const displayTestimonials = mappedTestimonials && mappedTestimonials.length > 0
        ? mappedTestimonials
        : defaultTestimonials;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 font-sans mb-6"
                    >
                        What Our <span className="text-primary">Community</span> Says
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Join thousands of others who are transforming their lives through our core pillars of success.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={`${testimonial.name}-${index}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative group flex flex-col items-center text-center h-full"
                        >
                            <div className="absolute -top-4 right-8 bg-primary p-3 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                <Quote className="text-white" size={20} />
                            </div>

                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(Math.max(0, Math.floor(testimonial.rating)))].map((_, i) => (
                                    <Star key={i} size={16} className="fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-8 italic">
                                "{testimonial.content}"
                            </p>

                            <div className="mt-auto pt-8 flex flex-col items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 shadow-inner">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-gray-900 font-sans">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 font-medium">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
