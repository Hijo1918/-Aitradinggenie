import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export default SearchBar;
