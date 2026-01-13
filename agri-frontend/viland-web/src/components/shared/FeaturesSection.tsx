'use client';

import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Farm Management Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌾</div>
            <h3>Crop Management</h3>
            <p>Track sowing, growth, and harvest schedules with real-time monitoring</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🐄</div>
            <h3>Livestock Monitoring</h3>
            <p>Monitor animal health, feed schedules, and production data</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💧</div>
            <h3>Irrigation Control</h3>
            <p>Manage water usage and sensors for optimal irrigation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Financial Tracking</h3>
            <p>Track expenses, revenue, and generate reports</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
