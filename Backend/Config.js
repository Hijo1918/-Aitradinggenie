require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  adminBTCWallet: process.env.ADMIN_BTC_ADDRESS,
  ethRpcUrl: process.env.ETH_RPC_URL,
  contractAddress: process.env.SC_CONTRACT_ADDRESS,
  privateKey: process.env.SC_PRIVATE_KEY,
  contractAbiPath: process.env.SC_ABI_PATH,
  corsOrigin: process.env.CORS_ORIGIN
};
