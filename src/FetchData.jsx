import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FetchData() {
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
      } catch (error) {
        setError(error.message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {countries.map((country, index) => (
        <div className="flex flex-col max-w-fit h-72 text-end items-start border rounded-lg shadow-md gap-4 bg-white">
          <div
            key={index}
            className=""
          >
            <img
              src={country.flags.svg || country.flags.png}
              alt={`${country.name.common} flag`}
              className="w-64 h-36 object-cover rounded-md"
            />
          </div>
          <div className="p-4">
            <h1 className=" text-gray-800">{country.name.common}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
