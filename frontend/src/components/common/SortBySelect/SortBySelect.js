import React from "react";
import "./SortBySelect.css";

const SortBySelect = ({ onSortBy, sortBy, sorts }) => {
  const handleChange = (e) => {
    onSortBy(e.target.value);
  };

  return (
    <div className="container">
      <label className="label">Sort by:</label>
      <select value={sorts[sortBy]} onChange={handleChange} className="select">
        {Object.keys(sorts).map((sortName, i) => (
          <option value={sorts[sortName]} key={i}>
            {sorts[sortName]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBySelect;
