'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, LineChart, HandCoins, CloudSunRain } from 'lucide-react';

const features = [
  { id: 1, title: 'Precision Cropping', desc: 'AI-driven insights for optimal planting, irrigation, and harvesting based on real-time soil and weather data.', icon: Sprout },
  { id: 2, title: 'Livestock Monitoring', desc: 'Track health metrics, location, and breeding cycles of your herd continuously.', icon: LineChart },
  { id: 3, title: 'Financial Analytics', desc: 'Forecast profits, manage expenses, and identify cost-saving opportunities automatically.', icon: HandCoins },
  { id: 4, title: 'Climate Intelligence', desc: 'Micro-climate forecasting helps you prepare for adverse weather conditions before they hit.', icon: CloudSunRain },
];

const FeaturesSection = () => {
  return (
    <section className="luxury-features-section">
      <div className="luxury-container luxury-features-container">
        <motion.div
          className="luxury-features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="luxury-section-subtitle">THE EXPERIENCE</span>
          <h2 className="luxury-section-headline">Everything you need to<br />scale your farm.</h2>
        </motion.div>

        <div className="luxury-features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                className="luxury-feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <div className="luxury-feature-icon">
                  <Icon size={32} strokeWidth={1} />
                </div>
                <h3 className="luxury-feature-title">{feature.title}</h3>
                <p className="luxury-feature-desc">{feature.desc}</p>
                <div className="luxury-feature-line"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
