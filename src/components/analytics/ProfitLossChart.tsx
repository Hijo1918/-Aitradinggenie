import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

interface ChartData {
  date: string
  cumulative: number
  daily: number
}

const ProfitLossChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState('7d')
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    generateChartData()
  }, [timeframe])

  const generateChartData = () => {
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90
    const chartData: ChartData[] = []
    let cumulative = 0

    for (let i = 0; i < days; i++) {
      const date = new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000)
      const daily = (Math.random() - 0.4) * 500 // Slight positive bias
      cumulative += daily

      chartData.push({
        date: date.toLocaleDateString(),
        cumulative,
        daily
      })
    }

    setData(chartData)
  }

  const totalProfit = data.length > 0 ? data[data.length - 1].cumulative : 0
  const todayProfit = data.length > 0 ? data[data.length - 1].daily : 0
  const winRate = data.filter(d => d.daily > 0).length / data.length * 100

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Profit & Loss Chart
          </h3>
          <div className="flex space-x-2">
            {['7d', '30d', '90d'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600">Total P&L</div>
            <div className={`text-xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Today's P&L</div>
            <div className={`text-xl font-bold ${todayProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {todayProfit >= 0 ? '+' : ''}${todayProfit.toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Win Rate</div>
            <div className="text-xl font-bold text-blue-600">
              {winRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium">P&L Chart Visualization</p>
            <p className="text-sm text-gray-500 mt-2">
              Showing {timeframe} performance data
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Cumulative P&L</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Daily P&L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfitLossChart