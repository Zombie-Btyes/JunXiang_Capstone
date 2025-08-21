import { useState, useContext, useCallback, useEffect } from "react";
import { StockContext } from "../context/StockContext";
import "../style/stockform.css"
const API_KEY = "12GGU3NLIIBA4QGH";

function StockForms() {
  const { setStocks } = useContext(StockContext);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [symbolsList, setSymbolsList] = useState([]);

  // Fetch stock symbols (CSV from AlphaVantage)
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const url = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${API_KEY}`;
        const res = await fetch(url);
        const text = await res.text();

        // Parse CSV (first column = symbol, second = name)
        const rows = text.split("\n").slice(1); // remove header
        const parsed = rows
          .map((row) => {
            const cols = row.split(",");
            return { symbol: cols[0], name: cols[1] };
          })
          .filter((s) => s.symbol); // remove empty rows

        setSymbolsList(parsed.slice(0, 200)); // limit for demo
      } catch (error) {
        console.error("Error fetching symbols:", error);
      }
    };

    fetchSymbols();
  }, []);

  // Fetch stock price from AlphaVantage
  const fetchStockPrice = useCallback(async (stockSymbol) => {
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
        return parseFloat(data["Global Quote"]["05. price"]);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
      return null;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symbol || !quantity || !purchasePrice) return;

    const currentPrice = await fetchStockPrice(symbol);
    if (!currentPrice) {
      alert("Invalid stock symbol!");
      return;
    }

    const newStock = {
      symbol: symbol.toUpperCase(),
      quantity: parseInt(quantity),
      purchasePrice: parseFloat(purchasePrice),
      currentPrice,
    };

    setStocks((prev) => [...prev, newStock]);
    setSymbol("");
    setQuantity("");
    setPurchasePrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      {/* Dropdown for stock symbols */}
      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      >
        <option value="">Select Symbol</option>
        {symbolsList.map((s, idx) => (
          <option key={idx} value={s.symbol}>
            {s.symbol} - {s.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Purchase Price"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
      />
      <button type="submit">Add Stock</button>
    </form>
  );
}

export default StockForms;
