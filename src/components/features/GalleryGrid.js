'use client';

import React from "react";

function GalleryGrid({ items, onImageClick }) {
  return (
    <div className="grid-container mt-5">

        <h2>A timeline of progress, innovation, and trust—driving meaningful change in <br /> healthcare for over three decades</h2>
        <div className="grid">
      {items.map((item, index) => (
        <div
          key={index}
          className="card"
          onClick={() => onImageClick(index)}
        >
          <img src={item.image} alt={item.title} />

          <div className="badge">Go Live</div>

          <div className="overlay">
            <div className="title">{item.title}</div>
            <div className="location">{item.location}</div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default GalleryGrid;