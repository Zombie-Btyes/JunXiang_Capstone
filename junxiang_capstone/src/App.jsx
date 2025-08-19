import StockForm from "./StockForm";
import CurrencyDropdown from "./CurrencyDropdown";
import CurrencyContext from "./CurrencyContext";


function App () {
   const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("SGD");

  return (
    <>

    <CurrencyContext.Provider
    value={{
      fromCurrency,
      toCurrency,
      setFromCurrency,
      setToCurrency
    }}
    >
      <h1>Currency Converter</h1>

      {/* <p>Current Count: {count}</p> */}

      <CurrencyDropdown />
      <StockForm />
    </CurrencyContext.Provider>
    </>
  );
}

export default App;