import React, { useState } from 'react'
import { Shield, Lock, Key, Smartphone, AlertTriangle } from 'lucide-react'

const SecuritySettings: React.FC = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    withdrawalConfirmation: true,
    sessionTimeout: 30,
    ipWhitelist: '',
    apiKeyRestrictions: true,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const securityLogs = [
    { action: 'Login', ip: '192.168.1.100', time: '2024-01-15 10:30:00', status: 'Success' },
    { action: 'API Key Used', ip: '192.168.1.100', time: '2024-01-15 10:25:00', status: 'Success' },
    { action: 'Password Changed', ip: '192.168.1.100', time: '2024-01-14 15:20:00', status: 'Success' },
    { action: 'Failed Login', ip: '203.0.113.1', time: '2024-01-14 09:15:00', status: 'Failed' },
  ]

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
      </div>

      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Authenticator App</div>
                <div className="text-xs text-gray-500">
                  {securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            </div>
            <button className={`btn ${securitySettings.twoFactorEnabled ? 'btn-danger' : 'btn-success'}`}>
              {securitySettings.twoFactorEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>

        {/* Password Change */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Change Password</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="input"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                className="input"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="input"
                placeholder="Confirm new password"
              />
            </div>

            <button className="btn btn-primary">
              Update Password
            </button>
          </div>
        </div>

        {/* Security Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Security Options</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">Withdrawal Confirmation</span>
                <p className="text-xs text-gray-500">Require email confirmation for withdrawals</p>
              </div>
              <input
                type="checkbox"
                checked={securitySettings.withdrawalConfirmation}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, withdrawalConfirmation: e.target.checked }))}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">API Key Restrictions</span>
                <p className="text-xs text-gray-500">Restrict API keys to specific IP addresses</p>
              </div>
              <input
                type="checkbox"
                checked={securitySettings.apiKeyRestrictions}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, apiKeyRestrictions: e.target.checked }))}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                className="input"
                min="5"
                max="480"
              />
            </div>
          </div>
        </div>

        {/* Security Log */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Recent Security Activity</h4>
          
          <div className="space-y-2">
            {securityLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    log.status === 'Success' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{log.action}</div>
                    <div className="text-xs text-gray-500">IP: {log.ip}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{log.time}</div>
                  <div className={`text-xs font-medium ${
                    log.status === 'Success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {log.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Security Recommendation</p>
              <p>Enable two-factor authentication and use a strong, unique password to secure your account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecuritySettings