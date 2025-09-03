import { useContext } from "react";
import { StockContext } from "../context/StockContext";
import '../style/stocklist.css';

function StockList() {
  const { stocks } = useContext(StockContext);

  if (stocks.length === 0) {
    return <p>No stocks added yet.</p>;
  }

  return (
    <div>
      {stocks.map((stock, index) => {
        const profitLoss =
          (stock.currentPrice - stock.purchasePrice) * stock.quantity;
        const isProfit = profitLoss >= 0;

        return (
          <div key={index} className="p-4 mb-3 border rounded bg-gray-50">
            <p><strong>Symbol:</strong> {stock.symbol}</p>
            <p><strong>Quantity:</strong> {stock.quantity}</p>
            <p><strong>Purchase Price:</strong> {stock.purchasePrice}</p>
            <p><strong>Current Price:</strong> {stock.currentPrice}</p>
            <p style={{ color: isProfit ? "green" : "red" }}>
              <strong>Profit/Loss:</strong> {profitLoss.toFixed(2)}
            </p>
          </div>
        );
      })}
    </div>
  );
}


export default StockList;