import "./StockTable.css";


function StockTable() {
  return (
    <div className="stock-Container">
      <h1>Stock List</h1>

      <div className="stock-card">
        <p><strong>Symbol:</strong> AAPL</p>
        <p><strong>Quantity:</strong> 2</p>
        <p><strong>Purchase Price:</strong> 123.99</p>
        <p><strong>Current Price:</strong> 167.15</p>
        <p className="profit">Profit/Loss: +86.32</p>
      </div>
    </div>
  );
}

export default StockTable;
