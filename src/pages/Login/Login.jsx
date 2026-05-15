import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // structure only (no auth logic yet)
    console.log({ email, password });
  };

  return (
    <div >
      <div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button type="submit" >
            Login
          </button>
        </form>

        {/* GOOGLE BUTTON (structure only) */}
        <button
          type="button"
          id="google"
        >
          Connect with Google
        </button>

        {/* SIGNUP LINK */}
        <p  >
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;