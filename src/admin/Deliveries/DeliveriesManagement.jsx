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
import { ClientApi } from "../../ClientApi/ClientApi";

const DeliveriesManagement = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [assignModal, setAssignModal] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("All Orders"); 

  const [dashboard, setDashboard] = useState({
    pending: 0,
    on_delivery: 0,
    completed: 0,
    drivers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [assigningDriver, setAssigningDriver] = useState(false);
  const [error, setError] = useState(null);

  // Mapping des statuts backend vers frontend
  const statusMap = {
    pending: "Pending",
    "en cours": "Preparing",
    preparing: "Preparing",
    "en livraison": "On Delivery",
    on_delivery: "On Delivery",
    livré: "Completed",
    completed: "Completed",
    delivered: "Completed",
    annulé: "Cancelled",
    cancelled: "Cancelled",
  };

  // Mapping des véhicules backend vers frontend
  const vehicleMap = {
    motorcycle: "Motorcycle",
    scooter: "Scooter",
    car: "Car",
    bicycle: "Bicycle",
  };

  const adminPages = [
    { id: 1, name: "Dashboard", icon: <FaChartLine />, path: "/admin/dashboard" },
    { id: 2, name: "Orders", icon: <FaShoppingBag />, path: "/admin/orders" },
    { id: 3, name: "Menu", icon: <FaUtensils />, path: "/admin/menu" },
    { id: 4, name: "Customers", icon: <FaUsers />, path: "/admin/customers" },
    { id: 5, name: "Deliveries", icon: <FaTruck />, path: "/admin/deliveries" },
    { id: 6, name: "Drivers", icon: <FaMotorcycle />, path: "/admin/drivers" },
    { id: 7, name: "Reports", icon: <FaFileAlt />, path: "/admin/reports" },
  ];

  // Charger les données initiales
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Charger les commandes
      const commandesRes = await ClientApi.CommandesDashboard();
      console.log("Commandes:", commandesRes.data);

      const pendingOrders = commandesRes.data.Commandes.map((command) => {
        return {
          id: command.id,
          displayId: `#${command.id}`,
          customer: command.user.name,
          initials: command.user.name.charAt(0).toUpperCase(),
          phone: command.user.phone,
          address: command?.adresse_livraison?.street_address || "N/A",
          amount: `${command.prix_total} $`,
          status: statusMap[command.statut?.toLowerCase()] || command.statut,
          items: command.plats.map((plat) => plat.nom).join(", "),
          time: new Date(command.created_at).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          assignedDriver: command.livreur_id,
          assignedDriverName: command.livreur?.user?.name || null,
          priority: command.priority || "Normal",
          paymentMethod: command.paymentMethod,
          deliveryInstructions:
            command?.adresse_livraison?.delivery_instructions,
          fullAddress: `${command?.adresse_livraison?.street_address || ""}, ${
            command?.adresse_livraison?.full_name || ""
          }`,
          rawData: command,
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
      const response = await ClientApi.availableDrivers({
        commande_id: orderId,
      });
      console.log("Available drivers (response):", response);
      const driversData = response?.data; // Déclare la variable pour plus de clarté

      if (driversData?.drivers?.length > 0) {
        const formattedDrivers = driversData.drivers.map((driver) => ({
          id: driver.id,
          name: driver.user.name || "",
          initials: driver.user.name.charAt(0) || "",
          phone: driver.user.phone || "",
          vehicle: vehicleMap[driver.vehicle_type] || driver.vehicle_type,
          active: driver.statut === "active" && driver.available === 1,
          currentDeliveries: driver.total_deliveries || 0,
          vehiclePlate: driver.vehicle_plate || "",
          currentLocation: driver.current_location || "",
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

  // Ouvrir le modal et charger les livreurs
  const openAssignModal = (orderId) => {
    setAssignModal(orderId);
    fetchAvailableDrivers(orderId);
  };
  
  // Assigner un livreur à une commande Assigned Driver
  const handleAssignDriver = async (orderId, driverId) => {
    setAssigningDriver(true);
    setError(null);

    try {
      console.log("=== ASSIGNING DRIVER ===");
      console.log("Order ID:", orderId);
      console.log("Driver ID:", driverId);

      const response = await ClientApi.assignToOrder({
        commande_id: orderId,
        driver_id: driverId,
      });
      console.log("Assign response:", response);

      // Vérifie que la réponse contient bien data
      const resData = response?.data;
      if (!resData) {
        throw new Error("Invalid response from server");
      }

      if (resData.success) {
        const assignedDriver = drivers.find((d) => d.id === driverId);
        console.log("Assigned driver:", assignedDriver);

        const updatedOrders = orders.map((o) =>
          o.id === orderId
            ? {
                ...o,
                assignedDriver: driverId,
                assignedDriverName: assignedDriver?.name,
                status: "On Delivery",
              }
            : o
        );

        setOrders(updatedOrders);
        setAssignModal(null);
        setOpenMenu(null);

        alert(
          `Driver ${assignedDriver?.name} assigned successfully to order #${orderId}!`
        );
        console.log("=== ASSIGNMENT COMPLETE ===");
        fetchData();
      } else {
        setError(resData.message || "Failed to assign driver");
      }
    } catch (error) {
      console.error("Error assigning driver:", error);
      setError(error.message || "Failed to assign driver. Please try again.");
    } finally {
      setAssigningDriver(false);
    }
  };
    // Désassigner un livreur
  const handleCancelDelivery = async (orderId) => {
    if (!window.confirm("Are you sure you want to unassign this driver?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/livreurs/unassign/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log("Unassign response:", data);

      if (data.success) {
        const updatedOrders = orders.map((o) =>
          o.id === orderId
            ? {
                ...o,
                assignedDriver: null,
                assignedDriverName: null,
                status: "Pending",
              }
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

  const handleCompleteDelivery = (orderId) => {
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: "Completed" } : o
    );
    setOrders(updatedOrders);
    setOpenMenu(null);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
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

    </div>
  );
};

export default DeliveriesManagement;