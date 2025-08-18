// StockForm.jsx

function StockForm() {
  return (
    <form className="stock-form">
      <div className="form-group">
        <label htmlFor="symbol">Stock Symbol</label>
        <input type="text" id="symbol" name="symbol" placeholder="e.g., AAPL" />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" name="quantity" min="1" placeholder="e.g., 10" />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price per Share</label>
        <input type="number" id="price" name="price" step="0.01" placeholder="e.g., 150.00" />
      </div>
      <button type="submit">Add to Dashboard</button>
    </form>
  );
}

export default StockForm;
