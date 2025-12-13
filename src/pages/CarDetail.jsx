import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Pages.css';
import '../styles/CarDetail.css';
import { carsApi } from '../services/carsApi';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Contact information from footer
  const CONTACT_PHONE = '03353355555';
  const CONTACT_EMAIL = 'Yasirhussainofficial1@gmail.com';
  const CONTACT_ADDRESS = 'Shop number 5, ZA Heights. Opposite Head Office of BTK, Bahria Town Karachi.';

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const data = await carsApi.getCar(id);
        setCar(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching car details:', err);
        setError('Failed to load car details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage) => {
    if (!mileage) return 'N/A';
    return `${new Intl.NumberFormat('en-US').format(mileage)} miles`;
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80';
    }
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return `http://localhost:5115${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="page">
        <div className="page-container">
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            Loading car details...
          </div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="page">
        <div className="page-container">
          <div style={{ textAlign: 'center', padding: '3rem', color: '#d32f2f' }}>
            {error || 'Car not found'}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              onClick={() => navigate('/buy')}
              className="btn-back"
            >
              Back to Buy Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-container">
        {/* Back Button */}
        <button
          onClick={() => navigate('/buy')}
          className="btn-back"
        >
          <svg
            className="btn-back-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Buy Page
        </button>

        <div className="car-detail-container">
          {/* Car Image Section */}
          <div className="car-detail-image-section">
            <img
              src={getImageUrl(car.imageUrl)}
              alt={`${car.make} ${car.model}`}
              className="car-detail-image"
            />
          </div>

          {/* Car Information Section */}
          <div className="car-detail-info-section">
            <div className="car-detail-header">
              <h1 className="car-detail-title">
                {car.make} {car.model}
              </h1>
              <div className="car-detail-price">
                {formatPrice(car.price)}
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="car-detail-specs-grid">
              <div className="car-detail-spec-item">
                <div className="spec-label">Year</div>
                <div className="spec-value">{car.year || 'N/A'}</div>
              </div>
              <div className="car-detail-spec-item">
                <div className="spec-label">Mileage</div>
                <div className="spec-value">{formatMileage(car.mileage)}</div>
              </div>
              <div className="car-detail-spec-item">
                <div className="spec-label">Transmission</div>
                <div className="spec-value">{car.transmission || 'N/A'}</div>
              </div>
              <div className="car-detail-spec-item">
                <div className="spec-label">Fuel Type</div>
                <div className="spec-value">{car.fuelType || 'N/A'}</div>
              </div>
            </div>

            {/* Description */}
            {car.description && (
              <div className="car-detail-description">
                <h3 className="description-title">Description</h3>
                <p className="description-text">{car.description}</p>
              </div>
            )}

            {/* Contact Section */}
            <div className="car-detail-contact">
              <h3 className="contact-title">Interested? Contact Us!</h3>
              <div className="contact-info-grid">
                <div className="contact-info-item">
                  <svg
                    className="contact-icon"
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
                  <div>
                    <div className="contact-label">Phone</div>
                    <a href={`tel:${CONTACT_PHONE}`} className="contact-value">
                      {CONTACT_PHONE}
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <svg
                    className="contact-icon"
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
                  <div>
                    <div className="contact-label">Email</div>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="contact-value">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <svg
                    className="contact-icon"
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
                  <div>
                    <div className="contact-label">Address</div>
                    <div className="contact-value">{CONTACT_ADDRESS}</div>
                  </div>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="cta-button-container">
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="cta-button"
                >
                  <svg
                    className="cta-icon"
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
                  Call Now to Schedule a Test Drive
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
