'use client';

import React from 'react';
import Link from 'next/link';

const FinalCTASection = () => {
  return (
    <section className="final-cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to grow your farm smarter?</h2>
          <p>Join hundreds of farmers already using Agrifarm</p>
          <Link href="/dashboard" className="get-started-btn">
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
