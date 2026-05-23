import React from "react";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm = () => {
  const navigate = useNavigate();

  return (
    <div className="change-password-page">
      <div className="change-password-container">

        <nav className="password-breadcrumb">
          <button onClick={() => navigate("/profile/account")}>Back</button>
          <span>Profile › Account › Change Password</span>
        </nav>

        <div className="form-header">
          <h1>Change Password</h1>
          <p>Update your account password</p>
        </div>

        <form className="password-form">

        </form>

      </div>
    </div>
  );
};

export default ChangePasswordForm;