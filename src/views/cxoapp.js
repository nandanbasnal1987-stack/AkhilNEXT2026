'use client';

import React from 'react'
import '../styles/global.css';
import FaqAccordion from '../components/features/FaqAccordion';

const docApp2 = "/images/doc-app2.png";
const data = "/images/data.png";
const datetwo = "/images/datetwo.png";
const datethree = "/images/datethree.png";
const datefore = "/images/datefore.png";
const mobiledate = "/images/mobiledate.png";
const mobileview = "/images/moblieview.png";
const award = "/images/award.png";
const awardtwo = "/images/awardtwo.png";
const awardthree = "/images/awardthree.png";
import BlueBanner from '../components/features/BlueBanner';

function cxoapp() {
    return (
        <>

        <div className='bg-cxo'>
        <div className='box-patient-detail' data-aos="fade-up">
            <h2>Your Hospital’s<br /> Insight, <span>Without<br /> Any Hassle</span></h2>
            <p>Hospital Insight brings financials, operations, revenue flow,<br /> and gaps into a unified mobile space — designed for top<br /> management to act without delay or dependency.</p>
            <a href='#void' className='getStared text-left float-l' tabIndex='0'>Get Started</a>
        </div>
        <div className='box-cxo-view' data-aos="fade-up">
            <img src={docApp2} alt='image' />  
        </div>

    </div>

    <section className='box-whatall-prov-p-tb'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='box-whatall-prov' data-aos="fade-up">
                        <h2>Data That Drives Growth</h2>
                        <p>The app includes functionality for parameter breakdowns and workflow approvals, allowing users to approve or reject requests as needed</p>
                    </div>
                    <div className='box-whatall-doc-item'>
                        <div className='item-col-app' data-aos="fade-right">
                            <div className='box-item-card'>
                            <img src={data} alt='image' /> 
                            </div>
                            <h3>Facility-wise Data View</h3>
                            <p>Filter dashboards by facility/location for focused analysis. </p>
                        </div>
                        <div className='item-col-app' data-aos="fade-left">
                            <div className='box-item-card'>
                            <img src={datethree} alt='image' /> 
                            </div>
                            <h3>Dashboards</h3>
                            <p>Dashboards displaying real-time data. KPI widgets for instant visibility into core performance areas (e.g., OP footfall, admissions, occupancy, revenue).</p>
                        </div>
                        <div className='item-col-app' data-aos="fade-right">
                            <div className='box-item-card'>
                            <img src={datetwo} alt='image' /> 
                            </div>
                            <h3>Graphs & Visual Analytics </h3>
                            <p>Interactive charts and graphs for clear visual representation of trends. </p>
                        </div>
                        <div className='item-col-app' data-aos="fade-left">
                            <div className='box-item-card'>
                            <img src={datefore} alt='image' /> 
                            </div>
                            <h3>Analytics</h3>
                            <p>Consolidated dashboard for easy access of data on important Volume and Figures.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

     <section className='box-whatall-prov-p-tb'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='box-care-doc-scale'>
                        <div className='box-card' data-aos="fade-up">
                            <h2>Built for Scale.<br /> Secured for the Future.</h2>
                            <p>Miracle On Cloud simplifies documentation and enhances clinical workflows, so you can focus on what matters most — your patients.</p>
                            <ul>
                                <li>Cross Referrals become easy</li>
                                <li>Manage and access Patient Records from anywhere</li>
                                <li>No paper or documentation required</li>
                                <li>Go Digital with Doctor App</li>
                            </ul>
                            <a href='#void' className='getStared text-left float-l' tabIndex='0'>Get Started</a>
                        </div>
                        <div className='box-doc-right' data-aos="fade-up">
                            <img src={mobiledate} alt='image' />  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>

        <section className=''>
          <div className='box-datasafe'>
            <div className='box-datasafe-main'>
                <div className='box-datasafe-left' data-aos="fade-right">
                <img src={mobileview} alt='image' /> 
                </div>

                <div className='box-datasafe-right' data-aos="fade-up">
                    <h2><span>Your</span> Data is Safe <br/><span>with</span> Us.</h2>
                    <p>Miracle On Cloud simplifies documentation and enhances clinical workflows, so you can focus on what matters most — your patients.</p>
                    <img src={award} alt='' />
                    <img src={awardtwo} alt='' />
                    <img src={awardthree} alt='' />
                </div>
                </div>
                </div>
    </section>

     <FaqAccordion />  


<BlueBanner />

        </>
    )
}

export default cxoapp;