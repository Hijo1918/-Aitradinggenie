const axios = require("axios");
const Payout = require('../models/Payout');
const { adminBTCWallet } = require("../config");

async function convertToBTC(amount, currency = "USDT") {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    { params: { ids: "bitcoin," + currency.toLowerCase(), vs_currencies: "usd" } }
  );
  let btcUsd = data.bitcoin.usd;
  let currUsd = data[currency.toLowerCase()]?.usd || 1;
  let amountUsd = amount * currUsd;
  let amountBtc = amountUsd / btcUsd;
  return Number(amountBtc.toFixed(8));
}

async function sendBTC(amountBtc, toAddress = adminBTCWallet) {
  console.log(`[ADMIN BTC PAYOUT] Sending ${amountBtc} BTC to ${toAddress}`);
  return { txid: "demo-txid", amountBtc, toAddress };
}

async function payoutAdminProfit(profitAmount, profitCurrency) {
  const amountBtc = await convertToBTC(profitAmount, profitCurrency);
  const tx = await sendBTC(amountBtc, adminBTCWallet);
  const saved = await Payout.create({
    profitAmount,
    profitCurrency,
    amountBtc,
    txid: tx.txid,
    toAddress: tx.toAddress,
    timestamp: Date.now()
  });
  return saved;
}

async function getPayoutLogs() {
  return Payout.find().sort({ timestamp: -1 }).limit(50);
}

module.exports = { payoutAdminProfit, getPayoutLogs };
