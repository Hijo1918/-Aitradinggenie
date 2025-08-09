import React from 'react';
import { useAuth } from '../components/AuthProvider';
import StatsCards from '../components/dashboard/StatsCards';
import LivePriceChart from '../components/dashboard/LivePriceChart';
import RecentTrades from '../components/dashboard/RecentTrades';
import TradingSignals from '../components/dashboard/TradingSignals';
import PerformanceMetrics from '../components/dashboard/PerformanceMetrics';
import Analytics from '../components/Analytics';
import Reports from '../components/Reports';
import QuickActions from '../components/QuickActions';
import PortfolioOverview from '../components/PortfolioOverview';
import MarketData from '../components/MarketData';
import SmartContractInterface from '../components/SmartContractInterface';
import EthereumBlockViewer from '../components/EthereumBlockViewer';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ', Trader'}!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Monitor your portfolio, execute trades, and interact with smart contracts
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-4 sm:mt-0">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Market Data</span>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Ethereum Block Viewer */}
      <EthereumBlockViewer />

      {/* Portfolio Overview and Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <PortfolioOverview />
        <StatsCards />
      </div>

      {/* Live Price Chart, Trading Signals, and Market Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <LivePriceChart />
        </div>
        <div>
          <TradingSignals />
        </div>
        <div>
          <MarketData />
        </div>
      </div>

      {/* Recent Trades, Performance Metrics, and Smart Contract Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <RecentTrades />
        <PerformanceMetrics />
        <div className="lg:col-span-2">
          <SmartContractInterface />
        </div>
      </div>

      {/* Analytics and Reports */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        <Analytics />
        <Reports />
      </div>
    </div>
  );
};

export default Dashboard;
