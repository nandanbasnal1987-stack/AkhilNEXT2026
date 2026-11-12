'use client';

import React from 'react'
import '../../styles/global.css';
const btmBanner1 = "/images/got-question-image.png";

import InputWithSend from '../common/Input/InputWithSend';
import AOS from "aos";
import "aos/dist/aos.css";

function GoldBanner() {
    return (
        <>

        <section className='box-ab'>
          <div className='btm-banner' data-aos="fade-up">            
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

export default GoldBanner;
