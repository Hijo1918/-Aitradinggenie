// /.netlify/functions/tradeSignal.js
exports.handler = async () => {
  const signals = ['BUY', 'SELL', 'HOLD'];
  const signal = signals[Math.floor(Math.random() * signals.length)];

  return {
    statusCode: 200,
    body: JSON.stringify({ signal }),
  };
};
