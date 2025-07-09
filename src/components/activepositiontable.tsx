import React from 'react';

interface Position {
  symbol: string;
  side: string;
  size: number;
}

interface ActivePositionsTableProps {
  positions: Position[];
}
const ActivePositionsTable: React.FC<ActivePositionsTableProps> = ({ positions }) => (
  <div className="bg-[#202838] rounded-xl p-4">
    <div className="text-lg font-semibold mb-2">Active Positions</div>
    <table className="w-full text-left">
      <thead>
        <tr className="text-gray-400">
          <th>Symbol</th>
          <th>Side</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((pos, idx) => (
          <tr key={idx} className="border-t border-gray-700">
            <td>{pos.symbol}</td>
            <td>
              <span className={`px-2 py-1 rounded-md text-xs font-bold ${pos.side === 'SHORT' ? 'bg-red-900 text-red-400' : 'bg-green-900 text-green-400'}`}>
                {pos.side}
              </span>
            </td>
            <td>{pos.size}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default ActivePositionsTable;
