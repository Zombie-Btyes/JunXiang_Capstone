import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import { StockProvider } from "./context/StockContext";
import "./App.css";

function App() {
  return (
    <StockProvider>
      <div className="p-6">
        <h1>Finance Dashboard</h1>
        <StockForm />
        <h2>Stock List</h2>
        <StockList />
      </div>
    </StockProvider>
  );
}

export default App;
