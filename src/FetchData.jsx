import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

export default function FetchData({ selectedCountry, setSelectedCountry }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (e) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      return (
        country.name?.common
          ?.toLowerCase()
          .includes(searchValue.toLowerCase()) &&
        (selectedRegion ? country.continents?.[0] === selectedRegion : true)
      );
    });
  }, [countries, searchValue, selectedRegion]);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (selectedCountry) {
    return (
      <div className="p-8">
        <button
          onClick={() => setSelectedCountry(null)}
          className="flex items-center justify-center gap-3 text-xs py-2 px-6 bg-[#fafafa] text-[#111827] font-extralight shadow-even hover:shadow-lg transition-shadow duration-300"
        >
          <ion-icon
            name="arrow-back-outline"
            className="text-2xl flex justify-start"
            style={{ transform: "scaleX(1.8)" }}
          ></ion-icon>
          Back
        </button>
        <div className="py-8">
          <img
            src={selectedCountry?.flags?.svg || selectedCountry?.flags?.png}
            alt={`${selectedCountry?.name?.common} flag`}
            className="w-[400px] h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-semibold text-[#121517] dark:text-white">
          {selectedCountry?.name?.common || "N/A"}
        </h1>
        <p className="py-2 text-gray-600 dark:text-white">
          <span className="font-normal">Native Name:</span>{" "}
          {selectedCountry?.name?.nativeName
            ? Object.values(selectedCountry.name.nativeName)
                .map((native) => native.common)
                .join(", ")
            : "N/A"}
        </p>
        <p className="py-2 text-gray-600 dark:text-white">
          <span className="font-normal">Population:</span>{" "}
          {selectedCountry?.population?.toLocaleString() || "N/A"}
        </p>
        <p className="py-2 text-gray-600 dark:text-white">
          <span className="font-normal">Region:</span>{" "}
          {selectedCountry?.region || "N/A"}
        </p>
        <p className="py-2 text-gray-600 dark:text-white">
          <span className="font-normal">Sub Region:</span>{" "}
          {selectedCountry?.subregion || "N/A"}
        </p>
        <p className="py-2 text-gray-600 dark:text-white">
          <span className="font-normal">Capital:</span>{" "}
          {selectedCountry?.capital?.join(", ") || "N/A"}
        </p>
        <p className="py-2 text-gray-600 dark:text-white">
          <span className="font-normal">Currencies:</span>{" "}
          {selectedCountry?.currencies
            ? Object.values(selectedCountry.currencies)
                .map((currency) => currency.name)
                .join(", ")
            : "N/A"}
        </p>
        <p className="py-2 text-gray-600 dark:text-white">
          <span className="font-normal">Languages:</span>{" "}
          {selectedCountry?.languages
            ? Object.values(selectedCountry.languages).join(", ")
            : "N/A"}
        </p>
        <h3 className="font-light dark:text-white">Border Countries:</h3>
        <div className="flex flex-wrap gap-2 font-extralight py-2 text-gray-600 dark:text-white">
          {selectedCountry?.borders?.length > 0
            ? selectedCountry.borders.map((borderCode) => {
                const borderCountry = countries.find(
                  (country) => country.cca3 === borderCode
                );
                return (
                  <div key={borderCode}>
                    <span className="border px-6 py-1 text-sm font-light shadow-sm">
                      {borderCountry?.name?.common || borderCode}
                    </span>
                  </div>
                );
              })
            : "No border countries"}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col px-10 py-10">
        <div className="relative w-full md:max-w-80  text-[#111827]">
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
            {[...new Set(countries.map((country) => country.continents?.[0]))]
              .filter(Boolean)
              .map((continent, index) => (
                <option key={index} value={continent}>
                  {continent}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div
              onClick={() => setSelectedCountry(country)}
              key={country.cca3}
              className="border h-[440px] rounded-lg bg-white dark:bg-[#1f2937] text-[#111827] dark:text-white shadow-md overflow-hidden flex flex-col cursor-pointer"
            >
              <img
                src={country.flags?.svg || country.flags?.png}
                alt={`${country.name.common} flag`}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h1 className="text-2xl py-4 font-semibold text-[#121517] dark:text-white">
                  {country.name.common}
                </h1>
                <p className="py-1 text-lg">
                  Population:{" "}
                  <span className="text-gray-600 dark:text-white font-extralight">
                    {country.population.toLocaleString()}
                  </span>
                </p>
                <p className="py-1 text-lg">
                  Region:{" "}
                  <span className="text-gray-600 dark:text-white font-extralight">
                    {country.region}
                  </span>
                </p>
                <p className="py-1 text-lg">
                  Capital:{" "}
                  <span className="text-gray-600 dark:text-white font-extralight">
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
    </>
  );
}
