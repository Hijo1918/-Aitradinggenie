import React from 'react';

const Tag = ({ label, color = 'blue' }) => {
  const colorStyles = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${colorStyles[color]}`}>
      {label}
    </span>
  );
};

export default Tag;
