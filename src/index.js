import React, { useState, useEffect } from "react";
import { useDarkMode } from './hooks/useDarkMode.js'
import { useSearchBar } from './hooks/useSearchBar.js'
import ReactDOM from "react-dom";
import axios from "axios";

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";

import "./styles.scss";

const App = () => {
  const [searchText, setSearchText] = useState('')
  const [keyText, setKeyText] = useState('')
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useDarkMode()
  const filteredArray = useSearchBar(coinData, keyText, searchText)

  const toggleMode = e => {
    e.preventDefault();
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className={JSON.parse(window.localStorage.getItem('isDarkMode')) ? "dark-mode App" : "App"}>
      <input placeholder='search' onChange={e => setSearchText(e.target.value)} />
      <input placeholder='attr. name' onChange={e => setKeyText(e.target.value)} />
      <Navbar darkMode={darkMode} toggleMode={toggleMode} />
      <Charts coinData={filteredArray} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
