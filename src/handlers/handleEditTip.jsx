
const handleEditTip = async (orderId, newTip, finalizedOrders, setFinalizedOrders) => {
    // Log to check if finalizedOrders is correctly passed
    console.log("finalizedOrders:", finalizedOrders);
    
    const orderToUpdate = finalizedOrders.find((order) => order.id === orderId);
    if (!orderToUpdate) {
        alert("Order not found!");
        return;
    }

    const oldTip = parseFloat(orderToUpdate.tipAmount);
    const baseTotal = parseFloat(orderToUpdate.totalPrice || 0) - oldTip;
    const newTipValue = parseFloat(newTip || 0);
    const updatedTotalPrice = baseTotal + newTipValue;

    setFinalizedOrders((prevOrders) =>
        prevOrders.map((order) =>
            order.id === orderId
                ? {
                    ...order,
                    tipAmount: newTipValue.toFixed(2),
                    totalPrice: updatedTotalPrice.toFixed(2),
                }
                : order
        )
    );

    try {
        const response = await fetch(`http://localhost:8088/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tipAmount: newTipValue.toFixed(2),
                totalPrice: updatedTotalPrice.toFixed(2),
            }),
        });

        if (response.ok) {
            const updatedOrder = await response.json();
            setFinalizedOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? updatedOrder : order
                )
            );
        } else {
            alert("Failed to update the backend.");
        }
    } catch (error) {
        alert("Error updating tip. Please try again.");
    }
};
export default handleEditTip;