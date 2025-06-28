const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
  profitAmount: Number,
  profitCurrency: String,
  amountBtc: Number,
  txid: String,
  toAddress: String,
  timestamp: Number
});

module.exports = mongoose.model('Payout', payoutSchema);
