'use client';

import React from 'react'
import '../styles/global.css';
import OnboardPricing from '../onboarding/OnboardPricing';
const Chatbox = "/images/Chat_Box.svg";
const mailicon = "/images/Mail_icon.svg";
const phoneicon = "/images/Phone_icon.svg";
const flower = "/images/flower.svg";
const augastamIcons = "/images/augastam-icons.svg";
const augastamLogo = "/images/Augastam-logo2.svg";
const logoImage1 = "/images/Aster_logo.png";
const logoImage2 = "/images/Aster_logo.png";
const logoImage3 = "/images/Aster_logo.png";
const logoImage4 = "/images/Aster_logo.png";
const starIcon = "/images/logo-btmbg.png";
const cardIcon = "/images/Card_icon.png";
const aipwr = "/images/AI_pwrd123.png";
const self = "/images/dashbrd.png";
const Multilingual = "/images/lang.png";
const specialties = "/images/Frame%201597880769.png";


const approvedIcon1 = "/images/approved-icon1.png";
const approvedIcon2 = "/images/approved-icon2.png";
const approvedIcon3 = "/images/approved-icon3.png";
const approvedIcon4 = "/images/approved-icon4.png";
const approvedIcon5 = "/images/approved-icon5.png";
const approvedIcon6 = "/images/approved-icon6.png";
const approvedIcon7 = "/images/approved-icon7.png";

const ChartingImage = "/images/charting-image.svg";

const augastamLogo2 = "/images/augastam-logo-circle.svg";

const clientImage1 = "/images/client-exp-1.jpg";
const clientImage2 = "/images/client-exp-2.jpg";


import InputWithSend from '../components/common/Input/InputWithSend';





const DeskScreen = "/images/Augastam_deskscreen.svg";

const btmBanner1 = "/images/got-question-image.png";

import AugastamSlider from '../components/features/AugastamSlider';
import VerticalSliderSection from '../components/features/VerticalSliderSection';
import FaqAccordion from '../components/features/FaqAccordion';
import AnimatedButton from '../components/common/Button/buttonAni';
import GoldBanner from '../components/features/GoldBanner';





