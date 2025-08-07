import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
  const alertStyles = {
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  return (
    <div className={`p-4 border-l-4 rounded-md flex justify-between items-center ${alertStyles[type]}`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
