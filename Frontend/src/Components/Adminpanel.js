import React, { useState } from "react";
import { api } from "../api/api";

function AdminPanel() {
  const [profitAmount, setProfitAmount] = useState("");
  const [profitCurrency, setProfitCurrency] = useState("USDT");
  const [result, setResult] = useState(null);

  async function handlePayout(e) {
    e.preventDefault();
    const { data } = await api.post("/payout/admin", { profitAmount, profitCurrency });
    setResult(data);
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handlePayout}>
        <input
          type="number"
          value={profitAmount}
          onChange={e => setProfitAmount(e.target.value)}
          placeholder="Profit Amount"
          required
        />
        <select value={profitCurrency} onChange={e => setProfitCurrency(e.target.value)}>
          <option>USDT</option>
          <option>ETH</option>
        </select>
        <button type="submit">Send BTC Payout</button>
      </form>
      {result && (
        <div>
          Sent {result.amountBtc} BTC to {result.toAddress} (TXID: {result.txid})
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
