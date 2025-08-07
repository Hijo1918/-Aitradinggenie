import React from 'react';

const Notification = ({ message, type = 'info', onDismiss }) => {
  const notificationStyles = {
    info: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    <div className={`p-3 rounded-md flex justify-between items-center ${notificationStyles[type]}`}>
      <span>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="text-white hover:text-gray-200">&times;</button>
      )}
    </div>
  );
};

export default Notification;
