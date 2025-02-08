
import React, { useState } from "react";

const OrderForm = ({ onFinalizeOrder }) => {
  const [type, setType] = useState("Dine-In");
  const [tableNumber, setTableNumber] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [tipAmount, setTipAmount] = useState(0); // Added state for tip amount

  const handleFinalize = () => {
    if (!employeeNumber) {
      alert("Please provide an employee number.");
      return;
    }

    if (type === "Dine-In" && !tableNumber) {
      alert("Please provide a table number for dine-in orders.");
      return;
    }

    onFinalizeOrder({ type, tableNumber, employeeNumber, tipAmount });
    setTableNumber("");
    setEmployeeNumber("");
    setTipAmount(0); // Reset tip amount
  };

  return (
    <div className="finalize-order">
    <h2>Finalize Order</h2>
    <div className="form-group">
      <label>Order Type:</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Dine-In">Dine-In</option>
        <option value="Delivery">Delivery</option>
      </select>
    </div>
    {type === "Dine-In" && (
      <div className="form-group">
        <label>Table Number:</label>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Enter table number"
        />
      </div>
    )}
    <div className="form-group">
      <label>Employee Number:</label>
      <input
        type="text"
        value={employeeNumber}
        onChange={(e) => setEmployeeNumber(e.target.value)}
        placeholder="Enter employee number"
      />
    </div>
    <div className="form-group">
      <label>Tip Amount ($):</label>
      <input
        type="number"
        step="0.01"
        min="0"
        value={tipAmount}
        onChange={(e) => setTipAmount(e.target.value)}
        placeholder="Enter tip amount"
      />
    </div>
    <button onClick={handleFinalize}>Generate Order</button>
  </div>
  
  );
};

export default OrderForm;

