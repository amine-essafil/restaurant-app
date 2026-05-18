import React from "react";
import "./ProfileMain.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OrdersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
); 

const LogoutIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);


const AccountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const ProfileMain = () => {
    const { user,logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
          logout();
          navigate("/");
        };

 const getInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="profile-main">
      <div className="profile-main-container">
                {/* Profile Header */}
          <div className="profile-header">
                <div className="profile-avatar">
                  {getInitial()}
                </div>

                <h2 className="profile-username">
                  {user?.name || "User"}
                </h2>

                <nav className="profile-breadcrumb">
                  <span className="breadcrumb-current">
                    Profile
                  </span>
                </nav>
          </div>
        
        {/* Main Navigation Cards */}

          <div className="profile-cards">
           {/* Account Card */}
          <div
            className="profile-card"
            onClick={() => navigate("/profile/account")}
            role="button"
            tabIndex={0}
          > 
            <div className="card-content">

              <div className="card-icon">
                <AccountIcon />
              </div>

              <div className="card-info">
                <h3 className="card-title">
                  Account
                </h3>

                <p className="card-description">
                  Manage your personal information
                </p>
              </div>
              <div className="card-arrow">
                  <ArrowIcon />
              </div>
            </div>
          </div>
                 
           {/* Orders Card */}

          <div
            className="profile-card"
            onClick={() => navigate("/profile/orders")}
            role="button"
            tabIndex={0}
            >       
           <div className="card-content">

          <div className="card-icon">
            <OrdersIcon />
          </div>

          <div className="card-info">
            <h3 className="card-title">
              Orders
            </h3>

            <p className="card-description">
              View your order history
            </p>
          </div>
          <div className="card-arrow">
                <ArrowIcon />
           </div>
        </div>
    </div>

       {/* Logout Hub Section */}
      
        <button
          className="logout-hub-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
        </div>  
      </div>
    </div>
  );
};

export default ProfileMain;