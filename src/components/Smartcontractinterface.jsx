import React, { useState, useEffect } from 'react'
import {
  Zap, Shield, DollarSign, TrendingUp, ExternalLink, Copy
} from 'lucide-react'
import { smartContractAPI } from '../lib/supabase'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const SmartContractInterface = () => {
  const [contractData, setContractData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [contractAddress] = useState('0x723625146dD74dBc85b3679104B9fcbCd5a9756b')
  const [userAddress] = useState('0x8ba1f109551bD432803012645fac136c')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  useEffect(() => {
    fetchContractData()
  }, [])

  const fetchContractData = async () => {
    if (!contractAddress || !userAddress) return

    try {
      setLoading(true)
      const balance = await smartContractAPI.getContractBalance(contractAddress, userAddress)
      const events = await smartContractAPI.getContractEvents(contractAddress)

      setContractData({
        balance,
        events: events?.events || []
      })
    } catch (error) {
      console.error('Error fetching contract data:', error)
      toast.error('Failed to fetch contract data')
    } finally {
      setLoading(false)
    }
  }

  const handleWithdrawProfits = async () => {
    if (!withdrawAmount || isNaN(withdrawAmount)) {
      toast.error('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      const result = await smartContractAPI.withdrawProfits(
        contractAddress,
        userAddress,
        parseFloat(withdrawAmount)
      )

      if (result?.success) {
        toast.success(`Successfully withdrew $${withdrawAmount}`)
        setWithdrawAmount('')
        fetchContractData()
      } else {
        toast.error('Withdrawal failed')
      }
    } catch (error) {
      console.error('Error withdrawing profits:', error)
      toast.error('Withdrawal failed')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const formatAddress = (address) => {
    if (!address || address.length < 10) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-600" />
          Smart Contract Interface
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Interact with AI Trading Genie smart contracts on the blockchain
        </p>
      </div>

      <div className="p-6">
        {/* Contract Info */}
        <div className="mb-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">Contract Address</span>
            <button
              onClick={() => copyToClipboard(contractAddress)}
              className="p-1 text-blue-600 hover:bg-blue-100 rounded"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <code className="text-sm text-blue-800 bg-blue-100 px-2 py-1 rounded">
              {formatAddress(contractAddress)}
            </code>
            <a
              href={`https://etherscan.io/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Balance Overview */}
        {contractData?.balance && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Total Balance</p>
                  <p className="text-2xl font-bold text-green-900">
                    ${contractData.balance.totalBalance.toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-purple-50 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Pending Profits</p>
                  <p className="text-2xl font-bold text-purple-900">
                    ${contractData.balance.pendingProfits.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Withdraw Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdraw Profits</h3>
          <div className="flex space-x-3">
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Amount to withdraw"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleWithdrawProfits}
              disabled={loading || !withdrawAmount}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Withdrawal fee: 1% • Gas fees apply
          </p>
        </div>

        {/* Recent Events */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Recent Contract Events
          </h3>

          {contractData?.events?.length > 0 ? (
            <div className="space-y-3">
              {contractData.events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      event.event === 'TradeExecuted' ? 'bg-green-100 text-green-700' :
                      event.event === 'ProfitDistributed' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {event.event}
                    </span>
                    <span className="text-xs text-gray-500">
                      Block #{event.blockNumber}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700">
                    {event.event === 'TradeExecuted' && (
                      <p>
                        Trade executed: {event.args.symbol} • 
                        Amount: ${event.args.amount} • 
                        Profit: ${event.args.profit}
                      </p>
                    )}
                    {event.event === 'ProfitDistributed' && (
                      <p>
                        Profit distributed: ${event.args.amount} to {formatAddress(event.args.user)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                    <a
                      href={`https://etherscan.io/tx/${event.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-xs flex items-center"
                    >
                      View on Etherscan
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No recent contract events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SmartContractInterface
