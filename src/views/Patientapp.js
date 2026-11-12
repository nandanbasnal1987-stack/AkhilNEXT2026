'use client';

import React from 'react'
import '../styles/global.css';
import InputWithSend from '../components/common/Input/InputWithSend';
const Appointment = "/images/Appointment.png";
const Appointmentwo = "/images/Appointmentwo.png";
const Appointmenthree = "/images/Appointmenthree.png";
const Appointmentfore = "/images/Appointmentfore.png";
import FaqAccordion from '../components/features/FaqAccordion';
const patientappImage1 = "/images/patient-apps.png";
const patientappImage2 = "/images/patient-app.png";
const caredelievery = "/images/care-delivery.png";
const easyacc = "/images/easyacc.png";
const easyacctwo = "/images/easyacctwo.png";
const easyaccthree = "/images/easyaccthree.png";
const easyaccpatient = "/images/easyaccpatient.png";
import BlueBanner from '../components/features/BlueBanner';

function Patientapp() {
    return (
        <>
        <div className='bg-patient'>
        <div className='box-patient-detail' data-aos="fade-right">
                <h2>Powering<br /> Healthcare<br /> <span>Through</span> Mobility</h2>
                <p>Experience the convenience of managing your health anytime, anywhere with the Patient App. Our all-in-one solution empowers patients with easy access to appointments, medical records, and video consultations right from their smartphones.</p>
                <div className='box-letfuture-inp mt-4' style={{marginLeft:'0'}}>
                      <InputWithSend />
                    </div>
        </div>
        <div className='box-patient-view' data-aos="fade-up">
            <div className='box-patient-view-pics'><img src={patientappImage1} alt='image' /></div>
            <div className='box-patient-view-pic'><img src={patientappImage2} alt='image' /> </div>
        </div>

    </div>
    <section className="">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="box-built">
                        <h2 data-aos="fade-up">Your Health, Always at Your Fingertips</h2>
                        <p data-aos="fade-up">Book appointments, consult doctors, track vitals, and access prescriptions all from one smart app built to keep your care journey connected.</p>
                    
                    <div className="box-built-item" data-aos="zoom-in">
                        <div className="built-card">
                        <img src={Appointment} alt='image' />
                            <h2>Book an Appointment</h2>
                            <p>Book Appointments with your preferred doctor in just a few taps</p>
                        </div>
                        <div className="built-card">
                        <img src={Appointmentwo} alt='image' />
                            <h2>Reschedule Appointment</h2>
                            <p>Reschedule or Cancel appointment effortlessly through the app</p>
                        </div>
                        <div className="built-card">
                        <img src={Appointmenthree} alt='image' />
                            <h2>Medical Records</h2>
                            <p>All records are digitally stored and easily shareable</p>
                        </div>
                        <div className="built-card">
                        <img src={Appointmentfore} alt='image' />
                            <h2>Video consultations</h2>
                            <p>Book video consultations directly from the app</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
 <section className="box-whatall-prov-p-tb">
        <div className="container-fluid">
           
            <div className="row">
                <div className="col-md-12">
                    <div className="box-care-delivery">
                        <div className="box-care-delivery-left" data-aos="fade-right">
                            <h2>360 of Care <span>Delivery via</span><br /> Patient App</h2>
                            <ul>
                                <li>Appointment Management</li>
                                <li>Video & Chat Consultation</li>
                                <li>Secure Medical Records & Real Time Alerts</li>
                                <li>Medical Records at your fingertips</li>
                                <li>Home Healthcare based Services</li>
                                <li>Smart Notifications</li>
                            </ul>
                        </div>
                        <div className="box-care-delivery-right" data-aos="zoom-in">
                            <img src={caredelievery} alt='image' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="box-care-build-scale">
                        <div className="box-card" data-aos="fade-up">
                            <h2>Easy Access to Smart <br/>Care, On the Go!</h2>
                            <p>Join thousands of patients who trust for their day-to-day healthcare needs.</p>
                            <div className="box-card-view">
                            <img src={easyacctwo} alt='image' />
                            </div>
                        </div>
                        <div className="box-card-right" data-aos="fade-up">
                            <div className="box-card-view">
                            <img src={easyacc} alt='image' />
                            </div>
                        </div>
                        <div className="box-card-middle" data-aos="fade-up">
                            <div className="box-card-view">
                            <img src={easyaccthree} alt='image' />
                            </div>
                        </div>
                        <div className="box-card-middle float-r" data-aos="fade-up">
                            <div className="box-card-view">
                            <img src={easyaccpatient} alt='image' />
                            </div>
                        </div>
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

export default Patientapp;