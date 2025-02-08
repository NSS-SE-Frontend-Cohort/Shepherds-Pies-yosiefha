const fetchFinalizedOrders = async (setFinalizedOrders) => {
  try {
    const response = await fetch("http://localhost:8088/orders");

    if (!response.ok) {
      throw new Error("Failed to fetch finalized orders");
    }

    let orders = await response.json();

    // Sort orders in descending order by timestamp (latest first)
    orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFinalizedOrders(orders.slice(0, 5)); // Keep only latest 5 orders
  } catch (error) {
    console.error("Error fetching finalized orders:", error);
  }
};

export default fetchFinalizedOrders;

  