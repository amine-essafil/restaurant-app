import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="checkout-page-container">
      <h1>Checkout</h1>
    </div>
  );
};

export default CheckoutPage;