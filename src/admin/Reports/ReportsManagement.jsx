import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LeftSideBar from "../AdminComponents/LeftSideBar";
import Header from "../AdminComponents/Header";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaTrash,
  FaEnvelope,
  FaEnvelopeOpen,
  FaExclamationCircle,
  FaCheckCircle,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUtensils,
  FaChartLine,
  FaTruck,
  FaUsers,
  FaMotorcycle,
  FaFileAlt,
  FaBars,
  FaTimes,
  FaShoppingBag,
  FaClock,
  FaReply,
} from "react-icons/fa";
import "./ReportsManagement.css";
function ReportsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [kpis, setKpis] = useState({
    total_reports: 0,
    unread: 0,
    read: 0,
    resolved: 0,
    high_priority: 0,
    medium_priority: 0,
    low_priority: 0,
    avg_resolution_time: 0,
    resolution_rate: 0,
    overdue_reports: 0,
  });


  return (
    <div className="reports-management-container">
     <LeftSideBar/>
    
      {/* MAIN CONTENT */}
      <div className="main-content">
          <Header/>
        <div className="reports-management">
          {/* Header */}
          <div className="reports-header">
            <div className="header-left">
              <FaFileAlt className="page-icon" />
              <div>
                <h1 className="page-title">Reports & Messages</h1>
                <p className="page-subtitle">
                  Manage customer reports and contact messages
                </p>
              </div>
            </div>
            <button className="export-btn" >
              <FaDownload /> Export Reports
            </button>
          </div>
         </div>
          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon total">
                <FaFileAlt />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Reports</p>
                <h3 className="stat-value">{kpis.total_reports}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon unread">
                <FaEnvelope />
              </div>
              <div className="stat-info">
                <p className="stat-label">Unread</p>
                <h3 className="stat-value">{kpis.unread}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon read">
                <FaEnvelopeOpen />
              </div>
              <div className="stat-info">
                <p className="stat-label">Read</p>
                <h3 className="stat-value">{kpis.read}</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon resolved">
                <FaCheckCircle />
              </div>
              <div className="stat-info">
                <p className="stat-label">Resolved</p>
                <h3 className="stat-value">{kpis.resolved}</h3>
              </div>
            </div>
          {/* KPIs avancés */}
          <div className="stats-cards" style={{ marginTop: '1rem' }}>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#8b5cf6' }}>
                <FaClock />
              </div>
              <div className="stat-info">
                <p className="stat-label">Temps Moyen Résolution</p>
                <h3 className="stat-value">{kpis.avg_resolution_time}h</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#10b981' }}>
                <FaChartLine />
              </div>
              <div className="stat-info">
                <p className="stat-label">Taux de Résolution</p>
                <h3 className="stat-value">{kpis.resolution_rate}%</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#ef4444' }}>
                <FaExclamationCircle />
              </div>
              <div className="stat-info">
                <p className="stat-label">Reports en Retard</p>
                <h3 className="stat-value">{kpis.overdue_reports}</h3>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, email, subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
                onClick={() => setStatusFilter("all")}
              >
                All ({kpis.total_reports})
              </button>
              <button
                className={`filter-btn ${statusFilter === "unread" ? "active" : ""}`}
                onClick={() => setStatusFilter("unread")}
              >
                Unread ({kpis.unread})
              </button>
              <button
                className={`filter-btn ${statusFilter === "read" ? "active" : ""}`}
                onClick={() => setStatusFilter("read")}
              >
                Read ({kpis.read})
              </button>
              <button
                className={`filter-btn ${statusFilter === "resolved" ? "active" : ""}`}
                onClick={() => setStatusFilter("resolved")}
              >
                Resolved ({kpis.resolved})
              </button>
            </div>
          </div>
          </div>

       </div>

    </div> 
  )
}

export default ReportsManagement