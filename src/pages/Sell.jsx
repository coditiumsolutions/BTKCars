import React from 'react';
import '../styles/Pages.css';
import '../styles/Sell.css';

const Sell = () => {
  const CONTACT_PHONE = '03353355555';
  const CONTACT_EMAIL = 'Yasirhussainofficial1@gmail.com';
  const CONTACT_ADDRESS = 'Shop number 5, ZA Heights. Opposite Head Office of BTK, Bahria Town Karachi.';

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="page-title buy-page-title">Sell Your Car</h1>
        <p className="page-subtitle">
          Get the best value for your vehicle with our easy selling process.
        </p>

        {/* Contact Us Section */}
        <div className="sell-contact-section">
          <h2 className="sell-contact-title">Contact Us</h2>
          <p className="sell-contact-subtitle">
            Ready to sell your car? Get in touch with us today!
          </p>

          <div className="sell-contact-grid">
            {/* Address */}
            <div className="sell-contact-card">
              <div className="sell-contact-icon-wrapper">
                <svg
                  className="sell-contact-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="sell-contact-card-title">Visit Us</h3>
              <p className="sell-contact-card-text">{CONTACT_ADDRESS}</p>
            </div>

            {/* Phone */}
            <div className="sell-contact-card">
              <div className="sell-contact-icon-wrapper">
                <svg
                  className="sell-contact-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="sell-contact-card-title">Call Us</h3>
              <a href={`tel:${CONTACT_PHONE}`} className="sell-contact-link">
                {CONTACT_PHONE}
              </a>
            </div>

            {/* Email */}
            <div className="sell-contact-card">
              <div className="sell-contact-icon-wrapper">
                <svg
                  className="sell-contact-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="sell-contact-card-title">Email Us</h3>
              <a href={`mailto:${CONTACT_EMAIL}`} className="sell-contact-link">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
