import React, { useState, useEffect } from "react";
import "./style.css";
import ReactPaginate from "react-paginate";
import courseData from "../../data/Assignment_data.json";
import UniversitySearch from "../Search";

const itemsPerPage = 4;
const CourseLists = () => {
  const [data, setData] = useState(courseData);
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const getVisibleCourses = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <>
      <div>
        <UniversitySearch />
      </div>
      <div>
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
                {" "}
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
