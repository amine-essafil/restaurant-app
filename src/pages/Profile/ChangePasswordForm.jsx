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
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    });
     const [showPasswords, setShowPasswords] = useState({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
     const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
          setErrors((prev) => ({
            ...prev,
            [field]: "",
          }));
        }
        };
        const validatePassword = (password) => {
          return {
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecial: /[!@#$%^&*]/.test(password),
          };
        };

     const passwordValidations =
              validatePassword(formData.newPassword); 
              
    const togglePasswordVisibility = (field) => {
      setShowPasswords((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));
    };
    const validateForm = () => {
      const newErrors = {};

      if (!formData.currentPassword) {
        newErrors.currentPassword =
          "Current password is required";
      }

      if (!formData.newPassword) {
        newErrors.newPassword =
          "New password is required";
      } else {
        const validations =
          validatePassword(formData.newPassword);

        if (
          !Object.values(validations).every(Boolean)
        ) {
          newErrors.newPassword =
            "Password does not meet requirements";
        }
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword =
          "Please confirm your new password";
      } else if (
        formData.newPassword !==
        formData.confirmPassword
      ) {
        newErrors.confirmPassword =
          "Passwords do not match";
      }

      if (
        formData.currentPassword &&
        formData.newPassword &&
        formData.currentPassword ===
          formData.newPassword
      ) {
        newErrors.newPassword =
          "New password must be different from current password";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
    };
    const handleCancel = () => {
  navigate("/profile/account");
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

            {/* Current Password */}
      <div className="form-group">
        <label className="form-label">
          Current Password
        </label>

        <div className="password-input-wrapper">
          <input
            type={
              showPasswords.currentPassword
                ? "text"
                : "password"
            }
            placeholder="Current password"
            value={formData.currentPassword}
            onChange={(e) =>
              handleInputChange(
                "currentPassword",
                e.target.value
              )
            }
            className={`form-input ${
              errors.currentPassword
                ? "input-error"
                : ""
            }`}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              togglePasswordVisibility(
                "currentPassword"
              )
            }
          >
            {showPasswords.currentPassword ? (
              <EyeOffIcon />
            ) : (
              <EyeIcon />
            )}
          </button>
        </div>

        {errors.currentPassword && (
          <span className="form-error">
            {errors.currentPassword}
          </span>
        )}
      </div>

      {/* New Password */}
      <div className="form-group">
        <label className="form-label">
          New Password
        </label>

        <div className="password-input-wrapper">
          <input
            type={
              showPasswords.newPassword
                ? "text"
                : "password"
            }
            placeholder="New password"
            value={formData.newPassword}
            onChange={(e) =>
              handleInputChange(
                "newPassword",
                e.target.value
              )
            }
            className={`form-input ${
              errors.newPassword
                ? "input-error"
                : ""
            }`}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              togglePasswordVisibility(
                "newPassword"
              )
            }
          >
            {showPasswords.newPassword ? (
              <EyeOffIcon />
            ) : (
              <EyeIcon />
            )}
          </button>
        </div>

        {errors.newPassword && (
          <span className="form-error">
            {errors.newPassword}
          </span>
        )}
     {formData.newPassword && (
      <div className="password-requirements">

        <div
          className={`requirement ${
            passwordValidations.minLength
              ? "valid"
              : "invalid"
          }`}
        >
          {passwordValidations.minLength
            ? "✓"
            : "✗"}{" "}
          At least 8 characters
        </div>

        <div
          className={`requirement ${
            passwordValidations.hasUppercase
              ? "valid"
              : "invalid"
          }`}
        >
          {passwordValidations.hasUppercase
            ? "✓"
            : "✗"}{" "}
          One uppercase letter
        </div>

        <div
          className={`requirement ${
            passwordValidations.hasLowercase
              ? "valid"
              : "invalid"
          }`}
        >
          {passwordValidations.hasLowercase
            ? "✓"
            : "✗"}{" "}
          One lowercase letter
        </div>

        <div
          className={`requirement ${
            passwordValidations.hasNumber
              ? "valid"
              : "invalid"
          }`}
        >
          {passwordValidations.hasNumber
            ? "✓"
            : "✗"}{" "}
          One number
        </div>

        <div
          className={`requirement ${
            passwordValidations.hasSpecial
              ? "valid"
              : "invalid"
          }`}
        >
          {passwordValidations.hasSpecial
            ? "✓"
            : "✗"}{" "}
          One special character
        </div>

      </div>
    )}
      </div>
     
      {/* Confirm Password */}
      <div className="form-group">
        <label className="form-label">
          Confirm Password
        </label>

        <div className="password-input-wrapper">
          <input
            type={
              showPasswords.confirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange(
                "confirmPassword",
                e.target.value
              )
            }
            className={`form-input ${
              errors.confirmPassword
                ? "input-error"
                : ""
            }`}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              togglePasswordVisibility(
                "confirmPassword"
              )
            }
          >
            {showPasswords.confirmPassword ? (
              <EyeOffIcon />
            ) : (
              <EyeIcon />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <span className="form-error">
            {errors.confirmPassword}
          </span>
        )}
      </div>
      <div className="form-actions">

      <button
        type="button"
        className="cancel-button"
        onClick={handleCancel}
      >
        Cancel
      </button>

      <button
        type="submit"
        className="save-button"
      >
        Save Changes
      </button>

    </div>
      </div>
    </div>);
};

export default ChangePasswordForm;