# API Documentation

## Base URL
- **Production**: `https://qqveojewxoexrwuxrjsk.supabase.co/functions/v1`
- **Development**: `http://localhost:54321/functions/v1`

## Authentication
All API requests require authentication using Bearer tokens or API keys.

### Headers
```
Authorization: Bearer <your_jwt_token>
apikey: <your_supabase_anon_key>
Content-Type: application/json
```

## Trading API

### Execute Trade
Execute a new trade order.

**Endpoint**: `POST /trading-api/execute-trade`

**Request Body**:
```json
{
  "symbol": "BTC/USD",
  "side": "buy",
  "amount": 1000,
  "price": 42000,
  "type": "limit",
  "userId": "user_uuid"
}
```

**Response**:
```json
{
  "success": true,
  "trade": {
    "tradeId": "trade_123456",
    "status": "filled",
    "executedPrice": 42000,
    "executedAmount": 1000,
    "fees": 1.0
  }
}
```

### Get Trading Signals
Retrieve AI-generated trading signals.

**Endpoint**: `GET /trading-api/get-signals`

**Response**:
```json
{
  "signals": [
    {
      "symbol": "BTC/USD",
      "action": "buy",
      "confidence": 0.85,
      "target_price": 45000,
      "stop_loss": 40000,
      "reasoning": "Strong bullish momentum"
    }
  ]
}
```

## Market Data API

### Get Current Prices
Retrieve current market prices for all supported symbols.

**Endpoint**: `GET /market-data/prices`

**Response**:
```json
{
  "data": [
    {
      "symbol": "BTC/USD",
      "price": 42350.50,
      "change24h": 2.4,
      "volume24h": 28500000000,
      "marketCap": 830000000000
    }
  ]
}
```

### Get Historical Data
Retrieve historical price data for a specific symbol.

**Endpoint**: `GET /market-data/historical`

**Parameters**:
- `symbol`: Trading pair symbol (e.g., BTC/USD)
- `interval`: Time interval (1m, 5m, 1h, 1d)
- `limit`: Number of data points (default: 100)

## Smart Contract API

### Get Contract Balance
Retrieve user's balance from the smart contract.

**Endpoint**: `GET /smart-contract-api/get-balance`

**Parameters**:
- `contractAddress`: Smart contract address
- `userAddress`: User's wallet address

**Response**:
```json
{
  "totalBalance": 5000.00,
  "availableBalance": 3000.00,
  "lockedBalance": 2000.00,
  "pendingProfits": 500.00
}
```

### Withdraw Profits
Withdraw profits from the smart contract.

**Endpoint**: `POST /smart-contract-api/withdraw-profits`

**Request Body**:
```json
{
  "contractAddress": "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
  "userAddress": "0x8ba1f109551bD432803012645Hac136c",
  "amount": 1000
}
```

## Error Handling

All API endpoints return errors in the following format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### Common Error Codes
- `UNAUTHORIZED`: Invalid or missing authentication
- `INSUFFICIENT_BALANCE`: Not enough funds for the operation
- `INVALID_SYMBOL`: Unsupported trading pair
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Rate Limits
- **Trading API**: 100 requests per minute
- **Market Data API**: 1000 requests per minute
- **Smart Contract API**: 50 requests per minute

## WebSocket Endpoints
For real-time data, connect to our WebSocket endpoints:

- **Market Data**: `wss://qqveojewxoexrwuxrjsk.supabase.co/realtime/v1`
- **Trading Updates**: `wss://qqveojewxoexrwuxrjsk.supabase.co/realtime/v1`

## SDK Examples

### JavaScript/TypeScript
```javascript
import { tradingAPI } from './lib/supabase'

// Execute a trade
const trade = await tradingAPI.executeTrade({
  symbol: 'BTC/USD',
  side: 'buy',
  amount: 1000,
  type: 'market',
  userId: 'user_id'
})

// Get trading signals
const signals = await tradingAPI.getSignals()
```

### Python
```python
import requests

headers = {
    'Authorization': 'Bearer your_token',
    'apikey': 'your_api_key',
    'Content-Type': 'application/json'
}

# Execute trade
response = requests.post(
    'https://qqveojewxoexrwuxrjsk.supabase.co/functions/v1/trading-api/execute-trade',
    headers=headers,
    json={
        'symbol': 'BTC/USD',
        'side': 'buy',
        'amount': 1000,
        'type': 'market'
    }
)
```
