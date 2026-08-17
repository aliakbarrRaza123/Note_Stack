import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../utils/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ password: "", cpassword: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    // untouched states remain preserved using spread operator.
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // password and confirm password are same.
    if (passwords.password !== passwords.cpassword) {
      setStatus({ type: "error", message: "Passwords do not match" });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/resetpassword/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwords.password }),
      });
      const json = await response.json();
      if (json.success) {
        setStatus({ type: "success", message: json.message });
        setTimeout(() => navigate("/login"), 2000);
      } 
      else {
        setStatus({ type: "error", message: json.message || "Something went wrong" });
      }
    } 
    catch (error) {
      setStatus({ type: "error", message: "Server error, please try again later" });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="ns-auth-wrap">
      <div className="ns-auth-card">
        <h2 className="fw-bold text-center mb-4">Reset Password</h2>

        {status && (
          <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={passwords.password}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              value={passwords.cpassword}
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
          <button type="submit" className="btn ns-btn-primary w-100" disabled={loading}>
            {loading ? "Updating..." : "Password Reset"}
          </button>
          <p className="text-center text-muted mt-3 mb-0">
            <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}