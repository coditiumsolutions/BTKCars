import React from 'react';
import SEO from '../components/SEO';
import HeroSlider from '../components/HeroSlider';
import FeaturedCars from '../components/FeaturedCars';

const Home = () => {
  return (
    <div>
      <SEO
        title="Premium Car Dealership in Bahria Town Karachi"
        description="BTK Cars - Your trusted car dealership in Bahria Town Karachi. Buy and sell quality vehicles with confidence. Browse our extensive inventory of new and used cars."
        keywords="BTK Cars, car dealership Karachi, cars in Bahria Town, buy cars Bahria Town Karachi, sell cars Karachi, used cars Pakistan, premium vehicles"
        canonical="/"
      />
      <HeroSlider />
      <FeaturedCars />
    </div>
  );
};

export default Home;
