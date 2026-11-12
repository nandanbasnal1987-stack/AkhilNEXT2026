'use client';

import React from 'react'
import '../styles/global.css';
import InputWithSend from '../components/common/Input/InputWithSend';
import FaqAccordion from '../components/features/FaqAccordion';

const doctorapp = "/images/doctorapp.png";
const docApp1 = "/images/doc-app1.png";
const doc360 = "/images/doc-36.png";
const Appointment = "/images/Appointment.png";
const Appointmentwo = "/images/Appointmentwo.png";
const Appointmenthree = "/images/Appointmenthree.png";
const Appointmentfore = "/images/Appointmentfore.png";
const box_doctor = "/images/box-doc.png";


function Doctorapp() {
    return (
        <>

        <div className='bg-doc'>
        <div className='box-patient-detail' data-aos="fade-up">
            <h2><span>Your</span> Day, <br/>
            <span>Your</span> Patients <br/>
            <span>All in</span> One App</h2>
            <p>The Doctor App is a powerful clinical assistant designed to streamline your workflow and enhance patient care. Access appointments, patient records, and hospital functions all from your mobile device</p>
            <a href='#void' className='getStared text-left float-l' tabIndex='0'>Get Started</a>
        </div>
        <div className='box-cxo-view' data-aos="fade-up">
            <img src={doctorapp} alt='image' />  
        </div>

    </div>

    <section className="box-whatall-prov-p-tb" style={{paddingBottom:'0px'}}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="box-built">
                        <h2 data-aos="fade-up">Built for Doctors, By Healthcare Experts</h2>
                        <p data-aos="fade-up">Doctor App ensures smarter practice and better patient outcomes</p>
                    
                    <div className="box-built-item">
                        <div className="built-card" data-aos="fade-right">
                        <img src={Appointment} alt='image' />
                            <h2>Appointment & Schedule Management</h2>
                            <p>View daily appointment list at a glance</p>
                        </div>
                        <div className="built-card" data-aos="fade-right">
                        <img src={Appointmentwo} alt='image' />
                            <h2>Patient Lists & Case Access</h2>
                            <p>Access OPD and IPD patient lists in real-time</p>
                        </div>
                        <div className="built-card" data-aos="fade-right">
                        <img src={Appointmenthree} alt='image' />
                            <h2>Digital Medical Records</h2>
                            <p>Quick access to all patient documents & View historic data</p>
                        </div>
                        <div className="built-card" data-aos="fade-right">
                        <img src={Appointmentfore} alt='image' />
                            <h2>Smart Clinical Tools</h2>
                            <p>Prescribe medicines directly through the app</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className='box-control'>
<div className="box-doc-ap" data-aos="zoom-in">
                        <img src={doc360} alt='image' />  
                        <h2>360° Control <span>Over Every</span> Consult &<br /> Care Moment</h2>
                    </div>
</section>
    <section className="box-whatall-prov-p-tb">                    
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="box-care-doc-scale">
                        <div className="box-card" data-aos="fade-right">
                            <h2>Your Hospital, at <br/>a Glance</h2>
                            <p>Miracle On Cloud simplifies documentation and enhances clinical workflows, so you can focus on what matters most your patients.</p>
                            <ul>
                                <li>Cross Referrals become easy</li>
                                <li>Manage and access Patient Records from anywhere</li>
                                <li>No paper or documentation required</li>
                                <li>Go Digital with Doctor App</li>
                            </ul>
                            <a href="#void" className="getStared text-left float-l" tabIndex="0">Get Started</a>
                        </div>
                        <div className="box-doc-right" data-aos="fade-up">
                             <img src={docApp1} alt='image' />  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>



     <FaqAccordion />  

     <section className='clinical lightYellow p-0'>
          <div className='box-moc-got'>
            <div className='box-moc-got-main'>
                <div className='box-moc-got-left'>
                    <h2 className='text-left pt-0'>Got Questions?<span></span><br /> We’ve Got You Covered</h2>
                    <p className='text-left'>Discover answers to frequently asked questions about Augastam’s capabilities, benefits, and support.</p>
              
                    <div className='box-letfuture-inp mt-4' style={{marginLeft:'0'}}>
                      <InputWithSend />
                    </div>
                </div>

                <div className='box-moc-got-right'>
                    <img src={box_doctor} alt='' />
                </div>
                </div>
                </div>
    </section>



        </>
    )
}

export default Doctorapp;