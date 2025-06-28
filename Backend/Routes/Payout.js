const express = require('express');
const { payoutAdminProfit, getPayoutLogs } = require('../services/btcPayout');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/admin', auth, async (req, res) => {
  try {
    const { profitAmount, profitCurrency } = req.body;
    const tx = await payoutAdminProfit(profitAmount, profitCurrency);
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/logs', auth, async (req, res) => {
  try {
    const logs = await getPayoutLogs();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
