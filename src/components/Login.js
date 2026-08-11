import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation, Navigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggedIn } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Already logged in → send to Home (notes workspace)
  // Browser history mein jo current page hai, usko new page se replace karo.
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      if (json.success) {
        login(json.authToken); // context update — Navbar automatic re-render hoga
        // Return to the page they tried to open, or Home
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo);
      } else {
        alert(json.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error, please try again later");
    }
  };

  return (
    <div className="ns-auth-wrap">
      <div className="ns-auth-card">
        <h2 className="fw-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn ns-btn-primary w-100">
            Login
          </button>
          <p className="text-center text-muted mt-3 mb-0">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
