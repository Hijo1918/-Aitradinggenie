import React, { useState } from 'react'
import { Key, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

const ApiSettings: React.FC = () => {
  const [showApiKey, setShowApiKey] = useState(false)
  const [showSecretKey, setShowSecretKey] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('connected')
  
  const [apiSettings, setApiSettings] = useState({
    exchange: 'binance',
    apiKey: 'pk_test_51234567890abcdef',
    secretKey: 'sk_test_09876543210fedcba',
    testMode: true,
  })

  const handleTest = () => {
    setConnectionStatus('testing')
    setTimeout(() => {
      setConnectionStatus('connected')
    }, 2000)
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Key className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">API Settings</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exchange
          </label>
          <select 
            value={apiSettings.exchange}
            onChange={(e) => setApiSettings(prev => ({ ...prev, exchange: e.target.value }))}
            className="input"
          >
            <option value="binance">Binance</option>
            <option value="coinbase">Coinbase Pro</option>
            <option value="kraken">Kraken</option>
            <option value="bybit">Bybit</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiSettings.apiKey}
              onChange={(e) => setApiSettings(prev => ({ ...prev, apiKey: e.target.value }))}
              className="input pr-10"
              placeholder="Enter your API key"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showApiKey ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secret Key
          </label>
          <div className="relative">
            <input
              type={showSecretKey ? 'text' : 'password'}
              value={apiSettings.secretKey}
              onChange={(e) => setApiSettings(prev => ({ ...prev, secretKey: e.target.value }))}
              className="input pr-10"
              placeholder="Enter your secret key"
            />
            <button
              type="button"
              onClick={() => setShowSecretKey(!showSecretKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showSecretKey ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="testMode"
            checked={apiSettings.testMode}
            onChange={(e) => setApiSettings(prev => ({ ...prev, testMode: e.target.checked }))}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="testMode" className="text-sm text-gray-700">
            Use test/sandbox environment
          </label>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            {connectionStatus === 'connected' ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-green-600 font-medium">Connected</span>
              </>
            ) : connectionStatus === 'testing' ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-primary-600 font-medium">Testing...</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm text-red-600 font-medium">Disconnected</span>
              </>
            )}
          </div>
          
          <div className="space-x-2">
            <button onClick={handleTest} className="btn btn-secondary">
              Test Connection
            </button>
            <button className="btn btn-primary">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiSettings