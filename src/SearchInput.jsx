import React, { useState } from "react";

export default function SearchInput({ countries }) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  {/*const filteredCountries = countries.filter((country) => {
    return (
      country.name.common.toLowerCase().includes(searchValue.toLowerCase()) &&
      (selectedRegion ? country.continents[0] === selectedRegion : true)
    );
  });*/}

  return (
    <div className="flex flex-col">
      <div className="relative w-full md:max-w-80 py-4 text-[#111827]">
        <div className="mt-7 absolute mx-16 text-4xl text-[#c5c5c5]">
          <ion-icon name="search-outline"></ion-icon>
        </div>
        <input
          type="text"
          placeholder="Search for a country..."
          className="pl-32 text-lg py-8 mb-12 w-full rounded-md shadow-md placeholder-[#c5c5c5]"
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full max-w-xs text-[#111827]">
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          className="block w-full text-[#111827] bg-white py-8 px-4 border border-none rounded-md shadow-md placeholder-[#c5c5c5]"
        >
          <option value="" disabled>Filter by Region</option>
          {[...new Set(countries.map((country) => country.continents[0]))].map(
            (continent, index) => (
              <option key={index} value={continent}>
                {continent}
              </option>
            )
          )}
        </select>
      </div>
      {/*<div className="mt-6">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="py-1">
            {country.name.common}
          </div>
        ))}
      </div>*/}
    </div>
  );
}
