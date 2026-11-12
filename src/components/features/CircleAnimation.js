'use client';

import React, { useEffect, useRef } from "react";

const CircleAnimation = () => {
  const pathRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const circle = circleRef.current;
    const pathLength = path.getTotalLength();
    const halfLength = pathLength / 2;

    let progress = 0;
    let direction = 1;

    const animate = () => {
      const point = path.getPointAtLength(progress);
      circle.setAttribute("cx", point.x);
      circle.setAttribute("cy", point.y);

      progress += direction * 1;

      if (progress >= halfLength || progress <= 0) {
        direction *= -1;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <svg className="animate-circle" viewBox="0 0 500 200" style={{ width: "100%", height: "300px" }}>
      {/* Curved Paths */}
      <path
        ref={pathRef}
        id="curve"
        d="M30,200 Q150,90 300,190"
        fill="none"
        stroke="#A9BBD2"
        strokeWidth="1"
      />
      {/* Moving Circle */}
      <circle ref={circleRef} r="6" fill="#C9D0DA" />
    </svg>
  );
};

export default CircleAnimation;
