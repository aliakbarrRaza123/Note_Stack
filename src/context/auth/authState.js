import React, { useState } from "react";
import AuthContext from "./authContext";

const AuthState = (props) => {
  // token state — to verify the login status of the user across the app.
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isLoggedIn: !!token, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;