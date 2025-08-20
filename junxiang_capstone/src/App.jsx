import StockForm from "./StockForm";
import StockTable from "./StockTable";

function App () {
  return (
    <>
      {/* <StockContextProvider
        value={{}}
      > */}
      <h1 style={{
        textAlign: "center",
        marginBottom: "20px"
      }}>Stock Dashboard</h1>
      <StockForm />
      <StockTable />
      {/* </StockContextProvider> */}
    </>
  );
}

export default App;