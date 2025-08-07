import React from 'react';
import ProfitLossChart from '../components/analytics/ProfitLossChart';
import TradingStats from '../components/analytics/TradingStats';
import PerformanceBreakdown from '../components/analytics/PerformanceBreakdown';
import RiskMetrics from '../components/analytics/RiskMetrics';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Performance</h1>
        <div className="flex items-center space-x-2">
          <select className="input text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      <TradingStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfitLossChart />
        <RiskMetrics />
      </div>

      <PerformanceBreakdown />
    </div>
  );
};

export default Analytics;
