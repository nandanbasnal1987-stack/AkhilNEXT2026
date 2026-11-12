'use client';

import React from "react";

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  if (index === null) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <div
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="nav-btn prev-btn" onClick={onPrev}>
          ❮
        </button>

        <img
          src={items[index]?.image}
          alt={items[index]?.title}
        />

        <button className="nav-btn next-btn" onClick={onNext}>
          ❯
        </button>

        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}

export default Lightbox;