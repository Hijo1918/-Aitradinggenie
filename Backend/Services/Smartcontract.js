const { ethers } = require('ethers');
const fs = require('fs');
const {
  ethRpcUrl,
  contractAddress,
  privateKey,
  contractAbiPath
} = require('../config');

const abi = JSON.parse(fs.readFileSync(contractAbiPath));
const provider = new ethers.JsonRpcProvider(ethRpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

async function executeSmartContractTrade(symbol, trade) {
  const tx = await contract.executeTrade(
    symbol,
    trade.side,
    ethers.parseUnits(trade.positionSize.toFixed(6), 6),
    ethers.parseUnits(trade.entryPrice.toFixed(2), 6),
    ethers.parseUnits(trade.stopLossPrice.toFixed(2), 6),
    ethers.parseUnits(trade.takeProfitPrice.toFixed(2), 6)
  );
  await tx.wait();
  return { txHash: tx.hash };
}

module.exports = { executeSmartContractTrade };
