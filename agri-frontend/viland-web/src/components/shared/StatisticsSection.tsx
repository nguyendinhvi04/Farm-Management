'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const statsData = [
    { id: 1, label: 'Hectares Managed', value: 10000, suffix: '+', increment: 100 },
    { id: 2, label: 'Active Farmers', value: 500, suffix: '+', increment: 10 },
    { id: 3, label: 'Partner Suppliers', value: 50, suffix: '+', increment: 1 },
    { id: 4, label: 'Yield Increase', value: 25, suffix: '%', increment: 1 },
];

const StatCounter = ({ value, suffix, increment }: { value: number, suffix: string, increment: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            if (start === end) return;
            const totalDuration = 2000;
            const stepTime = Math.abs(Math.floor(totalDuration / (end / increment)));

            const timer = setInterval(() => {
                start += increment;
                setCount(start);
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                }
            }, stepTime);
            return () => clearInterval(timer);
        }
    }, [isInView, increment, value]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const StatisticsSection = () => {
    return (
        <section className="luxury-stats-section">
            <div className="luxury-stats-container">
                <motion.div
                    className="luxury-stats-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="luxury-stats-subtitle">THE REACH</span>
                    <h2 className="luxury-stats-headline">By the Numbers</h2>
                </motion.div>

                <motion.div
                    className="luxury-stats-grid"
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
                    {statsData.map((stat, index) => (
                        <React.Fragment key={stat.id}>
                            <motion.div
                                className="luxury-stat-card"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.95 },
                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
                                }}
                            >
                                <div className="luxury-stat-number">
                                    <StatCounter value={stat.value} suffix={stat.suffix} increment={stat.increment} />
                                </div>
                                <div className="luxury-stat-label">{stat.label}</div>
                            </motion.div>

                            {/* Visual separator line between stats on desktop */}
                            {index < statsData.length - 1 && (
                                <motion.div
                                    className="luxury-stat-divider"
                                    variants={{
                                        hidden: { scaleY: 0 },
                                        visible: { scaleY: 1, transition: { duration: 0.8 } }
                                    }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default StatisticsSection;
