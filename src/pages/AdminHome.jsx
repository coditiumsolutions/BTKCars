import React from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../services/api';
import '../styles/AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const userEmail = authApi.getUserEmail();

  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };

  const navItems = [
    {
      title: 'Manage Cars',
      description: 'View, add, edit, and delete cars for sale',
      icon: '🚗',
      path: '/admin/cars',
      className: 'nav-card-blue'
    },
    {
      title: 'Add New Car',
      description: 'Add a new car to the inventory',
      icon: '➕',
      path: '/admin/cars/add',
      className: 'nav-card-gold'
    },
    {
      title: 'Dashboard',
      description: 'View statistics and reports',
      icon: '📊',
      path: '/admin/dashboard',
      className: 'nav-card-green'
    }
  ];

  return (
    <div className="admin-home">
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-header-top">
            <div>
              <h1 className="admin-title">Admin Dashboard</h1>
              <p className="admin-subtitle">Welcome to the BTK Cars Admin Panel</p>
            </div>
            <div className="user-email">
              Logged in as: <strong>{userEmail}</strong>
            </div>
          </div>
        </div>

        <div className="admin-nav">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`admin-nav-card ${item.className}`}
              onClick={() => navigate(item.path)}
            >
              <div className="admin-nav-icon">{item.icon}</div>
              <h3 className="admin-nav-title">{item.title}</h3>
              <p className="admin-nav-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
