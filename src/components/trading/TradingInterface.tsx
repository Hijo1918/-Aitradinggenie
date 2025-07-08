import React, { useState } from 'react'
import { Play, Pause, Settings, TrendingUp, TrendingDown } from 'lucide-react'

const TradingInterface: React.FC = () => {
  const [isAutoTrading, setIsAutoTrading] = useState(true)
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USDT')
  const [tradeAmount, setTradeAmount] = useState('1000')

  const symbols = ['BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'SOL/USDT', 'DOT/USDT']

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Auto Trading Control</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAutoTrading ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isAutoTrading ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trading Pair
            </label>
            <select 
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="input"
            >
              {symbols.map(symbol => (
                <option key={symbol} value={symbol}>{symbol}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trade Amount (USDT)
            </label>
            <input
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
              className="input"
              placeholder="Enter amount"
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setIsAutoTrading(!isAutoTrading)}
              className={`flex-1 btn ${isAutoTrading ? 'btn-danger' : 'btn-success'}`}
            >
              {isAutoTrading ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Auto Trading
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Auto Trading
                </>
              )}
            </button>
            <button className="btn btn-secondary">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Manual Trading</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <button className="btn btn-success flex items-center justify-center space-x-2 py-4">
            <TrendingUp className="w-5 h-5" />
            <span>Buy Long</span>
          </button>
          <button className="btn btn-danger flex items-center justify-center space-x-2 py-4">
            <TrendingDown className="w-5 h-5" />
            <span>Sell Short</span>
          </button>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Manual trades will override auto trading signals for this pair.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TradingInterface