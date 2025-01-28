import React, { useState, useEffect } from "react";

const FinalizedOrders = ({ orders = [], onEditTip }) => {
    const [editingTipOrderId, setEditingTipOrderId] = useState(null);
    const [newTip, setNewTip] = useState("");
  
    useEffect(() => {
      if (editingTipOrderId) {
        const orderToEdit = orders.find((order) => order.id === editingTipOrderId);
        console.log("Editing Order:", orderToEdit);
        if (orderToEdit) {
          setNewTip(orderToEdit.tipAmount || "");
        }
      }
    }, [editingTipOrderId, orders]);
  
    const handleSaveTip = (orderId) => {
      console.log("Saving Tip for Order ID:", orderId);
      console.log("New Tip Value:", newTip);
  
      if (!newTip) return;
      onEditTip(orderId, parseFloat(newTip).toFixed(2));
      setEditingTipOrderId(null);
      setNewTip("");
    };
  
    const handleCancelEditTip = () => {
      console.log("Canceled editing tip");
      setEditingTipOrderId(null);
      setNewTip("");
    };
  
    console.log("Orders in FinalizedOrders:", orders);
  
    return (
      <div className="finalized-orders-box">
        <h2>Latest Finalized Orders</h2>
        {orders && orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              <li key={order.id || order.timestamp} className="order-item">
                <strong>Receipt #{order.receiptNumber}</strong> | {order.type} | {order.timestamp}
                <p>Total: ${Number(order.totalPrice || 0).toFixed(2)}</p>
                <div className="tip-section">
                  <p>Tip: ${Number(order.tipAmount || 0).toFixed(2)}</p>
                  {editingTipOrderId === order.id ? (
                    <div>
                      <input
                        type="number"
                        value={newTip}
                        onChange={(e) => setNewTip(e.target.value)}
                        placeholder="Enter new tip"
                      />
                      <button onClick={() => handleSaveTip(order.id)}>Save</button>
                      <button onClick={handleCancelEditTip}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditingTipOrderId(order.id)}>Edit Tip</button>
                  )}
                </div>
                <ul>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <li key={`${order.id}-${index}`}>
                        {item.size} pizza with {item.cheese}, {item.sauce}, toppings:{" "}
                        {item.toppings?.join(", ")} - ${Number(item.price || 0).toFixed(2)}
                      </li>
                    ))
                  ) : (
                    <p>No items for this order</p>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading finalized orders...</p>
        )}
      </div>
    );
  };
  
  export default FinalizedOrders;
