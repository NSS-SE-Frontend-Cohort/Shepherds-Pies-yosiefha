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
    <div className="search-orders">
        <h3>Search Orders</h3>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              id="date"
              type="date"
              name="date"
              value={searchCriteria.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="receiptNumber">Receipt Number:</label>
            <input
              id="receiptNumber"
              type="text"
              name="receiptNumber"
              value={searchCriteria.receiptNumber}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Search</button>
        </form>
    </div>


  );
};

export default SearchOrders;
