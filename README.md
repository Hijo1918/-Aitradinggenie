# Aitradinggenie

Aitradinggenie is a full-stack crypto trading bot platform.  
It automates trade execution, risk management, profit splitting (via smart contract), and BTC payouts.

---

## Features

- **Backend** (Node.js/Express/MongoDB):  
  REST API for trade execution, trade history, admin BTC payout.  
  Smart contract integration and risk management.
- **Frontend** (React):  
  Login, dashboard (signals, history, payouts), admin panel.  
  Responsive, mobile-first.
- **Smart Contract** (Solidity):  
  Owner-only trade/profit functions, emits events for audit.
- **Domain config**:  
  Use `https://aitradinggenie.net` for frontend, `https://api.aitradinggenie.net` for backend.

---

## Quickstart

1. **Backend**
   - Copy `.env.example` to `.env` and fill values.
   - `cd backend && npm install && npm start`

2. **Frontend**
   - Set API URL in `.env`.
   - `cd frontend && npm install && npm start`

3. **Contract**
   - Deploy `Aitradinggenie.sol` (e.g. with Hardhat or Remix).
   - Update backend `.env` with contract address and ABI.

4. **Visit**  
   - Frontend: [https://aitradinggenie.net](https://aitradinggenie.net)  
   - Backend API: [https://api.aitradinggenie.net](https://api.aitradinggenie.net)

---

## Directory Layout

```
/backend           # Node.js API server
/frontend          # React frontend
/smart-contract    # Solidity contracts
```

---

## Deployment

- Set all secrets in `.env` files.
- Configure CORS and API URLs for live domains.
- Use Docker, Vercel, or Netlify as desired.
- Set up MongoDB and Ethereum node (Infura/Alchemy).
- Securely store your private keys.

---

## License

MIT
