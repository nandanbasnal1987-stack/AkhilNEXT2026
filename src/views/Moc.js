'use client';

import React from 'react'
const starIcon = "/images/logo-btmbg.png";
const DeskScreen2 = "/images/demo-screenshot-image.png";
const logoImage1 = "/images/aster-logo.png";
const logoImage2 = "/images/evercare-logo.png";
const logoImage3 = "/images/lagoon-logo.png";
const logoImage4 = "/images/alkindi-logo.png";
const logoImage5 = "/images/Healthhub-logo.png";
const logoImage6 = "/images/popular-logo.png";
import GrowWithAugastam from '../components/features/GrowWithAugastam';
const indhislis = "/images/1stimage.png";
const indhislistwo = "/images/2rdimage.png";
const indhislisthree = "/images/3thimage.png";

import InputWithSend from '../components/common/Input/InputWithSend';
import FaqAccordion from '../components/features/FaqAccordion';
import BlueBanner from '../components/features/BlueBanner'

import AugastamSlider from '../components/features/AugastamSlider';

function Moc(){
    return(
        <>
        <div className='box-decades product-container bg-miracle-cloud'>
        <div className='box-decades-col'>
            <div className='box-miracle-cloud' data-aos="fade-up">
                <h2>Your Hospital. <br /> Smarter </h2>
                <p>Miracle On Cloud unifies patient data, labs, prescriptions, and imaging in real time, accessible anywhere without server hassles or fragmented systems.</p>
                <a href='#void' className='getStared'>Schedule a Demo</a>



            </div>
        </div>

    </div>

    <div className='container-fluid logo-section p-60' data-aos="fade-up" style={{background: '#f6f7fe'}}>
    <h4>Trusted by many</h4>
    <AugastamSlider />
      <div className='star'><img src={starIcon} alt='Augastam Logo' /></div>
      
    </div>

    <section className='lightBlue pb-0' style={{background: '#f6f7fe'}}>
        <div className='container-fluid box-wrapper'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='box-carehands' data-aos="fade-up">
                        <h2 className='text-center'>See How Miracle On Cloud Works</h2>
                        <p className='text-center'>Miracle On Cloud transforms hospital workflows by linking patient records, lab results, and prescriptions into one smart platform. Access it anywhere, update in real time, and keep your clinical operations running without IT overhead.</p>
                        <div className='text-center ptb-60' data-aos="zoom-in">
                          <img src={DeskScreen2} alt='' className='img-fluid' />
                        </div>
                    </div>
                </div>

                
            </div>

        </div>
    </section>


    <section className='box-Smarter'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='box-moc-built' data-aos="fade-up">
                        <h2>Smarter Operations <br/>with Miracle On Cloud</h2>
                        <p>Bring together patient records, labs, billing, and clinical workflows in one cloud-native platform.</p>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='box-moc-oper' data-aos="fade-up">
                <div className='col-md-12'>
                <div className='box-mox-main'>
                    <div className='box-moc-left'>
                        <h2>India’s #1 HIS/LIS/EMR</h2>
                        <p>
                        A truly cloud-native hospital ecosystem combining HIS, LIS, and EMR in one intelligent platform. Secure, AI-driven, and built for real-time access no servers required.
                        </p>
                        <a href='#void' className='getStared'>Get Started</a>
                    </div>
                    <div className='box-moc-right'>
                        <div className='box-moc-right-col'>
                        <img src={indhislis} alt='' className='img-fluid' />
                        </div>
                    </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='box-mox-main'>
                    <div className='box-moc-left'>
                        <h2>Single Source of Management</h2>
                        <p>
                        A truly cloud-native hospital ecosystem combining HIS, LIS, and EMR in one intelligent platform. Secure, AI-driven, and built for real-time access no servers required.
                        </p>
                        <a href='#void' className='getStared'>Get Started</a>
                    </div>
                    <div className='box-moc-right'>
                        <div className='box-moc-right-col'>
                        <img src={indhislistwo} alt='' className='img-fluid' />
                        </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                <div className='box-mox-main'>
                    <div className='box-moc-left'>
                        <h2>Fast Time to Start</h2>
                        <p>
                        Get your hospital running on MOC quickly with rapid cloud deployment, minimal IT setup, and intuitive staff onboarding.
                        </p>
                        <a href='#void' className='getStared'>Get Started</a>
                    </div>
                    <div className='box-moc-right'>
                        <div className='box-moc-right-col'>
                        <img src={indhislisthree} alt='' className='img-fluid' />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>

    <GrowWithAugastam />

    <section className='lightBlue box-when-sec-trust'>
        <div className='box-when-sec-its-trust'>
            <div className='box-when-sec-its-trust-main'>
                        <div className='box-sec-tru-left' data-aos="fade-right">
                            <h2>When its about<br /> Security and Trust - </h2>
                            <p>Secure Cloud Infrastructure Designed for Healthcare</p>
                        </div>
                        <div className='box-sec-tru-right' data-aos="fade-left">
                            <ul>
                                <li><img src={logoImage1} alt='' className='img-fluid' /></li>
                                <li><img src={logoImage2} alt='' className='img-fluid' /></li>
                                <li><img src={logoImage3} alt='' className='img-fluid' /></li>
                            </ul>
                            <ul  style={{marginTop:'50px'}}>
                                <li><img src={logoImage4} alt='' className='img-fluid' /></li>
                                <li><img src={logoImage5} alt='' className='img-fluid' /></li>
                                <li><img src={logoImage6} alt='' className='img-fluid' /></li>
                            </ul>
                        </div>
                    </div>
                </div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12' style={{height: '300px'}}></div>
            </div>
        </div>
    </section>

      <section className='lightBlue box-moc-active' style={{paddingBottom: '0px'}}>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='box-moc-active-left' data-aos="fade-right">
                    <h2>Miracle on Cloud in Action</h2>
                    <h3>
                        <strong>Scalable and Flexible</strong>
                        <span>
                        Whether it’s a single clinic or a multi-branch hospital, MOC scales effortlessly with your operations
                        </span>
                        </h3>
                        <h3>
                            <strong>Trailblazer Success and Community</strong>
                            <span>Trusted by hospitals nationwide, 99% of our clients see faster ROI, improved workflows, and measurable patient care enhancements.</span>
                        </h3>
                    </div>



                <div className='box-moc-active-right'>


                    <div className='box-moc-active-right-first' data-aos="fade-up"><h2>50%</h2></div>
                    <div className='box-moc-active-right-first' data-aos="fade-up"><h2>50%</h2></div>
                    <div className='box-moc-active-right-first' data-aos="fade-up" style={{height:'340px'}}><h2>70%</h2></div>
                </div>
                </div>
            </div>
            </div>
        </section>

              

             

                  <FaqAccordion />  


        <BlueBanner />
    
       
        </>
    )
}

export default Moc;

