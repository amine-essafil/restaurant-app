import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons
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

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChangePasswordForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    });

     const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        };

        const [showPasswords, setShowPasswords] = useState({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });

    const togglePasswordVisibility = (field) => {
      setShowPasswords((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));
    };

  return (
    <div className="change-password-page">
      <div className="change-password-container">

       <nav className="password-breadcrumb">
  <button
    className="breadcrumb-back"
    onClick={() => navigate("/profile/account")}
  >
    <ChevronLeftIcon />
  </button>

  <div className="breadcrumb-path">
    <button
      className="breadcrumb-link"
      onClick={() => navigate("/profile")}
    >
      Profile
    </button>

    <span className="breadcrumb-separator">›</span>

    <button
      className="breadcrumb-link"
      onClick={() => navigate("/profile/account")}
    >
      Account
    </button>

    <span className="breadcrumb-separator">›</span>

    <span className="breadcrumb-current">
      Change Password
    </span>
  </div>
</nav>

        <div className="form-header">
          <h1>Change Password</h1>
          <p>Update your account password</p>
        </div>

        <form className="password-form">
        <input
            type="password"
            placeholder="Current password"
            value={formData.currentPassword}
            onChange={(e) => handleInputChange("currentPassword", e.target.value)}
            />

        <input
            type="password"
            placeholder="New password"
            value={formData.newPassword}
            onChange={(e) => handleInputChange("newPassword", e.target.value)}
            />

        <input
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
        />
        </form>

      </div>
    </div>
  );
};

export default ChangePasswordForm;