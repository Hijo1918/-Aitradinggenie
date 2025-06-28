const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { port, mongoUri, corsOrigin } = require('./config');

const tradeRoutes = require('./routes/trade');
const payoutRoutes = require('./routes/payout');
const statusRoutes = require('./routes/status');

const app = express();
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.use('/api/trade', tradeRoutes);
app.use('/api/payout', payoutRoutes);
app.use('/api/status', statusRoutes);

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch(err => console.error('DB Connection error:', err));
