'use client';

import React, { useState } from 'react'
const cus1 = "/images/clientLogo/AsterLogo.png";
const cus2 = "/images/clientLogo/BhartiHospitalLogo.png";
const cus3 = "/images/clientLogo/EvercareLogo.png";
const cus4 = "/images/clientLogo/Eye7Logo.png";
const cus5 = "/images/clientLogo/MarengoAsiaLogo.png";
const cus6 = "/images/clientLogo/NemcareLogo.png";
const cus7 = "/images/clientLogo/YashodaLogo.png";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

function AugastamSlider() {

    


    const CData = [

        {
            "image": cus1
        },
        {
            "image": cus2
        },
        {
            "image": cus3
        },
        {
            "image": cus4
        },
        {
            "image": cus5
        },
        {
            "image": cus6
        },
        {
            "image": cus7
        }

    ]
    


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]


        
      };
    return (
        <>
       
            <div className='container-fluid'>
                <div className='hero-logo'>
              
                <Slider {...settings}>
                    {
                        CData.map((value,idx) => (
                            <div key={idx} className='col-md-8'>
                                
                                <img src={value.image} height={50}  alt='image' />
                              
                            </div>

                        ))
                    }
                     </Slider>
           
                
                
                </div>
            </div>
           
        </>
    )

}

export default AugastamSlider;