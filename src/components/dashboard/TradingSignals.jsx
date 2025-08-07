import React, { useState, useEffect } from 'react';
import Card from '../components/Card'; // From your list of 25 components
import Button from '../components/Button'; // From your list of 25 components

const TradingSignals = () => {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    // Generate initial signals
    const initialSignals = [
      {
        id: '1',
        symbol: 'BTC/USDT',
        signal: 'BUY',
        confidence: 85,
        price: 43250.50,
        timestamp: new Date(),
      },
      {
        id: '2',
        symbol: 'ETH/USDT',
        signal: 'SELL',
        confidence: 72,
        price: 2650.30,
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: '3',
        symbol: 'ADA/USDT',
        signal: 'HOLD',
        confidence: 60,
        price: 0.485,
        timestamp: new Date(Date.now() - 600000),
      },
    ];
    setSignals(initialSignals);

    // Simulate new signals
    const interval = setInterval(() => {
      const symbols = ['BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'SOL/USDT', 'DOT/USDT'];
      const signalTypes = ['BUY', 'SELL', 'HOLD'];

      const newSignal = {
        id: Date.now().toString(),
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        signal: signalTypes[Math.floor(Math.random() * signalTypes.length)],
        confidence: Math.floor(Math.random() * 40) + 60,
        price: Math.random() * 50000,
        timestamp: new Date(),
      };

      setSignals((prev) => [newSignal, ...prev.slice(0, 4)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'BUY':
        return <span className="w-4 h-4 text-green-600">[TrendingUp]</span>;
      case 'SELL':
        return <span className="w-4 h-4 text-red-600">[TrendingDown]</span>;
      default:
        return <span className="w-4 h-4 text-gray-600">[Minus]</span>;
    }
  };

  const getSignalColor = (signal) => {
    switch (signal) {
      case 'BUY':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'SELL':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">AI Trading Signals</h3>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 text-primary-600">[AlertCircle]</span>
          <span className="text-sm text-gray-600">Live Analysis</span>
        </div>
      </div>

      <div className="space-y-4">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getSignalIcon(signal.signal)}
                <span className="font-medium text-gray-900">{signal.symbol}</span>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded border ${getSignalColor(
                  signal.signal
                )}`}
              >
                {signal.signal}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${signal.price.toLocaleString()}</span>
              <span>{signal.confidence}% confidence</span>
            </div>

            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${signal.confidence}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              {signal.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <Button variant="primary" className="w-full mt-4">
        Execute Auto Trading
      </Button>
    </Card>
  );
};

export default TradingSignals;
