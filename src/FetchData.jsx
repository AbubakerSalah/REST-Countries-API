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
      <div className="p-8 mt-10">
        <button
          onClick={() => setSelectedCountry(null)}
          className="flex items-center justify-center gap-3 text-xs py-2 px-6 bg-[#fafafa] dark:text-white dark:bg-[#253341] text-[#111827] font-extralight shadow-even hover:shadow-lg transition-shadow duration-300"
        >
          <ion-icon
            name="arrow-back-outline"
            className="text-2xl flex justify-start"
            style={{ transform: "scaleX(1.8)" }}
          ></ion-icon>
          Back
        </button>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="pt-12">
            <img
              src={selectedCountry?.flags?.svg || selectedCountry?.flags?.png}
              alt={`${selectedCountry?.name?.common} flag`}
              className="w-[480px] object-cover"
            />
          </div>
          {/*from here */}
          <div className="flex flex-col lg:justify-end lg:items-start">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-16">
              <div>
                <h1 className="text-xl pb-4 font-semibold text-[#121517] dark:text-white">
                  {selectedCountry?.name?.common || "N/A"}
                </h1>
                <p className="py-1 text-gray-600 dark:text-white">
                  <span className="font-normal">Native Name:</span>{" "}
                  {selectedCountry?.name?.nativeName
                    ? Object.values(selectedCountry.name.nativeName)
                        .map((native) => native.common)
                        .join(", ")
                    : "N/A"}
                </p>
                <p className="py-1 text-gray-600 dark:text-white">
                  <span className="font-normal">Population:</span>{" "}
                  {selectedCountry?.population?.toLocaleString() || "N/A"}
                </p>
                <p className="py-1 text-gray-600 dark:text-white">
                  <span className="font-normal">Region:</span>{" "}
                  {selectedCountry?.region || "N/A"}
                </p>
                <p className="py-1 text-gray-600 dark:text-white">
                  <span className="font-normal">Sub Region:</span>{" "}
                  {selectedCountry?.subregion || "N/A"}
                </p>
                <p className="py-1 text-gray-600 dark:text-white">
                  <span className="font-normal">Capital:</span>{" "}
                  {selectedCountry?.capital?.join(", ") || "N/A"}
                </p>
              </div>
              <div>
                <p className=" text-gray-600 dark:text-white">
                  <span className="font-normal">Currencies:</span>{" "}
                  {selectedCountry?.currencies
                    ? Object.values(selectedCountry.currencies)
                        .map((currency) => currency.name)
                        .join(", ")
                    : "N/A"}
                </p>
                <p className="py-1 text-gray-600 dark:text-white">
                  <span className="font-normal">Languages:</span>{" "}
                  {selectedCountry?.languages
                    ? Object.values(selectedCountry.languages).join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex mt-6 flex-col lg:flex-row lg:items-center lg:gap-4">
              {/*border countries */}

              <div>
                <h3 className="font-light dark:text-white">
                  Border Countries:
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 font-extralight py-2 ">
                {selectedCountry?.borders?.length > 0
                  ? selectedCountry.borders.map((borderCode) => {
                      const borderCountry = countries.find(
                        (country) => country.cca3 === borderCode
                      );
                      return (
                        <div key={borderCode}>
                          <span className="px-4 py-1 text-sm font-light shadow-even bg-[#fafafa] dark:text-white dark:bg-[#253341] text-[#111827]">
                            {borderCountry?.name?.common || borderCode}
                          </span>
                        </div>
                      );
                    })
                  : "No border countries"}
              </div>
              {/*til*/}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row  lg:justify-between px-6 lg:px-16 py-8">
        <div className="relative w-full lg:max-w-[35%]  text-[#111827]">
          <div className="mt-5 absolute mx-10 text-4xl text-[#c5c5c5]">
            <ion-icon name="search-outline"></ion-icon>
          </div>
          <input
            type="text"
            placeholder="Search for a country..."
            className="pl-28  text-lg py-6 mb-10 w-full dark:bg-[#253341] dark:text-white rounded-md shadow-md placeholder-[#c5c5c5]"
            value={searchValue}
            onChange={handleInputChange}
            aria-label="Search for a country"
          />
        </div>
        <div className="w-full max-w-xs text-[#111827]">
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="block w-full text-[#111827] dark:bg-[#253341] dark:text-white bg-white py-6 px-5 border border-none rounded-md shadow-md placeholder-[#c5c5c5]"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:px-16 px-12">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div
              onClick={() => setSelectedCountry(country)}
              key={country.cca3}
              className="border max-w-lg h-full pb-12 rounded-lg dark:border-none bg-white dark:bg-[#253341] text-[#111827] dark:text-white shadow-md overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="aspect-video w-full h-fit sm">
                <img
                  src={country.flags?.svg || country.flags?.png}
                  alt={`${country.name.common} flag`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
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
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">No countries found.</p>
        )}
      </div>
    </>
  );
}
