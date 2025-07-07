const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");
require("dotenv").config();

const abiPath = path.resolve(__dirname, "abi", "Aitradinggenie.json");
const abi = JSON.parse(fs.readFileSync(abiPath)).abi;

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);

module.exports = contract;
