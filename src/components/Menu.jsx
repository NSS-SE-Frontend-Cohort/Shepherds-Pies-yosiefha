import React, { useEffect, useState } from "react";
import "../styles/Menu.css"; // Add this import for the CSS styling

const Menu = ({ onAddToOrder }) => {
  const [menu, setMenu] = useState(null);
  const [selectedItems, setSelectedItems] = useState({
    size: null,
    cheese: null,
    sauce: null,
    toppings: [],
  });

  // Fetch menu data from the JSON server
  useEffect(() => {
    fetch("http://localhost:8088/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data))
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  if (!menu) {
    return <p>Loading menu...</p>;
  }

  // Handlers for selection
  const handleSizeChange = (size) => setSelectedItems((prev) => ({ ...prev, size }));
  const handleCheeseChange = (cheese) => setSelectedItems((prev) => ({ ...prev, cheese }));
  const handleSauceChange = (sauce) => setSelectedItems((prev) => ({ ...prev, sauce }));
  const handleToppingToggle = (topping) => {
    setSelectedItems((prev) => {
      const toppings = prev.toppings.includes(topping)
        ? prev.toppings.filter((t) => t !== topping)
        : [...prev.toppings, topping];
      return { ...prev, toppings };
    });
  };

  // Add the current selection to the order
  const handleAddToOrder = () => {
    if (!selectedItems.size || !selectedItems.cheese || !selectedItems.sauce) {
      alert("Please select size, cheese, and sauce.");
      return;
    }
    onAddToOrder(selectedItems);
    setSelectedItems({ size: null, cheese: null, sauce: null, toppings: [] });
  };

  return (
    <div className="menu-container">
      <h1>🍕 Shepherd's Pies Menu 🍕</h1>

      <div className="menu-columns">
        {/* Left Column */}
        <div className="menu-column">
          <section>
            <h2>Sizes</h2>
            {menu.sizes.map((size, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="size"
                  value={size.size}
                  checked={selectedItems.size === size.size}
                  onChange={() => handleSizeChange(size.size)}
                />
                {size.size} ({size.description}) - ${size.price.toFixed(2)}
              </div>
            ))}
          </section>

          <section>
            <h2>Cheese Options</h2>
            {menu.cheeses.map((cheese, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="cheese"
                  value={cheese}
                  checked={selectedItems.cheese === cheese}
                  onChange={() => handleCheeseChange(cheese)}
                />
                {cheese}
              </div>
            ))}
          </section>

          <section>
            <h2>Sauce Options</h2>
            {menu.sauces.map((sauce, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="sauce"
                  value={sauce}
                  checked={selectedItems.sauce === sauce}
                  onChange={() => handleSauceChange(sauce)}
                />
                {sauce}
              </div>
            ))}
          </section>
        </div>

        {/* Right Column */}
        <div className="menu-column">
          <section>
            <h2>Toppings ($0.50 each)</h2>
            {menu.toppings.map((topping, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name="topping"
                  value={topping.name}
                  checked={selectedItems.toppings.includes(topping.name)}
                  onChange={() => handleToppingToggle(topping.name)}
                />
                {topping.name}
              </div>
            ))}
          </section>
          <section>
        <h2>Order Preview</h2>
        <div>
          <p><strong>Size:</strong> {selectedItems.size || "None selected"}</p>
          <p><strong>Cheese:</strong> {selectedItems.cheese || "None selected"}</p>
          <p><strong>Sauce:</strong> {selectedItems.sauce || "None selected"}</p>
          <p>
            <strong>Toppings:</strong>{" "}
            {selectedItems.toppings.length > 0
              ? selectedItems.toppings.join(", ")
              : "None selected"}
          </p>
        </div>
      </section>
        </div>
      </div>

      

      <button onClick={handleAddToOrder}>Add to Receipt</button>
    </div>
  );
};

export default Menu;


