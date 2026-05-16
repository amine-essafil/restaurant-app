import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const SignupPage = () => {
  // FORM STATES
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // NEW STATE
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    console.log({
      username,
      email,
      password,
      passwordConfirmation,
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          {/* USERNAME */}
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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

          {/* PASSWORD CONFIRMATION */}
          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) =>
                setPasswordConfirmation(e.target.value)
              }
              required
            />
          </div>

          {/* SUBMIT */}
          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="login-link">
          Already have an account ?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;