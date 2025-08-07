import React from 'react';

const Widget = ({ title, children }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>}
      {children}
    </div>
  );
};

export default Widget;
