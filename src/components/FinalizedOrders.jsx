import React, { useState } from "react";

const FinalizedOrders = ({ orders, onEditTip }) => {
  const [editingTipOrderId, setEditingTipOrderId] = useState(null);
  const [newTip, setNewTip] = useState("");

  const handleSaveTip = (orderId) => {
    onEditTip(orderId, parseFloat(newTip || 0).toFixed(2));
    setEditingTipOrderId(null);
    setNewTip("");
  };

  return (
    <div className="finalized-orders-box">
      <h2>Latest Finalized Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.receiptNumber || order.timestamp} className="order-item">
              <strong>Receipt #{order.receiptNumber}</strong> | {order.type} | {order.timestamp}
              <p>Total: ${Number(order.totalPrice || 0).toFixed(2)}</p>
              <div className="tip-section">
                <p>Tip: ${Number(order.tipAmount || 0).toFixed(2)}</p>
                {editingTipOrderId === order.receiptNumber ? (
                  <div>
                    <input
                      type="number"
                      value={newTip}
                      onChange={(e) => setNewTip(e.target.value)}
                      placeholder="Enter new tip"
                    />
                    <button onClick={() => handleSaveTip(order.receiptNumber)}>Save</button>
                    <button onClick={() => setEditingTipOrderId(null)}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingTipOrderId(order.receiptNumber)}>Edit Tip</button>
                )}
              </div>
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
  );
};

export default FinalizedOrders;
