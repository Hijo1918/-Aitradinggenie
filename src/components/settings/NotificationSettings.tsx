import React, { useState } from 'react'
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react'

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: {
      trades: true,
      profits: true,
      losses: true,
      systemAlerts: true,
    },
    push: {
      trades: false,
      profits: true,
      losses: true,
      systemAlerts: true,
    },
    sms: {
      trades: false,
      profits: false,
      losses: true,
      systemAlerts: true,
    },
  })

  const [contactInfo, setContactInfo] = useState({
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
  })

  const handleNotificationChange = (type: string, setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  const notificationTypes = [
    { key: 'trades', label: 'Trade Executions', description: 'When trades are opened or closed' },
    { key: 'profits', label: 'Profit Alerts', description: 'When trades reach profit targets' },
    { key: 'losses', label: 'Loss Alerts', description: 'When stop losses are triggered' },
    { key: 'systemAlerts', label: 'System Alerts', description: 'Important system notifications' },
  ]

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
      </div>

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Contact Information</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
              className="input"
            />
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Notification Preferences</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Notification Type</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-700">
                    <div className="flex items-center justify-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </div>
                  </th>
                  <th className="text-center py-2 text-sm font-medium text-gray-700">
                    <div className="flex items-center justify-center space-x-1">
                      <Bell className="w-4 h-4" />
                      <span>Push</span>
                    </div>
                  </th>
                  <th className="text-center py-2 text-sm font-medium text-gray-700">
                    <div className="flex items-center justify-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>SMS</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {notificationTypes.map((type) => (
                  <tr key={type.key} className="border-b border-gray-100">
                    <td className="py-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{type.label}</div>
                        <div className="text-xs text-gray-500">{type.description}</div>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <input
                        type="checkbox"
                        checked={notifications.email[type.key as keyof typeof notifications.email]}
                        onChange={(e) => handleNotificationChange('email', type.key, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="py-3 text-center">
                      <input
                        type="checkbox"
                        checked={notifications.push[type.key as keyof typeof notifications.push]}
                        onChange={(e) => handleNotificationChange('push', type.key, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="py-3 text-center">
                      <input
                        type="checkbox"
                        checked={notifications.sms[type.key as keyof typeof notifications.sms]}
                        onChange={(e) => handleNotificationChange('sms', type.key, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="w-full btn btn-primary">
          Save Notification Settings
        </button>
      </div>
    </div>
  )
}

export default NotificationSettings