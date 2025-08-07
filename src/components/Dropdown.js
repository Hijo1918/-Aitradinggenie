import React, { useState } from 'react';

const Dropdown = ({ options, defaultOption, onSelect }) => {
  const [selected, setSelected] = useState(defaultOption || options[0]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onSelect?.(value);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
