import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useContext(AuthContext);

  // URL se current search query lo (Home isi pe notes filter karta hai)
  const urlQ = new URLSearchParams(location.search).get("q") || "";
  const [q, setQ] = useState(urlQ);

  // Url change hone par chalega 
  useEffect(() => {
    setQ(urlQ);
  }, [urlQ]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQ(value);
    // all the text clear from search bar so go to Home.
    if (!value.trim()) 
    {
      navigate("/");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // trim extra spaces.
    const trimmed = q.trim();
    if (!trimmed) {
      navigate("/");
      return;
    }
    navigate(`/?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ns-navbar">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Note_Stack
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Public for everyone — guests learn about the app here */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>

          {isLoggedIn && (
            <form
              className="d-flex me-lg-3 mb-3 mb-lg-0 gap-2"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="form-control ns-search-input"
                type="search"
                placeholder="Search notes..."
                aria-label="Search notes"
                value={q}
                onChange={handleSearchChange}
              />
              <button className="btn ns-btn-search" type="submit">
                Search
              </button>
            </form>
          )}

          <div className="d-flex gap-2">
            {isLoggedIn ? (
              <button className="btn ns-btn-ghost" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn ns-btn-ghost"
                  state={{ from: location }}
                >
                  Login
                </NavLink>
                <NavLink to="/signup" className="btn ns-btn-accent">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
