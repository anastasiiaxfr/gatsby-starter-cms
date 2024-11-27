import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "gatsby";

function Pagination({ numPages, currentPage, data, part }) {
  console.log("data", data);
  const prevPage =
    currentPage === 1
      ? null
      : currentPage === 2
      ? `/${part}/${data?.toLowerCase().replace(/\s+/g, "-")}/`
      : `/${part}/${data?.toLowerCase().replace(/\s+/g, "-")}/${
          currentPage - 1
        }`;

  const nextPage =
    currentPage === numPages
      ? null
      : `/${part}/${data?.toLowerCase().replace(/\s+/g, "-")}/${
          currentPage + 1
        }`;

  // Calculate the range of page numbers to show
  const pageNumbers = [];
  const rangeSize = 3; // Number of pages before and after
  let startPage = Math.max(1, currentPage - Math.floor(rangeSize / 2));
  let endPage = Math.min(numPages, currentPage + Math.floor(rangeSize / 2));

  // Adjust the startPage to ensure we have 5 pages if possible
  if (endPage - startPage < rangeSize - 1) {
    startPage = Math.max(1, endPage - rangeSize + 1);
  }

  // Collect the page numbers
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      {prevPage && (
        <Link to={prevPage} className="prev-page">
          <MdKeyboardArrowLeft />
        </Link>
      )}

      {pageNumbers.map((pageNum) =>
        data ? (
          <Link
            to={`/${part}/${data.toLowerCase().replace(/\s+/g, "-")}/${
              pageNum === 1 ? "" : pageNum
            }`}
            key={pageNum}
            className={`page-number ${pageNum === currentPage ? "active" : ""}`}
          >
            {pageNum}
          </Link>
        ) : (
          <Link
            to={`/${part}/${pageNum === 1 ? "" : pageNum}`}
            key={pageNum}
            className={`page-number ${pageNum === currentPage ? "active" : ""}`}
          >
            {pageNum}
          </Link>
        )
      )}

      {nextPage && (
        <Link to={nextPage} className="next-page">
          <MdKeyboardArrowRight />
        </Link>
      )}
    </nav>
  );
}

export default Pagination;
