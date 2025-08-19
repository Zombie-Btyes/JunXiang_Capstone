import "./CurrencyStyle.css";
import {useEffect, useState} from "react";
import CurrencyConverter from "./CurrencyConverter";

function CurrencyDropdown () {
    const [currencies, setCurrencies] = useState([]);

    const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } = useContext(CurrencyContext);

    useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/8f62e5e1aa5d67024ac11ef1/codes")
        .then((res) => res.json())
        .then((data) => setCurrencies (data.supported_codes));
    }, []);
    
    //     setCurrencies ( [
    //   [
    //     "AED",
    //     "UAE Dirham"
    //   ],
    //   [
    //     "AFN",
    //     "Afghan Afghani"
    //   ],
    //   [
    //     "ALL",
    //     "Albanian Lek"
    //   ],
    //   [
    //     "AMD",
    //     "Armenian Dram"
    //   ],
    //   [
    //     "ANG",
    //     "Netherlands Antillian Guilder"
    //   ],
    //     ]);
    // }, []);


    return (
        <>
        <div className="currency-Container">

            <p>I want to convert</p>
            <select name="currency" id="currencySelect" onChange={(event) => {setFromCurrency(event.target.value);}}>
                {currencies.map(((currency) => (
                    <option value={currency[0]} key={currency[0]}>
                        {currency[1]}
                    </option>
                )))}
            </select>
            <p>to</p>
             <select name="currency" id="currencySelect" onChange={(event) => {setToCurrency(event.target.value);}}>
                {currencies.map(((currency) => (
                    <option value={currency[0]} key={currency[0]}>
                        {currency[1]}
                    </option>
                )))}
            </select>

        </div>
        <CurrencyConverter currencyFrom={fromCurrency} currencyTo={toCurrency} />
        </>
    );
}

export default CurrencyDropdown;