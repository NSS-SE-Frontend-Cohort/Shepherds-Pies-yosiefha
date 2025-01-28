import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import FinalizedOrders from "./components/FinalizedOrders";
import "./styles/App.css";
import Menu from "./components/Menu";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import SearchOrders from "./components/SearchOrders";

function App() {
  const [order, setOrder] = useState([]); // Initialize as an empty array
  const [finalizedOrders, setFinalizedOrders] = useState([]); // Initialize as an empty array
  const [searchResults, setSearchResults] = useState([]); // Initialize as an empty array


  const [editingTipOrderId, setEditingTipOrderId] = useState(null);
  const [newTip, setNewTip] = useState("");

  const handleEditTip = (orderId) => {
    setEditingTipOrderId(orderId);
  };

  const handleSaveTip = (orderId) => {
    const updatedOrders = finalizedOrders.map((order) => {
      if (order.receiptNumber === orderId) {
        return {
          ...order,
          tipAmount: newTip,
        };
      }
      return order;
    });
    setFinalizedOrders(updatedOrders);
    setEditingTipOrderId(null);
    setNewTip("");
  };

  const handleCancelEditTip = () => {
    setEditingTipOrderId(null);
    setNewTip("");
  };

  const handleNewTipChange = (e) => {
    setNewTip(e.target.value);
  };

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
        setFinalizedOrders((prev) => [...prev, finalizedOrder].slice(-5));
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
  
 // Define the generateRandomPosition function
 const generateRandomPosition = () => {
  const randomX = Math.floor(Math.random() * 100) + "%"; // Random horizontal position
  const randomY = Math.floor(Math.random() * 100) + "%"; // Random vertical position
  return { randomX, randomY };
};


return (
  <div className="App">
    
    <Header />



    <div className="container">

      {/* Left Column */}
      <div className="right-column">
        <Menu onAddToOrder={handleAddToOrder} />
      </div>

      {/* left Column */}
      <div className="left-column">
        <h2>Current Receipt</h2>
        <OrderList order={order} />
        <OrderForm onFinalizeOrder={handleFinalizeOrder} />
        <FinalizedOrders orders={finalizedOrders} onEditTip={handleEditTip} />
      </div>
      

    </div>

    <div className="search-orders"> 
    <SearchOrders onSearch={handleSearch} />
        <h2>Search Results</h2>
        {searchResults?.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.receiptNumber} className="order-item">
                 <strong>Receipt #{result.receiptNumber}</strong> | {result.type} | {result.timestamp} | Employee No. :{result.employeeNumber} | Table No. :{result.employeeNumber}
                
                <p>Total: ${Number(result.totalPrice || 0).toFixed(2)}</p>
                <p>Tip: ${Number(result.tipAmount || 0).toFixed(2)}</p>
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
);



}

export default App;


