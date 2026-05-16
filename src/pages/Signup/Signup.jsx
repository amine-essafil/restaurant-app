import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div >
      <div >
        <h2>Create Account</h2>

        <form>
          <div>
            <label>Username</label>
            <input type="text" />
          </div>

          <div>
            <label>Email</label>
            <input type="email" />
          </div>

          <div>
            <label>Password</label>
            <input type="password" />
          </div>

          <button type="submit" >
            Create Account
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;