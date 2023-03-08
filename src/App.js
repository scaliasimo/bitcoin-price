import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [currency, setCurrency] = useState("USD");
  const [usdPrice, setUsdPrice] = useState(null);
  const [gbpPrice, setGbpPrice] = useState(null);
  const [eurPrice, setEurPrice] = useState(null);
  const [activeButton, setActiveButton] = useState("USD");

  const API_INTERVAL = 60000;

  useEffect(() => {
    const fetchBitcoinPrice = () => {
      axios
        .get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((response) => {
          setUsdPrice(response.data.bpi.USD.rate_float.toFixed(1));
          setGbpPrice(response.data.bpi.GBP.rate_float.toFixed(1));
          setEurPrice(response.data.bpi.EUR.rate_float.toFixed(1));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchBitcoinPrice();

    const intervalId = setInterval(() => {
      fetchBitcoinPrice();
    }, API_INTERVAL);

    return () => clearInterval(intervalId);
  }, [currency]);

  const handleCurrencyChange = (newCurrency) => {
    setActiveButton(newCurrency);
    setCurrency(newCurrency);
  };

  return (
    <>
      <div className="App">
        <h1>
          {currency === "USD" && usdPrice && `${usdPrice}`}
          {currency === "GBP" && gbpPrice && `${gbpPrice}`}
          {currency === "EUR" && eurPrice && `${eurPrice}`}
        </h1>
        <h2>
          {`${currency === "USD" ? "USD per BTC" : ""}`}
          {`${currency === "GBP" ? "GBP per BTC" : ""}`}
          {`${currency === "EUR" ? "EUR per BTC" : ""}`}
        </h2>
      </div>
      <div className="Nav">
        <a
          href="#"
          className={`button ${activeButton === "USD" ? "active" : ""}`}
          onClick={() => handleCurrencyChange("USD")}
        >
          USD
        </a>
        <a
          href="#"
          className={`button ${activeButton === "GBP" ? "active" : ""}`}
          onClick={() => handleCurrencyChange("GBP")}
        >
          GBP
        </a>
        <a
          href="#"
          className={`button ${activeButton === "EUR" ? "active" : ""}`}
          onClick={() => handleCurrencyChange("EUR")}
        >
          EUR
        </a>
      </div>
    </>
  );
}
