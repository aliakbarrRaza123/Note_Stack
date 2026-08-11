import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

// Wraps routes that require a logged-in user.
// Guests are redirected to /login; after login they return to the same page.
// children = the page component (e.g. <Home /> or <About />)
export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
