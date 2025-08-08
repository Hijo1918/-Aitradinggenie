
# 🧞‍♂️ AI Trading Genie - Serverless Trading Platform

A modern serverless trading platform leveraging AI, real-time market data, and smart contract integration.

## 🚀 Live

- **Frontend**: [Live Site](https://your-netlify-site.netlify.app/)
- **Backend API**: Supabase Edge Functions
- **Smart Contract**: [0x723625146dD74dBc85b3679104B9fcbCd5a9756b](https://etherscan.io/address/0x723625146dD74dBc85b3679104B9fcbCd5a9756b)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Quick Setup](#quick-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Smart Contracts](#smart-contracts)

## 🌟 Features

- AI Trading Signals
- Real-time Market Data
- Smart Contract Integration
- Portfolio & Risk Management
- Secure Auth (Supabase)
- Responsive Design

## 🛠️ Technology Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Supabase Edge Functions
- **Blockchain**: Ethereum Smart Contracts
- **Deployment**: Netlify, Supabase

## ⚡ Quick Setup

```bash
git clone https://github.com/YOUR_USERNAME/ai-trading-genie.git
cd ai-trading-genie
npm install
cp .env.example .env
npm run dev
```

## 🔐 Environment Variables

### Example `.env`
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_public_anon_key
VITE_CONTRACT_ADDRESS=0x723625146dD74dBc85b3679104B9fcbCd5a9756b
```

## 🚀 Deployment

### Frontend
- Deploy with Netlify or Vercel
- Set environment variables

### Backend
- Use Supabase dashboard to deploy Edge Functions
- Enable Row Level Security and manage access

## 🔒 Smart Contract

- **Address**: `0x723625146dD74dBc85b3679104B9fcbCd5a9756b`
- **Network**: Ethereum
- Functions:
  - Deposit/Withdraw
  - Execute/Settle Trade
  - Profit Distribution

## 📄 License

MIT License
