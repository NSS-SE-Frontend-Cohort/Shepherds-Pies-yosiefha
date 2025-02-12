import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import FinalizedOrders from "./components/FinalizedOrders";
import "./styles/App.css";
import Menu from "./components/Menu";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import SearchOrders from "./components/SearchOrders";
import SearchResults from "./components/SearchResults";
import handleEditTip from "./handlers/handleEditTip";
import handleAddToOrder from "./handlers/handleAddToOrder";
import handleFinalizeOrder from "./handlers/handleFinalizeOrder";
import fetchFinalizedOrders  from "./handlers/fetchFinalizedOrders";

function App() {
  const [order, setOrder] = useState([]); // Initialize as an empty array
  const [finalizedOrders, setFinalizedOrders] = useState([]); // Initialize as an empty array
  const [searchResults, setSearchResults] = useState([]); // Initialize as an empty array

  // Fetch finalized orders on component mount
  useEffect(() => {
    fetchFinalizedOrders(setFinalizedOrders);
  }, []);

  // Finalize order and update finalizedOrders state
  const handleFinalizeOrderWrapper = (data) => {
    handleFinalizeOrder(data, order, setOrder, setFinalizedOrders);
  };


  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="left-column">
          <Menu onAddToOrder={(selectedItems) => handleAddToOrder(selectedItems, order, setOrder)} />
        </div>
        <div className="right-column">
          <div className="upper-row">
            <h2>Current Receipt</h2>
            <OrderList order={order} />
            <OrderForm onFinalizeOrder={handleFinalizeOrderWrapper} />
          </div>

          <div className="lower-row">
            <FinalizedOrders
              orders={finalizedOrders}
              onEditTip={(orderId, newTip) =>
                handleEditTip(orderId, newTip, finalizedOrders, setFinalizedOrders)
              }
            />
          </div>
        </div>

      </div>
      <div className="search-orders">
        <SearchOrders setSearchResults={setSearchResults} />
        <SearchResults results={searchResults} />
      </div>
    </div>
  );
}

export default App;



