import React, { useState, useEffect } from "react";
import "./style.css";
import ReactPaginate from "react-paginate";
import courseData from "../../data/Assignment_data.json";
import Select from "react-dropdown-select";
import UniversitySearch from "../Search";

const itemsPerPage = 4;

const CourseLists = () => {
  const [data, setData] = useState(courseData);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNames, setSelectedNames] = useState([]);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const getVisibleCourses = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const filteredData = data.filter((course) => {
      if (selectedNames.length === 0) {
        return true; 
      }
      return selectedNames.includes(course.country);
    });
  
    const groupedCourses = {};
  
    filteredData.forEach((course) => {
      if (!groupedCourses[course.country]) {
        groupedCourses[course.country] = [];
      }
      groupedCourses[course.country].push(course);
    });
  
    const selectedCountryCourses = selectedNames.length > 0 ? groupedCourses[selectedNames[0]] : data;
  
    return selectedCountryCourses.slice(startIndex, endIndex);
  };
  
  

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleNameFilterChange = (selectedNames) => {
    setSelectedNames(selectedNames.map((item) => item.value));
  };

  const applyFilter = () => {};

  const groupedData = {};
  data.forEach((course) => {
    if (!groupedData[course.country]) {
      groupedData[course.country] = [];
    }
    groupedData[course.country].push(course);
  });
  const uniqueCountryNames = new Set();

data.forEach((course) => {
  uniqueCountryNames.add(course.country);
});

const uniqueCountryOptions = [...uniqueCountryNames].map((countryName) => ({
  label: countryName,
  value: countryName,
}));


  return (
    <>
      <div>
        <div>
          <UniversitySearch filteredData={groupedData[selectedNames[0]] || data} />
        </div>
        <div className="filter-names">
          <Select
            className="filter-select"
            placeholder="Filter with country names"
            multi
            options={uniqueCountryOptions}
            onChange={handleNameFilterChange}
            values={selectedNames}
          />
        </div>

        <div className="course-list-div">
          {getVisibleCourses().map((course) => (
            <div key={course.id} className="course-box">
              <div className="course-heading-div">
                <img
                  src={course.logo_path}
                  alt="Course Logo"
                  className="course-logo"
                />
                <h2 className="course-heading">{course.name}</h2>
              </div>

              <p className="course-description">{course.description}</p>

              <div className="course-button-div">
                <button
                  className="glow-on-hover"
                  onClick={() => {
                    window.open(course.url, "_blank");
                  }}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="course-pagination">
          <ReactPaginate
            className="course-pagination-component"
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="previous"
            renderOnZeroPageCount={null}
            forcePage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default CourseLists;
