import { useEffect, useState } from "react";

function StockChanger({ stockFrom, stockTo }) {
  const [amount, setAmount] = useState("");
  const [output, setOutput] = useState(0);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRates = async () => {
      if (!stockFrom || !stockTo) return;
      setLoading(true);

      const priceFrom = await fetchStockPrice(stockFrom);
      const priceTo = await fetchStockPrice(stockTo);

      if (priceFrom && priceTo) {
        const exchangeRate = priceTo / priceFrom;
        setRate(exchangeRate);

        if (amount) {
          setOutput((amount * exchangeRate).toFixed(2));
        }
      }
      setLoading(false);
    };

    getRates();
  }, [stockFrom, stockTo, amount]);

  return (
    <div className="stock-change">
      <div className="input-group">
        <label>Amount of {stockFrom} to convert:</label>
        <input
          type="number"
          value={amount}
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="conversion-result">
        <div className="conversion-from">
          <span className="amount">{amount || "0"}</span>
          <span className="symbol">{stockFrom}</span>
        </div>

        <div className="equals">=</div>

        <div className="conversion-to">
          <span className="amount">{output}</span>
          <span className="symbol">{stockTo}</span>
        </div>
      </div>

      <div className="exchange-rate">
        {loading ? (
          "Loading..."
        ) : rate ? (
          <>Exchange rate: 1 {stockFrom} = {rate.toFixed(4)} {stockTo}</>
        ) : (
          "Select stocks to compare"
        )}
      </div>
    </div>
  );
}

export default StockChanger;
