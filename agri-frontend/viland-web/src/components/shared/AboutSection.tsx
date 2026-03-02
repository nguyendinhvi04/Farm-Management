'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="luxury-about-section">
      <div className="luxury-container luxury-about-container">
        <motion.div
          className="luxury-about-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="luxury-section-subtitle">OUR MISSION</span>
          <h2 className="luxury-section-headline">Elevating agriculture<br />to an art form.</h2>

          <div className="luxury-about-text-wrapper">
            <p className="luxury-about-text">
              VILAND FARM meticulously curates the relationship between land and technology. We provide farmers with an elegant, all-in-one platform to orchestrate crops, livestock, irrigation, and finances.
            </p>
            <p className="luxury-about-text">
              Monitor your farm's health, optimize resources, and increase yields with real-time data and intelligent insights, refined for the modern agribusiness.
            </p>
            <Link href="/about" className="luxury-btn-dark">
              Discover Our Heritage
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
