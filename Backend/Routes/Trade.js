const express = require('express');
const { executeTrade, getTradeHistory } = require('../services/strategy');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/execute', auth, async (req, res) => {
  try {
    const result = await executeTrade(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const history = await getTradeHistory();
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
