import React from 'react';
import '../styles/Pages.css';
import '../styles/About.css';

const About = () => {
  return (
    <div className="page">
      <div className="page-container">
        <h1 className="page-title buy-page-title">About BTKCars</h1>
        <div className="page-card">
          <h2 className="page-section-title">Our Story</h2>
          <p className="page-text">
            BTKCars has been serving customers for over 20 years, providing quality vehicles
            and exceptional service. We pride ourselves on transparency, integrity, and
            customer satisfaction.
          </p>
          <p className="page-text">
            Our team of automotive experts is dedicated to helping you find the perfect
            vehicle that fits your needs and budget.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚗</div>
            <h3 className="feature-title">Quality Vehicles</h3>
            <p className="feature-description">
              Every car is thoroughly inspected and certified before sale.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <h3 className="feature-title">Trusted Service</h3>
            <p className="feature-description">
              Thousands of satisfied customers trust us with their automotive needs.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3 className="feature-title">Customer First</h3>
            <p className="feature-description">
              Your satisfaction is our top priority, always.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
