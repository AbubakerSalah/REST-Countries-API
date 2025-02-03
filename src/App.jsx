import React, { useState, useEffect } from "react";
import Header from "./Header";
import FetchData from "./FetchData";
export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  return (
    <>
      <Header selectedCountry={selectedCountry} 
      setDarkMode={setDarkMode}
      darkMode={darkMode}
      />
      <FetchData
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
        setDarkMode={setDarkMode}
      darkMode={darkMode}
      />
    </>
  );
}
