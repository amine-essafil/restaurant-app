import React, { useEffect, useMemo, useState } from 'react'
import LeftSideBar from '../AdminComponents/LeftSideBar'
import Header from '../AdminComponents/Header'
import {
  FaUtensils,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheck,
  FaToggleOn,
  FaToggleOff,
  FaPercentage,
  FaFire,
  FaStar,
  FaFilter,
  FaDownload,
  FaUpload,
  FaClone,
  FaShoppingBag,
  FaUserCircle,
  FaChartLine,
  FaTruck,
  FaMotorcycle,
  FaFileAlt,
  FaBars,
} from "react-icons/fa";
import "./MenuManagement.css";
import { getAllCategories } from '../../api/Categories.api';
import { getAllProducts } from '../../api/Products.api';

function MenuManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [plats, setPlats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cat, setCat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'pizza': '🍕',
      'burgers': '🍔',
      'tacos': '🌮',
      'chicken': '🍗',
      'sandwich': '🥪',
    };
    const normalizedName = categoryName?.toLowerCase().trim();
    return iconMap[normalizedName] || '🍽️';
  };

 const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const catResponse = await getAllCategories();
       console.log(catResponse.data.data);
      const formattedCategories = catResponse.data.data.map((c) => ({
        id: String(c.id), 
        name: c.nom || "Other",
        icon: getCategoryIcon(c.nom),
        count: c.total_products || 0
      }));
      
      setCat(formattedCategories);

      const platsResponse = await getAllProducts();
      console.log(platsResponse.data.data);
      setPlats(platsResponse.data.data);
    } catch (err) {
      console.error("Erreur API:", err);
      setError("Impossible de récupérer les données.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const menuItems = useMemo(() => plats.map((plat) => ({
    id: plat.id,
    name: plat.nom || "N/A",
    category: String(plat.category_id) || "other", 
    description: plat.description || "No description",
    price: plat.prix || 0,
    image: plat.image ,
    isAvailable: plat.isAvailable ?? true,
    isPopular: plat.isPopular || false,
    isFeatured: plat.isFeatured || false,
    rating: 4.5,
    reviews: plat.review_count || 0,
    discount: plat.discount || 0,
    preparationTime: "15-20 min",
    calories: 0,
  })), [plats]);


  return (
    <div className="menu-management-container">
     <LeftSideBar/>
      <div className="main-content">
        <Header/>
      </div> 
        <div className="menu-management">
          <div className="menu-header">
            <div className="header-content">
              <div className="header-left">
                <div className="header-icon">
                  <FaUtensils />
                </div>
                <div>
                  <h1 className="page-title">Menu Management</h1>
                  <p className="page-subtitle">
                    Manage your food items, categories, and pricing
                  </p>
                </div>
              </div>
              <div className="header-actions">
                <button className="header-btn export-btn">
                  <FaDownload />
                  Export Menu
                </button>
                <button className="header-btn import-btn">
                  <FaUpload />
                  Import
                </button>
                <button 
                  className="header-btn add-btn" 
                  onClick={() => setShowAddModal(true)}
                >
                  <FaPlus />
                  Add New Item
                </button>
              </div>
            </div>
          </div>
        </div>

         <div className="menu-stats">
            <div className="stat-card total">
              <div className="stat-icon">
                <FaUtensils />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Items</span>
                <span className="stat-value">{menuItems.length}</span>
              </div>
            </div>
            <div className="stat-card available">
              <div className="stat-icon">
                <FaCheck />
              </div>
              <div className="stat-info">
                <span className="stat-label">Available</span>
                <span className="stat-value">
                  {menuItems.filter((i) => i.isAvailable).length}
                </span>
              </div>
            </div>
            <div className="stat-card popular">
              <div className="stat-icon">
                <FaFire />
              </div>
              <div className="stat-info">
                <span className="stat-label">Popular</span>
                <span className="stat-value">
                  {menuItems.filter((i) => i.isPopular).length}
                </span>
              </div>
            </div>
            <div className="stat-card featured">
              <div className="stat-icon">
                <FaStar />
              </div>
              <div className="stat-info">
                <span className="stat-label">Featured</span>
                <span className="stat-value">
                  {menuItems.filter((i) => i.isFeatured).length}
                </span>
              </div>
            </div>

            
          <div className="categories-section">
            <div className="categories-scroll">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-chip ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="menu-toolbar">
            <div className="search-filter-group">
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="toolbar-btn">
                <FaFilter />
                Filters
              </button>
            </div>
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                List
              </button>
            </div>
          </div>
          </div>

    </div> 
     )
}

export default MenuManagement