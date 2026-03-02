'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isClient) return;

    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <section className="luxury-hero">
      <div className="luxury-hero-background"></div>
      <div className="luxury-hero-overlay"></div>
      <nav className="luxury-nav">
        <button
          className="luxury-mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
        </button>

        <div className={`luxury-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/about">About us</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/speakers">Services</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </nav>

      <div className="luxury-container">
        <div className="luxury-metadata">
          <div className="meta-item">
            <span className="meta-label">ACTIVE FARMS</span>
            <span className="meta-value">1,200+</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">HECTARES MANAGED</span>
            <span className="meta-value">500K+</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">DATA POINTS DAILY</span>
            <span className="meta-value">2.5M+</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">SYSTEM UPTIME</span>
            <span className="meta-value">99.9%</span>
          </div>
        </div>

        <div className="luxury-content">
          {/* <p className="luxury-subtitle">FARM MANAGEMENT</p> */}
          <h3 className="luxury-headline">
            AGRICULTURE<br />MANAGEMENT
          </h3>
          <p className="luxury-subtitle">smart farming solutions for the modern era</p>

          <div className="luxury-action">
            <button onClick={handleCTAClick} className="luxury-btn">
              Manage your farm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
