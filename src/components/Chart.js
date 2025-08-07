import React from 'react';

const Chart = ({ data, type = 'line' }) => {
  // Placeholder for chart rendering (e.g., Chart.js integration)
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Chart ({type})</h2>
      <div className="h-64 flex items-center justify-center text-gray-600">
        {/* Replace with actual chart rendering */}
        <p>Chart Placeholder: {type} (Data: {JSON.stringify(data)})</p>
      </div>
    </div>
  );
};

export default Chart;
