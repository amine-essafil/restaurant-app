import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // structure only (no auth logic yet)
    console.log({ email, password });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {/* GOOGLE BUTTON (structure only) */}
        <button
          type="button"
          id="google"
          className="login-btn"
          onClick={() =>
            (window.location.href = "http://localhost:80/auth/google")
          }
        >
          Connect with Google
        </button>

        {/* SIGNUP LINK */}
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;