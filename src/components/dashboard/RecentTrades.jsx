import React, { useState, useEffect } from 'react';

const RecentTrades = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // Generate mock trades
    const mockTrades = [
      {
        id: '1',
        symbol: 'BTC/USDT',
        side: 'BUY',
        amount: 0.025,
        price: 43180.50,
        profit: 125.30,
        timestamp: new Date(Date.now() - 300000),
        status: 'completed',
      },
      {
        id: '2',
        symbol: 'ETH/USDT',
        side: 'SELL',
        amount: 1.5,
        price: 2645.80,
        profit: -45.20,
        timestamp: new Date(Date.now() - 600000),
        status: 'completed',
      },
      {
        id: '3',
        symbol: 'ADA/USDT',
        side: 'BUY',
        amount: 1000,
        price: 0.482,
        profit: 23.50,
        timestamp: new Date(Date.now() - 900000),
        status: 'completed',
      },
      {
        id: '4',
        symbol: 'SOL/USDT',
        side: 'SELL',
        amount: 5,
        price: 98.45,
        profit: 67.80,
        timestamp: new Date(Date.now() - 1200000),
        status: 'pending',
      },
    ];
    setTrades(mockTrades);

    // Simulate new trades
    const interval = setInterval(() => {
      const symbols = ['BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'SOL/USDT'];
      const sides = ['BUY', 'SELL'];

      const newTrade = {
        id: Date.now().toString(),
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        side: sides[Math.floor(Math.random() * sides.length)],
        amount: Math.random() * 10,
        price: Math.random() * 50000,
        profit: (Math.random() - 0.5) * 200,
        timestamp: new Date(),
        status: 'completed',
      };

      setTrades((prev) => [newTrade, ...prev.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Trades</h3>
        <span className="w-5 h-5 text-gray-400">[Clock]</span>
      </div>

      <div className="space-y-3">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg ${trade.side === 'BUY' ? 'bg-green-50' : 'bg-red-50'}`}
              >
                <span
                  className={`w-4 h-4 ${trade.side === 'BUY' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {trade.side === 'BUY' ? '[ArrowUpRight]' : '[ArrowDownRight]'}
                </span>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{trade.symbol}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      trade.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : trade.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {trade.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {trade.amount} @ ${trade.price.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div
                className={`font-medium ${
                  trade.profit >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trade.profit >= 0 ? '+' : ''}${trade.profit.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {trade.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 btn btn-secondary">View All Trades</button>
    </div>
  );
};

export default RecentTrades;
