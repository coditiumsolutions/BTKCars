import React from 'react';
import { Navigate } from 'react-router-dom';
import authApi from '../services/api';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authApi.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
