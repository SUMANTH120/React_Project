import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search doctors, clinics, hospitals, etc." />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
