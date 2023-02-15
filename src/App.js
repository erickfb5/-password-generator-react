import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(20);
  const [hasLower, setHasLower] = useState(true);
  const [hasUpper, setHasUpper] = useState(true);
  const [hasNumber, setHasNumber] = useState(true);
  const [hasSymbol, setHasSymbol] = useState(true);

  const getRandomLower = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97);

  const getRandomUpper = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65);

  const getRandomNumber = () =>
    String.fromCharCode(Math.floor(Math.random() * 10) + 48);

  const getRandomSymbol = () => {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  const handleGenerate = () => {
    setPassword(
      generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
    );
  };

  const handleCopyToClipboard = () => {
    if (!password) return;

    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const handleLengthChange = (event) => setLength(event.target.value);
  const handleLowerChange = (event) => setHasLower(event.target.checked);
  const handleUpperChange = (event) => setHasUpper(event.target.checked);
  const handleNumberChange = (event) => setHasNumber(event.target.checked);
  const handleSymbolChange = (event) => setHasSymbol(event.target.checked);

  const generatePassword = (lower, upper, number, symbol, length) => {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
      return "";
    }

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="card">
        <div className="form-group">
          <label htmlFor="length">Password length</label>
          <input
            type="number"
            id="length"
            name="length"
            value={length}
            min="8"
            max="40"
            onChange={handleLengthChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lower">Include lowercase letters</label>
          <input
            type="checkbox"
            id="lower"
            name="lower"
            checked={hasLower}
            onChange={handleLowerChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="upper">Include uppercase letters</label>
          <input
            type="checkbox"
            id="upper"
            name="upper"
            checked={hasUpper}
            onChange={handleUpperChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Include numbers</label>
          <input
            type="checkbox"
            id="number"
            name="number"
            checked={hasNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="symbol">Include symbols</label>
          <input
            type="checkbox"
            id="symbol"
            name="symbol"
            checked={hasSymbol}
            onChange={handleSymbolChange}
          />
        </div>
        <button className="btn generate-btn" onClick={handleGenerate}>
          Generate Password
        </button>
        {password && (
          <div className="form-group">
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              readOnly
            />
            <button
              className="btn copy-btn"
              onClick={handleCopyToClipboard}
              title="Copy to clipboard"
            >
              {/* <FontAwesomeIcon icon={faClipboard} /> */}
              {/* <FontAwesomeIcon icon={faCheck} className="check-icon" /> */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
