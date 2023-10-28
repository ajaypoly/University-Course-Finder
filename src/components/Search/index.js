import "./style.css";
import { FcSearch } from "react-icons/fc";
import React, { useState } from "react";

const UniversitySearch= ({filteredData})=> {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Perform the search
    if (value.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredResults = filteredData.filter((university) => {
        return (
          university.name.toLowerCase().includes(value.toLowerCase())
        );
      });

      setSearchResults(filteredResults);
    }
  };

  return (
    <div className="search-div">
      <div className="sticky-search">
        <FcSearch className="search-icon" /> 
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or description"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>

      {searchResults.length > 0 && (
        <ul className="search-ul">
          {searchResults.map((university) => (
            <li
              className="search-li"
              key={university.id}
              onClick={() => {
                window.open(university.url, "_blank");
              }}
            >
              <h6>{university.name}</h6>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UniversitySearch;
