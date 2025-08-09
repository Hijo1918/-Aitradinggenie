import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ items = [] }) => {
  return (
    <nav className="bg-blue-600 text-white p-4" aria-label="Main Navigation">
      <ul className="flex space-x-6">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="hover:text-gray-200">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
};

export default Navbar;
