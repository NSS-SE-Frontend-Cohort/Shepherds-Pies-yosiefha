import React, { useState } from "react";

const OrderForm = ({ onFinalizeOrder }) => {
  const [type, setType] = useState("Dine-In");
  const [tableNumber, setTableNumber] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");

  const handleFinalize = () => {
    if (!employeeNumber) {
      alert("Please provide an employee number.");
      return;
    }

    onFinalizeOrder({ type, tableNumber, employeeNumber });
    setTableNumber("");
    setEmployeeNumber("");
  };

  return (
    <div>
      <h2>Finalize Order</h2>
      <div>
        <label>
          Order Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Dine-In">Dine-In</option>
            <option value="Delivery">Delivery</option>
          </select>
        </label>
      </div>
      {type === "Dine-In" && (
        <div>
          <label>
            Table Number:
            <input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter table number"
            />
          </label>
        </div>
      )}
      <div>
        <label>
          Employee Number:
          <input
            type="text"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
            placeholder="Enter employee number"
          />
        </label>
      </div>
      <button onClick={handleFinalize}>Generate Order</button>
    </div>
  );
};

export default OrderForm;
