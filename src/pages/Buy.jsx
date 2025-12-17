import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/Pages.css';
import '../styles/FeaturedCars.css';
import { carsApi } from '../services/carsApi';
import { getServerBaseUrl } from '../services/config';

const Buy = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carsApi.getAllCars();
        setCars(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + ' PKR';
  };

  // Helper function to format mileage
  const formatMileage = (mileage) => {
    if (!mileage) return 'N/A';
    return `${new Intl.NumberFormat('en-US').format(mileage)} miles`;
  };

  // Helper function to get image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80';
    }
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return `${getServerBaseUrl()}${imageUrl}`;
  };

  return (
    <div className="page">
      <SEO
        title="Buy Quality Cars in Bahria Town Karachi"
        description="Browse our extensive inventory of quality vehicles for sale in Bahria Town Karachi. Find your perfect car from our premium selection at BTK Cars."
        keywords="buy cars Bahria Town, cars for sale Karachi, quality vehicles, used cars Bahria Town Karachi, car inventory Pakistan"
        canonical="/buy"
      />
      <div className="page-container">
        <h1 className="page-title buy-page-title">Buy a Car</h1>
        <p className="page-subtitle">
          Browse our extensive inventory of quality vehicles.
        </p>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            Loading cars...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#d32f2f' }}>
            {error}
          </div>
        )}

        {/* Cars Grid with Full Details */}
        {!loading && !error && (
          <div className="featured-cars-grid">
            {cars.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#666', gridColumn: '1 / -1' }}>
                No cars available at the moment.
              </div>
            ) : (
              cars.map((car) => (
                <div
                  key={car.id}
                  className="car-card"
                >
                  {/* Car Image */}
                  <div className="car-card-image-container">
                    <img
                      src={getImageUrl(car.imageUrl)}
                      alt={`${car.make} ${car.model}`}
                      className="car-card-image"
                    />
                    <div className="car-card-year">
                      {car.year || 'N/A'}
                    </div>
                    <div className="car-sold-badge">SOLD</div>
                  </div>

                  {/* Car Details */}
                  <div className="car-card-content">
                    <h3 className="car-card-name">
                      {car.make} {car.model}
                    </h3>
                    <div className="car-card-price-container">
                      <span className="car-card-price">
                        {formatPrice(car.price)}
                      </span>
                    </div>

                    {/* Specifications */}
                    <div className="car-card-specs">
                      <div className="car-card-spec">
                        <svg
                          className="car-card-spec-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span>{formatMileage(car.mileage)}</span>
                      </div>
                      <div className="car-card-spec">
                        <svg
                          className="car-card-spec-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                        <span>{car.transmission || 'N/A'}</span>
                      </div>
                      <div className="car-card-spec">
                        <svg
                          className="car-card-spec-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                          />
                        </svg>
                        <span>{car.fuelType || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="car-card-actions">
                      <button
                        className="car-card-btn-primary"
                        onClick={() => navigate(`/car/${car.id}`)}
                      >
                        View Details
                      </button>
                      <button className="car-card-btn-secondary">
                        <svg
                          className="car-card-btn-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Buy;
