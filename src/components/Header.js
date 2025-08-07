import React from 'react';

const Header = ({ title, children }) => {
  return (
    <header className="flex items-center justify-between bg-white shadow p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center space-x-4">{children}</div>
    </header>
  );
};

export default Header;
