import React, { useState } from "react";
import { api } from "../api/api";

function TradeSignals() {
  const [symbol, setSymbol] = useState("");
  const [signal, setSignal] = useState(null);
  const [error, setError] = useState("");

  async function handleExecute() {
    try {
      const { data } = await api.post("/trade/execute", { symbol });
      setSignal(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Trade execution failed");
    }
  }

  return (
    <div>
      <h3>Trade Signal</h3>
      <input
        value={symbol}
        onChange={e => setSymbol(e.target.value.toUpperCase())}
        placeholder="Symbol (e.g. BTCUSDT)"
      />
      <button onClick={handleExecute}>Execute Trade</button>
      {signal && (
        <div>
          <b>Signal:</b> {signal.side} | Entry: {signal.entryPrice} | Stop: {signal.stopLossPrice} | TP: {signal.takeProfitPrice} | Size: {signal.positionSize} | RRR: {signal.riskToReward}
          <br/>Smart Contract TX: {signal.scTx}
        </div>
      )}
      {error && <div style={{color:"red"}}>{error}</div>}
    </div>
  );
}

export default TradeSignals;
