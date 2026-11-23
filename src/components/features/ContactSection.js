'use client';

import React from 'react';
const HealthcareTogetherImage = "/images/HealthcareTogetherImage.webp";
import ContactButton from "../../components/common/Button/ContactButton";

const ContactSection = React.memo(function ContactSection() {
  return (
    <section className='plr-60' style={{marginBottom: '0px',marginTop: '0px'}}>
      <div className='container box-wrapper' style={{width:'1100px'}}>
        <div className='row'>
          <div className='col-md-12 box-letfuture'>
            <div className='row'>
              <div className='col-md-6 box-letfuture-left'>
                <h2 data-aos="fade-up">Let&apos;s Build the Future of Healthcare Together</h2>
                <p data-aos="fade-up">
                  Have questions, need a demo, or ready to transform your hospital&apos;s operations? Share your details — our team will reach out with the right solution, tailored to your goals.
                  <span className='mt-4' style={{'display':'block'}}> <ContactButton /></span>
                </p>
              </div>
              <div className='col-md-6 box-letpic'> <img src={HealthcareTogetherImage} loading='lazy' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactSection;