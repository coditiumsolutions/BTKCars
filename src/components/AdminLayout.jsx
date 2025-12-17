import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authApi from '../services/api';
import '../styles/AdminLayout.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userEmail = authApi.getUserEmail();

  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Manage Cars', path: '/admin/cars' },
    { label: 'Add Car', path: '/admin/cars/add' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar Overlay for Mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      ></div>

      {/* Admin Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-logo">BTK Cars</div>
          <div className="admin-user-name">👤 {userEmail}</div>
        </div>

        <div className="admin-user-section">
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                closeSidebar();
              }}
            >
              <span className="admin-nav-label">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
