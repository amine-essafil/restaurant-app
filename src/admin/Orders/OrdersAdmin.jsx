import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  ChevronDown,
  Edit,
  Trash2,
  AlertCircle,
  Search,
  Download,
  Printer,
  RefreshCw,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  UtensilsCrossed,
  Banknote,
  Filter,
  Calendar,
} from "lucide-react";
import {
  FaUtensils,
  FaChartLine,
  FaTruck,
  FaUsers,
  FaMotorcycle,
  FaFileAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./OrdersAdmin.css";
import { ClientApi } from "../../ClientApi/ClientApi";

function OrdersAdmin() {
  return <div className="orders-admin-wrapper"></div>;
}

export default OrdersAdmin;