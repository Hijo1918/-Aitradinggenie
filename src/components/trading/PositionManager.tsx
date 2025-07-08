import React, { useState } from 'react'
import { X, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

interface Position {
  id: string
  symbol: string
  side: 'LONG' | 'SHORT'
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  margin: number
}

const PositionManager: React.FC = () => {
  const [positions] = useState<Position[]>([
    {
      id: '1',
      symbol: 'BTC/USDT',
      side: 'LONG',
      size: 0.025,
      entryPrice: 43180.50,
      currentPrice: 43250.80,
      pnl: 125.30,
      pnlPercent: 2.85,
      margin: 1000,
    },
    {
      id: '2',
      symbol: 'ETH/USDT',
      side: 'SHORT',
      size: 1.5,
      entryPrice: 2645.80,
      currentPrice: 2620.40,
      pnl: 38.10,
      pnlPercent: 1.44,
      margin: 800,
    },
    {
      id: '3',
      symbol: 'ADA/USDT',
      side: 'LONG',
      size: 1000,
      entryPrice: 0.482,
      currentPrice: 0.475,
      pnl: -7.00,
      pnlPercent: -1.45,
      margin: 200,
    },
  ])

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0)
  const totalMargin = positions.reduce((sum, pos) => sum + pos.margin, 0)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Open Positions</h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-gray-600">Total P&L: </span>
            <span className={`font-medium ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Total Margin: </span>
            <span className="font-medium text-gray-900">${totalMargin.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No open positions</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Side</th>
                <th>Size</th>
                <th>Entry Price</th>
                <th>Current Price</th>
                <th>P&L</th>
                <th>Margin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.id} className="hover:bg-gray-50">
                  <td className="font-medium">{position.symbol}</td>
                  <td>
                    <div className="flex items-center space-x-1">
                      {position.side === 'LONG' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        position.side === 'LONG' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {position.side}
                      </span>
                    </div>
                  </td>
                  <td>{position.size}</td>
                  <td>${position.entryPrice.toLocaleString()}</td>
                  <td>${position.currentPrice.toLocaleString()}</td>
                  <td>
                    <div className={`${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <div className="font-medium">
                        {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                      </div>
                      <div className="text-xs">
                        ({position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%)
                      </div>
                    </div>
                  </td>
                  <td>${position.margin.toLocaleString()}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button className="btn btn-secondary text-xs px-2 py-1">
                        Modify
                      </button>
                      <button className="btn btn-danger text-xs px-2 py-1">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PositionManager