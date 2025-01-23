import React, { useState } from "react";

export default function SearchInput(setSelectedCountry) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  //DropDown option
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  //Search input
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    !setSelectedCountry && (
      <div className="flex flex-col px-10">
        <div className="relative w-full md:max-w-80 py-6 mt-10 text-[#111827]">
          <div className="mt-6 absolute ml-10 text-2xl text-[#c5c5c5]">
            <ion-icon name="search-outline"></ion-icon>
          </div>

          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for a country..."
            className=" pr-4 text-center  py-6 w-full  rounded-md shadow-md placeholder-[#c5c5c5]"
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full max-w-xs  text-[#111827]">
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleChange}
            className="block w-full text-[#111827] bg-white py-6 px-4 border border-none rounded-md shadow-md "
          >
            <option value="" disabled>
              Filter by Region
            </option>
            <option value="option1">Africa</option>
            <option value="option2">America</option>
            <option value="option3">Europe</option>
            <option value="option3">Oceania</option>
          </select>
        </div>
      </div>
    )
  );
}
