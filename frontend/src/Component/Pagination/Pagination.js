import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    props.currentPageSetter(currentPage);
  }, [currentPage, props]);

  return (
    <div className={"px-3 py-2"}>
      <ul className={"flex justify-center"}>
        <button
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          className={
            "border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white font-bold transition-all duration-300 hover:border-accent"
          }
        >
          Previous
        </button>
        <button
          className="w-10 border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white transition-all duration-300 hover:border-accent"
          onClick={() => {
            if (currentPage > 2) {
              setCurrentPage(currentPage - 2);
            }
          }}
        >
          {currentPage - 2 > 0 ? currentPage - 2 : null}
        </button>
        <button
          className="w-10 border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white transition-all duration-300 hover:border-accent"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          {currentPage - 1 > 0 ? currentPage - 1 : null}
        </button>
        <button className="w-10 border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white transition-all duration-300 hover:border-accent">
          {currentPage}
        </button>
        <button
          className="w-10 border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white transition-all duration-300 hover:border-accent"
          onClick={() => {
            if (currentPage < props.pagesNumber) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          {currentPage + 1 < props.pagesNumber + 1 ? currentPage + 1 : null}
        </button>
        <button
          className="w-10 border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white transition-all duration-300 hover:border-accent"
          onClick={() => {
            if (currentPage < props.pagesNumber - 1) {
              setCurrentPage(currentPage + 2);
            }
          }}
        >
          {currentPage + 2 < props.pagesNumber + 1 ? currentPage + 2 : null}
        </button>
        <button
          disabled={currentPage === props.pagesNumber}
          onClick={() => {
            if (currentPage < props.pagesNumber) {
              setCurrentPage(currentPage + 1);
            }
          }}
          className={
            "border border-gray-300 rounded mx-1 px-3 py-1.5 text-light-text text-sm dark:text-white font-bold transition-all duration-300 hover:border-accent"
          }
        >
          Next
        </button>
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  pagesNumber: PropTypes.number.isRequired,
  currentPageSetter: PropTypes.func.isRequired,
};

export default Pagination;
