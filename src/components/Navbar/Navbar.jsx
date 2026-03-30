import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">

        {/* Logo */}
        <Link to="/" className="logo">
          LOGO
        </Link>

        {/* Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Actions */}
        <div className="actions">
          {/* Cart / Auth buttons ici */}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;