import { useState, useEffect } from "react";
import './StockForm.css';

function StockForm({ onAdd }) {
  const [form, setForm] = useState({ symbol: "", quantity: "", purchasePrice: "" });
  const [stocks, setStocks] = useState([]);
  const [fromStock, setFromStock] = useState("");
  const [toStock, setToStock] = useState("");
  const [amount, setAmount] = useState("");
  const [output, setOutput] = useState(0);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form inputs
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add stock to list
  const handleSubmit = (e) => {
    e.preventDefault();
    const { symbol, quantity, purchasePrice } = form;
    if (!symbol || !quantity || !purchasePrice) return;

    const newStock = {
      symbol: symbol.toUpperCase(),
      quantity: parseInt(quantity),
      purchasePrice: parseFloat(purchasePrice),
    };

    setStocks([...stocks, newStock]);
    onAdd && onAdd(newStock);
    setForm({ symbol: "", quantity: "", purchasePrice: "" });
  };

  // Fetch stock prices from Alpha Vantage whenever fromStock or toStock change
  useEffect(() => {
    const fetchPrices = async () => {
      if (!fromStock || !toStock || !amount) return;
      setLoading(true);

      const fetchPrice = async (symbol) => {
        const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=12GGU3NLIIBA4QGH`);
        const data = await res.json();
        if (data["Time Series (Daily)"]) {
          const latestDate = Object.keys(data["Time Series (Daily)"])[0];
          return parseFloat(data["Time Series (Daily)"][latestDate]["4. close"]);
        }
        return null;
      };

      const priceFrom = await fetchPrice(fromStock);
      const priceTo = await fetchPrice(toStock);

      if (priceFrom && priceTo) {
        const exchangeRate = priceTo / priceFrom;
        setRate(exchangeRate);
        setOutput((amount * exchangeRate).toFixed(2));
      }
      setLoading(false);
    };

    fetchPrices();
  }, [fromStock, toStock, amount]);

  return (
    <div className="stock-form-container">
      {/* Add Stock Form */}
      <form className="stock-form" onSubmit={handleSubmit}>
        <h2>Add Stock</h2>

        <div className="form-group">
          <label>Symbol</label>
          <input name="symbol" type="text" placeholder="e.g. AAPL" value={form.symbol} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input name="quantity" type="number" placeholder="e.g. 10" value={form.quantity} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Purchase Price</label>
          <input name="purchasePrice" type="number" step="0.01" placeholder="e.g. 150.00" value={form.purchasePrice} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Add Stock</button>
      </form>

      {/* Stock Converter */}
      {stocks.length > 0 && (
        <div className="stock-converter">
          <h2>Stock Conversion</h2>

          <p>I want to convert</p>
          <select value={fromStock} onChange={(e) => setFromStock(e.target.value)}>
            <option value="">From Stock</option>
            {stocks.map((s) => (
              <option key={s.symbol} value={s.symbol}>{s.symbol}</option>
            ))}
          </select>

          <p>to</p>
          <select value={toStock} onChange={(e) => setToStock(e.target.value)}>
            <option value="">To Stock</option>
            {stocks.map((s) => (
              <option key={s.symbol} value={s.symbol}>{s.symbol}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="conversion-result">
            {loading ? "Loading..." : rate ? `${amount} ${fromStock} = ${output} ${toStock}` : "Select stocks and enter amount"}
          </div>

          {rate && <div className="exchange-rate">1 {fromStock} = {rate.toFixed(4)} {toStock}</div>}
        </div>
      )}
    </div>
  );
}

export default StockForm;
