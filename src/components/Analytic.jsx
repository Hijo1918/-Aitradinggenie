import React, { useState } from 'react'
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from 'lucide-react'

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('performance')

  const performanceData = [
    { label: 'Total Profit', value: '$12,450', change: '+15.2%', positive: true },
    { label: 'Win Rate', value: '78%', change: '+3.1%', positive: true },
    { label: 'Active Trades', value: '24', change: '+2', positive: true },
    { label: 'Risk Score', value: '6.2/10', change: '-0.5', positive: true }
  ]

  const marketData = [
    { symbol: 'BTC/USD', price: '$42,350', change: '+2.4%', positive: true },
    { symbol: 'ETH/USD', price: '$2,890', change: '-1.2%', positive: false },
    { symbol: 'ADA/USD', price: '$0.45', change: '+5.7%', positive: true },
    { symbol: 'SOL/USD', price: '$98.20', change: '+3.1%', positive: true }
  ]

  const tabs = [
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'market', label: 'Market', icon: BarChart3 },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Analytics
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {activeTab === 'performance' && (
          <div className="space-y-4">
            {performanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">{item.value}</p>
                </div>
                <div className={`flex items-center px-2 py-1 rounded-lg text-sm font-medium ${
                  item.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.positive ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-3">
            {marketData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">{item.symbol}</p>
                  <p className="text-lg font-semibold text-gray-900">{item.price}</p>
                </div>
                <div className={`flex items-center px-2 py-1 rounded-lg text-sm font-medium ${
                  item.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.positive ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {item.change}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <PieChart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Portfolio distribution chart</p>
              <p className="text-sm text-gray-500 mt-2">Visual representation coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics
