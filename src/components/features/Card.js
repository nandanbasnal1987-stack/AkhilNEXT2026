'use client';

import React from "react";
import Link from "next/link";

function Card({ id, imag, title, desc }) {
  return (
    <div className="col-md-4">
      <div className="card h-100 shadow-sm">
        <img src={imag} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc.substring(0, 80)}...</p>
          <Link href={`/blog/${id}`} className="btn btn-primary">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
