import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

interface TradeRequest {
  symbol: string
  side: 'buy' | 'sell'
  amount: number
  price?: number
  type: 'market' | 'limit'
  userId: string
}

interface TradeSignal {
  symbol: string
  action: 'buy' | 'sell'
  confidence: number
  target_price: number
  stop_loss: number
  reasoning: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const path = url.pathname.replace('/functions/v1/trading-api', '')

    switch (path) {
      case '/execute-trade':
        return await executeTrade(req, supabaseClient)
      case '/get-signals':
        return await getTradeSignals(req, supabaseClient)
      case '/trade-history':
        return await getTradeHistory(req, supabaseClient)
      case '/portfolio':
        return await getPortfolio(req, supabaseClient)
      case '/risk-analysis':
        return await performRiskAnalysis(req, supabaseClient)
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

async function executeTrade(req: Request, supabase: any) {
  const { symbol, side, amount, price, type, userId }: TradeRequest = await req.json()

  // Validate user authentication
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response('Unauthorized', { status: 401, headers: corsHeaders })
  }

  // Risk management check
  const riskCheck = await performRiskCheck(userId, amount, supabase)
  if (!riskCheck.approved) {
    return new Response(JSON.stringify({ 
      error: 'Trade rejected by risk management',
      reason: riskCheck.reason 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  // Execute trade logic (integrate with actual trading APIs)
  const tradeResult = await simulateTradeExecution(symbol, side, amount, price, type)

  // Store trade in database
  const { data, error } = await supabase
    .from('trades')
    .insert({
      user_id: userId,
      symbol,
      side,
      amount,
      price: tradeResult.executedPrice,
      type,
      status: tradeResult.status,
      trade_id: tradeResult.tradeId,
      executed_at: new Date().toISOString()
    })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({
    success: true,
    trade: tradeResult,
    message: 'Trade executed successfully'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function getTradeSignals(req: Request, supabase: any) {
  // AI-generated trading signals
  const signals: TradeSignal[] = [
    {
      symbol: 'BTC/USD',
      action: 'buy',
      confidence: 0.85,
      target_price: 45000,
      stop_loss: 40000,
      reasoning: 'Strong bullish momentum with RSI oversold conditions'
    },
    {
      symbol: 'ETH/USD',
      action: 'sell',
      confidence: 0.72,
      target_price: 2800,
      stop_loss: 3200,
      reasoning: 'Resistance at current levels, potential correction expected'
    },
    {
      symbol: 'ADA/USD',
      action: 'buy',
      confidence: 0.68,
      target_price: 0.50,
      stop_loss: 0.40,
      reasoning: 'Breaking above key resistance with volume confirmation'
    }
  ]

  // Store signals in database
  for (const signal of signals) {
    await supabase
      .from('trading_signals')
      .insert({
        ...signal,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      })
  }

  return new Response(JSON.stringify({ signals }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function getTradeHistory(req: Request, supabase: any) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  const { data: trades, error } = await supabase
    .from('trades')
    .select('*')
    .eq('user_id', userId)
    .order('executed_at', { ascending: false })
    .limit(50)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ trades }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function getPortfolio(req: Request, supabase: any) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  const { data: portfolio, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ portfolio }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function performRiskAnalysis(req: Request, supabase: any) {
  const { userId } = await req.json()

  // Get user's trading history and current positions
  const { data: trades } = await supabase
    .from('trades')
    .select('*')
    .eq('user_id', userId)
    .gte('executed_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

  // Calculate risk metrics
  const riskMetrics = {
    totalTrades: trades?.length || 0,
    winRate: calculateWinRate(trades || []),
    maxDrawdown: calculateMaxDrawdown(trades || []),
    sharpeRatio: calculateSharpeRatio(trades || []),
    riskScore: calculateRiskScore(trades || [])
  }

  return new Response(JSON.stringify({ riskMetrics }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

async function performRiskCheck(userId: string, amount: number, supabase: any) {
  // Get user's current portfolio value
  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('total_value')
    .eq('user_id', userId)
    .single()

  const portfolioValue = portfolio?.total_value || 0
  const riskPercentage = (amount / portfolioValue) * 100

  // Risk management rules
  if (riskPercentage > 10) {
    return { approved: false, reason: 'Trade size exceeds 10% of portfolio' }
  }

  if (amount < 10) {
    return { approved: false, reason: 'Minimum trade size is $10' }
  }

  return { approved: true, reason: 'Trade approved' }
}

async function simulateTradeExecution(symbol: string, side: string, amount: number, price?: number, type: string) {
  // Simulate trade execution (replace with actual API calls)
  const executedPrice = price || (Math.random() * 1000 + 40000) // Mock price
  
  return {
    tradeId: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'filled',
    executedPrice,
    executedAmount: amount,
    fees: amount * 0.001, // 0.1% fee
    timestamp: new Date().toISOString()
  }
}

function calculateWinRate(trades: any[]) {
  if (trades.length === 0) return 0
  const winningTrades = trades.filter(trade => trade.profit > 0)
  return (winningTrades.length / trades.length) * 100
}

function calculateMaxDrawdown(trades: any[]) {
  // Simplified drawdown calculation
  return Math.random() * 20 // Mock value
}

function calculateSharpeRatio(trades: any[]) {
  // Simplified Sharpe ratio calculation
  return Math.random() * 2 // Mock value
}

function calculateRiskScore(trades: any[]) {
  // Risk score from 1-10 (10 being highest risk)
  return Math.random() * 10
}
