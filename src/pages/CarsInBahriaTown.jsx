import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/Pages.css';

const CarsInBahriaTown = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <SEO
        title="Cars in Bahria Town - Find Your Perfect Vehicle"
        description="Looking for cars in Bahria Town? BTK Cars offers the best selection of quality vehicles in Bahria Town Karachi. Visit our showroom to find your dream car today."
        keywords="cars in Bahria Town, Bahria Town Karachi cars, vehicles Bahria Town, car showroom Bahria Town, buy cars Bahria Town"
        canonical="/cars-in-bahria-town"
      />

      <div className="page-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 className="page-title">Cars in Bahria Town</h1>

        <div style={{
          lineHeight: '1.8',
          color: '#333',
          fontSize: '16px',
          marginTop: '2rem'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Welcome to BTK Cars, your premier destination for finding quality cars in Bahria Town Karachi.
            We understand that purchasing a vehicle is a significant investment, which is why we've
            established ourselves as the most trusted car dealership serving the Bahria Town community.
          </p>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginTop: '2rem',
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            Why Choose BTK Cars for Your Next Vehicle?
          </h2>

          <p style={{ marginBottom: '1.5rem' }}>
            Located conveniently in Bahria Town Karachi, our showroom features an extensive inventory
            of carefully inspected vehicles. From luxury sedans to reliable family cars, we cater to
            every preference and budget. Each vehicle in our collection undergoes rigorous quality
            checks to ensure you drive away with complete confidence.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            What sets us apart is our commitment to transparency and customer satisfaction. When you
            visit BTK Cars, you'll experience a no-pressure environment where our knowledgeable team
            is ready to answer all your questions. We believe in building long-term relationships with
            our customers in the Bahria Town area, not just making quick sales.
          </p>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginTop: '2rem',
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            Our Vehicle Selection
          </h2>

          <p style={{ marginBottom: '1.5rem' }}>
            Whether you're searching for a fuel-efficient daily commuter or a spacious SUV for family
            adventures around Karachi, our diverse inventory has something for everyone. We regularly
            update our stock with the latest arrivals, ensuring you have access to the best vehicles
            available in Bahria Town.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Our team stays informed about market trends and customer preferences in the Bahria Town
            community. This allows us to source vehicles that match what our local customers are
            actively seeking. From automatic transmissions preferred for city driving to robust engines
            suitable for longer journeys, we've got you covered.
          </p>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginTop: '2rem',
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            Visit Our Bahria Town Showroom
          </h2>

          <p style={{ marginBottom: '1.5rem' }}>
            Finding the perfect car in Bahria Town has never been easier. Our conveniently located
            showroom welcomes visitors throughout the week. Browse our inventory online to get a
            preview, then visit us in person to experience the quality and service that makes BTK Cars
            the preferred choice for car buyers in Bahria Town Karachi.
          </p>

          <p style={{ marginBottom: '2rem' }}>
            Ready to find your next vehicle? Explore our current inventory below or contact our team
            to schedule a personalized viewing. We're here to make your car buying experience in
            Bahria Town smooth, transparent, and satisfying.
          </p>

          <div style={{
            textAlign: 'center',
            marginTop: '3rem',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => navigate('/buy')}
              style={{
                backgroundColor: '#d32f2f',
                color: 'white',
                padding: '14px 40px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#b71c1c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#d32f2f'}
            >
              Browse Our Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsInBahriaTown;
