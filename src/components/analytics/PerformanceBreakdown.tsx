import React, { useState } from 'react'
import { PieChart, BarChart3, TrendingUp } from 'lucide-react'

const PerformanceBreakdown: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assets')

  const assetData = [
    { name: 'BTC', percentage: 45, profit: 3200, color: 'bg-blue-500' },
    { name: 'ETH', percentage: 30, profit: 2100, color: 'bg-green-500' },
    { name: 'ADA', percentage: 15, profit: 890, color: 'bg-yellow-500' },
    { name: 'SOL', percentage: 10, profit: 650, color: 'bg-purple-500' },
  ]

  const monthlyData = [
    { month: 'Jan', profit: 1250, trades: 45 },
    { month: 'Feb', profit: 890, trades: 38 },
    { month: 'Mar', profit: 1680, trades: 52 },
    { month: 'Apr', profit: 2100, trades: 61 },
    { month: 'May', profit: 1450, trades: 47 },
    { month: 'Jun', profit: 1920, trades: 55 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Asset Distribution */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-blue-600" />
            Asset Distribution
          </h3>
        </div>
        
        <div className="p-6">
          <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
            <div className="text-center">
              <PieChart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium">Portfolio Distribution</p>
            </div>
          </div>

          <div className="space-y-3">
            {assetData.map((asset, index) => (
              <div key={asset.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${asset.color}`}></div>
                  <span className="font-medium text-gray-900">{asset.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{asset.percentage}%</div>
                  <div className="text-sm text-green-600">+${asset.profit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Monthly Performance
          </h3>
        </div>
        
        <div className="p-6">
          <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium">Monthly Profit Chart</p>
            </div>
          </div>

          <div className="space-y-2">
            {monthlyData.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 w-8">{month.month}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(month.profit / 2500) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">${month.profit}</div>
                  <div className="text-xs text-gray-500">{month.trades} trades</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceBreakdown