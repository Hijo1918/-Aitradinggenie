import React from 'react';

interface Trade {
  symbol: string;
  type: string; // SELL or BUY
  price: string;
  size: number;
  pnl: string;
  pnlColor: string;
  date: string;
}

interface RecentTradesListProps {
  trades: Trade[];
}
const RecentTradesList: React.FC<RecentTradesListProps> = ({ trades }) => (
  <div className="bg-[#202838] rounded-xl p-4">
    <div className="text-lg font-semibold mb-2">Recent Trades</div>
    <div className="flex flex-col gap-2">
      {trades.map((trade, idx) => (
        <div key={idx} className="flex justify-between items-center bg-[#22304a] py-2 px-3 rounded-lg">
          <div>
            <div className="font-bold">{trade.symbol}</div>
            <div className="text-xs text-gray-400">{trade.type} {trade.size}</div>
          </div>
          <div className="text-right">
            <div className="font-semibold">{trade.price}</div>
            <div className="text-xs" style={{ color: trade.pnlColor }}>{trade.pnl}</div>
            <div className="text-xs text-gray-400">{trade.date}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default RecentTradesList;
