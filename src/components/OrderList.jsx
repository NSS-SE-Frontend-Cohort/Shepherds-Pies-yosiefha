
import React from "react";

const OrderList = ({ order }) => {

  const totalPrice = order.reduce((sum, pizza) => sum + parseFloat(pizza.price), 0);

  return (
    <div>
      {order.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <ul>
          {order.map((pizza, index) => (
            <li key={index}>
              <strong>Pizza {pizza.id}:</strong> {pizza.size} size, {pizza.cheese} cheese,{" "}
              {pizza.sauce} sauce, toppings: {pizza.toppings.join(", ")} - ${pizza.price}
            </li>
          ))}
        </ul>
      )}
      {order.length > 0 && (
        <p>
          <strong>Subtotal: ${totalPrice.toFixed(2)}</strong>
        </p>
      )}
    </div>
  );
};

export default OrderList;


