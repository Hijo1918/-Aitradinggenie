import React from 'react'
import StatsCards from '../components/dashboard/StatsCards'
import LivePriceChart from '../components/dashboard/LivePriceChart'
import RecentTrades from '../components/dashboard/RecentTrades'
import TradingSignals from '../components/dashboard/TradingSignals'
import PerformanceMetrics from '../components/dashboard/PerformanceMetrics'

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Trading Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Market Data</span>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LivePriceChart />
        </div>
        <div>
          <TradingSignals />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTrades />
        <PerformanceMetrics />
      </div>
    </div>
  )
}

export default Dashboard