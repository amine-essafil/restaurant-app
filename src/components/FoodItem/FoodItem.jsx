import React from "react";
import "./FoodItem.css";
import { useCart } from "../../Context/CartContext";

const FoodItem = ({ item }) => {
  const { addToCart } = useCart();

  if (!item || !item.id) {
    return null; // Don't render if item is invalid
  }

  const handleAdd = () => {
    addToCart(item);
  };

  return (
    <div className="food-item">
      {item.image && (
        <img src={item.image} alt={item.nom || "Food item"} className="food-item-image" />
      )}
      <div className="food-item-info">
        <p className="food-item-name">{item.nom || "Unknown meal"}</p>
        {(item.rating || item.review_count) && (
          <div className="food-item-rating">
            <span className="rating-star">⭐</span>
            {item.rating && <span className="rating-value">{item.rating}</span>}
            {item.review_count && <span className="rating-count">({item.review_count})</span>}
          </div>
        )}
        <div className="food-item-details">
          <p className="food-item-price">${item.prix || "0.00"}</p>
          <button className="food-item-add-btn" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
