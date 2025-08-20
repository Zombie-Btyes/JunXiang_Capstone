import { useEffect, useState } from "react";
import './StockTable.css';

function StockTable({ symbol, quantity, purchasePrice, onRemove }) {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [profitLoss, setProfitLoss] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const mockPrices = {
        AAPL: 170.25,
        MSFT: 315.8,
        GOOGL: 130.45,
        AMZN: 145.18,
        TSLA: 245.6,
        SHOP: 65.75,
      };

      const price =
        mockPrices[symbol] ||
        purchasePrice * (0.9 + Math.random() * 0.2);

      setCurrentPrice(price);

      const profit = (price - purchasePrice) * quantity;
      setProfitLoss(profit);
      setLoading(false);
    }, 1000);
  }, [symbol, quantity, purchasePrice]);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        width: "200px",
      }}
    >
      <h3>{symbol}</h3>
      <p>Quantity: {quantity}</p>
      <p>
        Purchase Price: $
        {purchasePrice !== undefined ? purchasePrice.toFixed(2) : "N/A"}
      </p>
      <p>
        Current Price:{" "}
        {loading ? "Loading..." : `$${currentPrice.toFixed(2)}`}
      </p>
      <p style={{ color: profitLoss >= 0 ? "green" : "red" }}>
        P/L: {profitLoss >= 0 ? "+" : ""}
        {profitLoss ? profitLoss.toFixed(2) : "0.00"}
      </p>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default StockTable;
