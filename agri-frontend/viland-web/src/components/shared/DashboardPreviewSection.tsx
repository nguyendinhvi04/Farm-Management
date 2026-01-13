'use client';

import React from 'react';

const DashboardPreviewSection = () => {
  return (
    <section className="dashboard-preview-section">
      <div className="container">
        <div className="dashboard-preview-grid">
          <div className="dashboard-mockup">
            <div className="mockup-container">
              <div className="mockup-header">
                <div className="mockup-nav">
                  <span>📊 Dashboard</span>
                  <span>🌾 Crops</span>
                  <span>🐄 Livestock</span>
                </div>
              </div>
              <div className="mockup-content">
                <div className="mockup-card">
                  <h4>Crop Status</h4>
                  <div className="mockup-chart">
                    <div className="chart-bar" style={{height: '60%'}}></div>
                    <div className="chart-bar" style={{height: '80%'}}></div>
                    <div className="chart-bar" style={{height: '45%'}}></div>
                  </div>
                </div>
                <div className="mockup-card">
                  <h4>Weather</h4>
                  <div className="weather-info">
                    <span>☀️ 24°C</span>
                    <span>💧 65%</span>
                  </div>
                </div>
                <div className="mockup-card">
                  <h4>Water Usage</h4>
                  <div className="usage-bar">
                    <div className="usage-fill" style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-text">
            <h2>All Your Farm Data in One Place</h2>
            <p>
              Get real-time insights into crops, livestock, weather, and finances.
              Monitor everything from soil moisture to market prices in one comprehensive dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreviewSection;
