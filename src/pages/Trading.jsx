import React from 'react';
import TradingInterface from '../components/trading/TradingInterface';
import OrderBook from '../components/trading/OrderBook';
import PositionManager from '../components/trading/PositionManager';
import RiskManagement from '../components/trading/RiskManagement';

const Trading = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Trading Interface</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Auto Trading: ON</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <TradingInterface />
        </div>
        <div>
          <OrderBook />
        </div>
        <div>
          <RiskManagement />
        </div>
      </div>

      <PositionManager />
    </div>
  );
};

export default Trading;
