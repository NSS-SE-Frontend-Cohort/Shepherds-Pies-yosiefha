import React from "react";

const SearchResults = ({ results }) => (
  <div className="search-results">
    <h2>Search Results</h2>
    <ul>
      {results.map((result) => (
        <li key={result.receiptNumber}>
          Receipt: {result.receiptNumber} | Total: ${result.totalPrice}
        </li>
      ))}
    </ul>
  </div>
);

export default SearchResults;
