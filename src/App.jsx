import React, { useState } from "react";
import Header from "./Header";
import SearchInput from "./SearchInput";
import FetchData from "./fetchData";
export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <>
      <Header selectedCountry={selectedCountry} />
      <SearchInput setSelectedCountry={setSelectedCountry} />
      <FetchData
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
      />
    </>
  );
}
