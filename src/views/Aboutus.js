'use client';

import React from 'react'
import '../styles/global.css';
const Empoweringpic = "/images/Augastam_img.png";

const impactthree = "/images/impactthree.png";
const impactfore = "/images/impactfore.png";
const impacttwo = "/images/impacttwo.png";
const impact = "/images/impact.png";
const award = "/images/award.png";
const awardtwo = "/images/awardtwo.png";
const awardthree = "/images/awardthree.png";
const award_icon = "/images/award-icon.png";

const officeem = "/images/officeem.png";
const officeemtwo = "/images/officeemtwo.JPG";
const officeemthree = "/images/officeemthree.png";
const officeemfore = "/images/officeemfore.JPG";
const btmBanner1 = "/images/got-question-image.png";
import InputWithSend from '../components/common/Input/InputWithSend';
import AOS from "aos";
import "aos/dist/aos.css";


function Aboutus() {
  return (
    <>

        <section className='box-aboutop'>
            <div className='box-about-bann' data-aos="fade-up">
                <h2>About Us</h2>
                <p>With 32+ years in healthcare IT, Akhil Systems helps hospitals, clinics, and diagnostics shift from manual to digital operations. Our HIS, EMR, and cloud solutions simplify workflows, enhance patient care, and support smarter decision-making.</p>
                <div className='box-about-bann-panel'>
                    <div className='box-about-card-r'>
                    <img src={officeem} alt='' />
                    </div>
                    <div className='box-about-card'>
                    <img src={officeemtwo} alt='' />
                    </div>
                    <div className='box-about-card'>
                    <img src={officeemthree} alt='' />
                    </div>
                    <div className='box-about-card-r'><img src={officeemfore} alt='' /></div>
                </div>
            </div>
            <div className='box-about-col'></div>
        </section>
        <section className='box-aboutmiddle'>
            <div className='box-about-mid'>
                <h2 data-aos="fade-up">32+ years of expertise in Healthcare IT, 
                    specializing in advanced <br/>Hospital Information Systems (HIS/HIMS).</h2>
                    <p data-aos="fade-up">Established in 1994 and headquartered in Gurgaon, Akhil Systems Pvt. Ltd. (ASPL) is an ISO/IEC 27001:2013 certified leader in Healthcare IT, delivering innovative Health Information Systems that transform both clinical and administrative operations for organizations of all sizes.</p>
                    <div className='box-about-it' data-aos="zoom-in">
                        <div className='box-about-it-left'>
                            <p>Healthcare at Your Fingertips</p>
                            <h2>Empowering Healthcare Networks Across the Globe</h2>
                            <p>Operating in 24+ states and 12 countries, Akhil Systems connects hospitals, clinics, and diagnostics with secure, scalable healthcare IT solutions.</p>
                            <a href='#void' className='getStared'>Get Started</a>
                        </div>
                        <div className='box-about-it-right'>
                        <img src={Empoweringpic} alt='' />
                        </div>
                    </div>
            </div>
        </section>
        <section className='box-our-Impact'>
            <div className='box-Impact-col'>
            <div className='box-Impact' data-aos="fade-up">
                <h2>Our Impact in Healthcare IT</h2>
                <p>For over three decades, Akhil Systems has been a trusted leader in Healthcare IT, with our solutions powering 600+ hospitals across India and overseas.</p>
                
            </div>
            <div className='box-Impact-it' data-aos="fade-up">
                    <div className='box-Impact-card'>
                    <h3>
                        <span><img src={impact} alt='' /></span>
                        Leading HIS Provider
                    </h3>
                    <p>India’s most trusted HIS vendor with 400+ successful implementations across hospitals, clinics, and medical colleges in India and overseas.</p>
                    </div>
                    <div className='box-Impact-card'>                    
                    <h3><span><img src={impacttwo} alt='' /></span>
                        Flexible & Scalable Solutions</h3>
                    <p>From 20 to 2000 beds, our HIS adapts to hospitals of every size, running 24/7 reliably for over two decades.</p>
                    </div>
                    <div className='box-Impact-card'>
                    <h3><span><img src={impactthree} alt='' /></span>
                    Proven Rapid Deployment
                    </h3>
                    <p>Achieved one of the fastest HIS go-lives in just 60 days at Saket City Hospital, ensuring quick ROI for healthcare facilities.</p>
                    </div>
                    <div className='box-Impact-card'>
                    <h3><span><img src={impactfore} alt='' /></span>
                        Trusted by Leading Networks
                        </h3>
                        <p>Powering multi-location operations for Apollo, Aster DM, Evercare, Marengo Asia, Paras, and Motherhood hospitals worldwide.</p>
                    </div>
                </div>
                </div>
        </section>
        <section className='bg-award' data-aos="zoom-in">
            <div className='box-award'>
                <div className='award-left'>
                    <h2>Committed to Security and Global Standards</h2>
                    <p>All Akhil Systems solutions adhere to international healthcare standards including NABH, NABL, JCI, and HIPAA. Built on secure HL7 protocols and ISO/IEC 27001:2013 certified infrastructure, our platforms ensure reliable data protection, regulatory compliance, and safe patient information management.</p>
                    <img src={award} alt='' />
                    <img src={awardtwo} alt='' />
                    <img src={awardthree} alt='' />
                </div>
                <div className='award-right'>
                <img src={award_icon} alt='' />                
                </div>
            </div>
        </section>
        <section className='box-ab' data-aos="fade-up">
          <div className='btm-banner'>            
                <div className='btm-banner-left'>
                    <h2 className='text-left pt-0'>Got Questions?<span></span><br /> We’ve Got You Covered</h2>
                    <p className='text-left'>Discover answers to frequently asked questions about Augastam’s capabilities, benefits, and support.</p>
              
                    <div className='box-letfuture-inp mt-4'><InputWithSend /></div>
                </div>

                <div className='btm-banner-right'>
                    <img src={btmBanner1} alt='' />
                </div>
                
                </div>
    </section>

        
    </>
    )
}
        export default Aboutus;
   