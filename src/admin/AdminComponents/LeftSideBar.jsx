import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { useAuth } from "../../context/AuthContext";

function LeftSideBar() {
      const [sidebarOpen, setSidebarOpen] = useState(true);
      const {logout} = useAuth();
      
      const adminPages = [
        {
          id: 1,
          name: "Dashboard",
          icon: <FaChartLine />,
          path: "/admin/dashboard",
        },
        {
          id: 2,
          name: "Orders",
          icon: <FaShoppingBag />,
          path: "/admin/orders",
        },
        {
          id: 3,
          name: "Menu",
          icon: <FaUtensils />,
          path: "/admin/menu",
        },
        {
          id: 4,
          name: "Customers",
          icon: <FaUsers />,
          path: "/admin/customers",
        },
        {
          id: 5,
          name: "Deliveries",
          icon: <FaTruck />,
          path: "/admin/deliveries",
        },
        {
          id: 6,
          name: "Drivers",
          icon: <FaMotorcycle />,
          path: "/admin/drivers",
        },
        {
          id: 7,
          name: "Reports",
          icon: <FaFileAlt />,
          path: "/admin/reports",
        },

      ];
  
      const handllogout = async () => {
    console.log("Attempting to log out...");
    try {
        const res = await logout(); 
            if (res.status === 201 || res.status === 200) { 
               localStorage.removeItem('token');
               setuser(null);
              setIsLoggedIn(false);
        navigate("/login");
      } else if(res.data && res.data.status === 201){
         navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    
    }
  };
  return (
   <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="sidebar-header">
          <div className="sidebar-header-content">
            {sidebarOpen && (
              <div className="logo-section">
                <div className="logo-icon">
                  <FaUtensils />
                </div>
                <div className="logo-text">
                  <h1>FoodExpress</h1>
                  <p>Admin Panel</p>
                </div>
              </div>
            )}
            {!sidebarOpen && (
              <div className="logo-icon-only">
                <FaUtensils />
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          {adminPages.map((page) => (
            <Link
              key={page.id}
              to={page.path}
              className={`nav-item ${
                location.pathname === page.path ? "active" : ""
              }`}
            >
              <span className="nav-icon">{page.icon}</span>
              {sidebarOpen && (
                <div className="nav-text">
                  <p>{page.name}</p>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handllogout} >
              <span>🚪</span> Logout
            </button>
          </div>
        )}
      </div>  )
}

export default LeftSideBar