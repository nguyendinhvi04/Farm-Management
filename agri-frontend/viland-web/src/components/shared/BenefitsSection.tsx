'use client';

import React from 'react';

const BenefitsSection = () => {
  return (
    <section className="benefits-section">
      <div className="container">
        <h2 className="section-title">Farm Benefits</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Reduced Costs</h3>
            <p>Optimize resources and reduce waste with smart farming technology</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌱</div>
            <h3>Increased Yield</h3>
            <p>Better crop and livestock output through data-driven farming</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <h3>Easy Management</h3>
            <p>Access your farm data from any device, anywhere, anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
