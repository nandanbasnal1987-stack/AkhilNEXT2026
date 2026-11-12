'use client';

import React, { useState, useRef, useEffect } from "react";

const SalaryRange = () => {
  const salaryRanges = [
    "0L – 2L",
    "2L – 4L",
    "4L – 6L",
    "6L – 8L",
    "8L – 10L",
    "10L – 13L",
  ];

  const [selected, setSelected] = useState("");

  const handleCheckboxChange = (range) => {
    setSelected(range === selected ? "" : range); // deselect if clicked again
  };

  return (
    <div className="box-checkboxlist">
       {salaryRanges.map((range) => (
        <label key={range} >
          {range}
          <input
            type="checkbox"
            checked={selected === range}
            onChange={() => handleCheckboxChange(range)}
          />
        </label>
      ))}
    </div>
  );
};

export default SalaryRange;