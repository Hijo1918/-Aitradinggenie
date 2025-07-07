const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  action: String, // BUY/SELL
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);
