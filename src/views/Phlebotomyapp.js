'use client';

import React from 'react'
import '../styles/global.css';
import InputWithSend from '../components/common/Input/InputWithSend';
import FaqAccordion from '../components/features/FaqAccordion';
const bgphlebo = "/images/bg-phlebo.png";
const Phlebotomyappone = "/images/Phlebotomyappone.png";
const Phlebotomyapptwo = "/images/Phlebotomyapptwo.png";
const Phlebotomyappthree = "/images/Phlebotomyappthree.png";
const Phlebotomyappfore = "/images/Phlebotomyappfore.png";
const Ready = "/images/Ready.png";
const box_kick = "/images/box-kick.png";
const got_phlebo = "/images/got-phlebo.png";

function Phlebotomyapp() {
    return (
        <>       
     
        <div className="bg-phlebo">
        <div className="box-phlebo-detail" data-aos="fade-up">
            <h2>Track, Collect,<br /> Dispatch —<br /> <span>Without Any</span> Hassle</h2>
            <p>The Phlebo App is a powerful mobile tool designed to simplify and digitize the entire sample collection workflow for phlebotomists. From doorstep collection to final dispatch, the app ensures accuracy, speed, and efficiency eliminating paperwork and reducing delays.</p>
            <a href="#void" className="getStared text-left float-l" tabIndex="0">Get Started</a>
        </div>
        <div className="box-phlebo-view" data-aos="fade-right">
            <img src={bgphlebo} alt='image' />  
        </div>

    </div>

    <section className='bg-phlebotomy'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="box-built" data-aos="fade-up">
                        <h2>Sample Collection at Your Fingertips</h2>
                        <p>Whether you’re managing a high volume of home collections or ensuring error-free logistics, the Phlebo App empowers your team with the tools they need to deliver reliable and professional healthcare services at the patient’s doorstep.</p>
                    
                    <div className="box-built-item">
                        <div className="built-card">
                        <img src={Phlebotomyappone} alt='image' />
                            <h2>Assign & Unassign Apt.</h2>
                            <p>Flexibly manage your schedule with the ability to assign or unassign.</p>
                        </div>
                        <div className="built-card">
                        <img src={Phlebotomyapptwo} alt='image' />
                            <h2>View Patient Details</h2>
                            <p>Access complete patient info including demographics, test details, & appointment history.</p>
                        </div>
                        <div className="built-card">
                        <img src={Phlebotomyappthree} alt='image' />
                            <h2>Collection & Decollection</h2>
                            <p>Seamlessly mark samples as collected or decollected with simple in-app actions.</p>
                        </div>
                        <div className="built-card">
                        <img src={Phlebotomyappfore} alt='image' />
                            <h2>Dispatch to Hospital</h2>
                            <p>Log and dispatch collected samples to the lab or hospital with real-time tracking.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className='bg-phlebotomy'>
                    <div className="box-phle-scale">
                        <div className="box-phle-card" data-aos="fade-up">
                            <h2>Ready, Set Collect</h2>
                            <p>From doorstep collection to final dispatch, the app ensures accuracy, speed, and efficiency eliminating paperwork and reducing delays.</p>
                            <ul>
                                <li>Sample Collection & Decollation</li>
                                <li>Barcode Scanning</li>
                                <li>Complete Appointment</li>
                                <li>Dispatch to Hospital</li>
                                <li>Real-Time HIS Sync</li>
                                <li>Collect Payments</li>
                            </ul>
                            <a href="#void" className="getStared text-left float-l" tabIndex="0">Get Started</a>
                        </div>
                        <div className="box-phle-right" data-aos="fade-right">
                            <img src={Ready} alt='image' /> 
                        </div>
                    </div>
        </section>

        <section className="box-kickcol bg-phlebotomy">
            <div className='box-kick' data-aos="zoom-in">
                <div className='box-kick-left'>
                    <h2>Kick Start With Your Work with Phlebo App</h2>
                    <p>Miracle On Cloud simplifies documentation and enhances clinical workflows, so you can focus on what matters most — your patients.</p>
                </div>
                <div className='box-kick-right'>
                <img src={box_kick} alt='image' />
                </div>
            </div>
        </section>





     <FaqAccordion />  

     <section className='bg-phlebotomy pt-0 pb-0'>
          <div className='box-Phlebo-got'>
            <div className='box-Phlebo-got-left' data-aos="fade-up">
                <h2>Got Questions? <br/>
                We’ve Got You Covered</h2>
                <p>Whether you&apos;re ready to transform your healthcare operations or just exploring, drop us a line we&apos;re listening.</p>
                <div className='box-letfuture-inp mt-4' style={{marginLeft:'0'}}>
                      <InputWithSend />
                    </div>
            </div>
            <div className='box-Phlebo-got-right' data-aos="fade-right">
            <img src={got_phlebo} alt='image' />
            </div>
            
          </div>
    </section>



        </>
    )
}

export default Phlebotomyapp;