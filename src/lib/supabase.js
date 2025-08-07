import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || `${supabaseUrl}/functions/v1`

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// API Configuration
const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token || supabaseAnonKey}`,
    'apikey': supabaseAnonKey
  }
}

// Enhanced error handling
const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

// Trading API endpoints
export const tradingAPI = {
  baseUrl: `${apiBaseUrl}/trading-api`,
  
  // Execute a trade
  executeTrade: async (tradeData) => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${tradingAPI.baseUrl}/execute-trade`, {
      method: 'POST',
      headers,
      body: JSON.stringify(tradeData)
    })
    return handleApiResponse(response)
  },

  // Get trading signals
  getSignals: async () => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${tradingAPI.baseUrl}/get-signals`, {
      headers
    })
    return handleApiResponse(response)
  },

  // Get trade history
  getTradeHistory: async (userId) => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${tradingAPI.baseUrl}/trade-history?userId=${userId}`, {
      headers
    })
    return handleApiResponse(response)
  },

  // Get portfolio data
  getPortfolio: async (userId) => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${tradingAPI.baseUrl}/portfolio?userId=${userId}`, {
      headers
    })
    return handleApiResponse(response)
  },

  // Get risk analysis
  getRiskAnalysis: async (userId) => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${tradingAPI.baseUrl}/risk-analysis`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ userId })
    })
    return handleApiResponse(response)
  }
}

// Market Data API endpoints
export const marketDataAPI = {
  baseUrl: `${apiBaseUrl}/market-data`,

  // Get current prices
  getCurrentPrices: async () => {
    const response = await fetch(`${marketDataAPI.baseUrl}/prices`, {
      headers: {
        'apikey': supabaseAnonKey
      }
    })
    return handleApiResponse(response)
  },

  // Get historical data
  getHistoricalData: async (symbol, interval = '1h', limit = 100) => {
    const response = await fetch(`${marketDataAPI.baseUrl}/historical?symbol=${symbol}&interval=${interval}&limit=${limit}`, {
      headers: {
        'apikey': supabaseAnonKey
      }
    })
    return handleApiResponse(response)
  },

  // Get order book
  getOrderBook: async (symbol) => {
    const response = await fetch(`${marketDataAPI.baseUrl}/orderbook?symbol=${symbol}`, {
      headers: {
        'apikey': supabaseAnonKey
      }
    })
    return handleApiResponse(response)
  },

  // Get recent trades
  getRecentTrades: async (symbol, limit = 50) => {
    const response = await fetch(`${marketDataAPI.baseUrl}/trades?symbol=${symbol}&limit=${limit}`, {
      headers: {
        'apikey': supabaseAnonKey
      }
    })
    return handleApiResponse(response)
  }
}

// Smart Contract API endpoints
export const smartContractAPI = {
  baseUrl: `${apiBaseUrl}/smart-contract-api`,

  // Deploy contract
  deployContract: async (ownerAddress, initialBalance) => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${smartContractAPI.baseUrl}/deploy-contract`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ownerAddress, initialBalance })
    })
    return handleApiResponse(response)
  },

  // Execute contract trade
  executeContractTrade: async (contractAddress, tradeData, userAddress) => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${smartContractAPI.baseUrl}/execute-trade`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ contractAddress, tradeData, userAddress })
    })
    return handleApiResponse(response)
  },

  // Get contract balance
  getContractBalance: async (contractAddress, userAddress) => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${smartContractAPI.baseUrl}/get-balance?contractAddress=${contractAddress}&userAddress=${userAddress}`, {
      headers
    })
    return handleApiResponse(response)
  },

  // Withdraw profits
  withdrawProfits: async (contractAddress, userAddress, amount) => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${smartContractAPI.baseUrl}/withdraw-profits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ contractAddress, userAddress, amount })
    })
    return handleApiResponse(response)
  },

  // Get contract events
  getContractEvents: async (contractAddress, fromBlock = '0') => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${smartContractAPI.baseUrl}/get-events?contractAddress=${contractAddress}&fromBlock=${fromBlock}`, {
      headers
    })
    return handleApiResponse(response)
  }
}

// Utility functions for API management
export const apiUtils = {
  // Check API health
  async checkHealth() {
    try {
      const response = await fetch(`${apiBaseUrl}/health`, {
        headers: {
          'apikey': supabaseAnonKey
        }
      })
      return response.ok
    } catch (error) {
      console.error('API health check failed:', error)
      return false
    }
  },

  // Get API status
  async getStatus() {
    try {
      const response = await fetch(`${apiBaseUrl}/status`, {
        headers: {
          'apikey': supabaseAnonKey
        }
      })
      return handleApiResponse(response)
    } catch (error) {
      console.error('Failed to get API status:', error)
      return { status: 'error', message: error.message }
    }
  }
}
