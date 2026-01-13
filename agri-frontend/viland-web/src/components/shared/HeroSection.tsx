'use client';

import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <Link href="/dashboard" className="cta-button">
          Create your farm
        </Link>

        <div className="logo-section">
          <h1 className="logo-text">
            <span className="wheat-icon">🌾</span>
            VILAND FARM
          </h1>
          <p className="logo-subtitle">FARM MANAGEMENT</p>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>↓</span>
      </div>
    </section>
  );
};

export default HeroSection;
