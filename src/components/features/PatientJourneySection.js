'use client';

import React from 'react';
const patientjour = "/images/img-miss.webp";
const patientjourtwo = "/images/img-misstwo.webp";
const patientjourthree = "/images/img-missthree.webp";

const PatientJourneySection = React.memo(function PatientJourneySection() {
  return (
    <section className="box-whatall-prov-p-tb">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="box-phlebo-prov">
              <h2 data-aos="fade-up">Keep Your Self Updated</h2>
              <p data-aos="fade-up">We envision technology seamlessly enhancing healthcare, delivering efficient, personalized care for all.</p>
            </div>
            <div className="box-phlebo-doc-item" data-aos="fade-up">
              <div className="item-col-phlebo">
                <div className="box-phlebo-card">
                  <img src={patientjour} alt='Patient Journey Digitization Image' loading='lazy' className='box-value-pic' />
                </div>
                <h2>Patient Journey Digitization</h2>
                <p>Clinical decision support integration</p>
              </div>
              <div className="item-col-phlebo">
                <div className="box-phlebo-card">
                  <img src={patientjourtwo} alt='Smart EMR Management Image' loading='lazy' className='box-value-pic' />
                </div>
                <h2>Smart EMR Management</h2>
                <p>Configurable clinical templates for OPD, IPD, ER, etc.</p>
              </div>
              <div className="item-col-phlebo">
                <div className="box-phlebo-card">
                  <img src={patientjourthree} alt='Integration and Interoperability Image' loading='lazy' className='box-value-pic' />
                </div>
                <h2>Integration and Interoperability</h2>
                <p>Interfacing with LIS, RIS, PACS, pharmacy, billing, and inventory</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default PatientJourneySection;