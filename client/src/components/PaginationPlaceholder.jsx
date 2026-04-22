import React from 'react';

const PaginationPlaceholder = ({ page, totalPages, limit, onPageChange, onLimitChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
      <div>
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <span> Page {page} of {Math.max(totalPages, 1)} </span>
        <button
          disabled={page >= Math.max(totalPages, 1)}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
      <div>
        <label>Per page: </label>
        <select value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationPlaceholder;
