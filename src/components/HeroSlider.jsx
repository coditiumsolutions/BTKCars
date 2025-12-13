import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/HeroSlider.css';

/**
 * HeroSlider Component
 * Custom slider implementation that prevents image overlapping
 * Uses specific images from public folder with graceful fallback
 */
const HeroSlider = () => {
  // Specific slider images from public folder
  const SLIDER_IMAGES = [
    '/slider01.jpg',
    '/slider02.jpg',
    '/slider03.jpg',
    '/slider04.jpg',
    '/slider05.jpg'
  ];

  // Slide content
  const SLIDE_CONTENT = [
    { title: 'Your Journey Starts Here', subtitle: 'Exceptional service, exceptional cars' },
    { title: 'Luxury Redefined', subtitle: 'Premium cars at unbeatable prices' },
    { title: 'Drive with Confidence', subtitle: 'Certified pre-owned vehicles' },
    { title: 'Excellence in Every Detail', subtitle: 'Experience automotive perfection' },
    { title: 'Find Your Dream Car', subtitle: 'Browse thousands of quality vehicles' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [validSlides, setValidSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef(null);

  // Check which images exist
  useEffect(() => {
    const checkImages = async () => {
      setIsLoading(true);
      const availableSlides = [];

      for (let i = 0; i < SLIDER_IMAGES.length; i++) {
        try {
          const response = await fetch(SLIDER_IMAGES[i], { method: 'HEAD' });
          if (response.ok) {
            availableSlides.push({
              id: i,
              image: SLIDER_IMAGES[i],
              title: SLIDE_CONTENT[i]?.title || 'Discover Quality Cars',
              subtitle: SLIDE_CONTENT[i]?.subtitle || 'Your trusted car dealer'
            });
          }
        } catch (error) {
          // Image doesn't exist, skip it
          continue;
        }
      }

      setValidSlides(availableSlides);
      setIsLoading(false);
    };

    checkImages();
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (validSlides.length > 1) {
      autoplayRef.current = setInterval(() => {
        goToNextSlide();
      }, 4000);

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }
  }, [validSlides.length, currentSlide]);

  // Navigation handlers
  const goToNextSlide = useCallback(() => {
    if (isTransitioning || validSlides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % validSlides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [validSlides.length, isTransitioning]);

  const goToPrevSlide = useCallback(() => {
    if (isTransitioning || validSlides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + validSlides.length) % validSlides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [validSlides.length, isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentSlide, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  // Loading state
  if (isLoading) {
    return (
      <div className="hero-slider">
        <div className="hero-slider-loader">
          <div className="loader-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // No slides available
  if (validSlides.length === 0) {
    return (
      <div className="hero-slider">
        <div className="hero-slide-fallback">
          <div className="hero-slide-overlay">
            <div className="hero-slide-content">
              <h1 className="hero-slide-title">Welcome to BTK Cars</h1>
              <p className="hero-slide-subtitle">Your trusted car dealer</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-slider">
      {/* Slider container - only one slide visible at a time */}
      <div className="slider-container">
        {validSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            aria-hidden={index !== currentSlide}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="hero-slide-image"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="hero-slide-overlay">
              <div className="hero-slide-content">
                <h1 className="hero-slide-title">{slide.title}</h1>
                <p className="hero-slide-subtitle">{slide.subtitle}</p>
                <button className="hero-slide-cta">Explore Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation controls - only show if multiple slides */}
      {validSlides.length > 1 && (
        <>
          <button
            className="slider-nav slider-nav-prev"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
            disabled={isTransitioning}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            className="slider-nav slider-nav-next"
            onClick={goToNextSlide}
            aria-label="Next slide"
            disabled={isTransitioning}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Slide indicators */}
          <div className="slider-indicators">
            {validSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={`slider-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSlider;
