'use client';

import React from 'react';
import SwiperGallery from "./SwiperGallery";

const CultureSection = React.memo(function CultureSection() {
  return (
    <section>
      <div className='container-fluid box-wrapper'>
        <div className='row more-than'>
          <div className='col-md-12'>
            <div className='box-carehands'>
              <h2 className='text-center' data-aos="fade-up">More Than Work We Build a Culture</h2>
              <p data-aos="fade-up">At Akhil Systems, we thrive on diversity, inclusion, and togetherness. From festive moments to team milestones, every celebration reflects the vibrant culture that powers our innovation and care.</p>
            </div>
            <SwiperGallery />
          </div>
        </div>
      </div>
    </section>
  );
});

export default CultureSection;