import React from 'react';
import '../styles/FeaturedCars.css';

const FeaturedCars = () => {
  const cars = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'
    }
  ];

  return (
    <section className="featured-cars">
      <div className="featured-cars-container">
        {/* Section Header */}
        <div className="featured-cars-header">
          <h2 className="featured-cars-title">
            Car for Sell
          </h2>
          <p className="featured-cars-subtitle">
            Discover our handpicked selection of premium vehicles
          </p>
        </div>

        {/* Cars Grid - Images Only */}
        <div className="featured-cars-grid">
          {cars.map((car) => (
            <div
              key={car.id}
              className="car-card"
            >
              {/* Car Image Only */}
              <div className="car-card-image-container">
                <img
                  src={car.image}
                  alt="Featured Car"
                  className="car-card-image"
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="featured-cars-footer">
          <button className="featured-cars-view-all">
            View All Cars
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
