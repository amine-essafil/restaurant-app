import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LeftSideBar from "../AdminComponents/LeftSideBar";
import Header from "../AdminComponents/Header";
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
  FaTrash,
  FaPlus,
  FaSearch,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaEdit,
} from "react-icons/fa";
import "./DriversManagement.css";

function DriversManagement() {
  return (
    <div className="drivers-management-container">
      {/* LEFT SIDEBAR */}
       <LeftSideBar/>
     {/* MAIN CONTENT */}
      <div className="main-content">
        {/* TOP HEADER */}
         <Header/>
        {/* PAGE CONTENT */}
        <div className="drivers-management">
          {/* Banner Section */}
          <div className="drivers-banner">
            <div className="banner-left">
              <div className="banner-icon">
                <FaMotorcycle />
              </div>
              <div>
                <h2 className="banner-title">Manage Your Delivery Drivers</h2>
                <p className="banner-subtitle">
                  Track performance, status, and earnings
                </p>
              </div>
            </div>
            <button
              className="add-driver-btn"
              onClick={() => handleOpenModal()}
            >
              <FaPlus /> Add Driver
            </button>
          </div>            
        </div>
      </div>
    </div>
  )
}

export default DriversManagement