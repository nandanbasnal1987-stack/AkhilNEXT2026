'use client';

import React from "react";
const bg_career = "/images/bg-career.png";
import PrivacyAccordion from "../components/features/PrivacyAccordion";

function PrivacyPolicy2() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-client mb-5">
        <img src={bg_career} alt="client background" />
        <div className="box-clients-details" data-aos="fade-up">
          <h2>Privacy Policy</h2>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="container mb-5">
        <div className="row">
          <PrivacyAccordion />
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy2;