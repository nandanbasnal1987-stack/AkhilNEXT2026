'use client';

// SearchPage.js
import React, { useState } from 'react';
import Link from "next/link";
import { pageData } from './pageContent';

function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredPages = pageData.filter((page) => {
    const q = query.toLowerCase();
    return (
      page.title.toLowerCase().includes(q) ||
      page.description.toLowerCase().includes(q) ||
      page.keywords.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Pages</h2>
      <input
        type="text"
        placeholder="Search page content..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '300px',
          padding: '0.5rem',
          marginBottom: '1rem',
          border: '1px solid #ccc'
        }}
      />
      <ul>
        {filteredPages.length > 0 ? (
          filteredPages.map((page, index) => (
            <li key={index} style={{ marginBottom: '1rem' }}>
              <Link href={page.path}><strong>{page.title}</strong></Link>
              <p>{page.description}</p>
            </li>
          ))
        ) : (
          <li>No results found.</li>
        )}
      </ul>
    </div>
  );
}

export default SearchPage;
