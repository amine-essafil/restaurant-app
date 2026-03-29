import React from "react";
import "./FoodItem.css";

const FoodItem = ({ item }) => {
  return (
    <div className="food-item">
      <img src={item.image} alt={item.nom} className="food-item-image" />
      <div className="food-item-info">
        <p className="food-item-name">{item.nom}</p>
        <div className="food-item-details">
          <p className="food-item-price">${item.prix}</p>
          <button className="food-item-add-btn">Add</button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;