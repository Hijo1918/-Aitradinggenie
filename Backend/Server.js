const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const Trade = require('./models/Trade');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// REST: Get latest trades
app.get('/api/trades', async (req, res) => {
  const trades = await Trade.find().sort({ createdAt: -1 }).limit(20);
  res.json(trades);
});

// REST: Add new trade
app.post('/api/trades', async (req, res) => {
  const trade = new Trade(req.body);
  await trade.save();

  // Send to all WebSocket clients
  io.emit('new_trade', trade);
  res.status(201).json(trade);
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
});

server.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
