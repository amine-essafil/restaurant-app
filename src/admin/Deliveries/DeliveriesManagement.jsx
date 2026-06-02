import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUtensils,
  FaBars,
  FaTimes,
  FaChartLine,
  FaTruck,
  FaUsers,
  FaMotorcycle,
  FaFileAlt,
  FaShoppingBag,
  FaPhone,
  FaMapMarkerAlt,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa";
import "./DeliveriesManagement.css";
const DeliveriesManagement = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const [error, setError] = useState(null);

    const [dashboard, setDashboard] = useState({
    pending: 0,
    on_delivery: 0,
    completed: 0,
    drivers: 0,
  });
  
  // Admin pages list
  const adminPages = [
    { id: 1, name: "Dashboard", icon: <FaChartLine />, path: "/admin/dashboard" },
    { id: 2, name: "Orders", icon: <FaShoppingBag />, path: "/admin/orders" },
    { id: 3, name: "Menu", icon: <FaUtensils />, path: "/admin/menu" },
    { id: 4, name: "Customers", icon: <FaUsers />, path: "/admin/customers" },
    { id: 5, name: "Deliveries", icon: <FaTruck />, path: "/admin/deliveries" },
    { id: 6, name: "Drivers", icon: <FaMotorcycle />, path: "/admin/drivers" },
    { id: 7, name: "Reports", icon: <FaFileAlt />, path: "/admin/reports" },
    { id: 8, name: "Analytics", icon: <FaChartLine />, path: "/admin/analytics" },
  ];


  return (
    <div className="deliveries-management-container">
      {/* LEFT SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="sidebar-header">
          <div className="sidebar-header-content">
            {sidebarOpen && (
              <div className="logo-section">
                <div className="logo-icon">
                  <FaUtensils />
                </div>
                <div className="logo-text">
                  <h1>FoodExpress</h1>
                  <p>Admin Panel</p>
                </div>
              </div>
            )}
            {!sidebarOpen && (
              <div className="logo-icon-only">
                <FaUtensils />
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          {adminPages.map((page) => (
            <Link
              key={page.id}
              to={page.path}
              className={`nav-item ${
                location.pathname === page.path ? "active" : ""
              }`}
            >
              <span className="nav-icon">{page.icon}</span>
              {sidebarOpen && (
                <div className="nav-text">
                  <p>{page.name}</p>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="sidebar-footer">
            <button className="logout-btn">
              <span>🚪</span> Logout
            </button>
          </div>
        )}
      </div>    

     {/* MAIN CONTENT */}
     <div className="main-content"> 
      {/* TOP HEADER */}
        <header className="top-header">
          <h1 className="header-title">FoodExpress</h1>
          <div className="header-user-section">
            <div className="header-user-info">
              <p className="header-user-name">Admin</p>
              <p className="header-user-role">Manager</p>
            </div>
            <div className="header-user-avatar">A</div>
          </div>
        </header>
     <div className="deliveries-management">
     {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '16px',
              color: '#991b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaExclamationCircle />
              <span>{error}</span>
              <button 
                onClick={() => setError(null)}
                style={{
                  marginLeft: 'auto',
                  background: 'none',
                  border: 'none',
                  color: '#991b1b',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                ×
              </button>
            </div>
          )}

       {/* Banner Section */}
          <div className="deliveries-banner">
            <div className="banner-left">
              <div className="banner-icon">
                <FaTruck />
              </div>
              <div>
                <h2 className="banner-title">Delivery Management</h2>
                <p className="banner-subtitle">
                  Assign orders to drivers and track deliveries in real-time
                </p>
              </div>
            </div>
          </div>

        {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card pending">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <p className="stat-label">PENDING ORDERS</p>
                <h3 className="stat-value">{dashboard.pending}</h3>
              </div>
            </div>
            <div className="stat-card on-delivery">
              <div className="stat-icon">🚚</div>
              <div className="stat-info">
                <p className="stat-label">ON DELIVERY</p>
                <h3 className="stat-value">{dashboard.on_delivery}</h3>
              </div>
            </div>
            <div className="stat-card completed">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <p className="stat-label">COMPLETED</p>
                <h3 className="stat-value">{dashboard.completed}</h3>
              </div>
            </div>
            <div className="stat-card drivers">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <p className="stat-label">ACTIVE DRIVERS</p>
                <h3 className="stat-value">{dashboard.drivers}</h3>
              </div>
            </div>
          </div>
     </div>
     </div>
    </div>
  );
};

export default DeliveriesManagement;