'use client';

import React, { useState, useRef, useEffect } from "react";
import SalaryRange from "./SalaryRange.js";

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", display: "none" }}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ title, children, isOpen, onClick }) {
  const [height, setHeight] = useState("0px");
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="box-filter-panel border-b">
      <button
        onClick={onClick}
        className="box-filter-col w-full flex justify-between items-center py-2 font-semibold"
      >
        {title}
        <span
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            fontSize: "18px",
          }}
        >
          +
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          height,
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
      >
        <div style={{ padding: "12px", fontSize: "14px", background: "#fff" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function CheckboxItem({ label, count }) {
  return (
    <label
      className="flex justify-between items-center cursor-pointer py-1"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <span>
        <input type="checkbox" style={{ marginRight: "8px" }} /> {label}
      </span>
      <span style={{ color: "#666" }}>({count})</span>
    </label>
  );
}

// Example usage
export default function App() {
  // ---- JOB DATA ----
  const jobs = [
    { id: 1, title: "UX Designer", designation: "UX, Design & Architecture", location: "Delhi / NCR", exp: "3–6 Years" },
    { id: 2, title: "Frontend Engineer", designation: "Engineering - Software & QA", location: "Bengaluru", exp: "0–2 Years" },
    { id: 3, title: "Marketing Manager", designation: "Marketing & Communication", location: "Mumbai (All Areas)", exp: "5–10 Years" },
    { id: 4, title: "Sales Executive", designation: "Sales & Business Development", location: "New Delhi", exp: "0–2 Years" },
    { id: 5, title: "QA Engineer", designation: "Engineering - Software & QA", location: "Delhi / NCR", exp: "3–6 Years" },
    { id: 6, title: "AI Solutions Architect", designation: "Senior AI Solutions Architect", location: "Gurugram", exp: "5–8 Years" },
  ];

  // ---- DYNAMIC COUNTS ----
  const designationCounts = getCounts(jobs, "designation");
  const locationCounts = getCounts(jobs, "location");
  const expCounts = getCounts(jobs, "exp");

  const data = [
    {
      id: 1,
      title: "Job Designation",
      content: (
        <div>
          {Object.entries(designationCounts).map(([label, count]) => (
            <CheckboxItem key={label} label={label} count={count} />
          ))}
        </div>
      ),
    },
    {
      id: 2,
      title: "Location",
      content: (
        <div>
          {Object.entries(locationCounts).map(([label, count]) => (
            <CheckboxItem key={label} label={label} count={count} />
          ))}
        </div>
      ),
    },
    {
      id: 3,
      title: "Experience Level",
      content: (
        <div>
          {Object.entries(expCounts).map(([label, count]) => (
            <CheckboxItem key={label} label={label} count={count} />
          ))}
        </div>
      ),
    },
    {
      id: 4,
      title: "Salary Range",
      content: <SalaryRange />,
    },
  ];

  return <Accordion items={data} />;
}

// ---- helper function ----
function getCounts(jobs, key) {
  return jobs.reduce((acc, job) => {
    acc[job[key]] = (acc[job[key]] || 0) + 1;
    return acc;
  }, {});
}
