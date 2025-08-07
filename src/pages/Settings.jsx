import React from 'react'
import ApiSettings from '../components/settings/ApiSettings'
import TradingSettings from '../components/settings/TradingSettings'
import NotificationSettings from '../components/settings/NotificationSettings'
import SecuritySettings from '../components/settings/SecuritySettings'

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ApiSettings />
          <TradingSettings />
        </div>
        <div className="space-y-6">
          <NotificationSettings />
          <SecuritySettings />
        </div>
      </div>
    </div>
  )
}

export default Settings
