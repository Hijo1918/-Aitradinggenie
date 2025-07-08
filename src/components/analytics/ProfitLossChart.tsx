import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const ProfitLossChart: React.FC = () => {
  const data = [
    { date: '2024-01-01', cumulative: 0, daily: 0 },
    { date: '2024-01-02', cumulative: 150, daily: 150 },
    { date: '2024-01-03', cumulative: 280, daily: 130 },
    { date: '2024-01-04', cumulative: 220, daily: -60 },
    { date: '2024-01-05', cumulative: 380, daily: 160 },
    { date: '2024-01-06', cumulative: 450, daily: 70 },
    { date: '2024-01-07', cumulative: 520, daily: 70 },
    { date: '2024-01-08', cumulative: 680, daily: 160 },
    { date: '2024-01-09', cumulative: 620, daily: -60 },
    { date: '2024-01-10', cumulative: 780, daily: 160 },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Profit & Loss Chart</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Cumulative P&L</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Daily P&L</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value: number, name: string) => [
                `$${value.toFixed(2)}`,
                name === 'cumulative' ? 'Cumulative P&L' : 'Daily P&L'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="cumulative" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: '#3b82f6' }}
            />
            <Line 
              type="monotone" 
              dataKey="daily" 
              stroke="#22c55e" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, fill: '#22c55e' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProfitLossChart