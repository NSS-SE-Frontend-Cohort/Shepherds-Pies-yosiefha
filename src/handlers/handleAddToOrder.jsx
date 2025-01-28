export const handleAddToOrder = (selectedItems, order, setOrder) => {
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
  export default handleAddToOrder;
  