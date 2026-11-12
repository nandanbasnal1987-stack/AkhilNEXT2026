'use client';

import React from 'react';
const sectionDivider = "/images/headerBtmLine.png";


const logos = [
  "images/agh.png",
  "images/all-kind-hospital.png",
  "images/evercare-hospital.png",
  "images/healthub-solutions.png",
  "images/lagoon.png",
  "images/phs-group.png",
];

const TrustedByLeaders = () => {
  return (
    <section className="marquee_section_bg_2 pt-5 pb-5">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-9 col-lg-9">
            <div className="top_content_heading text-center">
              <h1 className="main_heading">Trusted by Industry Leader</h1>
              <img src={sectionDivider} alt="Section Divider" />
              <p className="pairagraph mt-2"></p>
            </div>
          </div>
        </div>

        <div className="marquee-container">
          <div className="marquee-track marquee-left">
            {[...logos, ...logos].map((logo, index) => (
              <div className="scroll-card" key={index}>
                <img
                  className="marquee-imgs"
                  src={logo}
                  alt="Client Logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByLeaders;
