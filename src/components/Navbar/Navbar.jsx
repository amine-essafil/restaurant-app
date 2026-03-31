import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import {  Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
 
const FaUserCircle = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    className="profile-icon"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
    <path
      fillRule="evenodd"
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
    ></path>
  </svg>
);

const FiMenu = () => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const FiX = () => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <img src={Logo} alt="FoodExpress Logo" />
        </Link>

         <ul >
          <li>
            <Link to="/" >
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" >
              Menu
            </Link>
          </li>
          <li>
            <a >Offers</a>
          </li>
          <li>
            <Link to="/contact" >
              Contact
            </Link>
          </li>
            
        </ul>

        <div className="navbar-actions">

          {isLoggedIn ? (
            <span className="navbar-profile-btn">
              {user?.name || "User"}
            </span>
          ) : (
            <Link to="/login" className="navbar-signin-btn">
              Sign In
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;