import React, { useState, useMemo } from "react";

export default function SearchInput({ countries, selectedCountry, setSelectedCountry }) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(searchValue.toLowerCase()) &&
        (selectedRegion ? country.continents[0] === selectedRegion : true)
      );
    });
  }, [countries, searchValue, selectedRegion]);

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
          aria-label="Search for a country"
        />
      </div>
      <div className="w-full max-w-xs text-[#111827]">
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          className="block w-full text-[#111827] bg-white py-8 px-4 border border-none rounded-md shadow-md placeholder-[#c5c5c5]"
          aria-label="Filter countries by region"
        >
          <option value="">All Regions</option>
          {[...new Set(countries.map((country) => country.continents[0]))].map(
            (continent, index) => (
              <option key={index} value={continent}>
                {continent}
              </option>
            )
          )}
        </select>
      </div>
      {!selectedCountry && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                onClick={() => setSelectedCountry(country)}
                key={country.cca3}
                className="border h-[440px] rounded-lg bg-white shadow-md overflow-hidden flex flex-col hover:scale-105 transition-transform"
              >
                <img
                  src={country.flags.svg || country.flags.png}
                  alt={`${country.name.common} flag`}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4">
                  <h1 className="text-2xl py-4 font-semibold text-[#121517]">
                    {country.name.common}
                  </h1>
                  <p className="py-1 text-lg">
                    Population:{" "}
                    <span className="text-gray-600 font-extralight">
                      {country.population.toLocaleString()}
                    </span>
                  </p>
                  <p className="py-1 text-lg">
                    Region:{" "}
                    <span className="text-gray-600 font-extralight">
                      {country.region}
                    </span>
                  </p>
                  <p className="py-1 text-lg">
                    Capital:{" "}
                    <span className="text-gray-600 font-extralight">
                      {country.capital?.join(", ") || "N/A"}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10">No countries found.</p>
          )}
        </div>
      )}
    </div>
  );
}