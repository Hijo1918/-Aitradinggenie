import React from 'react';

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-md -top-10 left-1/2 transform -translate-x-1/2">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
