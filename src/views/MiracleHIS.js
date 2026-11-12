'use client';

import React from 'react'
const bgmiraclehis = "/images/bgmiraclehis.png";
import InputWithSend from '../components/common/Input/InputWithSend';
import FaqAccordion from '../components/features/FaqAccordion';
const demoscreenshot = "/images/image_653.png";

const Digital_OPD = "/images/dig-opd.webp";
const Digital_IPD = "/images/ipd.png";
const Supply_chain_Pharmacy = "/images/Supply_chain_Pharmacy.png";
const Diagnostic_Solutions = "/images/Diagnostic_Solutions.png";
const productall = "/images/box-pro.png";
import BlueBanner from '../components/features/BlueBanner'

function MiracleHIS(){
    return(
        <>
        <div className='bg-mochis'>
        <div className='box-mochis-left' data-aos="fade-right">
            <h2>Boost Your Hospital’s Topline With Minimum Revenue Leakage</h2>
            <p>Miracle HIS is the first choice of large corporate hospitals and group of hospitals when it comes to business growth and scaling.</p>
            <div className='box-letfuture-inp mt-4'>
                      <InputWithSend />
                    </div>
                <div className='box-letfuture-inp mt-4'><div className="email-bar"></div></div>
        </div>
        <div className='box-mochis-view' data-aos="fade-up">
            <img src={bgmiraclehis} alt='image' />  
        </div>
    </div>
    <section className='bg-hispro'>
        <div className='container-fluid' data-aos="fade-up">
            <div className='row'>
<div className='col-md-12'>
    <div className='box-hispro-col'>
    <div className='box-hispro'>
        <h2>Uncompromised Security & Interoperability</h2>
        <p>
        <b>.</b> HL7, FHIR, CDA, DICOM, API-ready architecture.<br/>
        <b>.</b> Third-party interoperability with PACS, RIS, CRM, ERP, and IoT.<br/>
        <b>.</b> Real-time Sync with ABDM components (HFR, HPR, Scan & Share, PHR).
        </p>
        <a href='#void' className='bookdemo'>Book a Demo</a>
    </div>
    <div className='box-hispro-right'>
    <img src={demoscreenshot} alt='image' /> 
    </div>
    </div>
</div>
                </div>
        </div>
    </section>
    <section className="box-whatall-prov-p-tb box-Solutions-col">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="box-whatall-prov box-Solutions" data-aos="fade-up">
                        <h2>Solutions for Healthcare Businesses of All Sizes</h2>
                        <p>From single-specialty clinics to multi-facility hospitals, Miracle HIS adapts to your scale and complexity. Its modular design ensures every department from billing to EMR is seamlessly managed under one intelligent system.</p>
                    </div>
                    <div className="box-Solutions-item" data-aos="zoom-in">
                        <div className="item-card">
                        <img src={Digital_OPD} alt='image' /> 
                        <h2>Digital OPD</h2>
                        </div>
                        <div className="item-card">
                        <img src={Digital_IPD} alt='image' /> 
                        <h2>Digital IPD</h2>
                        </div>
                        <div className="item-card">
                        <img src={Supply_chain_Pharmacy} alt='image' /> 
                        <h2>Supply chain & Pharmacy</h2>
                        </div>
                        <div className="item-card">
                        <img src={Diagnostic_Solutions} alt='image' /> 
                        <h2>Diagnostic Solutions</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="box-Solutions-col">
        <div className='box-smart-health'>
            <div className='box-smart-health-left' data-aos="fade-up">
                <h2>Smarter Healthcare Operations with Miracle HIS</h2>
                <p>Enhance your hospital workflows with intelligent automation  from patient registration to discharge. Miracle HIS simplifies coordination across departments, ensuring faster turnarounds and fewer delays in care.</p>
            </div>
            <div className='box-smart-health-right' data-aos="zoom-in">
            <img src={productall} alt='image' />             
            </div>
        </div>
    </section>
    <section className="box-Unified">
        <div className='box-Unified-col'>
            <h2> Unified Platform for End-to-End Hospital Management</h2>
            <p> Miracle HIS integrates all hospital functions OPD, IPD, billing, pharmacy, lab, radiology, HR, finance, and more  into one <br/> powerful and secure system, creating a truly connected hospital.</p>
            <div className='box-Unified-item'>
                <span>Per Month</span>
                <div className='clearfix'></div>
                <div className='box-Unified-card' data-aos="fade-right">
                    <h2>80,000+</h2><p>Total Beds</p>
                </div>
                <div className='box-Unified-card' data-aos="fade-right">
                <h2>65,00,000+</h2><p>Prescriptions</p>
                </div>
                <div className='box-Unified-card' data-aos="fade-right">
                <h2>70,00,000+</h2><p>Lab Orders</p>
                </div>
                <div className='box-Unified-card' data-aos="fade-right">
                <h2>45,00,000+</h2><p>Total OPDs</p>
                </div>
                <div className='box-Unified-card' data-aos="fade-right">
                <h2>18,00,000+</h2><p>Admissions & Discharges</p>
                </div>
            </div>
            <div className='box-live-dash'>
                <div className='box-live-dash-left' data-aos="fade-right">
                <img src={Supply_chain_Pharmacy} alt='image' /> 
                </div>
                <div className='box-live-dash-right' data-aos="fade-up">
                    <h2>Live Dashboards & <br/>Actionable Insights</h2>
                    <p>Monitor your hospital performance in real-time with customizable dashboards and advanced reporting tools. Track patient journey, revenue, bed occupancy, and critical metrics for timely, informed decisions.</p>
                </div>
            </div>
        </div>
    </section>

    <section className='box-secure'>
        <div className='box-secure-main' data-aos="fade-up">
            <h2>Secure, Compliant & Future-Ready</h2>
            <p>Built with ISO/IEC 27001:2013 & 9001:2013 compliance and data privacy in mind, Miracle HIS offers role-based access, audit trails, and supports HL7, FHIR, and NABH-ready configurations for modern hospitals.</p>
            <a href="#void" className='getStared'>Book a Demo Now</a> 
        </div>
    </section>

                  <FaqAccordion />  


       <BlueBanner />
    
       
        </>
    )
}

export default MiracleHIS;

