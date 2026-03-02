'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FinalCTASection = () => {
  return (
    <section className="luxury-cta-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <span className="luxury-section-subtitle" style={{ color: 'var(--lux-accent)' }}>BEGIN YOUR JOURNEY</span>
        <h2 className="luxury-cta-headline">Ready to grow your farm smarter?</h2>
        <p className="luxury-cta-text">
          Join the prestigious network of agricultural pioneers who trust Viland Farm for unparalleled growth.
        </p>
        <Link href="/dashboard" className="luxury-btn-outline">
          Get Started Today
        </Link>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
