import React, { useState } from "react";
import Header from "./Header";
import FetchData from "./FetchData";
export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <>
      <Header selectedCountry={selectedCountry} />
      
      <FetchData
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
      />
    </>
  );
}
