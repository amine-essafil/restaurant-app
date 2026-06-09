import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  ChevronDown,
  MoreVertical,
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
import { Utensils, DollarSign } from "lucide-react";
import { deleteOrder, getOrderUsers, updateOrderStatus } from "../../api/Order.api";
 
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

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
function OrdersAdmin() {
  // États
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
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
    { id: 8, name: "Analytics", icon: <FaChartLine />, path: "/admin/analytics" },
  ];

  const statusFlow = {
    preparing: ["delivering", "cancelled"],
    pending: ["preparing", "cancelled"],
    delivering: ["completed", "cancelled"],
    completed: [],
    cancelled: [],
  };

    const getStatusConfig = (status) => {
    // Normaliser le statut (gérer null, undefined, etc.)
    const statusLower = (status || "pending").toString().toLowerCase().trim();
    
    const configs = {
      preparing: { color: "status-preparing", icon: <UtensilsCrossed size={14} />, label: "Preparing" },
      pending: { color: "status-pending", icon: <Clock size={14} />, label: "Pending" },
      delivering: { color: "status-delivering", icon: <Truck size={14} />, label: "Delivering" },
      completed: { color: "status-completed", icon: <CheckCircle size={14} />, label: "Completed" },
      cancelled: { color: "status-cancelled", icon: <XCircle size={14} />, label: "Cancelled" },
    };
    
    // Retourner la config ou pending par défaut
    return configs[statusLower] || configs.pending;
  };

  // ============================================
  // FETCH DATA
  // ============================================
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getOrderUsers();
      console.log(response.data)
      const ordersApi = response.data;
