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
import { getDashboardOrders } from "../../api/Order.api";
import { availableDrivers } from "../../api/Drivers.api";
const DeliveriesManagement = () => {
  const [orders, setOrders] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const [error, setError] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

    const [dashboard, setDashboard] = useState({
    pending: 0,
    on_delivery: 0,
    completed: 0,
    drivers: 0,
  });
  // Mapping des statuts backend vers frontend
  const statusMap = {
    'pending': 'Pending',
    'en cours': 'Preparing',
    'preparing': 'Preparing',
    'en livraison': 'On Delivery',
    'on_delivery': 'On Delivery',
    'livré': 'Completed',
    'completed': 'Completed',
    'delivered': 'Completed',
    'annulé': 'Cancelled',
    'cancelled': 'Cancelled'
  };
   // Mapping des véhicules backend vers frontend
  const vehicleMap = {
    'motorcycle': 'Motorcycle',
    'scooter': 'Scooter',
    'car': 'Car',
    'bicycle': 'Bicycle'
  };
  
  // Charger les données initiales
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Charger les commandes
      const commandesRes = await getDashboardOrders();
      console.log("Commandes:", commandesRes.data);

      const pendingOrders = commandesRes.data.Commandes.map((command) => {
        return {
          id: command.id,
          displayId: `#${command.id}`,
          customer: command.user.name,
          initials: command.user.name.charAt(0).toUpperCase(),
          phone: command.user.phone,
          address: command?.adresse_livraison?.street_address || 'N/A',
          amount: `${command.prix_total} DH`,
          status: statusMap[command.statut?.toLowerCase()] || command.statut,
          items: command.plats.map((plat) => plat.nom).join(', '),
          time: new Date(command.created_at).toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          assignedDriver: command.livreur_id,
          assignedDriverName: command.livreur?.user?.name || null,
          priority: command.priority || "Normal",
          paymentMethod: command.paymentMethod,
          deliveryInstructions: command?.adresse_livraison?.delivery_instructions,
          fullAddress: `${command?.adresse_livraison?.street_address || ''}, ${command?.adresse_livraison?.full_name || ''}`,
          rawData: command
        };
      });
      
      setDashboard({
        pending: commandesRes.data.pending || 0,
        on_delivery: commandesRes.data.on_delivery || 0,
        completed: commandesRes.data.completed || 0,
        drivers: commandesRes.data.drivers || 0,
      });
      
      setOrders(pendingOrders);

    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };


