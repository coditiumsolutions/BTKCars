import { getApiBaseUrl } from './config';

export const carsApi = {
  // Get all cars
  getAllCars: async () => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/cars`);
      if (!response.ok) throw new Error('Failed to fetch cars');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  },

  // Get single car
  getCar: async (id) => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/cars/${id}`);
      if (!response.ok) throw new Error('Failed to fetch car');
      return await response.json();
    } catch (error) {
      console.error('Error fetching car:', error);
      throw error;
    }
  },

  // Create car
  createCar: async (carData, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('make', carData.make);
      formData.append('model', carData.model);
      if (carData.year) formData.append('year', carData.year);
      formData.append('price', carData.price);
      if (carData.mileage) formData.append('mileage', carData.mileage);
      if (carData.transmission) formData.append('transmission', carData.transmission);
      if (carData.fuelType) formData.append('fuelType', carData.fuelType);
      if (carData.description) formData.append('description', carData.description);
      if (imageFile) formData.append('image', imageFile);

      const response = await fetch(`${getApiBaseUrl()}/cars`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create car');
      return await response.json();
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  },

  // Update car
  updateCar: async (id, carData, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('make', carData.make);
      formData.append('model', carData.model);
      if (carData.year) formData.append('year', carData.year);
      formData.append('price', carData.price);
      if (carData.mileage) formData.append('mileage', carData.mileage);
      if (carData.transmission) formData.append('transmission', carData.transmission);
      if (carData.fuelType) formData.append('fuelType', carData.fuelType);
      if (carData.description) formData.append('description', carData.description);
      if (imageFile) formData.append('image', imageFile);

      const response = await fetch(`${getApiBaseUrl()}/cars/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update car');
      return await response.json();
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  },

  // Delete car
  deleteCar: async (id) => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/cars/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete car');
      return await response.json();
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  },
};

export default carsApi;
