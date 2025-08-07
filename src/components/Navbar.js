import React from 'react';

const Navbar = ({ items }) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-6">
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="hover:text-gray-200">{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
