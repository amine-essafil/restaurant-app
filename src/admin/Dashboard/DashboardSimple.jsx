import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaShoppingBag,
  FaMoneyBillWave,
  FaMotorcycle,
  FaUtensils,
  FaFileAlt,
  FaChartLine,
  FaTruck,
  FaArrowUp,
  FaArrowDown,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import "./DashboardSimpl.css";
import RevenueTrendsChart from "./RevenueTrendsChart";
import OrderStatusChart from "./OrderStatusChart";
import axios from "axios";
import { ClientApi } from "../../ClientApi/ClientApi";

const DashboardSimple = () => {
const [sidebarOpen, setSidebarOpen] = useState(true);
const [currentTime, setCurrentTime] = useState(new Date());
const [stats, setstats] = useState({});
const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  //API STATS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ClientApi.getStats();
        console.log(response.data);
        setstats(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const adminPages = [
    { id: 1, name: "Dashboard", icon: <FaChartLine />, path: "/admin/dashboard" },
    { id: 2, name: "Orders", icon: <FaShoppingBag />, path: "/admin/orders" },
    { id: 3, name: "Menu", icon: <FaUtensils />, path: "/admin/menu" },
    { id: 4, name: "Customers", icon: <FaUserCircle />, path: "/admin/customers" },
    { id: 5, name: "Deliveries", icon: <FaTruck />, path: "/admin/deliveries" },
    { id: 6, name: "Drivers", icon: <FaMotorcycle />, path: "/admin/drivers" },
    { id: 7, name: "Reports", icon: <FaFileAlt />, path: "/admin/reports" },
  ];

  const handllogout = async () => {
    console.log("Attempting to log out...");
    try {
      const res = await ClientApi.Logout();
      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      } else if (res.data && res.data.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return(
     <div className="simple-dashboard">
      {/* LEFT SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        {/* Toggle Button Inside Sidebar */}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sidebar Header */}
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

        {/* Navigation Items */}
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

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handllogout}>
              <span>🚪</span> Logout
            </button>
          </div>
        )}
        </div>  
     </div>
  );
};

export default DashboardSimple;