import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTruck,
  FaClock,
  FaHourglassHalf,
  FaTimesCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import "./OrderStatusChart.css";
import { ClientApi } from "../../ClientApi/ClientApi";

const statusMeta = {
  completed: { color: "#10b981", icon: <FaCheckCircle /> },
  on_delivery: { color: "#3b82f6", icon: <FaTruck /> },
  preparing: { color: "#f59e0b", icon: <FaClock /> },
  pending: { color: "#6b7280", icon: <FaHourglassHalf /> },
  cancelled: { color: "#ef4444", icon: <FaTimesCircle /> },
};

const OrderStatusChart = () => {
  return <div className="order-status-card"></div>;
};

export default OrderStatusChart;