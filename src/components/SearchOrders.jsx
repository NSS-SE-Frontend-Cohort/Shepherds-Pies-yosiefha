import React, { useState } from "react";

const SearchOrders = ({ setSearchResults }) => {
  const [criteria, setCriteria] = useState({ date: "", receiptNumber: "" });

  // Determine if the search button should be enabled
  const isSearchEnabled = criteria.date || criteria.receiptNumber;

  const handleSearch = async () => {
    const { date, receiptNumber } = criteria;

    if (!date && !receiptNumber) {
      alert("Please provide search criteria");
      return;
    }

    const queryParams = new URLSearchParams();
    if (date) {
      queryParams.append("date", formatDate(date));
    }
    if (receiptNumber) {
      queryParams.append("receiptNumber", receiptNumber);
    }

    try {
      const response = await fetch(`http://localhost:8088/orders?${queryParams}`);
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
        if (results.length === 0) {
          alert("No results found for the given criteria.");
        }
      } else {
        alert("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error searching orders:", error);
      alert("An error occurred while searching. Please try again.");
    }
  };

  // Format the date to MM/DD/YYYY if provided
  const formatDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-"); // Split YYYY-MM-DD format
    return `${parseInt(month)}/${parseInt(day)}/${year}`; // Return MM/DD/YYYY format
  };

  return (
    <div>
      <h2>Search Orders</h2>
      <input
        type="date"
        value={criteria.date}
        onChange={(e) => setCriteria({ ...criteria, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Receipt Number"
        value={criteria.receiptNumber}
        onChange={(e) => setCriteria({ ...criteria, receiptNumber: e.target.value })}
      />
      <button 
        onClick={handleSearch} 
        disabled={!isSearchEnabled}
      >
        Search
      </button>
    </div>
  );
};

export default SearchOrders;
