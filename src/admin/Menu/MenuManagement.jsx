import React, { useMemo, useState } from 'react'
import LeftSideBar from '../AdminComponents/LeftSideBar'
import Header from '../AdminComponents/Header'
import {
  FaUtensils,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheck,
  FaToggleOn,
  FaToggleOff,
  FaPercentage,
  FaFire,
  FaStar,
  FaFilter,
  FaDownload,
  FaUpload,
  FaClone,
  FaShoppingBag,
  FaUserCircle,
  FaChartLine,
  FaTruck,
  FaMotorcycle,
  FaFileAlt,
  FaBars,
} from "react-icons/fa";
import "./MenuManagement.css";

function MenuManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [orders, setorders] = useState([]);


  const menuItems = useMemo(() => orders.map((order) => ({
    id: order.id,
    name: order.nom || "N/A",
    category: String(order.category_id) || "other", 
    description: order.description || "No description",
    price: order.prix || 0,
    image: order.image ,
    isAvailable: order.isAvailable ?? true,
    isPopular: order.isPopular || false,
    isFeatured: order.isFeatured || false,
    rating: 4.5,
    reviews: order.review_count || 0,
    discount: order.discount || 0,
    preparationTime: "15-20 min",
    calories: 0,
  })), [orders]);


  return (
    <div className="menu-management-container">
     <LeftSideBar/>
      <div className="main-content">
        <Header/>
      </div> 
        <div className="menu-management">
          <div className="menu-header">
            <div className="header-content">
              <div className="header-left">
                <div className="header-icon">
                  <FaUtensils />
                </div>
                <div>
                  <h1 className="page-title">Menu Management</h1>
                  <p className="page-subtitle">
                    Manage your food items, categories, and pricing
                  </p>
                </div>
              </div>
              <div className="header-actions">
                <button className="header-btn export-btn">
                  <FaDownload />
                  Export Menu
                </button>
                <button className="header-btn import-btn">
                  <FaUpload />
                  Import
                </button>
                <button 
                  className="header-btn add-btn" 
                  onClick={() => setShowAddModal(true)}
                >
                  <FaPlus />
                  Add New Item
                </button>
              </div>
            </div>
          </div>
        </div>
         
         <div className="menu-stats">
            <div className="stat-card total">
              <div className="stat-icon">
                <FaUtensils />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Items</span>
                <span className="stat-value">{menuItems.length}</span>
              </div>
            </div>
            <div className="stat-card available">
              <div className="stat-icon">
                <FaCheck />
              </div>
              <div className="stat-info">
                <span className="stat-label">Available</span>
                <span className="stat-value">
                  {menuItems.filter((i) => i.isAvailable).length}
                </span>
              </div>
            </div>
            <div className="stat-card popular">
              <div className="stat-icon">
                <FaFire />
              </div>
              <div className="stat-info">
                <span className="stat-label">Popular</span>
                <span className="stat-value">
                  {menuItems.filter((i) => i.isPopular).length}
                </span>
              </div>
            </div>
            <div className="stat-card featured">
              <div className="stat-icon">
                <FaStar />
              </div>
              <div className="stat-info">
                <span className="stat-label">Featured</span>
                <span className="stat-value">
                  {menuItems.filter((i) => i.isFeatured).length}
                </span>
              </div>
            </div>
          </div>

    </div> 
     )
}

export default MenuManagement