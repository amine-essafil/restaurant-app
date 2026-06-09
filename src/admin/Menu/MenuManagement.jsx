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
import { DeleteProduct, getAllProducts, PostProduct, UpdateProduct } from '../../api/Products.api';

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  
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


    const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  }; 

    const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    const formData = new FormData(e.target);
    
    const updatedPlat = {
      nom: formData.get('name'),
      category_id: formData.get('category'),
      prix: parseFloat(formData.get('price')),
      description: formData.get('description'),
      discount: parseInt(formData.get('discount')) || 0,
      image: formData.get('image'),
      isAvailable: formData.get('isAvailable') === 'on',
      isPopular: formData.get('isPopular') === 'on',
      isFeatured: formData.get('isFeatured') === 'on',
    };

    try {
      await UpdateProduct(selectedItem.id, updatedPlat);
      setShowEditModal(false);
      setSelectedItem(null);
      fetchData();
      e.target.reset(); 
      alert('Plat modifié avec succès !');
    } catch (err) {
      console.error('Erreur modification:', err);
      alert('Erreur lors de la modification du plat');
    }
  };


  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

   const handleAddItem = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nom", e.target.name.value);
        formData.append("category_id", e.target.category.value);
        formData.append("prix", e.target.price.value);
        formData.append("description", e.target.description.value);
        formData.append("discount", e.target.discount.value || 0);
        formData.append("isAvailable", e.target.isAvailable.checked ? 1 : 0);
        formData.append("isPopular", e.target.isPopular.checked ? 1 : 0);
        formData.append("isFeatured", e.target.isFeatured.checked ? 1 : 0);

        formData.append("image", e.target.image.files[0]);

        try {
            await PostProduct(formData);
            setShowAddModal(false);
            fetchData();
            e.target.reset();
            alert("Plat ajouté avec succès !");
        } catch (err) {
            console.error("Erreur ajout:", err);
            alert("Erreur lors de l'ajout du plat");
        }
        };


  
  const handleToggleAvailability = async (itemId) => {
    try {
      const plat = plats.find(p => p.id === itemId);
      if (!plat) return;

      await UpdateProduct(itemId, { 
        isAvailable: !plat.isAvailable 
      });
      fetchData();
    } catch (err) {
      console.error('Erreur toggle:', err);
      alert('Erreur lors de la mise à jour');
    }
  };

    const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await DeleteProduct(itemId);
        fetchData();
        alert('Plat supprimé avec succès !');
      } catch (err) {
        console.error('Erreur suppression:', err);
        alert('Erreur lors de la suppression du plat');
      }
    }
  };

  const handleCloneItem = async (item) => {
    const clonedPlat = {
      nom: `${item.name} (Copy)`,
      category_id: item.category,
      prix: item.price,
      description: item.description,
      discount: item.discount,
      image: item.image,
      isAvailable: item.isAvailable,
      isPopular: false,
      isFeatured: false,
    };

    try {
      await PostProduct(clonedPlat);
      fetchData();
      alert('Plat cloné avec succès !');
    } catch (err) {
      console.error('Erreur clone:', err);
      alert('Erreur lors du clonage');
    }
  };

  if (loading) {
    return <div className="loading-state">Chargement des données du menu...</div>;
  }

  if (error) {
    return <div className="error-state">Erreur de chargement: {error}</div>;
  }
  

  return (
    <div className="menu-management-container">
     <LeftSideBar/>
      <div className="main-content">
       <Header/>
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

          <div className={`menu-items ${viewMode}`}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`menu-card ${!item.isAvailable ? "unavailable" : ""}`}
              >
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} className="item-image" />
                  {item.discount > 0 && (
                    <div className="discount-badge">
                      <FaPercentage />
                      {item.discount}% OFF
                    </div>
                  )}
                  {!item.isAvailable && (
                    <div className="unavailable-overlay">
                      <span>Out of Stock</span>
                    </div>
                  )}
                  <div className="image-badges">
                    {item.isPopular && (
                      <span className="badge popular-badge">
                        <FaFire /> Popular
                      </span>
                    )}
                    {item.isFeatured && (
                      <span className="badge featured-badge">
                        <FaStar /> Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="item-info">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-rating">
                      <FaStar className="star-icon" />
                      <span>{item.rating}</span>
                      <span className="reviews-count">({item.reviews})</span>
                    </div>
                  </div>

                  <p className="item-description">{item.description}</p>

                  <div className="item-footer">
                    <div className="item-pricing">
                      {item.discount > 0 ? (
                        <>
                          <span className="original-price">{item.price} DH</span>
                          <span className="discounted-price">
                            {(item.price * (1 - item.discount / 100)).toFixed(2)} DH
                          </span>
                        </>
                      ) : (
                        <span className="current-price">{item.price} DH</span>
                      )}
                    </div>

                    <div className="item-actions">
                      <button
                        className="action-btn toggle-btn"
                        onClick={() => handleToggleAvailability(item.id)}
                        title={item.isAvailable ? "Mark Unavailable" : "Mark Available"}
                      >
                        {item.isAvailable ? <FaToggleOn /> : <FaToggleOff />}
                      </button>
                      <button
                        className="action-btn clone-btn"
                        onClick={() => handleCloneItem(item)}
                        title="Clone Item"
                      >
                        <FaClone />
                      </button>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEditItem(item)}
                        title="Edit Item"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteItem(item.id)}
                        title="Delete Item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MODAL AJOUT */}
          {showAddModal && (
            <div
              className="modal-overlay"
              onClick={() => setShowAddModal(false)}
            >
              <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Add New Item</h2>
                  <button className="modal-close" onClick={() => setShowAddModal(false)}>
                    <FaTimes />
                  </button>
                </div>
                <div className="modal-body">
                  <form className="item-form" onSubmit={handleAddItem}>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Item Name</label>
                        <input type="text" name="name" placeholder="Enter item name" required />
                      </div>

                      <div className="form-group">
                        <label>Category</label>
                        <select name="category" required>
                          {cat.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Price (DH)</label>
                        <input type="number" name="price" placeholder="0.00" step="0.01" required />
                      </div>

                      <div className="form-group full-width">
                        <label>Description</label>
                        <textarea name="description" rows="3" placeholder="Enter item description"></textarea>
                      </div>

                      <div className="form-group">
                        <label>Discount (%)</label>
                        <input type="number" name="discount" placeholder="0" min="0" max="100" />
                      </div>

                      <div className="form-group">
                        <label>Image URL</label>
                        <input type="file" name="image" accept="image/*" required />
                      </div>

                      <div className="form-group full-width">
                        <label>Options</label>
                        <div className="checkbox-group">
                          <label className="checkbox-label">
                            <input type="checkbox" name="isAvailable" defaultChecked />
                            <span>Available</span>
                          </label>
                          <label className="checkbox-label">
                            <input type="checkbox" name="isPopular" />
                            <span>Popular</span>
                          </label>
                          <label className="checkbox-label">
                            <input type="checkbox" name="isFeatured" />
                            <span>Featured</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Add Item
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* MODAL ÉDITION */}
          {showEditModal && selectedItem && (
            <div
              className="modal-overlay"
              onClick={() => setShowEditModal(false)}
            >
              <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Edit Item: {selectedItem.name}</h2>
                  <button className="modal-close" onClick={() => setShowEditModal(false)}>
                    <FaTimes />
                  </button>
                </div>
                <div className="modal-body">
                  <form className="item-form" onSubmit={handleUpdateItem}>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Item Name</label>
                        <input type="text" name="name" placeholder="Enter item name" defaultValue={selectedItem.name} required />
                      </div>

                      <div className="form-group">
                        <label>Category</label>
                        <select name="category" defaultValue={selectedItem.category} required>
                          {cat.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Price (DH)</label>
                        <input type="number" name="price" placeholder="0.00" step="0.01" defaultValue={selectedItem.price} required />
                      </div>

                      <div className="form-group full-width">
                        <label>Description</label>
                        <textarea name="description" rows="3" placeholder="Enter item description" defaultValue={selectedItem.description}></textarea>
                      </div>

                      <div className="form-group">
                        <label>Discount (%)</label>
                        <input type="number" name="discount" placeholder="0" min="0" max="100" defaultValue={selectedItem.discount} />
                      </div>

                      <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" name="image" placeholder="Enter image URL" defaultValue={selectedItem.image} />
                      </div>

                      <div className="form-group full-width">
                        <label>Options</label>
                        <div className="checkbox-group">
                          <label className="checkbox-label">
                            <input type="checkbox" name="isAvailable" defaultChecked={selectedItem.isAvailable} />
                            <span>Available</span>
                          </label>
                          <label className="checkbox-label">
                            <input type="checkbox" name="isPopular" defaultChecked={selectedItem.isPopular} />
                            <span>Popular</span>
                          </label>
                          <label className="checkbox-label">
                            <input type="checkbox" name="isFeatured" defaultChecked={selectedItem.isFeatured} />
                            <span>Featured</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuManagement