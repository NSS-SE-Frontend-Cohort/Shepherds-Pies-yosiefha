const fetchFinalizedOrders = async (setFinalizedOrders) => {
    try {
      const response = await fetch("http://localhost:8088/orders");
      if (response.ok) {
        const orders = await response.json();
        setFinalizedOrders(orders.slice(-5) || []);
      } else {
        setFinalizedOrders([]);
      }
    } catch (error) {
      setFinalizedOrders([]);
    }
  };

  export default fetchFinalizedOrders;
  