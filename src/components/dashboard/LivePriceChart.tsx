import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const LivePriceChart: React.FC = () => {
  const [data, setData] = useState<Array<{ time: string; price: number }>>([])
  const [currentPrice, setCurrentPrice] = useState(43250.50)
  const [priceChange, setPriceChange] = useState(0)

  useEffect(() => {
    // Generate initial data
    const initialData = Array.from({ length: 50 }, (_, i) => ({
      time: new Date(Date.now() - (49 - i) * 60000).toLocaleTimeString(),
      price: 43000 + Math.random() * 1000,
    }))
    setData(initialData)

    // Simulate real-time price updates
    const interval = setInterval(() => {
      const newPrice = currentPrice + (Math.random() - 0.5) * 100
      const change = newPrice - currentPrice
      
      setCurrentPrice(newPrice)
      setPriceChange(change)
      
      setData(prev => {
        const newData = [...prev.slice(1), {
          time: new Date().toLocaleTimeString(),
          price: newPrice,
        }]
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [currentPrice])

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">BTC/USDT</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">
              ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`text-sm font-medium px-2 py-1 rounded ${
              priceChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default LivePriceChart