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
  const [period, setPeriod] = useState("7days");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setdata] = useState(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ClientApi.getOrderDistribution(period);
        const data = response.data;
        console.log(data);
        setdata(data);
      } catch (err) {
        console.error("Erreur API Revenue:", err);
        setError("Impossible de récupérer les données.");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, [period]);
  if (loading) return <p>Loading...</p>;    
  return <div className="order-status-card"></div>;
};

export default OrderStatusChart;