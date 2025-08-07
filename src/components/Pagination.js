import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex space-x-2 justify-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
