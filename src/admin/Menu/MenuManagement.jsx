import React, { useState } from 'react'
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

    </div> 
     )
}

export default MenuManagement