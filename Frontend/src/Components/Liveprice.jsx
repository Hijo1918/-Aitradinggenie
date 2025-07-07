import { useState, useEffect } from 'react';
import './Price.css'; // separate CSS file

function LivePrice() {
  const [price, setPrice] = useState(null);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/.netlify/functions/getPrice');
        const data = await res.json();
        const newPrice = parseFloat(data.price);

        if (price !== null) {
          setFlash(newPrice > price ? 'up' : newPrice < price ? 'down' : '');
        }

        setPrice(newPrice);
        setTimeout(() => setFlash(''), 500); // clear flash after 0.5s
      } catch (err) {
        console.error('Failed to fetch price:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // update every 3s
    return () => clearInterval(interval);
  }, [price]);

  return (
    <div className={`price ${flash}`}>
      {price !== null ? `$${price}` : 'Loading...'}
    </div>
  );
}

export default LivePrice;
