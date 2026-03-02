'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="luxury-footer">
      <div className="luxury-footer-bottom">
        <div className="luxury-footer-logo">Viland Farm</div>
        <p>&copy; {new Date().getFullYear()} Viland Farm Management. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
