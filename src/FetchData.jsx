import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FetchData(country) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (selectedCountry) {
    return (
      <>
        <div className=" p-8">
          <div>
            <div className="py-10">
              <button
                onClick={() => setSelectedCountry(null)}
                className="px-6 py-2 bg-[#fafafa] text-[#111827] font-extralight  rounded-lg shadow-md hover:shadow-lg focus:shadow-xl active:shadow-sm transition-shadow duration-300"
              >
                Back
              </button>
            </div>
            <div className="py-8">
              <img
                src={selectedCountry.flags.svg || selectedCountry.flags.png}
                alt={`${selectedCountry.name.common} flag`}
                className="w-[400px] h-full object-cover"
              />
            </div>
          </div>

          <div className="font-sans">
            <h1 className="text-2xl py-6 font-semibold text-gray-800">
              {selectedCountry.name.common}
            </h1>
            <p className="font-extralight  text-gray-600">
              <span className="font-normal">Population:</span>{" "}
              {selectedCountry.population.toLocaleString()}
            </p>
            <p className="font-extralight py-2 text-gray-600">
              <span className="font-normal">Region:</span> {selectedCountry.region}
            </p>
            <p className="font-extralight py-2 text-gray-600">
              <span className="font-normal">Sub Region:</span> {selectedCountry.subregion}
            </p>
            <p className="font-light  text-gray-600">
              <span className="font-normal">Capital:</span> {selectedCountry.capital}
            </p>
          </div>

          <div className="font-sans py-8">
            <p className="font-extralight  text-gray-600">
              <span className="font-normal">Population:</span>{" "}
              {selectedCountry.population.toLocaleString()}
            </p>
            <p className="font-extralight py-2 text-gray-600">
              <span className="font-normal">Currencies:</span>{" "}
              {Object.values(selectedCountry.currencies)
                .map((currency) => currency.name)
                .join(", ")}
            </p>

            <p className="font-light text-gray-600">
              <span className="font-normal">Languages:</span>{" "}
              {Object.values(selectedCountry.languages).map(
                (language, index) => (
                  <span key={index}>
                    {language}
                    {index < Object.values(selectedCountry.languages).length - 1
                      ? ", "
                      : ""}
                  </span>
                )
              )}
            </p>
          </div>

          <div>
            <h3 className="font-thin">Border Countries:</h3>
            <p className="">
              {Object.values(selectedCountry.borders).map(
                (language, index) => (
                  <span key={index} className="border px-6 py-1 text-sm font-light">
                    {language}
                    {index < Object.values(selectedCountry.borders).length - 1
                      ? "  "
                      : ""}
                  </span>
                )
              )}
                  
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-8">
      {countries.map((country, index) => (
        <div
          onClick={() => setSelectedCountry(country)}
          key={index}
          className="border h-[350px] rounded-lg bg-white shadow-md overflow-hidden flex flex-col"
        >
          <div className="w-full h-[200px]">
            <img
              src={country.flags.svg || country.flags.png}
              alt={`${country.name.common} flag`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 w-full font-sans">
            <h1 className="text-2xl font-semibold text-gray-800">
              {country.name.common}
            </h1>
            <p className="font-extralight  text-gray-600">
              <span className="font-bold">Population:</span>{" "}
              {country.population.toLocaleString()}
            </p>
            <p className="font-extralight  text-gray-600">
              <span className="font-bold">Region:</span> {country.region}
            </p>
            <p className="font-extralight  text-gray-600">
              <span className="font-bold">Capital:</span> {"  "}
              {country.capital}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
