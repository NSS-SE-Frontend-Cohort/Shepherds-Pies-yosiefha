import React, { useState } from "react";

const SearchOrders = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    date: "",
    receiptNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  return (
    <div>
      <h3>Search Orders</h3>
      <form onSubmit={handleSearch}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={searchCriteria.date}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Receipt Number:
          <input
            type="text"
            name="receiptNumber"
            value={searchCriteria.receiptNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchOrders;
