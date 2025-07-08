import React, { useState } from 'react'
import { Shield, AlertTriangle, Settings } from 'lucide-react'

const RiskManagement: React.FC = () => {
  const [riskSettings, setRiskSettings] = useState({
    maxRiskPerTrade: 2,
    maxDailyLoss: 5,
    stopLossPercent: 3,
    takeProfitPercent: 6,
    maxOpenPositions: 5,
  })

  const handleSettingChange = (key: string, value: number) => {
    setRiskSettings(prev => ({ ...prev, [key]: value }))
  }

  const riskMetrics = [
    { label: 'Daily Risk Used', value: '2.8%', max: '5%', color: 'green' },
    { label: 'Open Positions', value: '3', max: '5', color: 'blue' },
    { label: 'Portfolio Risk', value: '12.5%', max: '20%', color: 'yellow' },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Risk Management</h3>
        </div>
        <Settings className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-6">
        {/* Risk Metrics */}
        <div className="space-y-3">
          {riskMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{metric.label}</span>
                <span className="font-medium">{metric.value} / {metric.max}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    metric.color === 'green' ? 'bg-green-500' :
                    metric.color === 'blue' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${(parseFloat(metric.value) / parseFloat(metric.max)) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Risk Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Risk Parameters</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Max Risk Per Trade (%)
              </label>
              <input
                type="number"
                value={riskSettings.maxRiskPerTrade}
                onChange={(e) => handleSettingChange('maxRiskPerTrade', parseFloat(e.target.value))}
                className="input text-sm"
                min="0.1"
                max="10"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Max Daily Loss (%)
              </label>
              <input
                type="number"
                value={riskSettings.maxDailyLoss}
                onChange={(e) => handleSettingChange('maxDailyLoss', parseFloat(e.target.value))}
                className="input text-sm"
                min="1"
                max="20"
                step="0.5"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Stop Loss (%)
              </label>
              <input
                type="number"
                value={riskSettings.stopLossPercent}
                onChange={(e) => handleSettingChange('stopLossPercent', parseFloat(e.target.value))}
                className="input text-sm"
                min="0.5"
                max="10"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Take Profit (%)
              </label>
              <input
                type="number"
                value={riskSettings.takeProfitPercent}
                onChange={(e) => handleSettingChange('takeProfitPercent', parseFloat(e.target.value))}
                className="input text-sm"
                min="1"
                max="20"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Risk Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Risk Alert</p>
              <p>Portfolio risk is approaching daily limit. Consider reducing position sizes.</p>
            </div>
          </div>
        </div>

        <button className="w-full btn btn-primary">
          Save Risk Settings
        </button>
      </div>
    </div>
  )
}

export default RiskManagement