import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";
import { useAuth } from "../../context/AuthContext";

//ICONS
const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const AccountPage = () => {
  const navigate = useNavigate();

        const { user, setuser } = useAuth();

        const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        });

        const [editMode, setEditMode] = useState({
        name: false,
        email: false,
        phone: false,
        });

        const handleEdit = (field) => {
        setEditMode((prev) => ({
            ...prev,
            [field]: true,
        }));
        };

        const handleCancel = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: user?.[field] || "",
        }));

        setEditMode((prev) => ({
            ...prev,
            [field]: false,
        }));
        };

        const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        };
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