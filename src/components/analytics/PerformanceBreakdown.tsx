import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const PerformanceBreakdown: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', profit: 1250, trades: 45 },
    { month: 'Feb', profit: 890, trades: 38 },
    { month: 'Mar', profit: 1680, trades: 52 },
    { month: 'Apr', profit: 2100, trades: 61 },
    { month: 'May', profit: 1450, trades: 47 },
    { month: 'Jun', profit: 1920, trades: 55 },
  ]

  const assetData = [
    { name: 'BTC', value: 45, profit: 3200 },
    { name: 'ETH', value: 30, profit: 2100 },
    { name: 'ADA', value: 15, profit: 890 },
    { name: 'SOL', value: 10, profit: 650 },
  ]

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
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
                formatter={(value: number, name: string) => [
                  name === 'profit' ? `$${value}` : value,
                  name === 'profit' ? 'Profit' : 'Trades'
                ]}
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

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assetData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {assetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}% ($${props.payload.profit})`,
                  props.payload.name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          {assetData.map((asset, index) => (
            <div key={asset.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span className="text-sm font-medium text-gray-900">{asset.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{asset.value}%</div>
                <div className="text-xs text-gray-600">${asset.profit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PerformanceBreakdown