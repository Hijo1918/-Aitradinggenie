import React from 'react';

const Table = ({ headers, data }) => {
  return (
    <table className="w-full bg-white shadow rounded-lg">
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          {headers.map((header, index) => (
            <th key={index} className="p-3 text-left">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-t">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="p-3">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