console.log(ordersApi)
      const formattedOrders = ordersApi.map((item) => {
        // Extraire initiales du nom
        const getInitials = (name) => {
          if (!name) return "?";
          const parts = name.trim().split(" ");
          if (parts.length > 1) {
            return parts[0][0] + parts[1][0];
          }
          return name[0];
        };

        // Formatter les plats
        const platsNames = item.plats?.map((p) => p.nom).join(", ") || "Aucun plat";
        
        // Formatter l'heure
        const formatTime = (dateStr) => {
          if (!dateStr) return "00:00";
          try {
            const date = new Date(dateStr);
            return date.toLocaleTimeString("fr-FR", { 
              hour: "2-digit", 
              minute: "2-digit" 
            });
          } catch {
            return "00:00";
          }
        };

        // Calculer ETA
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

        return {
          id: `#${item.id}`,
          rawId: item.id,
          customer: item.user?.name || "Client inconnu",
          initials: getInitials(item.user?.name),
          phone: item.user?.phone || "N/A",
          items: platsNames,
          itemCount: item.plats?.length || 0,
          amount: parseFloat(item.prix_total || 0).toFixed(2),
          status: item.statut || "pending",
          orderTime: formatTime(item.date_commande),
          eta: calculateETA(item.date_commande),
          payment: item.paymentMethod || "especes",
          rawData: item, // Garder les données brutes pour référence
        };
      });

      setOrders(formattedOrders);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Erreur lors du chargement:", err);
      setError(err.message || "Impossible de charger les commandes");
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger les données au montage
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // ============================================
  // FILTRAGE ET RECHERCHE
  // ============================================
  const statusCounts = useMemo(() => {
    return {
      "All Orders": orders.length,
      Pending: orders.filter((o) => o.status.toLowerCase() === "pending").length,
      Preparing: orders.filter((o) => o.status.toLowerCase() === "preparing").length,
      Delivering: orders.filter((o) => o.status.toLowerCase() === "delivering").length,
      Completed: orders.filter((o) => o.status.toLowerCase() === "completed").length,
      Cancelled: orders.filter((o) => o.status.toLowerCase() === "cancelled").length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let result = orders;

    // Filtre par statut
    if (filterStatus !== "All Orders") {
      result = result.filter(
        (o) => o.status.toLowerCase() === filterStatus.toLowerCase()
      );
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
    console.log(order)
    try {
       await updateOrderStatus({
        id: order.rawId,
        statut: newStatus,})
      // Mettre à jour localement
      const updatedOrders = orders.map((o) =>
        o.rawId === order.rawId ? { ...o, status: newStatus } : o
      );
      setOrders(updatedOrders);
      
      setStatusModal(null);
      setOpenMenu(null);
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

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      return;
    }

    try {
      await deleteOrder(orderId);
      setOrders(orders.filter((o) => o.rawId !== orderId));
      setOpenMenu(null);
    } catch (err) {
      console.error("Erreur suppression:", err);
      alert("Erreur lors de la suppression");
    }
  };
//image Url
  const getTimeAgo = () => {
    const seconds = Math.floor((new Date() - lastUpdated) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  // Fermer les menus au clic extérieur
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ============================================
  // RENDER
  // ============================================
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
              <div className="logo-icon"><FaUtensils /></div>
              <div className="logo-text">
                <h1>FoodExpress</h1>
                <p>Admin Panel</p>
              </div>
            </div>
          ) : (
            <div className="logo-icon-only"><FaUtensils /></div>
          )}
        </div>

        <nav className="sidebar-nav">
          {adminPages.map((page) => (
            <Link
              key={page.id}
              to={page.path}
              className={`nav-item ${location.pathname === page.path ? "active" : ""}`}
            >
              <span className="nav-icon">{page.icon}</span>
              {sidebarOpen && <div className="nav-text"><p>{page.name}</p></div>}
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
      <div className="orders-admin-container">
        {/* Header */}
        <div className="orders-header">
          <div className="header-left">
            <div className="header-icon"><ShoppingBag size={26} /></div>
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
            <button className="refresh-btn" onClick={handleRefresh} disabled={loading}>
              <RefreshCw size={18} className={loading ? "spinning" : ""} />
            </button>
            <button className="export-btn">
              <Download size={18} /> Export
            </button>
            <button className="print-btn">
              <Printer size={18} /> Imprimer
            </button>
          </div>
        </div>

        <div className="orders-content">
          {/* Tabs de filtrage */}
          <div className="status-tabs">
            {["All Orders", "Pending", "Preparing", "Delivering", "Completed", "Cancelled"].map((tab) => {
              const icons = {
                "All Orders": <ShoppingBag size={16} />,
                Pending: <Clock size={16} />,
                Preparing: <UtensilsCrossed size={16} />,
                Delivering: <Truck size={16} />,
                Completed: <CheckCircle size={16} />,
                Cancelled: <XCircle size={16} />,
              };
              return (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`status-tab ${filterStatus === tab ? "active" : ""}`}
                >
                  <span className="tab-icon">{icons[tab]}</span>
                  <span className="tab-label">{tab}</span>
                  <span className="tab-count">{statusCounts[tab]}</span>
                </button>
              );
            })}
          </div>

          {/* Barre de recherche */}
          <div className="orders-toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Rechercher par ID, nom ou téléphone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="filter-btn">
              <Filter size={18} /> Filtres
            </button>
            <button className="calendar-btn">
              <Calendar size={18} /> Date
            </button>
          </div>

          {/* Table des commandes */}
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th className="expand-col"></th>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Articles</th>
                  <th>Montant</th>
                  <th>Statut</th>
                  <th>Heure</th>
                  <th>Paiement</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, idx) => (
                    <React.Fragment key={order.rawId}>
                      <tr className="order-row">
                        <td className="expand-col">
                          <button
                            onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                            className="expand-btn"
                          >
                            <ChevronDown
                              size={18}
                              className={expandedRow === idx ? "rotate" : ""}
                            />
                          </button>
                        </td>
                        <td><span className="order-id">{order.id}</span></td>
                        <td>
                          <div className="customer-info">
                            <div className="customer-avatar">{order.initials}</div>
                            <div className="customer-details">
                              <div className="customer-name">{order.customer}</div>
                              <div className="customer-phone">
                                <Phone size={10} className="phone-icon" />
                                {order.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="items-info">
                            <div className="items-badge">
                              <ShoppingBag size={11} className="items-icon" />
                              {order.itemCount}
                            </div>
                            <span className="items-name">{order.items}</span>
                          </div>
                        </td>
                        <td><span className="order-amount">{order.amount} DH</span></td>
                        <td>
                          <button
                            onClick={() => setStatusModal(idx)}
                            className={`status-badge ${getStatusConfig(order.status).color}`}
                          >
                            {getStatusConfig(order.status).icon}
                            {getStatusConfig(order.status).label}
                          </button>
                        </td>
                        <td>
                          <div className="time-info">
                            <div className="order-time">
                              <Clock size={11} className="time-icon" />
                              {order.orderTime}
                            </div>
                            <div className="order-eta">
                              <Truck size={11} className="eta-icon" />
                              {order.eta}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="payment-badge">
                            <Banknote size={12} className="payment-icon" />
                            {order.payment}
                          </div>
                        </td>
                        <td className="actions-col">
                          <div className="action-buttons">
                            <button
                              onClick={() => handleCall(order.phone)}
                              className="action-btn call-btn"
                              title="Appeler"
                            >
                              <Phone size={18} />
                            </button>
                            <div className="action-dropdown">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenu(openMenu === idx ? null : idx);
                                }}
                                className="action-btn more-btn"
                              >
                                <MoreVertical size={18} />
                              </button>
                              {openMenu === idx && (
                                <div className="dropdown-menu">
                                  <button
                                    onClick={() => setStatusModal(idx)}
                                    className="dropdown-item"
                                  >
                                    <Edit size={16} /> Changer statut
                                  </button>
                                  <button
                                    onClick={() => handleDeleteOrder(order.rawId)}
                                    className="dropdown-item danger"
                                  >
                                    <Trash2 size={16} /> Supprimer
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                      {expandedRow === idx && (
                        <tr className="expanded-row">
                          <td colSpan="9">
                            <div className="expanded-content">
                              <div className="expanded-item">
                                <p className="expanded-label"><Phone size={14} /> Téléphone</p>
                                <p className="expanded-value">{order.phone}</p>
                              </div>
                              <div className="expanded-item">
                                <p className="expanded-label"><ShoppingBag size={14} /> Détails</p>
                                <p className="expanded-value">
                                  Commande {order.id} - {order.customer}
                                </p>
                                <p className="expanded-subvalue">
                                  {order.items} ({order.itemCount} articles)
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="empty-state">
                      <AlertCircle size={48} />
                      <p>Aucune commande trouvée</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal changement de statut */}
        {statusModal !== null && filteredOrders[statusModal] && (
          <div className="modal-overlay" onClick={() => setStatusModal(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">
                Modifier le statut : {filteredOrders[statusModal].id}
              </h2>

              <div className="current-status">
                <p className="status-label">Statut actuel :</p>
                <div
                  className={`status-badge large ${
                    getStatusConfig(filteredOrders[statusModal].status).color
                  }`}
                >
                  {getStatusConfig(filteredOrders[statusModal].status).icon}
                  {getStatusConfig(filteredOrders[statusModal].status).label}
                </div>
              </div>

              <p className="status-label">Nouveau statut :</p>
              <div className="status-options">
                {statusFlow[filteredOrders[statusModal].status.toLowerCase()]?.length > 0 ? (
                  statusFlow[filteredOrders[statusModal].status.toLowerCase()].map(
                    (nextStatus) => (
                      <button
                        key={nextStatus}
                        onClick={() => updateStatus(statusModal, nextStatus)}
                        className={`status-option ${getStatusConfig(nextStatus).color}`}
                      >alert
                        {getStatusConfig(nextStatus).icon}
                        {getStatusConfig(nextStatus).label}
                      </button>
                    )
                  )
                ) : (
                  <div className="no-options">
                    <AlertCircle size={18} />
                    <span>Aucune modification possible</span>
                  </div>
                )}
              </div>

              <button onClick={() => setStatusModal(null)} className="modal-cancel">
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Export avec Error Boundary
export default function OrdersAdminWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <OrdersAdmin />
    </ErrorBoundary>
  );
}