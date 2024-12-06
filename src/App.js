import React, { useState } from 'react';

const App = () => {
  const [rate, setRate] = useState('');
  const [principal, setPrincipal] = useState('');
  const [perDiemRate, setPerDiemRate] = useState(0);
  const [perDiemAmount, setPerDiemAmount] = useState(0);
  const [errors, setErrors] = useState({ rate: false, principal: false });

  const calculate = () => {
    const newErrors = {
      rate: !rate, 
      principal: !principal, 
    };
    setErrors(newErrors);

    if (newErrors.rate || newErrors.principal) return;

    const dailyRate = parseFloat(rate) / 365;
    const amount = (dailyRate * parseFloat(principal)) / 100;
    setPerDiemRate((dailyRate).toFixed(2));
    setPerDiemAmount(amount.toFixed(2));
  };

  const reset = () => {
    setRate('');
    setPrincipal('');
    setPerDiemRate(0);
    setPerDiemAmount(0);
    setErrors({ rate: false, principal: false }); // Reset errors
  };

  return (
    <>
      <header className="header">
        <h1 className="brand-logo"> EARLY OUT</h1>
      </header>
      <div className="calculator-card">
        <h2 className="card-title">PER DIEM CALCULATOR</h2>
        <div className="input-group">
          <label>Annual Interest Rate (%)*</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => {
              setRate(e.target.value);
              setErrors((prev) => ({ ...prev, rate: false })); 
            }}
            placeholder="Enter annual rate"
          />
          {errors.rate && <span className="error-text">This field is required</span>}
        </div>
        <div className="input-group">
          <label>Principal Amount ($)*</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => {
              setPrincipal(e.target.value);
              setErrors((prev) => ({ ...prev, principal: false }));
            }}
            placeholder="Enter principal amount"
          />
          {errors.principal && <span className="error-text">This field is required</span>}
        </div>
        <div className="button-group">
          <button onClick={calculate} className="calculate-btn">
            Calculate
          </button>
          <button onClick={reset} className="reset-btn">
            Reset
          </button>
        </div>
        <div className="output-group">
          <p>Per Diem Rate: <strong>{perDiemRate} %</strong></p>
          <p>Per Diem Amount: <strong>${perDiemAmount}</strong></p>
        </div>
      </div>
    </>
  );
};

export default App;
