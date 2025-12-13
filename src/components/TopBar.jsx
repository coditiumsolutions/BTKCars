import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopBar.css';

const LinksBar = () => {
  return (
    <nav className="links-bar">
      <Link to="/" className="topbar-link">Home</Link>
      <Link to="/buy" className="topbar-link">Buy</Link>
      <Link to="/sell" className="topbar-link">Sell</Link>
      <Link to="/about" className="topbar-link">About</Link>
    </nav>
  );
};

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleContactClick = () => {
    window.open('https://wa.me/923353355555', '_blank');
  };

  return (
    <div className="topbar">
      <div className="topbar-container">
        <div>
          <Link to="/" className="topbar-logo">
            <img src="/logo_bakcars.jpg" alt="BTK Cars" className="topbar-logo-img" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="topbar-nav">
          <LinksBar />
          <button className="topbar-cta" onClick={handleContactClick}>Contact Us</button>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/buy" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Buy
            </Link>
            <Link to="/sell" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Sell
            </Link>
            <Link to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <button className="mobile-nav-cta" onClick={handleContactClick}>Contact Us</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
