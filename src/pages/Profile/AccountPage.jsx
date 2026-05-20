import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
  const navigate = useNavigate();

  return (
    <div className="account-page">
      <div className="account-container">

        {/* Breadcrumb */}
        <nav className="account-breadcrumb">
          <button
            className="breadcrumb-back"
            onClick={() => navigate("/profile")}
          >
            Back
          </button>

          <div className="breadcrumb-path">
            <button
              className="breadcrumb-link"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>

            <span className="breadcrumb-separator">›</span>

            <span className="breadcrumb-current">
              Account
            </span>
          </div>
        </nav>

        {/* Header */}
        <div className="account-header">
          <h1 className="account-title">
            Account Information
          </h1>

          <p className="account-subtitle">
            Manage your personal details
          </p>
        </div>

      </div>
      <div className="account-cards">

  {/* Name */}
  <div className="account-card">
    <div className="card-header">
      <h3 className="card-title">Name</h3>
    </div>

    <div className="card-value">
      Not set
    </div>
  </div>

  {/* Email */}
  <div className="account-card">
    <div className="card-header">
      <h3 className="card-title">Email</h3>
    </div>

    <div className="card-value">
      Not set
    </div>
  </div>

  {/* Password */}
  <div className="account-card">
    <div className="card-header">
      <h3 className="card-title">Password</h3>
    </div>

    <div className="card-value">
      ••••••••••
    </div>
  </div>

  {/* Phone */}
  <div className="account-card">
    <div className="card-header">
      <h3 className="card-title">
        Phone Number
      </h3>
    </div>

    <div className="card-value">
      Not added yet
    </div>
  </div>

</div>
    </div>
  );
};

export default AccountPage;