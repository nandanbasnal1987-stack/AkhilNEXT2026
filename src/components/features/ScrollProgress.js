'use client';

import React, { useEffect, useState } from 'react';
//import './ScrollProgress.css'; // CSS extracted into a separate file

const ScrollProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = Math.min((scrollTop / scrollHeight) * 100, 100);
    setScrollPercent(percent);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // initial update

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="app">

      <div
        className="progress"
        onClick={scrollToTop}
        style={{ '--scroll-progress': `${scrollPercent}%` }}
      >
        <div className="progress-inner">
          <div className="arrow2"></div>
          <div className="percentage hidden">{Math.round(scrollPercent)}%</div>
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
