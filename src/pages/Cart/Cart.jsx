import React, { useEffect } from "react";
import "./Cart.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// Import icons for the cart
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";



  const foodImgUrl = "https://i.imgur.com/kxFqO8G.png";

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">Your Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items-list">
          {cartCount === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <Link to="/" className="cart-empty-link">
                Start Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.plat_id} className="cart-item">
                <img
                  src={item.plat.image} //ICI ON A CHANGER LA STRUCTURE DE L ITEM ON AJOUTANT quantite et plat_id                alt={item.plat.nom}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.plat.nom}</span>
                  <span className="cart-item-price">
                    ${(item.plat.prix * item.quantite)}
                  </span>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="cart-action-btn"
                   onClick={() => remove}

                  >
                    <FaMinus />
                  </button>
                  <span className="cart-item-quantity">{item.quantite}</span>
                  <button
                    className="cart-action-btn"
                    onClick={() => add}
                  >
                    <FaPlus />
                  </button>
                  <button
                    className="cart-remove-btn"
                    onClick={() => handle remove}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartCount > 0 && (
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-line">
              <span>
                Subtotal ({cartCount} {cartCount > 1 ? "items" : "item"})
              </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
