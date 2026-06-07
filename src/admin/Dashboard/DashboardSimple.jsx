import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaShoppingBag,
  FaMoneyBillWave,
  FaMotorcycle,
  FaUtensils,
  FaFileAlt,
  FaChartLine,
  FaTruck,
  FaArrowUp,
  FaArrowDown,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import "./DashboardSimpl.css";
import RevenueTrendsChart from "./RevenueTrendsChart";
import OrderStatusChart from "./OrderStatusChart";
import axios from "axios";
import { ClientApi } from "../../ClientApi/ClientApi";

const DashboardSimple = () => {
  return <div className="simple-dashboard"></div>;
};

export default DashboardSimple;