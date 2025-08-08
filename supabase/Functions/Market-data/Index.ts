import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  timestamp: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const path = url.pathname.replace('/functions/v1/market-data', '')

    switch (path) {
      case '/prices':
        return await getCurrentPrices(req)
      case '/historical':
        return await getHistoricalData(req)
      case '/orderbook':
        return await getOrderBook(req)
      case '/trades':
        return await getRecentTrades(req)
      default:
        return new Response('Not Found', { status: 404, headers: corsHeaders })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function getCurrentPrices(req: Request) {
  // Mock market data (replace with actual API calls to Binance, CoinGecko, etc.)
  const marketData: MarketData[] = [
    {
      symbol: 'BTC/USD',
      price: 42350.50,
      change24h: 2.4,
      volume24h: 28500000000,
      marketCap: 830000000000,
      timestamp: new Date().toISOString()
    },
    {
      symbol: 'ETH/USD',
      price: 2890.75,
      change24h: -1.2,
      volume24h: 15200000000,
      marketCap: 347000000000,
      timestamp: new Date().toISOString()
    },
    {
      symbol: 'ADA/USD',
      price: 0.45,
      change24h: 5.7,
      volume24h: 850000000,
      marketCap: 15800000000,
      timestamp: new Date().toISOString()
    },
    {
      symbol: 'SOL/USD',
      price: 98.20,
      change24h: 3.1,
      volume24h: 2100000000,
      marketCap: 42000000000,
      timestamp: new Date().toISOString()
    }
  ]

  return new Response(JSON.stringify({ data: marketData }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function getHistoricalData(req: Request) {
  const url = new URL(req.url)
  const symbol = url.searchParams.get('symbol') || 'BTC/USD'
  const interval = url.searchParams.get('interval') || '1h'
  const limit = parseInt(url.searchParams.get('limit') || '100')

  // Generate mock historical data
  const historicalData = []
  const basePrice = 42000
  let currentPrice = basePrice

  for (let i = limit; i > 0; i--) {
    const timestamp = new Date(Date.now() - i * 60 * 60 * 1000).toISOString()
    const change = (Math.random() - 0.5) * 1000
    currentPrice += change
    
    historicalData.push({
      timestamp,
      open: currentPrice - change,
      high: currentPrice + Math.random() * 500,
      low: currentPrice - Math.random() * 500,
      close: currentPrice,
      volume: Math.random() * 1000000
    })
  }

  return new Response(JSON.stringify({ 
    symbol,
    interval,
    data: historicalData 
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function getOrderBook(req: Request) {
  const url = new URL(req.url)
  const symbol = url.searchParams.get('symbol') || 'BTC/USD'

  // Mock order book data
  const orderBook = {
    symbol,
    bids: Array.from({ length: 20 }, (_, i) => [
      42000 - i * 10,
      Math.random() * 5
    ]),
    asks: Array.from({ length: 20 }, (_, i) => [
      42000 + i * 10,
      Math.random() * 5
    ]),
    timestamp: new Date().toISOString()
  }

  return new Response(JSON.stringify(orderBook), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function getRecentTrades(req: Request) {
  const url = new URL(req.url)
  const symbol = url.searchParams.get('symbol') || 'BTC/USD'
  const limit = parseInt(url.searchParams.get('limit') || '50')

  // Mock recent trades
  const trades = Array.from({ length: limit }, (_, i) => ({
    id: `trade_${Date.now()}_${i}`,
    price: 42000 + (Math.random() - 0.5) * 1000,
    quantity: Math.random() * 2,
    side: Math.random() > 0.5 ? 'buy' : 'sell',
    timestamp: new Date(Date.now() - i * 1000).toISOString()
  }))

  return new Response(JSON.stringify({
    symbol,
    trades
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}
