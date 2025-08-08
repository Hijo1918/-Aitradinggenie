import React from 'react'
import { Plus, Minus, Eye, CreditCard, Wallet, TrendingUp } from 'lucide-react'

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: 'Deposit',
      description: 'Add funds',
      color: 'bg-green-600 hover:bg-green-700',
      shadowColor: 'shadow-green-200 hover:shadow-green-300'
    },
    {
      icon: Minus,
      label: 'Withdraw',
      description: 'Cash out',
      color: 'bg-red-600 hover:bg-red-700',
      shadowColor: 'shadow-red-200 hover:shadow-red-300'
    },
    {
      icon: Eye,
      label: 'View Transactions',
      description: 'History',
      color: 'bg-blue-600 hover:bg-blue-700',
      shadowColor: 'shadow-blue-200 hover:shadow-blue-300'
    },
    {
      icon: Wallet,
      label: 'Connect Wallet',
      description: 'Link wallet',
      color: 'bg-purple-600 hover:bg-purple-700',
      shadowColor: 'shadow-purple-200 hover:shadow-purple-300'
    },
    {
      icon: TrendingUp,
      label: 'Trading Plans',
      description: 'View plans',
      color: 'bg-orange-600 hover:bg-orange-700',
      shadowColor: 'shadow-orange-200 hover:shadow-orange-300'
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {actions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <button
              key={index}
              className={`${action.color} ${action.shadowColor} text-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group`}
            >
              <div className="flex flex-col items-center text-center">
                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-sm sm:text-base mb-1">{action.label}</span>
                <span className="text-xs opacity-90">{action.description}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuickActions
