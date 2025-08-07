import React from 'react';

const Panel = ({ children, title }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      {title && <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Panel;
