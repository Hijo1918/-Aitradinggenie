import React from 'react';

const Slider = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
  return (
    <input
      type="range"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      className="w-full accent-blue-600"
    />
  );
};

export default Slider;
