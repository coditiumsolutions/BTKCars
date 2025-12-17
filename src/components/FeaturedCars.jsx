import React from 'react';
import '../styles/FeaturedCars.css';

const FeaturedCars = () => {
  return (
    <section className="featured-cars">
      <div className="featured-cars-container">
        {/* Section Header */}
        <div className="featured-cars-header">
          <button className="featured-cars-title-button">
            Cars for Sell
          </button>
        </div>

        {/* Single Featured Car Image */}
        <div className="featured-car-single">
          <div className="car-card">
            <div className="car-card-image-container">
              <img
                src="/carspics/carspic01.jpg"
                alt="Featured Car"
                className="car-card-image"
              />
            </div>
          </div>
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
