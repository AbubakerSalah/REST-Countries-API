import React from "react";

export default function Header({setDarkMode, darkMode}) {
  
  return (
    <div className={`bg-white dark:bg-[#1f2937] text-[#111827] dark:text-white shadow-md py-10 px-6 flex justify-between font-sans`}>
      <h1 className="font-semibold text-lg">Where in the world?</h1>

      <div className="flex items-center gap-2 text-lg cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
        <ion-icon name={darkMode ? "moon" : "moon-outline"}></ion-icon>
        <button className="font-light">{darkMode ? "Light Mode" : "Dark Mode"}</button>
      </div>
    </div>
  );
}