import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Target, Shield, Clock, Star } from 'lucide-react'
import { tradingAPI } from '../lib/supabase'
import { motion } from 'framer-motion'

const TradingSignals = () => {
  const [signals, setSignals] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSignal, setSelectedSignal] = useState(null)

  useEffect(() => {
    fetchSignals()
    const interval = setInterval(fetchSignals, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchSignals = async () => {
    try {
      const response = await tradingAPI.getSignals()
      setSignals(response.signals || [])
    } catch (error) {
      console.error('Error fetching signals:', error)
    } finally {
      setLoading(false)
    }
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100'
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getActionIcon = (action) => {
    return action === 'buy' ? TrendingUp : TrendingDown
  }

  const getActionColor = (action) => {
    return action === 'buy' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Star className="w-5 h-5 mr-2 text-blue-600" />
            AI Trading Signals
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {signals.map((signal, index) => {
            const ActionIcon = getActionIcon(signal.action)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedSignal(signal)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getActionColor(signal.action)}`}>
                      <ActionIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{signal.symbol}</h3>
                      <p className="text-sm text-gray-600 capitalize">{signal.action} Signal</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getConfidenceColor(signal.confidence)}`}>
                    {Math.round(signal.confidence * 100)}% Confidence
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-gray-600">Target: ${signal.target_price?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-red-600" />
                    <span className="text-gray-600">Stop Loss: ${signal.stop_loss?.toLocaleString()}</span>
                  </div>
                </div>

                {signal.reasoning && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">{signal.reasoning}</p>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    Generated just now
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Execute Trade
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {signals.length === 0 && (
          <div className="text-center py-8">
            <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No active signals at the moment</p>
            <p className="text-sm text-gray-500 mt-2">Our AI is analyzing the market...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TradingSignals
