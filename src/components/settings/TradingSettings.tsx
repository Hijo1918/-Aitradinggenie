import React, { useState } from 'react'
import { Settings, TrendingUp } from 'lucide-react'

const TradingSettings: React.FC = () => {
  const [tradingSettings, setTradingSettings] = useState({
    autoTrading: true,
    maxPositions: 5,
    baseAmount: 1000,
    riskPerTrade: 2,
    stopLoss: 3,
    takeProfit: 6,
    trailingStop: false,
    allowShorts: true,
  })

  const handleSettingChange = (key: string, value: any) => {
    setTradingSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Trading Settings</h3>
      </div>

      <div className="space-y-6">
        {/* Auto Trading Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Auto Trading</h4>
            <p className="text-sm text-gray-600">Enable automated trade execution</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tradingSettings.autoTrading}
              onChange={(e) => handleSettingChange('autoTrading', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        {/* Trading Parameters */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Open Positions
            </label>
            <input
              type="number"
              value={tradingSettings.maxPositions}
              onChange={(e) => handleSettingChange('maxPositions', parseInt(e.target.value))}
              className="input"
              min="1"
              max="20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Trade Amount (USDT)
            </label>
            <input
              type="number"
              value={tradingSettings.baseAmount}
              onChange={(e) => handleSettingChange('baseAmount', parseFloat(e.target.value))}
              className="input"
              min="10"
              step="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Risk Per Trade (%)
            </label>
            <input
              type="number"
              value={tradingSettings.riskPerTrade}
              onChange={(e) => handleSettingChange('riskPerTrade', parseFloat(e.target.value))}
              className="input"
              min="0.1"
              max="10"
              step="0.1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stop Loss (%)
              </label>
              <input
                type="number"
                value={tradingSettings.stopLoss}
                onChange={(e) => handleSettingChange('stopLoss', parseFloat(e.target.value))}
                className="input"
                min="0.5"
                max="20"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Take Profit (%)
              </label>
              <input
                type="number"
                value={tradingSettings.takeProfit}
                onChange={(e) => handleSettingChange('takeProfit', parseFloat(e.target.value))}
                className="input"
                min="1"
                max="50"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Advanced Options</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Trailing Stop Loss</span>
              <p className="text-xs text-gray-500">Automatically adjust stop loss as price moves favorably</p>
            </div>
            <input
              type="checkbox"
              checked={tradingSettings.trailingStop}
              onChange={(e) => handleSettingChange('trailingStop', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Allow Short Positions</span>
              <p className="text-xs text-gray-500">Enable selling assets you don't own</p>
            </div>
            <input
              type="checkbox"
              checked={tradingSettings.allowShorts}
              onChange={(e) => handleSettingChange('allowShorts', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </div>
        </div>

        <button className="w-full btn btn-primary">
          Save Trading Settings
        </button>
      </div>
    </div>
  )
}

export default TradingSettings