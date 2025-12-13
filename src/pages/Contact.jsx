import React, { useState } from 'react';
import '../styles/Pages.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">
          Have questions? We'd love to hear from you.
        </p>

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-card">
            <h2 className="contact-form-title">Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="form-textarea"
                ></textarea>
              </div>
              <button
                type="submit"
                className="form-submit"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <div className="contact-info-card">
              <h2 className="contact-info-title">Get in Touch</h2>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <svg
                    className="contact-info-icon"
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
                  <div className="contact-info-content">
                    <h3>Address</h3>
                    <p>Shop number 5, ZA Heights. Opposite Head Office of BTK, Bahria Town Karachi.</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <svg
                    className="contact-info-icon"
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
                  <div className="contact-info-content">
                    <h3>Phone</h3>
                    <p>03353355555</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <svg
                    className="contact-info-icon"
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
                  <div className="contact-info-content">
                    <h3>Email</h3>
                    <p>Yasirhussainofficial1@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <h3 className="contact-info-title">Business Hours</h3>
              <div className="hours-list">
                <div className="hours-item">
                  <span className="hours-day">Monday - Friday:</span>
                  <span className="hours-time">9:00 AM - 6:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="hours-day">Saturday:</span>
                  <span className="hours-time">10:00 AM - 4:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="hours-day">Sunday:</span>
                  <span className="hours-time">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
