import React from "react";

const SearchResults = ({ results }) => (
  <div className="search-results">
    <h2>Search Results</h2>
    <ul>
      {results.map((result) => (
       <li key={result.receiptNumber} className="order-item">
       <strong>Receipt #{result.receiptNumber}</strong> | {result.type} | {result.timestamp} | Employee No. :{result.employeeNumber} | Table No. :{result.employeeNumber}
      
      <p>Total: ${Number(result.totalPrice || 0).toFixed(2)}</p>
      <p>Tip: ${Number(result.tipAmount || 0).toFixed(2)}</p>
      <ul>
        {result.items?.map((item, index) => (
          <li key={`${result.receiptNumber}-${index}`}>
            {item.size} pizza with {item.cheese}, {item.sauce}, toppings:{" "}
            {item.toppings?.join(", ")} - ${Number(item.price || 0).toFixed(2)}
          </li>
        ))}
      </ul>
    </li>
      ))}
    </ul>
  </div>
);

export default SearchResults;
