import React from "react";
import "./ProfileMain.css";
import { useAuth } from "../../context/AuthContext";

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
      </div>
    </div>
  );
};

export default ProfileMain;