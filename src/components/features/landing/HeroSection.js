'use client';

import React, { useState } from 'react';
import GetInfo from '../../features/GetInfo';
import ConnectUs from '../../features/ConnectUs';

//import ContactForm from './ContactForm';


const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="home_section pb-5" id="home-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-12 col-md-12">
            <div className="home_content">
              <div>
                <h1 className="mb-3">
                  Revolutionizing <span>Healthcare</span> for 31 Years
                </h1>
                <h4>Now with AI-integrated EMR & HIS Solutions</h4>
                <div>
                  <p>Our Legacy Hospital Management Software Assist Doctors With Features:</p>
                  <ul className="p-0" style={{listStyle: 'none'}}>
                    <li>IPD/OPD Scheduling</li>
                    <li>Patient Call Integration</li>
                    <li>Smart Tab Navigation</li>
                    <li>Discharge Summary Editor</li>
                    <li>Streamlined User Interface</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <button className="main_btn" onClick={() => setShowModal(true)}>
                    Connect with Us<i className="fa-solid fa-angles-right ps-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-6 col-lg-12 col-md-12 mt-lg-0 mt-5">
            <div className="talk_form_box" style={{background: '#ffffff9c', borderRadius: '20px'}}>

              <ConnectUs />
             
            </div>
          </div>
        </div>
      </div>
      
      {showModal && (
        <div className="modal show" style={{display: 'block'}}>
          <div className="modal-dialog" style={{marginTop: '9%'}}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="talk_form_box_remove p-1_remove" style={{boxShadow: 'none !important'}}>
                <ConnectUs />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;