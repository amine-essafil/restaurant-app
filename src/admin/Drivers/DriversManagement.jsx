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
  const [editingDriver, setEditingDriver] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password:"",
    password_confirmation:"",
    statut: "active",
    vehicle_type: "Motorcycle",
    vehicle_plate: "",
    is_available: true,
  });    

 const handleOpenModal = (driver = null) => {
    if (driver) {
      setEditingDriver(driver);
      setFormData({
        name: driver.name,
        phone: driver.phone,
        email: driver.email || "",
        status: driver.status,
        vehicle_type: driver.vehicle,
        vehicle_plate: driver.vehicle_plate || "",
        is_available: driver.is_available,
      });
    } else {
      setEditingDriver(null);
      setFormData({
        name: "",
        phone: "",
        email: "",
        statut: "active",
        vehicle_type: "Motorcycle",
        vehicle_plate: "",
        is_available: true,
      });
    }
    setShowModal(true);
    setOpenMenu(null);
  };
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