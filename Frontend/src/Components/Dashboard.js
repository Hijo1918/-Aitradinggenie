import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import TradeSignals from "./TradeSignals";
import TradeHistory from "./TradeHistory";
import PayoutLogs from "./PayoutLogs";

function Dashboard() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    api.get("/status").then(res => setStatus(res.data.status));
  }, []);

  return (
    <div>
      <h2>Trading Bot Dashboard</h2>
      <div>Status: {status}</div>
      <TradeSignals />
      <TradeHistory />
      <PayoutLogs />
    </div>
  );
}

export default Dashboard;
