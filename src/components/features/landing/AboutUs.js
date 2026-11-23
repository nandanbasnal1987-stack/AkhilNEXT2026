'use client';

import React, { useState } from 'react';
// import aboutImage from '../../../assets/images/landing/ab'

const AboutUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className='about_section pb-5 mb-5'>
          <div className='container'>
            <div className='row align-items-center'>
        
              <div className='col-xl-5 col-lg-5 col-md-12'>
                <div className='about_img'>
                  {/* <img src={aboutImage} alt="About Us Image" /> */}
                </div>
              </div>
    
              <div className='col-xl-7 col-lg-7 col-md-12 mt-md-0 mt-4'>
                <div className='about_content padding_left'>
                  <h3 className='child_heading'>AKHIL SYSTEMS</h3>
                  <img src="images/heading.png" alt="Section Divider" />
        
                  <h1 className='main_heading'>
                    Why Choose Akhil Systems for 
                    <span style={{color:'#4b67c6'}}>Hospital Management Software</span>
                    in India?
                  </h1>
        
                  <p className='pairagraph mt-3 text_justify'>
                    At Akhil Systems, we understand that every healthcare setup is different — that’s why we offer adaptable Hospital Information System and Electronic Medical Record Software tailored to your workflow and goals.
                  </p>
        
                  <button className='main_btn' data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Know More<i className="fa-solid fa-angles-right"></i></button>
        
                </div>
              </div>
        
            </div>
          </div>
        </section>
  );
};

export default AboutUs;