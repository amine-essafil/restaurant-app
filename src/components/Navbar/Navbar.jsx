import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Logo from "../../assets/images/logo.png";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <img src={Logo} alt="FoodExpress Logo" />
        </Link>

        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart">
            <img src="/src/assets/icons/cart.svg" className="cart-icon" />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;