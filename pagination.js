// Pagination.js
import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, baseUrl }) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      {getPageNumbers().map((page) => (
        <Link key={page} to={`${baseUrl}/${page}`}>
          <span className={currentPage === page ? 'active' : ''}>{page}</span>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
