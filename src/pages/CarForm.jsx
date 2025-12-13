import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import carsApi from '../services/carsApi';
import '../styles/CarForm.css';

const CarForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    description: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    if (isEditMode) {
      loadCar();
    }
  }, [id]);

  const loadCar = async () => {
    try {
      const car = await carsApi.getCar(id);
      setFormData({
        make: car.make,
        model: car.model,
        year: car.year || '',
        price: car.price,
        mileage: car.mileage || '',
        transmission: car.transmission || 'Automatic',
        fuelType: car.fuelType || 'Gasoline',
        description: car.description || ''
      });

      if (car.imageUrl) {
        const imageUrl = car.imageUrl.startsWith('http')
          ? car.imageUrl
          : `http://localhost:5115${car.imageUrl}`;
        setImagePreview(imageUrl);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Failed to load car details' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.make.trim()) newErrors.make = 'Make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const carData = {
        make: formData.make,
        model: formData.model,
        year: formData.year ? parseInt(formData.year) : null,
        price: parseFloat(formData.price),
        mileage: formData.mileage ? parseInt(formData.mileage) : null,
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        description: formData.description
      };

      if (isEditMode) {
        await carsApi.updateCar(id, carData, imageFile);
        setAlert({ type: 'success', message: 'Car updated successfully!' });
      } else {
        await carsApi.createCar(carData, imageFile);
        setAlert({ type: 'success', message: 'Car added successfully!' });
      }

      setTimeout(() => {
        navigate('/admin/cars');
      }, 1500);
    } catch (err) {
      setAlert({ type: 'error', message: `Failed to ${isEditMode ? 'update' : 'add'} car` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="car-form-page">
      <div className="car-form-container">
        <div className="car-form-header">
          <h1 className="car-form-title admin-page-title">
            {isEditMode ? 'Edit Car' : 'Add New Car'}
          </h1>
          <p className="car-form-subtitle">
            {isEditMode ? 'Update car information' : 'Fill in the details to add a new car'}
          </p>
        </div>

        {alert.message && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

        <form className="car-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="make" className="form-label">Make *</label>
              <input
                type="text"
                id="make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                className={`form-input ${errors.make ? 'error' : ''}`}
                placeholder="e.g., Toyota"
                disabled={isLoading}
              />
              {errors.make && <span className="error-message">{errors.make}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="model" className="form-label">Model *</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className={`form-input ${errors.model ? 'error' : ''}`}
                placeholder="e.g., Camry"
                disabled={isLoading}
              />
              {errors.model && <span className="error-message">{errors.model}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year" className="form-label">Year</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 2022"
                min="1900"
                max="2030"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`form-input ${errors.price ? 'error' : ''}`}
                placeholder="e.g., 25000"
                step="0.01"
                min="0"
                disabled={isLoading}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mileage" className="form-label">Mileage</label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 15000"
                min="0"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="transmission" className="form-label">Transmission</label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="form-input"
                disabled={isLoading}
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="fuelType" className="form-label">Fuel Type</label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="form-input"
              disabled={isLoading}
            >
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter car description..."
              rows="4"
              disabled={isLoading}
            />
          </div>

          <div className="image-upload-section">
            <label htmlFor="image" className="image-upload-label">
              📷 {imagePreview ? 'Change Image' : 'Upload Image'}
            </label>
            <input
              type="file"
              id="image"
              className="image-upload-input"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
            />
            {imagePreview && (
              <div>
                <img src={imagePreview} alt="Preview" className="image-preview" />
              </div>
            )}
            <p className="image-info">
              {imageFile ? `Selected: ${imageFile.name}` : 'No image selected'}
            </p>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/admin/cars')}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (isEditMode ? 'Update Car' : 'Add Car')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
