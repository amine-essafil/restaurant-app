import React, { useState, useMemo, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSearch,
  FaPlus,
  FaTrash,
  FaEye,
  FaTimes,
  FaCheck,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendar,
  FaShoppingBag,
  FaDollarSign,
  FaStar,
  FaFilter,
  FaDownload,
  FaUpload,
  FaBan,
  FaCheckCircle,
  FaCrown,
  FaEdit,
  FaHeart,
  FaChartLine,
  FaGift,
  FaClock,
  FaCommentDots,
  FaUtensils,
  FaTruck,
  FaMotorcycle,
  FaFileAlt,
  FaBars,
  FaInfoCircle,
  FaUserEdit,
  FaTrashAlt,
  FaUserLock,
} from "react-icons/fa";
import { SquarePen } from "lucide-react";
import "./CustomersManagement.css";
import { ClientApi } from "../../ClientApi/ClientApi";

const CustomersManagement = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const adminPages = [
    { id: 1, name: "Dashboard", icon: <FaChartLine />, path: "/admin/dashboard" },
    { id: 2, name: "Orders", icon: <FaShoppingBag />, path: "/admin/orders" },
    { id: 3, name: "Menu", icon: <FaUtensils />, path: "/admin/menu" },
    { id: 4, name: "Customers", icon: <FaUserCircle />, path: "/admin/customers" },
    { id: 5, name: "Deliveries", icon: <FaTruck />, path: "/admin/deliveries" },
    { id: 6, name: "Drivers", icon: <FaMotorcycle />, path: "/admin/drivers" },
    { id: 7, name: "Reports", icon: <FaFileAlt />, path: "/admin/reports" },
  ];

  const navigate = useNavigate();
  const [customers, setcustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 999999;
  const [form, setform] = useState({
    name: "",
    email: "",
    phone: "",
    adress: "",
    role: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ClientApi.GetAllUsers();
        console.log(response.data);
        setcustomers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.phone && customer.phone.includes(searchTerm));
      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  const statusCounts = {
    all: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    inactive: customers.filter((c) => c.status === "inactive").length,
    blocked: customers.filter((c) => c.status === "blocked").length,
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  { loading && <p>Loading chart...</p>; }

  return (
    <div className="customers-management-container">
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
                <div className="logo-icon"><FaUtensils /></div>
                <div className="logo-text">
                  <h1>FoodExpress</h1>
                  <p>Admin Panel</p>
                </div>
              </div>
            )}
            {!sidebarOpen && (
              <div className="logo-icon-only"><FaUtensils /></div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          {adminPages.map((page) => (
            <Link
              key={page.id}
              to={page.path}
              className={`nav-item ${location.pathname === page.path ? "active" : ""}`}
            >
              <span className="nav-icon">{page.icon}</span>
              {sidebarOpen && (
                <div className="nav-text"><p>{page.name}</p></div>
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

      <div className="main-content">
        <div className="customers-management">
        {/* Header */}
          <div className="customers-header">
            <div className="header-content">
              <div className="header-left">
                <div className="header-icon"><FaUserCircle /></div>
                <div>
                  <h1 className="page-title">Customer Management</h1>
                  <p className="page-subtitle">Manage customer accounts and information</p>
                </div>
              </div>
              <div className="header-actions">
                <button
                  className="header-btn add-btn"
                  onClick={() => setShowAddModal(true)}
                >
                  <FaPlus />
                  Add Customer
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="customers-stats">
            <div className="stat-card total">
              <div className="stat-icon"><FaUserCircle /></div>
              <div className="stat-info">
                <span className="stat-label">Total Customers</span>
                <span className="stat-value">{customers.length}</span>
                <span className="stat-change positive">
                  <FaChartLine /> +12% this month
                </span>
              </div>
            </div>
            <div className="stat-card active">
              <div className="stat-icon"><FaCheckCircle /></div>
              <div className="stat-info">
                <span className="stat-label">Active</span>
                <span className="stat-value">{statusCounts.active}</span>
                <span className="stat-change positive">
                  <FaChartLine /> 87.5% activity rate
                </span>
              </div>
            </div>
            <div className="stat-card revenue">
              <div className="stat-icon"><FaDollarSign /></div>
              <div className="stat-info">
                <span className="stat-label">Total Revenue</span>
                <span className="stat-value">20.8K $</span>
                <span className="stat-change positive">
                  <FaChartLine /> +8.2% growth
                </span>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
};

export default CustomersManagement;