import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, disabled }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'opacity-50' : ''}`}
    />
  );
};

export default Input;
