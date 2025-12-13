import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import carsApi from '../services/carsApi';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCars: 0,
    totalValue: 0,
    recentlyAdded: 0,
    avgPrice: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const cars = await carsApi.getAllCars();

      const totalCars = cars.length;
      const totalValue = cars.reduce((sum, car) => sum + parseFloat(car.price), 0);
      const avgPrice = totalCars > 0 ? totalValue / totalCars : 0;

      // Count cars added in the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentlyAdded = cars.filter(car =>
        new Date(car.createdAt) > sevenDaysAgo
      ).length;

      setStats({
        totalCars,
        totalValue,
        recentlyAdded,
        avgPrice
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const quickActions = [
    { icon: '➕', label: 'Add New Car', path: '/admin/cars/add' },
    { icon: '🚗', label: 'Manage Cars', path: '/admin/cars' },
    { icon: '👤', label: 'Manage Users', path: '/admin/users' },
    { icon: '📊', label: 'View Reports', path: '/admin/reports' },
  ];

  const recentActivities = [
    { icon: '🆕', text: 'New car added to inventory', time: '2 hours ago' },
    { icon: '✏️', text: 'Car details updated', time: '5 hours ago' },
    { icon: '🗑️', text: 'Car removed from inventory', time: '1 day ago' },
    { icon: '👁️', text: 'Dashboard accessed', time: 'Just now' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title admin-page-title">Dashboard</h1>
          <p className="dashboard-subtitle">Overview of your car inventory and statistics</p>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div>
                <div className="stat-value">{stats.totalCars}</div>
                <div className="stat-label">Total Cars</div>
              </div>
              <div className="stat-icon">🚗</div>
            </div>
            <div className="stat-change positive">
              +{stats.recentlyAdded} this week
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div>
                <div className="stat-value">{formatCurrency(stats.totalValue)}</div>
                <div className="stat-label">Total Inventory Value</div>
              </div>
              <div className="stat-icon">💰</div>
            </div>
            <div className="stat-change positive">
              Portfolio value
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div>
                <div className="stat-value">{formatCurrency(stats.avgPrice)}</div>
                <div className="stat-label">Average Price</div>
              </div>
              <div className="stat-icon">📊</div>
            </div>
            <div className="stat-change">
              Per vehicle
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div>
                <div className="stat-value">{stats.recentlyAdded}</div>
                <div className="stat-label">Recently Added</div>
              </div>
              <div className="stat-icon">🆕</div>
            </div>
            <div className="stat-change">
              Last 7 days
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="dashboard-content">
          {/* Recent Activity */}
          <div className="recent-activity">
            <h2 className="section-title">Recent Activity</h2>
            <ul className="activity-list">
              {recentActivities.map((activity, index) => (
                <li key={index} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-details">
                    <div className="activity-text">{activity.text}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={() => navigate(action.path)}
              >
                <span className="action-icon">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
