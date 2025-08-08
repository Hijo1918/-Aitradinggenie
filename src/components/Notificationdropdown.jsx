import React from 'react'
import { CheckCircle, AlertCircle, TrendingUp, DollarSign } from 'lucide-react'

const NotificationDropdown = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      title: 'Trade Executed',
      message: 'Your BTC trade was successfully executed',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'info',
      icon: TrendingUp,
      title: 'Market Alert',
      message: 'ETH price increased by 5% in the last hour',
      time: '15 minutes ago',
      unread: true
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertCircle,
      title: 'Risk Warning',
      message: 'High volatility detected in your portfolio',
      time: '1 hour ago',
      unread: false
    },
    {
      id: 4,
      type: 'success',
      icon: DollarSign,
      title: 'Profit Realized',
      message: 'You earned $250 from your Gold Trading Plan',
      time: '2 hours ago',
      unread: false
    }
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      ></div>
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => {
            const IconComponent = notification.icon
            return (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                  notification.unread ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-xl ${
                    notification.type === 'success' ? 'bg-green-100 text-green-600' :
                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  )
}

export default NotificationDropdown
