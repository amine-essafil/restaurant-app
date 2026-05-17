import React from "react";
import "./ProfileMain.css";
import { useAuth } from "../../context/AuthContext";

const AccountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const ProfileMain = () => {
    const { user } = useAuth();

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
          <div className="profile-cards">
          <div className="profile-card">
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

            </div>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default ProfileMain;