function Augastam() {
    return (
        <>

        <div className='box-decades product-container'>
        <div className='box-decades-col' data-aos="fade-up">
            <div className='box-auugas'>
                <h2><span>Where</span> Clinical Precision <span>Meets</span><br/> Operational Intelligence</h2>
                <p>Augastam isn’t just another EMR, it’s your practice’s command center. From adaptive clinical workflows to role-based dashboards and intelligent documentation tools, Augastam empowers care teams to focus more on patients and less on processes every step of the journey.</p>
                <a href="/contact" className='getStared' data-onboard data-onboard-source="augastam-emr-hero">Get Started</a>
<img src={augastamIcons} alt='augastam Icons' />

                
            </div>            
        </div>

    </div>


    <section className='augastam-logo-section'>
        <div className='white-circle' data-aos="fade-up">
            <img src={augastamLogo} alt='Augastam Logo' />
    </div>
    


    <div className='container-fluid logo-section' data-aos="fade-up">
    <h4>Trusted by many</h4>
    <AugastamSlider />
      <div className='star'><img src={starIcon} alt='Augastam Logo' /></div>
      
    </div>   
    </section>
     <section className='bg-gray'>
        <div className='container-fluid box-wrapper'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='box-carehands' data-aos="fade-up">
                        <h2 className='text-center'>Custom Solutions Tailored To Your Needs</h2>
                        <p>Every healthcare setup runs differently and that’s exactly why our system doesn’t force-fit. Augastam molds to your workflows, scales with your teams, and adapts to your clinical protocols, ensuring a personalized experience that works just like you do.</p>
                    </div>
                </div>

                <div className='col-md-12'>

                    <div className='tabs' data-aos="fade-up">
                        <div className='tab-buttons'>
                          <button className='tab-btn active' data-tab='tab1'>Augastam</button>
                          <button className='tab-btn' data-tab='tab2'>Miracle on Cloud</button>
                          <button className='tab-btn' data-tab='tab3'>Miracle HIS</button>
                        </div>
                      
                        <div className='tab-content active' id='tab1'>
                          <img src={DeskScreen} alt='' className='img-fluid' />
                        </div>
                        <div className='tab-content' id='tab2'>
                          <img src={DeskScreen} alt='' className='img-fluid' />
                        </div>
                        <div className='tab-content' id='tab3'>
                          <img src={DeskScreen} alt='' className='img-fluid' />
                        </div>
                      </div>
                      

                </div>
            </div>
            
        </div>
    </section>


    <section className='prod-cateogry'>
        <div className='container-fluid1 p-60'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='topHead-section' data-aos="fade-up">
                        <h2 className='text-center'>Shaping Healthcare with Smarter, Simpler Tech</h2>
                        <p className='text-center'>Augastam seamlessly bridges the gap between large hospitals and small clinics, uniting them in a shared mission of delivering exceptional care. No matter the setting, Augastam stands ready to support your journey.</p>
                    </div>
                </div>
            </div>

            <div className='row mt-5' data-aos="zoom-in">
                <div className='col-md-3'>
                    <div className='box-prod-col'>
                    <h3><span><img src={aipwr} width={60} style={{ marginRight: "10px"}} /></span>AI Powered</h3>
                    <p>Augastam’s AI engine learns from clinical patterns & automates workflows, giving your team more time to focus on patient care.</p>
                      <div className='prod-strip'><span></span></div>

                      <a href="#void" className='knowmore'>Know More</a>
                    </div>
                    </div>

                    <div className='col-md-3'>
                    <div className='box-prod-col'>
                    <h3><span><img src={self} width={60} style={{ marginRight: "10px"}} /></span>Self Configurable</h3>
                    <p>Empower your IT team to customize workflows, forms, and modules without waiting on vendor updates designed for real-world hospital needs.</p>
                      <div className='prod-strip'><span></span></div>

                      <a href="#void" className='knowmore'>Know More</a>
                    </div>
                    </div>


                    <div className='col-md-3'>
                    <div className='box-prod-col'>
                    <h3><span><img src={Multilingual} width={60} style={{ marginRight: "10px"}} /></span>Multilingual Interface</h3>
                    <p>Serve diverse patient populations with an intuitive interface available in multiple languages ensuring clarity for staff and comfort for patients.</p>
                      <div className='prod-strip'><span></span></div>

                      <a href="#void" className='knowmore'>Know More</a>
                    </div>
                    </div>


                    <div className='col-md-3'>
                    <div className='box-prod-col'>
                    <h3><span><img src={specialties} width={60} style={{ marginRight: "10px"}} /></span>Multi-specialties </h3>
                    <p>From GP to ophthalmology, Augastam effortlessly maps specialty-specific clinical pathways and documentation formats, saving clinician's time.</p>
                      <div className='prod-strip'><span></span></div>

                      <a href="#void" className='knowmore'>Know More</a>
                    </div>
                    </div>

                    </div>
            
        </div>
    </section>


    <section className='charting-section p-60'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-7 topHead-section' data-aos="fade-up">
                    <h2 className='text-left'>Charting a Future of Connected Care</h2>
                    <p className='text-left pb-4'>From humble beginnings to powering healthcare across continents, Akhil Systems’ journey has been driven by innovation, compassion, and a vision for a connected future. Augastam is not just software—it’s our commitment to transforming care delivery, today and for generations to come</p>

                    
                    <img src={ChartingImage} alt='' />

                    <ul className='approved-icons mt-4'>
                        <li><img src={approvedIcon1} /></li>
                        <li><img src={approvedIcon2} /></li>
                        <li><img src={approvedIcon3} /></li>
                        <li><img src={approvedIcon4} /></li>
                        <li><img src={approvedIcon5} /></li>
                        <li><img src={approvedIcon6} /></li>
                        <li><img src={approvedIcon7} /></li>
                    </ul>
                    </div>

                    <div className='col-md-5 text-right' data-aos="fade-right">
                        <div className='prod-logo'>
                         <img src={augastamLogo2} alt='' /></div>
                    </div>
                    </div>
                    </div>
                    </section>


                   
           <VerticalSliderSection />
                
                

           <OnboardPricing source="augastam-pricing" />

               <FaqAccordion />
       
 

    <GoldBanner />


       



        </>
    )
}

export default Augastam;
