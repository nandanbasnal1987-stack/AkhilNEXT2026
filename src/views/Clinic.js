'use client';

import React from 'react'
import '../styles/global.css';
import OnboardPricing from '../onboarding/OnboardPricing';
const starIcon = "/images/logo-btmbg.png";
const connectingImage1 = "/images/connecting-image1.jpg";
const connectingImage2 = "/images/connecting-image2.png";
const connectingImage3 = "/images/client-feedback.jpg";

const Diagnosisreports = "/images/Diagnosis-Report.png";
const Prescriptions = "/images/Prescriptions.png";
const VisitSummaries = "/images/Visit-Summaries.png";
const LabReports = "/images/Lab-Reports.png";
const MedicalHistory = "/images/Medical%20History.png";
const Investigations = "/images/Investigations.png";
const Vitals = "/images/Vitals.png";
import AugastamSlider from '../components/features/AugastamSlider';
import InputWithSend from '../components/common/Input/InputWithSend';
import FaqAccordion from '../components/features//FaqAccordion';
import GrowWithAugastam from '../components/features//GrowWithAugastam';
import TabComponent from '../components/features/TabComponent';
import BlueBanner from '../components/features/BlueBanner';
const procesingImage = "/images/processingImage.svg";

function Clinic() {
    return (
        <>

<div className='clinical'>
      <div className='box-decades product-container'>
        <div className='box-decades-col' style={{padding: '40px 0'}}>
            <div className='box-decades-col-detail' data-aos="fade-up">
                <h2 style={{marginBottom:'10px'}}><span>All-in-one platform for the complete</span> <br/>clinic–patient <span>Journey</span></h2>
                <p>Augastam connects scheduling, billing, and clinical workflows to simplify and accelerate every step of <br/>the patient journey.</p>
                
            
               <div style={{display: 'table', margin:'auto'}}><a href='/contact' className='getStared' data-onboard data-onboard-source='clinic-view-hero'>Get Started </a></div>


              
            </div>            
        </div>

    </div>

<div className='clinical-body'>

<section>
    <div className='container-fluid logo-section' data-aos="fade-up">
    <h4>Trusted by many</h4>
    <AugastamSlider />
      <div className='star'><img src={starIcon} alt='Augastam Logo' /></div>
      
    </div>   
</section>
     <section className='pb-0'>
        <div className='container-fluid box-wrapper' data-aos="fade-up">
            <div className='row'>
                <div className='col-md-12'>
                    <div className='box-carehands'>
                        <h2 className='text-center'>Your clinic’s workflow, fully digitized</h2>
                        <p>Augastam PMS connects appointments, billing, and notes in one smart platform reducing manual effort, enhancing patient experience, and optimizing your clinic operations.</p>
                    </div>
                </div>
                <div className='col-md-12'>
                     <TabComponent />
                </div>
            </div>
            
        </div>
    </section>

<section className='box-aug-pms'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='topHead-section p60' data-aos="fade-up">
                        <h2 className='text-center'>Augastam - Scalable for every clinic, big or small</h2>
                        <p className='text-center'>Augastam Clinic seamlessly bridges the gap between large hospitals and small clinics, uniting them in a shared mission of delivering exceptional care. No matter the setting, Augastam Clinic stands ready to support your journey.</p>
                    </div>
                </div>
            </div>

            <div className='row'>
                 <div className='grid-container' data-aos="zoom-in">
    <div className='grid-item image-left'>
      <img src={connectingImage1} alt='' />
    </div>
    <div className='grid-item stat-box'>
     <h2>100,000</h2>
     <p>Prescription generated with Augastam</p>
    </div>
    <div className='grid-item image-right box-connecting'>
      <img src={connectingImage2} alt='' />
    </div>
    <div className='grid-item testimonial-box'>
      <div className='stat-overlay'>
       <h2>85%</h2>
     <p>Increase in Compliance</p>
      </div>
      <div className='quote'>
        <p><span>"</span>Patients stay better informed through integrated apps and timely health updates.”</p>
        <div className='author'>
          <img src={connectingImage3} alt='' />
          <div>
            <strong>Ajay Jadeja</strong><br />
            <small>CEO</small>
          </div>
        </div>
      </div>
    </div>
  </div>

                    </div>
            
        </div>
    </section>

     <section className='box-aug-pms'>
        <div className='box-emr-prod-col'>
                    <div className='topHead-section' data-aos="fade-up">
                        <h2 className='text-center'>EMR for centralized patient data</h2>
                        <p className='text-center'>Augastam EMR unifies diagnostics, prescriptions, and visit notes into one centralized timeline giving care teams instant, organized access to complete patient data.</p>
                   
            </div>
            <div className='container-fluid'>
            <div className='row justify-content-center mt-5' data-aos="zoom-in">
                <div className='col-md-3'>
                    <div className='prod-col'>
                    <h3><span><img src={Diagnosisreports} /></span>Diagnosis Report</h3>
                    <p>View & manage clinician recorded diagnoses with  clinical reasoning in a structured format.</p>
                    </div>
                    </div>

                    <div className='col-md-3'>
                    <div className='prod-col'>
                    <h3><span><img src={Prescriptions}  /></span>Prescriptions</h3>
                    <p>Auto-generate, track, and reuse prescriptions with dose intelligence and interaction alerts.</p>
                    </div>
                    </div>

                    <div className='col-md-3'>
                    <div className='prod-col'>
                    <h3><span><img src={VisitSummaries}  /></span>Visit Summaries</h3>
                    <p>Summarized view of every consultation, including notes, treatment plan and follow-ups.</p>
                    </div>
                    </div>

                    <div className='col-md-3'>
                    <div className='prod-col'>
                    <h3><span><img src={LabReports}  /></span>Lab Reports</h3>
                    <p>Instant access to integrated lab results with abnormality flags and graphical trends.</p>
                    </div>
                    </div>

                    <div className='col-md-3'>
                    <div className='prod-col'>
                    <h3><span><img src={MedicalHistory}  /></span>Medical History</h3>
                    <p>Chronic patient history auto populated from past visits, tests, & diagnoses for context-rich care.</p>
                    </div>
                    </div>

                    <div className='col-md-3'>
                    <div className='prod-col'>
                    <h3><span><img src={Investigations}  /></span>Investigations</h3>
                    <p>Order, view, and track pending and completed investigations linked with diagnostic insights.</p>
                    </div>
                    </div>

                    <div className='col-md-3'>
                    <div className='prod-col'>
                    <h3><span><img src={Vitals} /></span>Vitals</h3>
                    <p>Monitor vitals with historical trends and alerts for abnormal parameters during every visit.</p>
                    </div>
                    </div>

                    </div>
            </div>
        </div>
    </section>

        <section className='box-aug-pms'>
        <div className='box-emr-prod-col'>
                    <div className='topHead-section' data-aos="fade-up">
                        <h2 className='text-center'>AI-Powered Transcription to generate <br></br> Structured Clinical Notes</h2>
                        <p className='text-center'>Simple, transparent pricing that scales with your clinic network.</p>
                   
            </div>
            <div className='container-fluid'>
            <div className='row justify-content-center mt-5' data-aos="zoom-in">
                <div className='col-md-12 text-center'>
                    <img src={procesingImage} />
                    </div>

               

                   


                    </div>
            </div>
        </div>
    </section>

        <section className='box-aug-pms'>
        <div className='box-emr-prod-col'>
                    <div className='topHead-section' data-aos="fade-up">
                        <h2 className='text-center'>Choose the Perfect Plan for Your<br></br> Healthcare Needs</h2>
                        <p className='text-center'>Simple, transparent pricing that scales with your clinic network.</p>
                   
            </div>
            <div className='container-fluid mt-5'>
            <div className='row justify-content-center mt-5' data-aos="zoom-in">
                <div className='col-md-4 text-center'>
                  <div className='pricing-box'>
                    <h4>Free</h4>
                    <h3><span>$0/</span>month</h3>
                    <p>Perfect for small and mid size Clinics </p>
                    <ul>
                      <li>1 Facility Onboarding </li>
                      <li>Basic dashboard access</li>
                      <li>Email Support</li>
                      <li>48-hour response time</li>
                    </ul>

                    <a href='/contact' data-onboard data-onboard-source='clinic-view-card'>Get Started</a>
                    </div>
                    </div>


                   <div className='col-md-4 text-center'>
                  <div className='pricing-box active'>
                    <span className='badge'>Most Popular</span>
                    <h4>Standard</h4>
                    <h3><span>$0/</span>month</h3>
                    <p>Perfect for small and mid size Clinics </p>
                    <ul>
                      <li>5 Facility Onboarding </li>
                      <li>Advanced analytics</li>
                      <li>Priority email support</li>
                      <li>24-hour response time</li>
                      <li>Custom branding options</li>
                    </ul>

                    <a href='/contact' data-onboard data-onboard-source='clinic-view-card'>Get Started</a>
                    </div>
                    </div>

                    <div className='col-md-4 text-center'>
                  <div className='pricing-box'>
                    <h4>Custom</h4>
                    <h3><span>Contact Us</span></h3>
                    <p>for large healthcare networks for unique needs</p>
                    <ul>
                      <li>Unlimited facility onboarding</li>
                      <li>Dedicated account manager</li>
                      <li>Phone and email support</li>
                      <li>4-hour response time</li>
                      <li>Custom workflow automation</li>
                      <li>API access</li>
                    </ul>

                    <a href='/contact' data-onboard data-onboard-source='clinic-view-card'>Get Started</a>
                    </div>
                    </div>

               

                   


                    </div>
            </div>
        </div>
    </section>

    <GrowWithAugastam />
         <div className='clearfix'></div>       
</div>
             <div style={{display:'none'}}>
             
     </div>

<OnboardPricing source="clinic-pricing" />

<BlueBanner />


       </div>



        </>
    )
}

export default Clinic;
