import React, { useEffect, useState } from "react";
import { api } from "../api/api";

function PayoutLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/payout/logs").then(res => setLogs(res.data));
  }, []);

  return (
    <div>
      <h3>Admin BTC Payout Logs</h3>
      <table>
        <thead>
          <tr>
            <th>Time</th><th>Profit</th><th>Currency</th><th>BTC</th><th>TXID</th><th>To</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(l => (
            <tr key={l._id}>
              <td>{new Date(l.timestamp).toLocaleString()}</td>
              <td>{l.profitAmount}</td>
              <td>{l.profitCurrency}</td>
              <td>{l.amountBtc}</td>
              <td>{l.txid}</td>
              <td>{l.toAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PayoutLogs;
