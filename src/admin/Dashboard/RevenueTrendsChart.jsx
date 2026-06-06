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

const RevenueTrendsChart = () => {
  return <div className="revenue-trends-card"></div>;
};

export default RevenueTrendsChart;