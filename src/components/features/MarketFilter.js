'use client';

import React, { useState } from "react";

const data = [
  { id: 1, name: "Finance", category: "Finance" },
  { id: 2, name: "Pharmacy", category: "Pharmacy" },
  { id: 3, name: "Machine Integration", category: "Machine Integration" },
  { id: 4, name: "Sales", category: "Sales" },
  { id: 5, name: "Marketing", category: "Marketing" },
  { id: 6, name: "Analytics", category: "Analytics" },
  { id: 7, name: "Customer Service", category: "Customer Service" },
  { id: 8, name: "Productivity", category: "Productivity" },
  { id: 9, name: "IT & Administration", category: "IT & Administration" },
];

function MarketFilter() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ["Finance", "Pharmacy", "Machine Integration", "Sales", "Marketing", "Analytics", "Customer Service", "Productivity", "IT & Administration"];

  // Toggle checkbox
  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter data
  const filteredData =
    selectedCategories.length === 0
      ? data
      : data.filter((item) => selectedCategories.includes(item.category));

  return (
    <div className="filter-box">
      <h3>Filter by Category<span className="filter-arrow"></span></h3>

      {/* Checkboxes */}
      {categories.map((cat) => (
        <p key={cat}><label style={{ marginRight: "15px" }}>
          <input
            type="checkbox"
            value={cat}
            checked={selectedCategories.includes(cat)}
            onChange={() => handleCheckboxChange(cat)}
          />
          {cat}
        </label></p>
      ))}

      {/* Filtered Data */}
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            {item.name} ({item.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MarketFilter;
