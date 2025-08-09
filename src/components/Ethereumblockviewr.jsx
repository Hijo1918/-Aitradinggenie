import React, { useEffect, useState } from "react";
import { JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/baku9aCz_GoFjAPPOkJR6");

export default function EthereumBlockViewer() {
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlock() {
      try {
        const latestBlock = await provider.getBlock("latest");
        setBlock(latestBlock);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBlock();
  }, []);

  if (loading) return <div>Loading latest block...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!block) return <div>No block data found.</div>;

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Ethereum Latest Block</h2>
      <div><strong>Number:</strong> {block.number}</div>
      <div><strong>Hash:</strong> {block.hash}</div>
      <div><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</div>
      <div><strong>Transactions:</strong> {block.transactions.length}</div>
      {/* Add more fields as needed */}
    </div>
  );
}
