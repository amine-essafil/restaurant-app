import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggedIn, loading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      const from = location.state?.from || "/";
      navigate(from);
    }
  }, [isLoggedIn, loading, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(email, password);

    if (response.success) {
      navigate("/");
    }
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

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

          <button type="submit" id="google" onClick={()=>{window.location.href="http://localhost:80/auth/google"}} className="login-btn">
        <FontAwesomeIcon icon={faGoogle} style={{color: "#ff3d3d",}} />    Connecter avec google
          </button>

        <p className="signup-link">
          Don't have an account ? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;