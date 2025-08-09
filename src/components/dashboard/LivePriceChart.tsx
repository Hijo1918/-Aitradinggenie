import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, RefreshCw } from 'lucide-react'

interface PriceData {
  time: string
  price: number
  volume: number
}

const LivePriceChart: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USDT')
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [currentPrice, setCurrentPrice] = useState(43250.50)
  const [priceChange, setPriceChange] = useState(2.4)
  const [loading, setLoading] = useState(false)

  const symbols = ['BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'SOL/USDT']

  useEffect(() => {
    generateMockData()
    const interval = setInterval(() => {
      updatePrice()
    }, 2000)

    return () => clearInterval(interval)
  }, [selectedSymbol])

  const generateMockData = () => {
    const data: PriceData[] = []
    let basePrice = 43250
    
    for (let i = 0; i < 24; i++) {
      const time = new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toLocaleTimeString()
      basePrice += (Math.random() - 0.5) * 1000
      data.push({
        time,
        price: basePrice,
        volume: Math.random() * 1000000
      })
    }
    
    setPriceData(data)
    setCurrentPrice(basePrice)
  }

  const updatePrice = () => {
    const change = (Math.random() - 0.5) * 500
    const newPrice = currentPrice + change
    const changePercent = (change / currentPrice) * 100
    
    setCurrentPrice(newPrice)
    setPriceChange(changePercent)
    
    setPriceData(prev => [
      ...prev.slice(1),
      {
        time: new Date().toLocaleTimeString(),
        price: newPrice,
        volume: Math.random() * 1000000
      }
    ])
  }

  const refreshData = () => {
    setLoading(true)
    setTimeout(() => {
      generateMockData()
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Live Price Chart
          </h3>
          <div className="flex items-center space-x-3">
            <select 
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {symbols.map(symbol => (
                <option key={symbol} value={symbol}>{symbol}</option>
              ))}
            </select>
            <button
              onClick={refreshData}
              disabled={loading}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-gray-900">
            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`flex items-center px-3 py-1 rounded-lg text-sm font-medium ${
            priceChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {priceChange >= 0 ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium">Interactive Price Chart</p>
            <p className="text-sm text-gray-500 mt-2">
              Real-time price data for {selectedSymbol}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-900">24h High</div>
                <div className="text-green-600">${(currentPrice * 1.05).toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">24h Low</div>
                <div className="text-red-600">${(currentPrice * 0.95).toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">Volume</div>
                <div className="text-blue-600">{(Math.random() * 1000).toFixed(0)}M</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LivePriceChart