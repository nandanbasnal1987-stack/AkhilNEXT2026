'use client';

import React from 'react'
import '../../styles/global.css';
import InputWithSend from '../common/Input/InputWithSend';
const btmBanner2 = "/images/his-btm-banner.png";
const marketPlace = "/images/marketplace-banner.png";

import AOS from "aos";
import "aos/dist/aos.css";



function GoldBanner2() {
    return (
        <>

         <section className='blueBanner pt60 pb-0'>
          <div className='btm-banner container-fluid pb-5'>
            <div className='row clinical-banner' style={{backgroundColor: '#9C835B'}}>
                <div className='col-md-6' data-aos="fade-left">
                    <h2 className='text-left pt-0'>Got Questions?<span></span><br /> We’ve Got You Covered</h2>
                    <p className='text-left'>Whether you&apos;re ready to transform your healthcare operations or just exploring, drop us a line we&apos;re listening.</p>
              
                    <div className='box-letfuture-inp mt-4' style={{marginLeft:'0'}}>
                      <InputWithSend />
                    </div>
                </div>

                <div className='col-md-6 text-center' data-aos="fade-right">
                    <img src={marketPlace} alt='' />
                </div>
                
                </div>
                </div>
    </section>
       



        </>
    )
}

export default GoldBanner2;
