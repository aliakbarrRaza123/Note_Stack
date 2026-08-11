import React, { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // Already logged in → send to Home (notes workspace)
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // 'e' is an event object it contains all information about the event.
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // page reload hone se prevent krna hai bcz state reset hojayegi or fetch ni hoga.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        login(json.authToken);
        navigate("/");
      } else {
        alert(json.error || "Something went wrong, please try again");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error, please try again later");
    }
  };

  return (
    <div className="ns-auth-wrap">
      <div className="ns-auth-card">
        <h2 className="fw-bold text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
              minLength={3}
            />
          </div>

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
              minLength={5}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>

          <button type="submit" className="btn ns-btn-primary w-100">
            Sign Up
          </button>

          <p className="text-center text-muted mt-3 mb-0">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
