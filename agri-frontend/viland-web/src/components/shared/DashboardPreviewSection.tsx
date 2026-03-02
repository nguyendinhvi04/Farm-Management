'use client';

import React from 'react';
import { motion } from 'framer-motion';

const DashboardPreviewSection = () => {
  return (
    <section className="luxury-dashboard-section">
      <div className="luxury-dashboard-container">

        <motion.div
          className="luxury-dashboard-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="luxury-section-subtitle">THE COMMAND CENTER</span>
          <h2 className="luxury-section-headline">All Your Farm Data<br />in One Place</h2>
          <p className="luxury-dashboard-paragraph">
            Get real-time insights into crops, livestock, weather, and finances.
            Monitor everything from soil moisture to market prices in one sophisticated dashboard.
          </p>
        </motion.div>

        <div className="luxury-dashboard-mockup-wrapper">
          <motion.div
            className="luxury-dashboard-mockup"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <div className="luxury-dashboard-mockup-header">
              <span className="luxury-dashboard-mockup-dot dashboard-dot-red"></span>
              <span className="luxury-dashboard-mockup-dot dashboard-dot-yellow"></span>
              <span className="luxury-dashboard-mockup-dot dashboard-dot-green"></span>
            </div>

            <div className="luxury-dashboard-mockup-body">
              <div className="luxury-dashboard-sidebar">
                <div className="luxury-dashboard-sidebar-item active"></div>
                <div className="luxury-dashboard-sidebar-item"></div>
                <div className="luxury-dashboard-sidebar-item"></div>
                <div className="luxury-dashboard-sidebar-item"></div>
              </div>

              <div className="luxury-dashboard-main">
                <div className="luxury-dashboard-chart-area">
                  <motion.div className="luxury-dashboard-bar" initial={{ height: 0 }} whileInView={{ height: '40%' }} transition={{ duration: 1.5, delay: 0.2 }}></motion.div>
                  <motion.div className="luxury-dashboard-bar" initial={{ height: 0 }} whileInView={{ height: '70%' }} transition={{ duration: 1.5, delay: 0.4 }}></motion.div>
                  <motion.div className="luxury-dashboard-bar" initial={{ height: 0 }} whileInView={{ height: '50%' }} transition={{ duration: 1.5, delay: 0.6 }}></motion.div>
                  <motion.div className="luxury-dashboard-bar" initial={{ height: 0 }} whileInView={{ height: '90%' }} transition={{ duration: 1.5, delay: 0.8 }}></motion.div>
                  <motion.div className="luxury-dashboard-bar" initial={{ height: 0 }} whileInView={{ height: '65%' }} transition={{ duration: 1.5, delay: 1.0 }}></motion.div>
                  <motion.div className="luxury-dashboard-bar" initial={{ height: 0 }} whileInView={{ height: '85%' }} transition={{ duration: 1.5, delay: 1.2 }}></motion.div>
                </div>
                <div className="luxury-dashboard-card"></div>
                <div className="luxury-dashboard-card"></div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default DashboardPreviewSection;
