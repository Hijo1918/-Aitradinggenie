const axios = require('axios');
const Trade = require('../models/Trade');
const { executeSmartContractTrade } = require('./smartContract');

const PORTFOLIO_BALANCE = 1000;
const RISK_PERCENT = 0.4;
const RRR = 7 / 2;
const MIN_RRR = 3.5;

function calculateTradeSizing(entryPrice, stopLossPrice, side = "long") {
  const riskAmount = PORTFOLIO_BALANCE * RISK_PERCENT;
  const riskPerUnit = Math.abs(entryPrice - stopLossPrice);
  const positionSize = riskPerUnit === 0 ? 0 : riskAmount / riskPerUnit;

  let takeProfitPrice;
  if (side === "long") {
    takeProfitPrice = entryPrice + (RRR * (entryPrice - stopLossPrice));
  } else {
    takeProfitPrice = entryPrice - (RRR * (stopLossPrice - entryPrice));
  }

  const rewardPerUnit = Math.abs(takeProfitPrice - entryPrice);
  const riskToReward = rewardPerUnit / riskPerUnit;

  return {
    positionSize,
    riskAmount,
    entryPrice,
    stopLossPrice,
    takeProfitPrice,
    riskToReward,
    side
  };
}

function detectTrend(closes) {
  const avg = closes.reduce((a, b) => a + b, 0) / closes.length;
  const last = closes[closes.length - 1];
  if (last > avg) return "long";
  if (last < avg) return "short";
  return "none";
}

async function fetchFuturesKlines(symbol, interval = "15m", limit = 100) {
  const url = `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const { data } = await axios.get(url);
  return data.map(k => ({
    open: parseFloat(k[1]),
    high: parseFloat(k[2]),
    low: parseFloat(k[3]),
    close: parseFloat(k[4]),
    time: k[0]
  }));
}

async function executeTrade({ symbol }) {
  const klines = await fetchFuturesKlines(symbol, "15m", 100);
  const closes = klines.map(k => k.close);
  const highs = klines.map(k => k.high);
  const lows = klines.map(k => k.low);

  const trend = detectTrend(closes.slice(-24));
  if (trend === "none") throw new Error("No trend detected");

  const entryPrice = closes[closes.length - 1];
  let stopLossPrice = trend === "long" ? Math.min(...lows.slice(-12)) : Math.max(...highs.slice(-12));
  const trade = calculateTradeSizing(entryPrice, stopLossPrice, trend);

  if (trade.riskToReward < MIN_RRR) throw new Error("RRR too low");

  // Interact with smart contract
  const scResult = await executeSmartContractTrade(symbol, trade);

  // Save trade to DB
  const saved = await Trade.create({
    symbol,
    side: trend,
    entryPrice,
    stopLossPrice,
    takeProfitPrice: trade.takeProfitPrice,
    positionSize: trade.positionSize,
    riskToReward: trade.riskToReward,
    scTx: scResult.txHash,
    timestamp: Date.now()
  });

  return saved;
}

async function getTradeHistory() {
  return Trade.find().sort({ timestamp: -1 }).limit(50);
}

module.exports = { executeTrade, getTradeHistory };
