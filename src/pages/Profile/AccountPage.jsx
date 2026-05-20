import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
  const navigate = useNavigate();

  return (
    <div className="account-page">
      <div className="account-container">
        <nav className="account-breadcrumb">
          <button onClick={() => navigate("/profile")}>
            Back
          </button>
        </nav>

        <div className="account-header">
          <h1>Account Information</h1>
          <p>Manage your personal details</p>
        </div>

        <div className="account-cards">
          <div className="account-card">
            <h3>Name</h3>
          </div>

          <div className="account-card">
            <h3>Email</h3>
          </div>

          <div className="account-card">
            <h3>Password</h3>
          </div>

          <div className="account-card">
            <h3>Phone Number</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;