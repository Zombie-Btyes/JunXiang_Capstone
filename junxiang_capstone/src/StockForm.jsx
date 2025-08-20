// StockForm.jsx
import "./StockForm.css";
import { useState, useEffect } from "react";
function StockForm() {
  // const [currencies, setCurrencies] = useState([]);

  //   const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } = useContext(CurrencyContext);

  //   useEffect(() => {
  //   fetch("https://v6.exchangerate-api.com/v6/8f62e5e1aa5d67024ac11ef1/codes")
  //       .then((res) => res.json())
  //       .then((data) => setCurrencies (data.supported_codes));
  //   }, []);
  return (

    <form className="stock-form">
      <div className="form-group">
        <label htmlFor="symbol">Stock Symbol</label>
        <input type="text" id="symbol" name="symbol" placeholder="e.g., Stock Symbol" />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" name="quantity" min="1" placeholder="e.g., Quantity" />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price per Share</label>
        <input type="number" id="price" name="price" step="0.01" placeholder="e.g., Purchase Price" />
      </div>
      <button type="submit">Add to Dashboard</button>
    </form>
  );
}

export default StockForm;
