import React, { useEffect, useState } from "react";
import axios from "axios";


export default function FetchData(country) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry,setSelectedCountry] = useState(null)

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

  if(selectedCountry) {
      return(
            <>
            <div className="p-4">
                  <button
                  onClick={()=> setSelectedCountry(null)} 
                  className="bg-gray-200 px-3">
                        back
                  </button>
            </div>

          <div className="border h-full m-4 rounded-lg bg-white shadow-md overflow-hidden flex flex-col">
          <div className="w-full h-[200px]">
            <img
              src={selectedCountry.flags.svg || selectedCountry.flags.png}
              alt={`${selectedCountry.name.common} flag`}
              className="w-[400px] h-full object-cover"
            />
          </div>

          <div className="p-4 w-full font-sans">
            <h1 className="text-2xl font-semibold text-gray-800">{selectedCountry.name.common}</h1>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Population:</span> {selectedCountry.population.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
            <span className="font-bold">Region:</span> {selectedCountry.region}
            </p>
            <p className="text-sm text-gray-600">
            <span className="font-bold">Capital:</span>{selectedCountry.capital}
            </p>
          </div>
          </div>

          
            </>
      )
  }


  return (
      <div
       className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-8">
      {countries.map((country, index) => (
        <div
        onClick={ () => setSelectedCountry(country)}
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
            <h1 className="text-2xl font-semibold text-gray-800">{country.name.common}</h1>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Population:</span> {country.population.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
            <span className="font-bold">Region:</span> {country.region}
            </p>
            <p className="text-sm text-gray-600">
            <span className="font-bold">Capital:</span>{country.capital}
            </p>
          </div>
          
        </div>
      ))}
    </div>
  );
}
