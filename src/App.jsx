import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Menu from "./components/Menu";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import SearchOrders from "./components/SearchOrders";

function App() {
  const [order, setOrder] = useState([]); // Initialize as an empty array
  const [finalizedOrders, setFinalizedOrders] = useState([]); // Initialize as an empty array
  const [searchResults, setSearchResults] = useState([]); // Initialize as an empty array

  // Add selected items to the current order
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
  
  const handleFinalizeOrder = async ({ type, tableNumber, employeeNumber, tipAmount }) => {
    if (type === "Dine-In" && !tableNumber) {
      alert("Please provide a table number for dine-in orders.");
      return;
    }
  
    const totalPrice = order.reduce((sum, pizza) => sum + parseFloat(pizza.price), 0);
    const deliverySurcharge = type === "Delivery" ? 5 : 0;
    const finalTotal = totalPrice + deliverySurcharge + parseFloat(tipAmount || 0);
  
    const receiptNumber = `REC-${Date.now()}`;
    const timestamp = new Date();
    const date = timestamp.toLocaleDateString();
  
    const finalizedOrder = {
      receiptNumber,
      timestamp: timestamp.toLocaleString(),
      date,
      type,
      tableNumber: type === "Dine-In" ? tableNumber : null,
      employeeNumber,
      items: [...order],
      tipAmount: parseFloat(tipAmount || 0).toFixed(2),
      totalPrice: finalTotal.toFixed(2),
    };
  
    try {
      const response = await fetch("http://localhost:8088/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalizedOrder),
      });
  
      if (response.ok) {
        setFinalizedOrders((prev) => [...prev, finalizedOrder].slice(-2));
        alert("Order finalized and saved successfully!");
        setOrder([]);
      } else {
        alert("Failed to save the order.");
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };
  
  // Fetch finalized orders on component mount
  useEffect(() => {
    const fetchFinalizedOrders = async () => {
      try {
        const response = await fetch("http://localhost:8088/orders");
        if (response.ok) {
          const orders = await response.json();
          setFinalizedOrders(orders.slice(-2) || []);; // Load only the latest two orders
        }else {
          console.error("Failed to fetch finalized orders.");
          setFinalizedOrders([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching finalized orders:", error);
        setFinalizedOrders([]);
      }
    };

    fetchFinalizedOrders();
  }, []);

  const handleSearch = async (criteria) => {
    try {
      let queryParams = new URLSearchParams();
  
      // Format the date to MM/DD/YYYY if provided
      if (criteria.date) {
        const formattedDate = formatDate(criteria.date); // Reformat the date
        queryParams.append("date", formattedDate);
      }
  
      if (criteria.receiptNumber) {
        queryParams.append("receiptNumber", criteria.receiptNumber);
      }
  
      if (!criteria.date && !criteria.receiptNumber) {
        alert("Please provide a search criteria.");
        return;
      }
  
      const response = await fetch(`http://localhost:8088/orders?${queryParams.toString()}`);
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
      } else {
        alert("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to search for orders. Please try again later.");
    }
  };
  
  // Utility function to format date from YYYY-MM-DD to MM/DD/YYYY
  const formatDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-").map(Number); // Split and parse YYYY-MM-DD
    return `${month}/${day}/${year}`; // Return in MM/DD/YYYY format
  };
  


return (
  <div className="App">
    <h1>Shepherd's Pies Order Management</h1>

    <div className="container">
      {/* Left Column */}
      <div className="left-column">
        <h2>Current Receipt</h2>
        <OrderList order={order} />
        <OrderForm onFinalizeOrder={handleFinalizeOrder} />
        
        {/* Finalized Orders Box */}
        <div className="finalized-orders-box">
          <h2>Latest Finalized Orders</h2>
          {Array.isArray(finalizedOrders) && finalizedOrders.length > 0 ? (
            <ul>
              {finalizedOrders.map((order) => (
                <li key={order.receiptNumber || order.timestamp}>
                  <strong>Receipt #{order.receiptNumber}</strong> | {order.type} | {order.timestamp}
                  <p>Total: ${Number(order.totalPrice || 0).toFixed(2)}</p>
                  <p>Tip: ${Number(order.tipAmount || 0).toFixed(2)}</p>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={`${order.receiptNumber}-${index}`}>
                        {item.size} pizza with {item.cheese}, {item.sauce}, toppings:{" "}
                        {item.toppings?.join(", ")} - ${Number(item.price || 0).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No finalized orders yet.</p>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="right-column">
        <Menu onAddToOrder={handleAddToOrder} />
        <h2>Search Orders</h2>
        <SearchOrders onSearch={handleSearch} />
        <h2>Search Results</h2>
        {searchResults?.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.receiptNumber}>
                <strong>Receipt #{result.receiptNumber}</strong> | {result.type} | {result.timestamp}
                <p>Total: ${Number(result.totalPrice || 0).toFixed(2)}</p>
                <ul>
                  {result.items?.map((item, index) => (
                    <li key={`${result.receiptNumber}-${index}`}>
                      {item.size} pizza with {item.cheese}, {item.sauce}, toppings:{" "}
                      {item.toppings?.join(", ")} - ${Number(item.price || 0).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  </div>
);



}

export default App;


