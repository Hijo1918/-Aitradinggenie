import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './LiveFeed.css';

const socket = io('http://localhost:5000');

export default function LiveFeed() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // Fetch initial data
    fetch('http://localhost:5000/api/trades')
      .then(res => res.json())
      .then(data => setTrades(data.reverse()));

    // Real-time updates
    socket.on('new_trade', (trade) => {
      setTrades(prev => [...prev, trade].slice(-20));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="feed">
      {trades.map((trade, index) => (
        <div key={index} className={`trade ${trade.action.toLowerCase()}`}>
          {trade.symbol} - ${trade.price} - {trade.action}
        </div>
      ))}
    </div>
  );
}