const fetchAvailableDrivers = async (orderId) => {
    setLoadingDrivers(true);
    setError(null);

    try {
        const response = await availableDrivers({ commande_id: orderId });
        console.log("Available drivers (response):", response);
        const driversData = response?.data; // Déclare la variable pour plus de clarté

        if (driversData?.drivers?.length > 0) {
            const formattedDrivers = driversData.drivers.map(driver => ({ 
                id: driver.id,
                name: driver.user.name || '',
                initials: driver.user.name.charAt(0) || '',
                phone: driver.user.phone || '',
                vehicle: vehicleMap[driver.vehicle_type] || driver.vehicle_type,
                rating: driver.rating || '0.0',
                active: driver.statut === 'active' && driver.available === 1, 
                currentDeliveries: driver.total_deliveries || 0,
                vehiclePlate: driver.vehicle_plate || '',
                currentLocation: driver.current_location || ''
            }));

            setDrivers(formattedDrivers);
        } else {
            setDrivers([]);
            setError("No available drivers");
        }
    } catch (error) {
        console.error("Error fetching drivers:", error);
        setError("Failed to load drivers. Please try again.");
        setDrivers([]);
    } finally {
        setLoadingDrivers(false);
    }
};

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

  const filteredOrders = useMemo(() => {
    let result = orders.filter(
      (o) => !o.assignedDriver || o.status === "Pending"
    );

    if (priorityFilter !== "All Orders") {
      result = result.filter((o) => o.priority === priorityFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.displayId.toLowerCase().includes(query) ||
          o.customer.toLowerCase().includes(query) ||
          o.phone.includes(query) ||
          o.address.toLowerCase().includes(query)
      );
    }

    return result;
  }, [orders, priorityFilter, searchQuery]);

    const getPriorityColor = (priority) => {
    return priority === "High"
      ? { bg: "#fee2e2", text: "#991b1b" }
      : { bg: "#fef3c7", text: "#92400e" };
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: { bg: "#fed7aa", text: "#9a3412" },
      "On Delivery": { bg: "#dbeafe", text: "#1e40af" },
      Completed: { bg: "#d1fae5", text: "#065f46" },
      Preparing: { bg: "#fef3c7", text: "#92400e" },
      Cancelled: { bg: "#fee2e2", text: "#991b1b" },
    };
    return colors[status] || { bg: "#f3f4f6", text: "#374151" };
  };

  
  // Désassigner un livreur
  const handleCancelDelivery = async (orderId) => {
    if (!window.confirm("Are you sure you want to unassign this driver?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/livreurs/unassign/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      console.log("Unassign response:", data);

      if (data.success) {
        const updatedOrders = orders.map((o) =>
          o.id === orderId 
            ? { ...o, assignedDriver: null, assignedDriverName: null, status: "Pending" } 
            : o
        );
        setOrders(updatedOrders);
        setOpenMenu(null);
        alert("Driver unassigned successfully!");
        fetchData();
      } else {
        setError(data.message || "Failed to unassign driver");
      }
    } catch (error) {
      console.error("Error unassigning driver:", error);
      setError("Failed to unassign driver. Please try again.");
    }
  };

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
         
          {/* Filter Tabs */}
          <div className="priority-filters">
            {["All Orders", "High", "Normal"].map((filter) => (
              <button
                key={filter}
                onClick={() => setPriorityFilter(filter)}
                className={`filter-btn ${
                  priorityFilter === filter ? "active" : ""
                }`}
              >
                {filter === "High" && "🔴"}
                {filter === "Normal" && "🟡"}
                {filter}
              </button>
            ))}
          </div> 
       {/* Search */}
          <div className="search-section">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by order ID, customer, phone, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Delivery Orders Table */}
          <div className="deliveries-table-container">
            <table className="deliveries-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Amount</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned Driver</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const priorityColor = getPriorityColor(order.priority);
                    const statusColor = getStatusColor(order.status);

                    return (
                      <React.Fragment key={order.id}>
                        <tr className="order-row">
                          <td>
                            <button
                              onClick={() =>
                                setExpandedOrder(
                                  expandedOrder === order.id ? null : order.id
                                )
                              }
                              className="expand-btn"
                            >
                              {expandedOrder === order.id ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </button>
                          </td>
                          <td>
                            <span className="order-id">{order.displayId}</span>
                          </td>
                          <td>
                            <div className="customer-info">
                              <div className="customer-avatar">
                                {order.initials}
                              </div>
                              <span className="customer-name">
                                {order.customer}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="address-info">
                              <FaMapMarkerAlt className="address-icon" />
                              {order.address}
                            </div>
                          </td>
                          <td className="amount-value">{order.amount}</td>
                          <td>
                            <span
                              className="priority-badge"
                              style={{
                                backgroundColor: priorityColor.bg,
                                color: priorityColor.text,
                              }}
                            >
                              {order.priority === "High" ? "🔴" : "🟡"}{" "}
                              {order.priority}
                            </span>
                          </td>
                          <td>
                            <span
                              className="status-badge"
                              style={{
                                backgroundColor: statusColor.bg,
                                color: statusColor.text,
                              }}
                            >
                              {order.status === "Pending" && "⏳"}
                              {order.status === "On Delivery" && "🚚"}
                              {order.status === "Completed" && "✅"}
                              {order.status === "Preparing" && "👨‍🍳"}
                              {order.status === "Cancelled" && "❌"}
                              {order.status}
                            </span>
                          </td>
                          <td>
                            {order.assignedDriverName ? (
                              <div className="driver-assigned">
                                <span className="check-icon">✓</span>
                                <span className="driver-name">
                                  {order.assignedDriverName}
                                </span>
                              </div>
                            ) : (
                              <span className="not-assigned">Not assigned</span>
                            )}
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                onClick={() => handleCall(order.phone)}
                                className="action-btn call-btn"
                                title="Call customer"
                              >
                                <FaPhone />
                              </button>
                              <div className="action-menu-wrapper">
                                <button
                                  onClick={() =>
                                    setOpenMenu(
                                      openMenu === order.id ? null : order.id
                                    )
                                  }
                                  className="action-btn menu-btn"
                                >
                                  ⋮
                                </button>
                                {openMenu === order.id && (
                                  <div className="action-dropdown">
                                    {!order.assignedDriver ? (
                                      <button
                                        onClick={() => openAssignModal(order.id)}
                                        className="dropdown-item assign"
                                      >
                                        <FaTruck /> Assign Driver
                                      </button>
                                    ) : (
                                      <>
                                        <button
                                          onClick={() =>
                                            handleCompleteDelivery(order.id)
                                          }
                                          className="dropdown-item complete"
                                        >
                                          <FaCheck /> Complete Delivery
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleCancelDelivery(order.id)
                                          }
                                          className="dropdown-item reassign"
                                        >
                                          <FaExclamationCircle /> Reassign
                                          Driver
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                        {expandedOrder === order.id && (
                          <tr className="expanded-row">
                            <td colSpan="9">
                              <div className="expanded-content">
                                <div className="expanded-section">
                                  <p className="section-title">📞 Contact</p>
                                  <p className="section-value">{order.phone}</p>
                                </div>
                                <div className="expanded-section">
                                  <p className="section-title">📦 Items</p>
                                  <p className="section-value">{order.items}</p>
                                </div>
                                <div className="expanded-section">
                                  <p className="section-title">🕐 Order Time</p>
                                  <p className="section-value">{order.time}</p>
                                </div>
                                {order.deliveryInstructions && (
                                  <div className="expanded-section">
                                    <p className="section-title">📝 Instructions</p>
                                    <p className="section-value">{order.deliveryInstructions}</p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="no-data">
                      No pending orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
     </div>
     </div>
    </div>
  );
};

export default DeliveriesManagement;