import {useEffect, useState } from "react";

function CurrencyConverter(props) {

    const [amount, setAmount] = useState("");

    const [output, setOutput] = useState(0);

    useEffect(() => {
	fetch("https://v6.exchangerate-api.com/v6/8f62e5e1aa5d67024ac11ef1/pair/" + 
        props.currencyFrom + "/" +  props.currencyTo + "/" + amount)
		// 1. Call the API with the correct method and headers
		.then((res) => res.json())
		// 2. Get the JSON response
		.then((data) => setOutput(data.conversion_result));
    }, 
    [ amount,
        props.currencyFrom,
        props.currencyTo,
    ]);

	// < FILL THIS IN >
	// 5. Think about when you want useEffect to run again
	//    Which variables, when modified, should trigger useEffect?
    return (
        <div className="currency-Container">
        <input 
        value={amount}
        placeholder="Enter amount"
        className="converter-Input"
        onChange={(event) => setAmount(event.target.value)}
        />

        <p>{props.currencyFrom}</p>
        <p>=</p>
        <p className="converter-Amount">{output}</p>
        <p>{props.currencyTo}</p>
        </div>
    );
}

 export default CurrencyConverter;