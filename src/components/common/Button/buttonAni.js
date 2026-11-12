'use client';

import React from 'react';
import '../../../styles/global.css';

const AnimatedButton = ({ children }) => {
  return (
    <button className="demo-btn mt-4">
      {children}
      <span className="demo-arrow"></span>
    </button>
  );
};

export default AnimatedButton;
