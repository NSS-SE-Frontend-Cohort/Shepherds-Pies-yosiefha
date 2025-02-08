const handleFinalizeOrder = async (data, order, setOrder, setFinalizedOrders) => {
  const { type, tableNumber, employeeNumber, tipAmount } = data;

  if (type === "Dine-In" && !tableNumber) {
      alert("Please provide a table number for dine-in orders.");
      return;
  }

  const totalPrice = order.reduce((sum, pizza) => sum + parseFloat(pizza.price), 0);
  const deliverySurcharge = type === "Delivery" ? 5 : 0;
  const finalTotal = totalPrice + deliverySurcharge + parseFloat(tipAmount || 0);

  const finalizedOrder = {
      receiptNumber: `REC-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      date: new Date().toLocaleDateString(),
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalizedOrder),
      });

      if (response.ok) {
          
          await fetchFinalizedOrders(setFinalizedOrders); // Fetch updated orders (sorted)
          alert("Order finalized and saved successfully!");
          setOrder([]); // Clear current order
      } else {
          alert("Failed to save the order.");
      }
  } catch (error) {
      console.error("Error saving order:", error);
  }
};
export default handleFinalizeOrder;