'use client';

import React from 'react';
import HeroSection from '../components/shared/HeroSection';
import AboutSection from '../components/shared/AboutSection';
import FeaturesSection from '../components/shared/FeaturesSection';
import BenefitsSection from '../components/shared/BenefitsSection';
import DashboardPreviewSection from '../components/shared/DashboardPreviewSection';
import FinalCTASection from '../components/shared/FinalCTASection';
import Footer from '../components/shared/Footer';
import './globals.css';

export default function HomePage() {
  return (
    <div className="homepage-container">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <BenefitsSection />
      <DashboardPreviewSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
