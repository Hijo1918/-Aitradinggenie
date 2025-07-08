import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PerformanceMetrics: React.FC = () => {
  const data = [
    { day: 'Mon', profit: 120, trades: 8 },
    { day: 'Tue', profit: 85, trades: 6 },
    { day: 'Wed', profit: 200, trades: 12 },
    { day: 'Thu', profit: -45, trades: 4 },
    { day: 'Fri', profit: 180, trades: 10 },
    { day: 'Sat', profit: 95, trades: 7 },
    { day: 'Sun', profit: 145, trades: 9 },
  ]

  const metrics = [
    { label: 'Total Trades', value: '156', change: '+12' },
    { label: 'Win Rate', value: '73.2%', change: '+2.1%' },
    { label: 'Avg Profit', value: '$45.80', change: '+$5.20' },
    { label: 'Max Drawdown', value: '8.5%', change: '-1.2%' },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">{metric.label}</div>
            <div className="text-lg font-bold text-gray-900">{metric.value}</div>
            <div className={`text-xs ${
              metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change} vs last period
            </div>
          </div>
        ))}
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Bar 
              dataKey="profit" 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PerformanceMetrics