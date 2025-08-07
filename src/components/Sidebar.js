import React from 'react';

const Sidebar = ({ items }) => {
  return (
    <aside className="bg-gray-800 text-white w-64 p-4">
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="block p-2 hover:bg-gray-700 rounded">{item.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
