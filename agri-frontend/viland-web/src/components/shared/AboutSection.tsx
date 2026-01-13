'use client';

import React from 'react';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-illustration">
            <div className="smart-farm-illustration">
              <div className="drone">🚁</div>
              <div className="sensors">📡</div>
              <div className="crops">🌾</div>
              <div className="field-grid">
                <div className="field-row"></div>
                <div className="field-row"></div>
                <div className="field-row"></div>
              </div>
            </div>
          </div>
          <div className="about-content">
            <h2>Smart Farming Made Easy</h2>
            <p>
              AGRIFARM helps farmers manage crops, livestock, irrigation, and finances all in one
              platform. Monitor your farm's health, optimize resources, and increase yields with
              real-time data and intelligent insights.
            </p>
            <Link href="/about" className="learn-more-btn">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
