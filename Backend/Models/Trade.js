const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  symbol: String,
  side: String,
  entryPrice: Number,
  stopLossPrice: Number,
  takeProfitPrice: Number,
  positionSize: Number,
  riskToReward: Number,
  scTx: String,
  timestamp: Number
});

module.exports = mongoose.model('Trade', tradeSchema);
