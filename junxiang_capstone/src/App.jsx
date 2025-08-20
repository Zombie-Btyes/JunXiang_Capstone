import { useState } from "react";
import StockForm from "./StockForm";
import StockTable from "./StockTable";
import StockChanger from "./StockChanger";

function App() {
  const [stocks, setStocks] = useState([]);

  // Add stock from form
  const addStock = (stock) => {
    setStocks([...stocks, stock]);
  };

  // Remove stock by index
  const removeStock = (index) => {
    const updated = stocks.filter((_, i) => i !== index);
    setStocks(updated);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Stock Dashboard
      </h1>

      {/* Stock input form */}
      <StockForm onAdd={addStock} />

      {/* Render all stocks */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {stocks.map((stock, index) => (
          <StockTable
            key={index}
            symbol={stock.symbol}
            quantity={stock.quantity}
            purchasePrice={stock.purchasePrice}
            onRemove={() => removeStock(index)}
          />
        ))}
      </div>

      {/* Example StockChange */}
      <div style={{ marginTop: "30px" }}>
        <StockChanger stockFrom="AAPL" stockTo="MSFT" />
      </div>
    </>
  );
}

export default App;
