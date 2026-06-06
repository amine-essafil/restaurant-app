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
  return <div className="revenue-trends-card"></div>;
};

export default RevenueTrendsChart;