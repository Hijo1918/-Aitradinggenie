import React, { useEffect, useState } from "react";
import { api } from "../api/api";

function TradeHistory() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    api.get("/trade/history").then(res => setTrades(res.data));
  }, []);

  return (
    <div>
      <h3>Trade History</h3>
      <table>
        <thead>
          <tr>
            <th>Time</th><th>Symbol</th><th>Side</th><th>Entry</th><th>Stop</th><th>TP</th><th>Size</th><th>RRR</th><th>TX</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(t => (
            <tr key={t._id}>
              <td>{new Date(t.timestamp).toLocaleString()}</td>
              <td>{t.symbol}</td>
              <td>{t.side}</td>
              <td>{t.entryPrice}</td>
              <td>{t.stopLossPrice}</td>
              <td>{t.takeProfitPrice}</td>
              <td>{t.positionSize}</td>
              <td>{t.riskToReward}</td>
              <td><a href={`https://etherscan.io/tx/${t.scTx}`} target="_blank" rel="noopener noreferrer">{t.scTx && t.scTx.slice(0,10)}...</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradeHistory;
