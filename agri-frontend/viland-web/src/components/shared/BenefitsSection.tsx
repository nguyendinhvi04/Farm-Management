'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Leaf, Smartphone } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="luxury-benefits-section">
      <motion.div
        className="luxury-testimonials-header" /* using the same header style as testimonials */
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <span className="luxury-section-subtitle">THE ADVANTAGE</span>
        <h2 className="luxury-section-headline">Farm Benefits</h2>
      </motion.div>

      <motion.div
        className="luxury-benefits-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
      >
        <motion.div className="luxury-benefit-card" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
          <div className="luxury-benefit-icon"><Coins size={28} /></div>
          <h3 className="luxury-benefit-title">Reduced Costs</h3>
          <p className="luxury-benefit-desc">Optimize resources and reduce waste with smart farming technology</p>
        </motion.div>
        <motion.div className="luxury-benefit-card" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
          <div className="luxury-benefit-icon"><Leaf size={28} /></div>
          <h3 className="luxury-benefit-title">Increased Yield</h3>
          <p className="luxury-benefit-desc">Better crop and livestock output through data-driven farming</p>
        </motion.div>
        <motion.div className="luxury-benefit-card" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
          <div className="luxury-benefit-icon"><Smartphone size={28} /></div>
          <h3 className="luxury-benefit-title">Easy Management</h3>
          <p className="luxury-benefit-desc">Access your farm data from any device, anywhere, anytime</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BenefitsSection;
