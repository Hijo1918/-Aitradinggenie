// /.netlify/functions/getPrice.js
exports.handler = async () => {
  // Simulated price — replace with real logic
  const price = (Math.random() * 1000).toFixed(2);

  return {
    statusCode: 200,
    body: JSON.stringify({ price }),
  };
};
