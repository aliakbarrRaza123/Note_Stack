import React, { useState, useEffect } from "react";
import ThemeContext from "./themeContext";

const ThemeState = (props) => {
  // localStorage se saved theme uthao, warna default theme "light"
  const [theme, setTheme] = useState(localStorage.getItem("ns-theme") || "light");

  // <html> tag par data-theme attribute update karo aur theme ko localStorage mein save karo.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ns-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;