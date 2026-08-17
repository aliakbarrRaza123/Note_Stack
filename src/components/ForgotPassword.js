import React, { useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgotpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await response.json();
      if (json.success) {
        setStatus({ type: "success", message: json.message });
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
        <h2 className="fw-bold text-center mb-3">Forgot Password</h2>
        <p className="text-muted text-center mb-4">
          Enter your email and we'll send you a link to reset your password.
        </p>
        {/* status state is used to tell reset is successful or not */}
        {status && (
          <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn ns-btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Reset Link Sent"}
          </button>
          <p className="text-center text-muted mt-3 mb-0">
            Remembered your password? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}