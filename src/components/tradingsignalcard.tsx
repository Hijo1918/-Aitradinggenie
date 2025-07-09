import React from 'react';

interface Signal {
  symbol: string;
  type: 'BUY' | 'SELL';
  active: boolean;
  targetPrice: string;
  confidence: number; // as percent
  description: string;
  date: string;
}

const TradingSignalCard: React.FC<Signal> = ({
  symbol, type, active, targetPrice, confidence, description, date
}) => (
  <div className="bg-[#202838] rounded-xl p-4 mb-3">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-lg font-bold">{symbol}</span>
      <span className={`px-2 py-1 rounded-md text-xs font-bold ${type === 'SELL' ? 'bg-red-900 text-red-400' : 'bg-green-900 text-green-400'}`}>
        {type}
      </span>
      <span className={`px-2 py-1 rounded-md text-xs font-bold ${active ? 'bg-yellow-800 text-yellow-400' : 'bg-gray-700 text-gray-400'}`}>
        {active ? 'Active' : 'Inactive'}
      </span>
    </div>
    <div className="flex items-center gap-4 mb-1">
      <div>
        <div className="text-sm text-gray-400">Target Price</div>
        <div className="font-semibold">{targetPrice}</div>
      </div>
      <div>
        <div className="text-sm text-gray-400">Confidence</div>
        <div className="text-green-400 font-semibold">{confidence}%</div>
      </div>
    </div>
    <div className="text-xs text-gray-300 mb-1">{description}</div>
    <div className="text-xs text-gray-500">{date}</div>
  </div>
);
export default TradingSignalCard;
