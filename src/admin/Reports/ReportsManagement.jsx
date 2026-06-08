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
import { deleteReport, getKPIs, getReports, markAsRead, markAsResolved } from "../../api/Report.api";
function ReportsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;
  // Pagination
  const totalPages = Math.ceil(reports.length / reportsPerPage);
  
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

   useEffect(() => {
    fetchReports();
    fetchKPIs();
  }, [statusFilter, searchTerm, currentPage]);

    const fetchReports = async () => {
    try {
      setLoading(true);
      const params = {
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: searchTerm || undefined,
        page: currentPage,
        per_page: reportsPerPage,
      };
      
    const response = await getReports(params);
      console.log("API Reports:", response.data.data );
    setReports(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des reports');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchKPIs = async () => {
    try {
      const data = await getKPIs();
      console.log(data);
      setKpis(data.data);
    } catch (err) {
      console.error('Error fetching KPIs:', err);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      unread: { color: "#f59e0b", icon: <FaEnvelope />, text: "Unread" },
      read: { color: "#3b82f6", icon: <FaEnvelopeOpen />, text: "Read" },
      resolved: { color: "#10b981", icon: <FaCheckCircle />, text: "Resolved" },
    };
    return statusConfig[status] || statusConfig.unread;
  };


 const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: "#ef4444", text: "High" },
      medium: { color: "#f59e0b", text: "Medium" },
      low: { color: "#6b7280", text: "Low" },
    };
    return priorityConfig[priority] || priorityConfig.medium;
  };
 
   const handleMarkAsRead = async (reportId) => {
    try {
      await markAsRead(reportId);
      // Rafraîchir les données
      fetchReports();
      fetchKPIs();
      
      // Mettre à jour le modal si ouvert
      if (selectedReport?.id === reportId) {
        setSelectedReport({ ...selectedReport, status: 'read' });
      }
    } catch (err) {
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleViewReport = async (report) => {
    setSelectedReport(report);
    setShowViewModal(true);
    if (report.status === 'unread') {
      await handleMarkAsRead(report.id);
    }
  };

    const handleDeleteReport = async (reportId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce report ?")) {
      try {
        await deleteReport(reportId);
        fetchReports();
        fetchKPIs();
        alert('Report supprimé avec succès');
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleMarkAsResolved = async (reportId) => {
    try {
      await markAsResolved(reportId);
      // Rafraîchir les données
      fetchReports();
      fetchKPIs();
      
      // Mettre à jour le modal si ouvert
      if (selectedReport?.id === reportId) {
        setSelectedReport({ ...selectedReport, status: 'resolved' });
      }
    } catch (err) {
      alert('Erreur lors de la résolution du report');
    }
  };



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
          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Chargement des reports...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
              <p>{error}</p>
            </div>
          )}
          {/* Reports Table */}
          {!loading && !error && (
            <div className="reports-table-container">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Reporter</th>
                    <th>Contact</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date & Time</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => {
                    const statusBadge = getStatusBadge(report.status);
                    const priorityBadge = getPriorityBadge(report.priority);

                    return (
                      <tr key={report.id}>
                        <td>
                          <div className="reporter-info">
                            <div className="reporter-avatar">
                              {report.name.charAt(0)}
                            </div>
                            <div className="reporter-details">
                              <p className="reporter-name">{report.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="contact-info">
                            <p className="contact-email">{report.email}</p>
                          </div>
                        </td>
                        <td>
                          <span className="subject-text">{report.subject}</span>
                        </td>
                        <td>
                          <p className="message-preview">
                            {report.message.substring(0, 50)}...
                          </p>
                        </td>
                        <td>
                          <div className="date-time">
                            <p className="date">
                              {new Date(report.created_at).toLocaleDateString()}
                            </p>
                            <p className="time">
                              {new Date(report.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </td>
                        <td>
                          <span
                            className="priority-badge"
                            style={{ backgroundColor: priorityBadge.color }}
                          >
                            {priorityBadge.text}
                          </span>
                        </td>
                        <td>
                          <span
                            className="status-badge"
                            style={{ backgroundColor: statusBadge.color }}
                          >
                            {statusBadge.icon}
                            {statusBadge.text}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="action-btn view-btn"
                              onClick={() => handleViewReport(report)}
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDeleteReport(report.id)}
                              title="Delete Report"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {/* Pagination */}
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft /> Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <FaChevronRight />
            </button>
          </div>
       </div>
    {/* View Modal */}
      {showViewModal && selectedReport && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Report Details</h2>
              <button
                className="modal-close"
                onClick={() => setShowViewModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="report-detail-section">
                <h3>Reporter Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <FaUser className="detail-icon" />
                    <div>
                      <label>Name</label>
                      <p>{selectedReport.name}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaEnvelope className="detail-icon" />
                    <div>
                      <label>Email</label>
                      <p>{selectedReport.email}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaCalendarAlt className="detail-icon" />
                    <div>
                      <label>Date & Time</label>
                      <p>
                        {new Date(selectedReport.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="report-detail-section">
                <h3>Report Content</h3>
                <div className="detail-item full-width">
                  <label>Subject</label>
                  <p className="subject-full">{selectedReport.subject}</p>
                </div>
                <div className="detail-item full-width">
                  <label>Message</label>
                  <p className="message-full">{selectedReport.message}</p>
                </div>
              </div>

              <div className="report-detail-section">
                <h3>Status & Priority</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Status</label>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusBadge(selectedReport.status).color,
                      }}
                    >
                      {getStatusBadge(selectedReport.status).icon}
                      {getStatusBadge(selectedReport.status).text}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Priority</label>
                    <span
                      className="priority-badge"
                      style={{
                        backgroundColor: getPriorityBadge(selectedReport.priority).color,
                      }}
                    >
                      {getPriorityBadge(selectedReport.priority).text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn reply-btn">
                <FaReply /> Reply to Customer
              </button>
              <button
                className="modal-btn resolve-btn"
                onClick={() => handleMarkAsResolved(selectedReport.id)}
              >
                <FaCheckCircle /> Mark as Resolved
              </button>
              <button
                className="modal-btn close-btn"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div> 
  )
}

export default ReportsManagement