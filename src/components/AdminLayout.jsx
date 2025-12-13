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
    {
      section: 'Main',
      items: [
        { icon: '🏠', label: 'Dashboard', path: '/admin/dashboard' },
        { icon: '🚗', label: 'Manage Cars', path: '/admin/cars' },
        { icon: '➕', label: 'Add Car', path: '/admin/cars/add' },
      ]
    },
    {
      section: 'Settings',
      items: [
        { icon: '👥', label: 'Users', path: '/admin/users' },
        { icon: '⚙️', label: 'Settings', path: '/admin/settings' },
      ]
    }
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
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="admin-nav-section">
              <div className="admin-nav-section-title">{section.section}</div>
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => {
                    navigate(item.path);
                    closeSidebar();
                  }}
                >
                  <span className="admin-nav-icon">{item.icon}</span>
                  <span className="admin-nav-label">{item.label}</span>
                </div>
              ))}
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
