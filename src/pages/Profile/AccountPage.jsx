import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";
import { useAuth } from "../../context/AuthContext";
import { updateEmail, updatePassword, updateUsername } from "../../api/User.api";

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

  
    const handleSave = async (field) => {
      try {

        if (field === "name") {
          await updateUsername({
            id: user.id,
            name: formData.name,
          });
        }

        else if (field === "email") {
          await updateEmail({
            id: user.id,
            email: formData.email,
          });
        }

        else if (field === "phone") {
          await updatePassword(
            formData.phone
          );
        }

        setuser((prevUser) => ({
          ...prevUser,
          [field]: formData[field],
        }));

        setEditMode((prev) => ({
          ...prev,
          [field]: false,
        }));

      } catch (error) {
        console.log(error);
      }
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
        {/* ================= NAME ================= */}
        <div className="account-card">
        <div className="card-header">
            <h3 className="card-title">Name</h3>

            {!editMode.name && (
            <button
                className="edit-button"
                onClick={() => handleEdit("name")}
            >
                <EditIcon />
                <span>Change</span>
            </button>
            )}
        </div>

        {editMode.name ? (
            <div className="edit-form">
            <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                handleInputChange("name", e.target.value)
                }
                className="edit-input"
                placeholder="Enter username"
            />

            {error.name && (
                <p className="error-text">
                {error.name[0]}
                </p>
            )}

            <div className="edit-actions">
                <button
                className="cancel-button"
                onClick={() => handleCancel("name")}
                >
                Cancel
                </button>

                <button
                className="save-button"
                onClick={() => handleSave("name")}
                >
                Save
                </button>
            </div>
            </div>
        ) : (
            <div className="card-value">
            {formData.name || "Not set"}
            </div>
        )}
        </div>

        {/* ================= EMAIL ================= */}
        <div className="account-card">
        <div className="card-header">
            <h3 className="card-title">Email</h3>

            {!editMode.email && (
            <button
                className="edit-button"
                onClick={() => handleEdit("email")}
            >
                <EditIcon />
                <span>Change</span>
            </button>
            )}
        </div>

        {editMode.email ? (
            <div className="edit-form">
            <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                handleInputChange("email", e.target.value)
                }
                className="edit-input"
                placeholder="Enter email address"
            />

            {error.email && (
                <p className="error-text">
                {error.email[0]}
                </p>
            )}

            <div className="edit-actions">
                <button
                className="cancel-button"
                onClick={() => handleCancel("email")}
                >
                Cancel
                </button>

                <button
                className="save-button"
                onClick={() => handleSave("email")}
                >
                Save
                </button>
            </div>
            </div>
        ) : (
            <div className="card-value">
            {formData.email || "Not set"}
            </div>
        )}
        </div>

        {/* ================= PHONE ================= */}
        <div className="account-card">
        <div className="card-header">
            <h3 className="card-title">Phone Number</h3>

            {!editMode.phone && (
            <button
                className="edit-button add-button"
                onClick={() => handleEdit("phone")}
            >
                <EditIcon />
                <span>
                {formData.phone ? "Change" : "Add"}
                </span>
            </button>
            )}
        </div>

        {editMode.phone ? (
            <div className="edit-form">
            <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                handleInputChange("phone", e.target.value)
                }
                className="edit-input"
                placeholder="Enter phone number"
            />

            {error.phone && (
                <p className="error-text">
                {error.phone[0]}
                </p>
            )}

            <div className="edit-actions">
                <button
                className="cancel-button"
                onClick={() => handleCancel("phone")}
                >
                Cancel
                </button>

                <button
                className="save-button"
                onClick={() => handleSave("phone")}
                >
                Save
                </button>
            </div>
            </div>
        ) : (
            <div className="card-value">
            {formData.phone || "Not added yet"}
            </div>
        )}
        </div>

    <div className="card-value">
      Not added yet
    </div>
  </div>

</div>
  );
};

export default AccountPage;