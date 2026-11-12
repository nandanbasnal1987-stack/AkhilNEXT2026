'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';

const Dashboard = "/images/Smart-Clinical-Dashboard.png";
const Ophthalmology = "/images/AugastamOpthScreen.png";
const SplitScreen = "/images/AugastamSplitScreen.png";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import { Context } from 'react-helmet-async/lib/Provider';

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    centerMode: true,
    centerPadding: '0px',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 👇 different image sets for each tab
  const tabData = {
  tab1: {
    title: "Smart Clinical Dashboard",
    description: "Get a real-time view of patient flow, appointments, and key metrics—all in one place for faster, informed decisions.",
    images: [Dashboard],
  },
  tab2: {
    title: "Ophthalmology",    
    description: "Built to support detailed eye care workflows with structured templates, precise documentation, and specialty-specific insights.",
    images: [Ophthalmology],
  },
  tab3: {
    title: "Split Screen",    
    description: "cc ;fks;dfd",
    images: [SplitScreen],
  },
};

  return (
    <div className="tabs-container">
      {/* 🔘 Tab Buttons */}
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab1')}
        >
          Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab2')}
        >
          Ophthalmology
        </button>
        <button
          className={`tab-btn ${activeTab === 'tab3' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab3')}
        >
          Split Screen
        </button>
      </div>

      {/* 🖼 Tab Content */}
      <div className="tab-content-wrapper">
        <Slider key={activeTab} {...sliderSettings} className="custom-slider">
  {tabData[activeTab].images.map((img, i) => (
    <div key={i} className="slide-item box-slide-item">
      <div className='container-fluid no-pr'>
      <div className='row'>
        <div className='col-md-5'>
          <h2>{tabData[activeTab].title}</h2>
          <p>{tabData[activeTab].description}</p>
          <a href="/contact" className="box-btnitem">Explore Clinical EMR</a>
        </div>
        <div className='col-md-7'>
            <img src={img} alt={`Slide ${i + 1}`} className="img-fluid" />
        </div>
      </div>
      </div>
    </div>
  ))}
</Slider>
      </div>
    </div>
  );
};

export default TabComponent;
