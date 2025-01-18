
import React, { useState } from "react";
import "./styles/App.css";
import Menu from "./components/Menu";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

function App() {
  const [order, setOrder] = useState([]);
  const [finalizedOrders, setFinalizedOrders] = useState([]);

  // Add selected items to the order
  const handleAddToOrder = (selectedItems) => {
    const basePrices = { small: 10, medium: 12, large: 15 };
    const toppingPrice = 0.5;

    const pizzaPrice =
      basePrices[selectedItems.size] +
      selectedItems.toppings.length * toppingPrice;

    const newPizza = {
      id: order.length + 1,
      size: selectedItems.size,
      cheese: selectedItems.cheese,
      sauce: selectedItems.sauce,
      toppings: selectedItems.toppings,
      price: pizzaPrice.toFixed(2),
    };

    setOrder((prev) => [...prev, newPizza]);
  };

  // Finalize the order
  const handleFinalizeOrder = ({ type, tableNumber, employeeNumber }) => {
    if (type === "Dine-In" && !tableNumber) {
      alert("Please provide a table number for dine-in orders.");
      return;
    }

    const totalPrice = order.reduce((sum, pizza) => sum + parseFloat(pizza.price), 0);
    const deliverySurcharge = type === "Delivery" ? 5 : 0;
    const finalTotal = totalPrice + deliverySurcharge;

    const receiptNumber = `REC-${Date.now()}`;
    const timestamp = new Date().toLocaleString();

    const finalizedOrder = {
      receiptNumber,
      timestamp,
      type,
      tableNumber: type === "Dine-In" ? tableNumber : null,
      employeeNumber,
      items: [...order],
      totalPrice: finalTotal.toFixed(2),
    };

    setFinalizedOrders((prev) => [...prev, finalizedOrder]);
    setOrder([]); // Clear current order after finalizing
  };

  return (
    <div className="App">
      <h1>Shepherd's Pies Order Management</h1>
      <Menu onAddToOrder={handleAddToOrder} />
      <h2>Current Receipt</h2>
      <OrderList order={order} />
      <OrderForm onFinalizeOrder={handleFinalizeOrder} />
      <h2>Finalized Orders</h2>
      <ul>
        {finalizedOrders.map((finalOrder, index) => (
          <li key={index}>
            <strong>Receipt #{finalOrder.receiptNumber}</strong>
            <p>Order Type: {finalOrder.type}</p>
            <p>
              Table Number: {finalOrder.tableNumber || "N/A"} | Employee:{" "}
              {finalOrder.employeeNumber}
            </p>
            <p>Time: {finalOrder.timestamp}</p>
            <p>
              Items:
              <ul>
                {finalOrder.items.map((item, i) => (
                  <li key={i}>
                    {item.size} pizza with {item.cheese} cheese, {item.sauce} sauce, toppings:{" "}
                    {item.toppings.join(", ")} - ${item.price}
                  </li>
                ))}
              </ul>
            </p>
            <p>Delivery Surcharge: ${finalOrder.type === "Delivery" ? "5.00" : "0.00"}</p>
            <p><strong>Total Price: ${finalOrder.totalPrice}</strong></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
