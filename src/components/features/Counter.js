'use client';

import React, { useState } from 'react'
import CountUp from 'react-countup';
const counter1 = "/images/icon1.png";
const counter2 = "/images/icon2.png";
const counter3 = "/images/icon3.png";
const counter4 = "/images/icon4.png";
import ScrollTrigger from "@/components/common/ScrollTrigger";

function Counter(){

   const[counteron , setCounteron]  = useState(false)
    return(
        <>
       
                        <div className='box-decades'>
                            <div className='box-decades-col'>
                                <div className='box-decades-col-detail'>
                                <h2 data-aos="fade-down">Decades of Impact, Trusted by Leaders</h2>
                                <p data-aos="fade-down">Trusted by hospitals, loved by patients. We are empowering healthcare to move smarter and faster.</p>
                                </div>
                                </div>
             

                    <div className='box-decades-panel' data-aos='fade-up'>
                <div className='box-decades-panel-one'>
                    <div className='box-decades-panel-pic'><img src={counter1} /></div>
                    <ScrollTrigger onEnter={()=> setCounteron(true)} onExit={()=> setCounteron(false)}>
                            <h2>
                            {counteron &&  <CountUp start={1} end={32} duration={2} delay={0}/>}
                            
                            </h2>
                            <p>Years of transforming healthcare through innovation.</p>
                     
                       
                            </ScrollTrigger>
                 
                </div>
                <div className='box-decades-panel-one'>
                    <div className='box-decades-panel-pic'><img src={counter2} /></div>
                    <ScrollTrigger onEnter={()=> setCounteron(true)} onExit={()=> setCounteron(false)}>
                            <h2>
                            {counteron &&  <CountUp start={1} end={600} duration={2} delay={0}/>}
                            
                            </h2>
                            <p>Hospitals, clinics, and other medical facilities are growing with us.</p>
                            </ScrollTrigger>
                 
                </div>

                <div className='box-decades-panel-one'>
                    <div className='box-decades-panel-pic'><img src={counter3} /></div>
                    <ScrollTrigger onEnter={()=> setCounteron(true)} onExit={()=> setCounteron(false)}>
                            <h2>
                            {counteron &&  <CountUp start={1} end={12} duration={2} delay={0}/>}
                            
                            </h2>
                            <p>Countries have Hospitals, Diagnostic Center & Clinics digitalized with us.</p>
                     
                       
                            </ScrollTrigger>
                 
                </div>

                <div className='box-decades-panel-one'>
                    <div className='box-decades-panel-pic'><img src={counter4} /></div>
                    <ScrollTrigger onEnter={()=> setCounteron(true)} onExit={()=> setCounteron(false)}>
                            <h2>
                            {counteron &&  <CountUp start={1} end={24} duration={2} delay={0}/>}
                            
                            </h2>
                            <p>Indian states have Hospitals, diagnostic center & Clinics digitalized with us.</p>
                     
                       
                            </ScrollTrigger>
                 
                </div>

                

                </div>

                 
                </div>
                 
        
        </>
    )
}
export default Counter;