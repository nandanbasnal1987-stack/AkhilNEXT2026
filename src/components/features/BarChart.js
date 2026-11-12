'use client';

import React, { useState } from 'react'
import Slider from 'react-slick'
import banner3 from './Videos/HomeVideo.mp4'
const searchIcon = "/images/moc-icon.png";
const searchIcon2 = "/images/icon2.png";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import CircleAnimation from "./CircleAnimation";


const BarChart = () => {
  useEffect(() => {
    // Perform animation after component has mounted
    const bars = document.querySelectorAll('.bar');
    
    bars.forEach(bar => {
      const span = bar.querySelector('span');
      const percentage = parseInt(span.innerText, 10);
      const pElement = bar.querySelector('p');
      
      // Set the initial height to 0
      pElement.style.height = '0px';

      setTimeout(() => {
        // Animate the height of the bar based on the percentage
        pElement.style.transition = 'height 3.5s ease';
        pElement.style.height = `${percentage * 2.5}px`; // Scale the height to fit the bar (adjust multiplier if needed)

        // After the animation, fade in the percentage
        setTimeout(() => {
          span.style.transition = 'opacity 1s ease';
          span.style.opacity = 1;
        }, 3500);
      }, 500);
    });
  }, []);

  return (
    <div id="content">
      <ul>
        <li>
          <div className="bar one">
            <p><span>50%</span></p>
          </div><br />
        </li>
        <li>
          <div className="bar two">
            <p><span>50%</span></p>
          </div><br />
        </li>
        <li>
          <div className="bar three">
            <p><span>70%</span></p>
          </div><br />
        </li>
      </ul>
    </div>
  );
};

export default BarChart;