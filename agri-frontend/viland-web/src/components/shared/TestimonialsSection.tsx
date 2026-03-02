'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        content: "Since we started using Agrifarm, our crop yields have increased by 25%. The data-driven insights are a game-changer for our cooperative.",
        author: "Tran Thi Tuyen",
        role: "Farm Owner, Green Valley",
    },
    {
        id: 2,
        content: "Managing livestock used to be a guessing game. Now, we track everything in real-time. It saves us hours every week and reduces costs significantly.",
        author: "Nguyen Dinh Thang",
        role: "Livestock Manager",
    },
    {
        id: 3,
        content: "The irrigation control feature is phenomenal. We've conserved water while keeping our plants healthier than ever before. Highly recommended!",
        author: "Nguyen Dinh Vi",
        role: "Agricultural Engineer",
    }
];

const TestimonialsSection = () => {
    return (
        <section className="luxury-testimonials-section">
            <div className="luxury-testimonials-container">
                <motion.div
                    className="luxury-testimonials-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="luxury-section-subtitle">NOTEWORTHY VOICES</span>
                    <h2 className="luxury-section-headline">What They Say</h2>
                </motion.div>

                <motion.div
                    className="luxury-testimonials-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 }
                        }
                    }}
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            className="luxury-testimonial-card"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                        >
                            <Quote size={48} className="luxury-quote-icon" />
                            <p className="luxury-testimonial-content">"{testimonial.content}"</p>
                            <div className="luxury-testimonial-author">
                                <h4 className="luxury-testimonial-name">{testimonial.author}</h4>
                                <p className="luxury-testimonial-role">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
