import "./style.css";
import courseData from "../../data/Assignment_data.json";

import React, { useState } from "react";

function UniversitySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Perform the search
    if (value.trim() === "") {
      // If the input field is empty, clear the search results
      setSearchResults([]);
    } else {
      const filteredResults = courseData.filter((university) => {
        return (
          university.name.toLowerCase().includes(value.toLowerCase()) ||
          university.description.toLowerCase().includes(value.toLowerCase())
        );
      });

      setSearchResults(filteredResults);
    }
  };

  return (
    <div className="search-div">
      <input
        className="search-input"
        type="text"
        placeholder="Search by name or description"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />

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
              <p className="description" title={university.description}>
                {university.description.length > 100
                  ? `${university.description.substring(0, 100)}...`
                  : university.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UniversitySearch;
