import React, { useEffect, useState } from "react";
import "./Menu.css";
import FoodItem from "../FoodItem/FoodItem";
import { getMeals, getCategories } from "../../api/Meals.api";

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [plats, setPlats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getCategories();
        const cats = Array.isArray(catRes.data?.categories)
          ? catRes.data.categories
          : [];
        setCategories(cats);

        const platsRes = await getMeals();
        setPlats(platsRes.data || []);
      } catch (err) {
        console.error("Erreur API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter the food
  const filteredFood = plats
    .filter((item) => {
      if (selectedCategory === "All") {
        return true;
      }
      return item.category?.nom === selectedCategory;
    })
    .filter((item) => {
      // Search term filter
      return item.nom.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "recommended") {
        return b.review_count - a.review_count;
      } else if (sortBy === "price-high") {
        return b.prix - a.prix;
      } else if (sortBy === "price-low") {
        return a.prix - b.prix;
      }
      return 0;
    });

  return (
    <section id="menu" className="menu-container">
      <h2 className="menu-title">Explore Our Menu</h2>

      <div className="menu-filters">
        <input
          type="text"
          placeholder="Search for food..."
          className="menu-search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="menu-categories">
          <button
            className={`category-btn ${
              selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${
                selectedCategory === category.nom ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.nom)}
            >
              <img src={category.image} alt={category.nom} />
              {category.nom}
            </button>
          ))}
        </div>
        <div className="menu-sort-container">
          <label htmlFor="sort-select" className="sort-label">
            Sort by:
          </label>
          <select
            id="sort-select"
            className="menu-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recommended">🌟 Recommended</option>
            <option value="price-high">💰 Price: High to Low</option>
            <option value="price-low">💸 Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="menu-food-grid">
        {filteredFood.length > 0 ? (
          filteredFood.map((item) => <FoodItem key={item.id} item={item} />)
        ) : (
          <p className="menu-no-results">No items match your search.</p>
        )}
      </div>
    </section>
  );
};

export default Menu;
