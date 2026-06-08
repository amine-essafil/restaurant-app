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

    // ✅ Status flow: preparing → pending → on_delivery → completed (cancelled anytime)
  const statusFlow = {
    preparing: ["pending", "cancelled"],
    pending: ["on_delivery", "cancelled"],
    on_delivery: ["completed", "cancelled"],
    completed: [],
    cancelled: [],
  };

  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase() || "preparing";
    const configs = {
      preparing: {
        bg: "#fef3c7",
        text: "#92400e",
        emoji: "👨‍🍳",
        label: "Preparing",
      },
      pending: {
        bg: "#fed7aa",
        text: "#9a3412",
        emoji: "⏳",
        label: "Pending",
      },
      on_delivery: {
        bg: "#dbeafe",
        text: "#1e40af",
        emoji: "🚚",
        label: "On Delivery",
      },
      completed: {
        bg: "#d1fae5",
        text: "#065f46",
        emoji: "✅",
        label: "Completed",
      },
      cancelled: {
        bg: "#fee2e2",
        text: "#991b1b",
        emoji: "❌",
        label: "Cancelled",
      },
    };
    return configs[statusLower] || configs.preparing;
  };

// ============================================
// HELPERS
// ============================================
const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length > 1) return parts[0][0] + parts[1][0];
  return name[0];
};

const formatTime = (dateStr) => {
  if (!dateStr) return "00:00";
  try {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "00:00";
  }
};

const calculateETA = (dateStr) => {
  if (!dateStr) return "Soon";
  try {
    const orderDate = new Date(dateStr);
    const now = new Date();
    const diffMinutes = Math.floor((now - orderDate) / 60000);
    if (diffMinutes < 30) return `${30 - diffMinutes} min`;
    return "Soon";
  } catch {
    return "Soon";
  }
};

  // ============================================
  // FILTRAGE ET RECHERCHE
  // ============================================
  const statusCounts = useMemo(() => {
    return {
      "All Orders": orders.length,
      Pending: orders.filter((o) => o.status.toLowerCase() === "pending")
        .length,
      Preparing: orders.filter((o) => o.status.toLowerCase() === "preparing")
        .length,
      on_delivery: orders.filter(
        (o) => o.status.toLowerCase() === "on_delivery"
      ).length,
      Completed: orders.filter((o) => o.status.toLowerCase() === "completed")
        .length,
      Cancelled: orders.filter((o) => o.status.toLowerCase() === "cancelled")
        .length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let result = orders;

    // Filtre par statut - Fixed to handle on_delivery correctly
    if (filterStatus !== "All Orders") {
      result = result.filter((o) => {
        const orderStatus = o.status.toLowerCase();
        const selectedFilter = filterStatus.toLowerCase();
        return orderStatus === selectedFilter;
      });
    }

    // Recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(query) ||
          o.customer.toLowerCase().includes(query) ||
          o.phone.includes(query) ||
          o.items.toLowerCase().includes(query)
      );
    }

    return result;
  }, [orders, filterStatus, searchQuery]);

  // ============================================
  // HANDLERS
  // ============================================
  const updateStatus = async (orderIdx, newStatus) => {
    const order = filteredOrders[orderIdx];

    try {
      // Appel API pour mettre à jour le statut
      await ClientApi.PatchStatusCommande(order.rawId, newStatus);

      // ✅ Mettre à jour localement ET maintenir le tri par date décroissante
      const updatedOrders = orders
        .map((o) => (o.rawId === order.rawId ? { ...o, status: newStatus } : o))
        .sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Ordre décroissant: plus récent d'abord
        });

      setOrders(updatedOrders);

      setStatusModal(null);
    } catch (err) {
      console.error("Erreur mise à jour statut:", err);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  const handleCall = (phone) => {
    if (phone && phone !== "N/A") {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleRefresh = () => {
    fetchOrders();
  };

  const handleDeleteItem = async (orderId) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")
    ) {
      return;
    }

    try {
      await ClientApi.deleteCommande(orderId);
      setOrders(orders.filter((o) => o.rawId !== orderId));
    } catch (err) {
      console.error("Erreur suppression:", err);
      alert("Erreur lors de la suppression");
    }
  };

  const getTimeAgo = () => {
    const seconds = Math.floor((new Date() - lastUpdated) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };


  if (loading && orders.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && orders.length === 0) {
    return (
      <div className="error-container">
        <AlertCircle size={48} color="#e74c3c" />
        <h2>Erreur de chargement</h2>
        <p>{error}</p>
        <button onClick={handleRefresh}>Réessayer</button>
      </div>
    );
  }


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

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="page-content">
          {/* Header */}
          <div className="orders-header">
            <div className="header-left">
              <div className="header-icon">
                <ShoppingBag size={26} />
              </div>
              <div className="header-info">
                <h1 className="header-title">Gestion des Commandes</h1>
                <p className="header-subtitle">
                  Gérez et suivez toutes vos commandes en temps réel
                </p>
              </div>
              <div className="live-indicator">
                <span className="live-dot"></span>
                <span className="live-text">LIVE</span>
                <span className="live-time">Mis à jour: {getTimeAgo()}</span>
              </div>
            </div>
            <div className="header-actions">
              <button
                className="refresh-btn"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw size={18} className={loading ? "spinning" : ""} />
                <span>Actualiser</span>
              </button>
            </div>
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