import React, { useEffect, useState } from "react";

import { FiSun } from "react-icons/fi";
import { IoMoonSharp } from "react-icons/io5";

function ThemeSwitch() {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    useEffect(() => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDarkMode(false);
      }
    }, []);
  
    const toggleTheme = () => {
      document.documentElement.classList.toggle("dark");
      const newTheme = !isDarkMode ? "dark" : "light";
      localStorage.setItem("theme", newTheme); 
      setIsDarkMode(!isDarkMode); 
    };
  
    return (
      <button onClick={toggleTheme} className="theme-switcher" title="Toggle Theme">
        {isDarkMode ? <FiSun /> : <IoMoonSharp />}
      </button>
    );
  }
  
  export default ThemeSwitch;