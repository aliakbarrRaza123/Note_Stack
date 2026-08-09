import React, { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          📝 Note_Stack
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
            <form className="d-flex me-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search notes..."
                aria-label="Search notes"
              />
              <button className="btn btn-light" type="submit">
                Search
              </button>
            </form>
          )}

          <div className="d-flex gap-2">
            {isLoggedIn ? (
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline-light"
                  state={{ from: location }}
                >
                  Login
                </NavLink>
                <NavLink to="/signup" className="btn btn-outline-primary">
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