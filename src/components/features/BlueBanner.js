'use client';

import React from 'react'
import '../../styles/global.css';
import InputWithSend from '../../components/common/Input/InputWithSend';
const btmBanner2 = "/images/his-btm-banner.png";
import AOS from "aos";
import "aos/dist/aos.css";



function BlueBanner() {
    return (
        <>

         <section className='blueBanner pt60 pb-0'>
          <div className='btm-banner container-fluid pb-5'>
            <div className='row clinical-banner'>
                <div className='col-md-6' data-aos="fade-left">
                    <h2 className='text-left pt-0'>Got Questions?<span></span><br /> We’ve Got You Covered</h2>
                    <p className='text-left'>Discover answers to frequently asked questions about Augastam’s capabilities, benefits, and support.</p>
              
                    <div className='box-letfuture-inp mt-4' style={{marginLeft:'0'}}>
                      <InputWithSend />
                    </div>
                </div>

                <div className='col-md-6 text-center' data-aos="fade-right">
                    <img src={btmBanner2} alt='' />
                </div>
                
                </div>
                </div>
    </section>
       



        </>
    )
}

export default BlueBanner;
