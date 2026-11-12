'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';

const Dashboard = "/images/AugastamDashboardScreen.png";
const Ophthalmology = "/images/AugastamOpthScreen.png";
const SplitScreen = "/images/AugastamSplitScreen.png";
const MocIcon_1 = "/images/mocIcon_1.png";
const MocIcon_2 = "/images/mocIcon_2.png";
const MocIcon_3 = "/images/mocIcon_3.png";
const MocIcon_4 = "/images/mocIcon_4.png";
const MocIcon_5 = "/images/mocIcon_5.png";
const AugIcon_1 = "/images/AugIcon_1.png";
const AugIcon_2 = "/images/AugIcon_2.png";
const AugIcon_3 = "/images/AugIcon_3.png";
const AugIcon_4 = "/images/AugIcon_4.png";
const AugIcon_5 = "/images/AugIcon_5.png";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MoonIcon } from 'lucide-react';

const ProductTabComponent = () => {
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
    tab1: [Dashboard, Ophthalmology],
    tab2: [Ophthalmology, SplitScreen],
  };

  return (
    <div className="tabs-container">
      {/* 🔘 Tab Buttons */}
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab1')}
        >
          Miracle on Cloud (MOC)
        </button>
        <button
          className={`tab-btn ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab2')}
        >
          Augastam
        </button>        
      </div>

      {/* 🖼 Tab Content */}
      <div className="tab-content-wrapper">
        <Slider key={activeTab} {...sliderSettings} className="custom-slider" style={{display:'none'}}>
          {tabData[activeTab].map((img, i) => (
            <div key={i} className="slide-item">
              {/* <img src={img} alt={`Slide ${i + 1}`} className="img-fluid" /> */}
            </div>
          ))}
        </Slider>

        {/* 📝 Content Sections for MOC and Augastam */}
        <div className="product-content-section">
          {activeTab === 'tab1' ? (
            // Miracle on Cloud (MOC) Content
            <div className="moc-content">
              <p>A complete Hospital Information System (HIS) built to digitalize hospital operations end to end.
NABH-accredited and compliant with Indian healthcare data standards.</p>
              <div className="features-grid">
                <div className="feature-item">
                  <i className='fa fa-edit'></i>
                  <img src={MocIcon_1} />
                  <h4>Technology</h4>
                  <p>100% cloud-hosted platform—no servers required, with automatic backups and secure login. Subscription-based (pay-as-you-go) with flexible plans and low implementation cost.</p>
                </div>
                
                <div className="feature-item">
                  <img src={MocIcon_2} />
                  <h4>Core Features</h4>
                  <p>Designed for patients, doctors, and hospital management, enabling seamless collaboration across all stakeholders. Covers IPD/OPD management, billing, analytics, reports, and patient communication in one ecosystem.</p>
                </div>
                
                <div className="feature-item">
                  <img src={MocIcon_3} />
                  <h4>Who it Works for</h4>
                  <p>Ideal for multi-hospital networks or healthcare chains expanding nationally or globally. Ready-to-use solution; requires minimal setup and quick onboarding.</p>
                </div>
                
                <div className="feature-item">
                  <img src={MocIcon_4} />
                  <h4>Technical Capabilities</h4>
                  <p>Includes payment gateways, auto-email, THB analytics, and built-in apps for patients and doctors.</p>
                </div>

                 <div className="feature-item">
                  <img src={MocIcon_5} />
                  <h4>Why Choose</h4>
                  <p>Delivers cost efficiency, operational visibility, and simplified management through a cloud-based digital ecosystem.</p>
                </div>
              </div>
              
              
            </div>
          ) : (
            // Augastam Content
            <div className="augastam-content">
              <p>An Electronic Medical Record (EMR) Software and Clinical Dashboard
designed to enhance doctors’ efficiency and decision-making.</p>
              
              
               <div className="features-grid">
             
                
                <div className="feature-item">
                  <img src={AugIcon_1} />
                  <h4>Technology</h4>
                  <p>Modular or licensed model, customizable per user or department. Modular EMR platform with configurable dashboards and tab-based wrapper design for intuitive navigation.</p>
                </div>
                
                <div className="feature-item">
                  <img src={AugIcon_2} />
                  <h4>Core Features</h4>
                  <p>Fully configurable dashboards, workflows, and templates tailored to individual doctor preferences. Focuses on clinical workflows—vitals, prescriptions, test orders, patient history, and care protocols.</p>
                </div>

                 <div className="feature-item">
                  <img src={AugIcon_3} />
                  <h4>Who it Work For</h4>
                  <p>Doctor-first UI/UX emphasizing minimal clicks, real-time data visualization, and multilingual printouts. Built exclusively for doctors and clinicians to manage and analyze patient data seamlessly.</p>
                </div>
                
                <div className="feature-item">
                  <img src={AugIcon_4} />
                  <h4>Technical Capabilities</h4>
                  <p>Offers interactive graphs, trend analysis, and epidemic-ready care plans for informed clinical decisions. Supports speech-to-text, medical illustrations, and pediatric vitals tracking.</p>
                </div>

                 <div className="feature-item">
                  <img src={AugIcon_5} />
                  <h4>Why Choose</h4>
                  <p>Empowers doctors with a paperless, data-driven environment that reduces administrative effort and enhances patient care.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTabComponent;