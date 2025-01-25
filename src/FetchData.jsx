import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import axios from "axios";

export default function FetchData({ selectedCountry, setSelectedCountry }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (e) {
        setError(e.message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (selectedCountry) {
    return (
      <div className="p-8">
        <button
          onClick={() => setSelectedCountry(null)}
          className="flex items-center justify-center gap-3 text-xs py-2 px-6 bg-[#fafafa] text-[#111827] font-extralight  shadow-even hover:shadow-lg transition-shadow duration-300"
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
            src={selectedCountry?.flags?.svg}
            alt={`${selectedCountry?.name?.nativeName} flag`}
            className="w-[400px] h-full object-cover"
          />
        </div>
        <p className="py-2 text-gray-600"></p>
        <h1 className="text-xl font-semibold ">
          {selectedCountry?.name?.common || "N/A"}
        </h1>
        <p className="font-extralight py-2 text-gray-600">
          <span className="font-normal">Native Name:</span>{" "}
          {selectedCountry?.name?.nativeName
            ? Object.values(selectedCountry?.name?.nativeName)
                .map((native) => native.common)
                .join(", ")
            : "N/A"}
        </p>
        <p className="font-extralight py-2 text-gray-600">
          <span className="font-normal">Population:</span>{" "}
          {selectedCountry?.population?.toLocaleString() || "N/A"}
        </p>
        <p className="font-extralight py-2 text-gray-600">
          <span className="font-normal">Region:</span>{" "}
          {selectedCountry?.region || "N/A"}
        </p>
        <p className="font-extralight py-2 text-gray-600">
          <span className="font-normal">Sub Region:</span>{" "}
          {selectedCountry?.subregion || "N/A"}
        </p>
        <p className="font-extralight py-2 mb-6 text-gray-600">
          <span className="font-normal">Capital:</span>{" "}
          {selectedCountry?.capital?.join(", ") || "N/A"}
        </p>
        <p className="font-extralight py-2 text-gray-600">
          <span className="font-normal">Currencies:</span>{" "}
          {selectedCountry?.currencies
            ? Object.values(selectedCountry.currencies)
                .map((currency) => currency.name)
                .join(", ")
            : "N/A"}
        </p>
        <p className="font-extralight py-2 text-gray-600">
          <span className="font-normal">Languages:</span>{" "}
          {selectedCountry?.languages
            ? Object.values(selectedCountry.languages).join(", ")
            : "N/A"}
        </p>
        <h3 className="font-light">Border Countries:</h3>
        <div className="flex flex-wrap gap-2 font-extralight py-2 text-gray-600">
          {selectedCountry?.borders?.length > 0
            ? selectedCountry.borders.map((borderCode) => {
                const borderCountry = countries.find(
                  (country) => country.cca3 === borderCode
                );
                return (
                  <div className=" ">
                    <span
                      key={borderCode}
                      className="border px-6 py-1 text-sm font-light shadow-sm"
                    >
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
    <div className="p-6">
    <SearchInput />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
      {countries.map((country) => (
        <div
          onClick={() => setSelectedCountry(country)}
          key={country.cca3}
          className="border h-[350px] rounded-lg bg-white shadow-md overflow-hidden flex flex-col"
        >
          <img
            src={country.flags.svg || country.flags.png}
            alt={`${country.name.common} flag`}
            className="w-full h-[200px] object-cover"
          />
          <div className="p-4">
            <h1 className="text-2xl font-semibold">{country.name.common}</h1>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital?.join(", ") || "N/A"}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
