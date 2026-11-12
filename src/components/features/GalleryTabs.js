'use client';

import React, { useState, useRef, useEffect } from "react";

function GalleryTabs({ tabs = [], defaultIndex = 0, lazy = true, className = "" }) {
  const [active, setActive] = useState(defaultIndex);
  const tabsRef = useRef([]);

  useEffect(() => {
    tabsRef.current[active]?.focus();
  }, [active]);

  const onKeyDown = (e) => {
    const max = tabs.length - 1;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => (i === max ? 0 : i + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => (i === 0 ? max : i - 1));
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="box-tab-btn" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => (tabsRef.current[i] = el)}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
            className={`box-tabtn ${active === i ? "active" : ""}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {tabs.map((tab, i) => (
  <section
    key={tab.id}
    hidden={active !== i}
    className={`box-gallerypic box${i + 1} ${
      active === i ? "block" : "hidden"
    }`}
  >
    {lazy ? (active === i ? tab.content : null) : tab.content}
  </section>
))}
    </div>
  );
}

export default GalleryTabs;