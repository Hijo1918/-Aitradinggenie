import React, { useState, useEffect } from 'react'

interface OrderBookEntry {
  price: number
  amount: number
  total: number
}

const OrderBook: React.FC = () => {
  const [bids, setBids] = useState<OrderBookEntry[]>([])
  const [asks, setAsks] = useState<OrderBookEntry[]>([])
  const [spread, setSpread] = useState(0)

  useEffect(() => {
    // Generate mock order book data
    const generateOrderBook = () => {
      const basePrice = 43250
      const newBids: OrderBookEntry[] = []
      const newAsks: OrderBookEntry[] = []

      // Generate bids (buy orders)
      for (let i = 0; i < 10; i++) {
        const price = basePrice - (i + 1) * 5
        const amount = Math.random() * 2 + 0.1
        const total = price * amount
        newBids.push({ price, amount, total })
      }

      // Generate asks (sell orders)
      for (let i = 0; i < 10; i++) {
        const price = basePrice + (i + 1) * 5
        const amount = Math.random() * 2 + 0.1
        const total = price * amount
        newAsks.push({ price, amount, total })
      }

      setBids(newBids)
      setAsks(newAsks)
      setSpread(newAsks[0]?.price - newBids[0]?.price || 0)
    }

    generateOrderBook()
    const interval = setInterval(generateOrderBook, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Order Book</h3>
        <div className="text-sm text-gray-600">
          Spread: ${spread.toFixed(2)}
        </div>
      </div>

      <div className="space-y-4">
        {/* Asks (Sell Orders) */}
        <div>
          <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-500 mb-2">
            <span>Price (USDT)</span>
            <span className="text-right">Amount (BTC)</span>
            <span className="text-right">Total</span>
          </div>
          <div className="space-y-1">
            {asks.slice(0, 5).reverse().map((ask, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-red-50 rounded">
                <span className="text-red-600 font-medium">{ask.price.toLocaleString()}</span>
                <span className="text-right text-gray-900">{ask.amount.toFixed(4)}</span>
                <span className="text-right text-gray-600">{ask.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Price */}
        <div className="py-2 text-center border-t border-b border-gray-200">
          <div className="text-lg font-bold text-gray-900">
            ${bids[0]?.price.toLocaleString() || '43,250'}
          </div>
          <div className="text-xs text-gray-500">Last Price</div>
        </div>

        {/* Bids (Buy Orders) */}
        <div>
          <div className="space-y-1">
            {bids.slice(0, 5).map((bid, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-green-50 rounded">
                <span className="text-green-600 font-medium">{bid.price.toLocaleString()}</span>
                <span className="text-right text-gray-900">{bid.amount.toFixed(4)}</span>
                <span className="text-right text-gray-600">{bid.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderBook