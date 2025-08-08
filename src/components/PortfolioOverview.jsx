import React from 'react'
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react'

const PortfolioOverview = () => {
  const portfolioStats = [
    {
      title: 'Total Balance',
      value: '$45,230.50',
      change: '+12.5%',
      positive: true,
      icon: DollarSign,
      color: 'bg-blue-600',
      shadowColor: 'shadow-blue-200'
    },
    {
      title: 'Active Investments',
      value: '$32,450.00',
      change: '+8.2%',
      positive: true,
      icon: TrendingUp,
      color: 'bg-green-600',
      shadowColor: 'shadow-green-200'
    },
    {
      title: 'Available Balance',
      value: '$12,780.50',
      change: '-2.1%',
      positive: false,
      icon: Wallet,
      color: 'bg-purple-600',
      shadowColor: 'shadow-purple-200'
    },
    {
      title: 'Today\'s P&L',
      value: '+$1,245.30',
      change: '+5.7%',
      positive: true,
      icon: TrendingUp,
      color: 'bg-orange-600',
      shadowColor: 'shadow-orange-200'
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Portfolio Overview
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {portfolioStats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`${stat.color} ${stat.shadowColor} p-2 sm:p-3 rounded-xl shadow-lg`}>
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className={`flex items-center px-2 py-1 rounded-lg text-xs sm:text-sm font-medium ${
                  stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.positive ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PortfolioOverview
