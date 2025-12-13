import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import carsApi from '../services/carsApi';
import '../styles/ManageCars.css';

const ManageCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await carsApi.getAllCars();
      setCars(data);
      setError(null);
    } catch (err) {
      setError('Failed to load cars. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      await carsApi.deleteCar(id);
      setCars(cars.filter(car => car.id !== id));
      alert('Car deleted successfully!');
    } catch (err) {
      alert('Failed to delete car. Please try again.');
      console.error(err);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/400x250?text=No+Image';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:5115${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="manage-cars">
        <div className="loading">Loading cars...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-cars">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="manage-cars">
      <div className="manage-cars-container">
        <div className="manage-cars-header">
          <h1 className="manage-cars-title admin-page-title">Manage Cars</h1>
          <button
            className="add-car-btn"
            onClick={() => navigate('/admin/cars/add')}
          >
            + Add New Car
          </button>
        </div>

        {cars.length === 0 ? (
          <div className="empty">
            No cars found. Add your first car to get started!
          </div>
        ) : (
          <div className="cars-grid">
            {cars.map((car) => (
              <div key={car.id} className="car-card">
                <div className="car-image-container">
                  <img
                    src={getImageUrl(car.imageUrl)}
                    alt={`${car.make} ${car.model}`}
                    className="car-image"
                  />
                  <div className="car-price-badge">
                    {formatPrice(car.price)}
                  </div>
                </div>

                <div className="car-details">
                  <h3 className="car-title">
                    {car.make} {car.model}
                  </h3>

                  <div className="car-specs">
                    {car.year && (
                      <div className="car-spec">
                        <strong>Year:</strong> {car.year}
                      </div>
                    )}
                    {car.mileage && (
                      <div className="car-spec">
                        <strong>Mileage:</strong> {car.mileage.toLocaleString()} mi
                      </div>
                    )}
                    {car.transmission && (
                      <div className="car-spec">
                        <strong>Transmission:</strong> {car.transmission}
                      </div>
                    )}
                    {car.fuelType && (
                      <div className="car-spec">
                        <strong>Fuel:</strong> {car.fuelType}
                      </div>
                    )}
                  </div>

                  {car.description && (
                    <p className="car-description">
                      {car.description.length > 100
                        ? `${car.description.substring(0, 100)}...`
                        : car.description}
                    </p>
                  )}

                  <div className="car-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/cars/edit/${car.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(car.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCars;
