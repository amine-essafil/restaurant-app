import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  ChevronDown,
  Edit,
  Trash2,
  AlertCircle,
  Search,
  Download,
  Printer,
  RefreshCw,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  UtensilsCrossed,
  Banknote,
  Filter,
  Calendar,
} from "lucide-react";
import {
  FaUtensils,
  FaChartLine,
  FaTruck,
  FaUsers,
  FaMotorcycle,
  FaFileAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./OrdersAdmin.css";
import { ClientApi } from "../../ClientApi/ClientApi";

// ============================================
// COMPOSANT ERROR BOUNDARY
// ============================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <AlertCircle size={48} color="#e74c3c" />
          <h2>Une erreur est survenue</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Recharger la page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================
// COMPOSANT LOADING
// ============================================
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p>Chargement des commandes...</p>
  </div>
);

// États
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [statusModal, setStatusModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Orders");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // ============================================
  // CONFIGURATION
  // ============================================
  const adminPages = [
    { id: 1, name: "Dashboard", icon: <FaChartLine />, path: "/admin/dashboard" },
    { id: 2, name: "Orders", icon: <ShoppingBag size={20} />, path: "/admin/orders" },
    { id: 3, name: "Menu", icon: <FaUtensils />, path: "/admin/menu" },
    { id: 4, name: "Customers", icon: <FaUsers />, path: "/admin/customers" },
    { id: 5, name: "Deliveries", icon: <FaTruck />, path: "/admin/deliveries" },
    { id: 6, name: "Drivers", icon: <FaMotorcycle />, path: "/admin/drivers" },
    { id: 7, name: "Reports", icon: <FaFileAlt />, path: "/admin/reports" },
  ];


function OrdersAdmin() {
  return (
  <div className="orders-admin-wrapper">
    {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Fermer" : "Ouvrir"}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="sidebar-header">
          {sidebarOpen ? (
            <div className="logo-section">
              <div className="logo-icon">
                <FaUtensils />
              </div>
              <div className="logo-text">
                <h1>FoodExpress</h1>
                <p>Admin Panel</p>
              </div>
            </div>
          ) : (
            <div className="logo-icon-only">
              <FaUtensils />
            </div>
          )}
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
  </div>
  );
}

export default function OrdersAdminWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <OrdersAdmin />
    </ErrorBoundary>
  );
}