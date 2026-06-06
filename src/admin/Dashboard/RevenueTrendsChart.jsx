import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FaCalendarAlt, FaArrowUp } from "react-icons/fa";
import "./RevenueTrendsChart.css";
import { ClientApi } from "../../ClientApi/ClientApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Custom number formatter: no commas, removes trailing zeros
const formatRevenue = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "0";

  // Convert to number
  const num = parseFloat(value);

  // If it's a whole number, return it without decimals
  if (Number.isInteger(num)) {
    return num.toString();
  }

  // Format with up to 2 decimal places, remove trailing zeros
  let formatted = num.toFixed(2);

  // Remove trailing zeros after decimal point
  formatted = formatted.replace(/\.?0+$/, "");

  return formatted;
};

const RevenueTrendsChart = () => {
  const [period, setPeriod] = useState("7days");
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
    total: 0,
    average: 0,
    trend: "+0%",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch revenue data from backend
  useEffect(() => {
    const fetchRevenue = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ClientApi.getRevenueTrends(period);
        const data = response.data; // { labels: [...], data: [...] }
        console.log(data);
        const total = data.data.reduce((sum, val) => sum + parseFloat(val), 0);
        console.log(total);
        const average = data.data.length
          ? Math.round(total / data.data.length)
          : 0;

        // Ici tu peux calculer la tendance réelle ou la récupérer depuis le backend
        setChartData({
          labels: data.labels,
          data: data.data,
          total,
          average,
          trend: "+12.5%",
        });
      } catch (err) {
        console.error("Erreur API Revenue:", err);
        setError("Impossible de récupérer les données.");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, [period]);

  return <div className="revenue-trends-card"></div>;
};

export default RevenueTrendsChart;