'use client';

import React, { useState } from 'react'
const cus1 = "/images/HeroLogo/hero-logo1.png";
const cus2 = "/images/HeroLogo/hero-logo2.png";
const cus3 = "/images/HeroLogo/hero-logo3.png";
const cus4 = "/images/HeroLogo/hero-logo4.png";
const cus5 = "/images/HeroLogo/hero-logo5.png";
const cus6 = "/images/HeroLogo/hero-logo4.png";
const cus7 = "/images/HeroLogo/hero-logo5.png";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

function HeroLogo() {

    


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
       

        dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    infinite: true,
    centerMode: false,
    centerPadding: "0px",
    variableWidth: false,
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
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,              }
            }
          ]


        
      };
    return (
        <>
        <div className='hero-logo' style={{width: '70%', marginTop: '150px'}}>
       <Slider {...settings}>
                    {
                        CData.map((value,idx) => (
                            <div>
                                
                                <img src={value.image} width={100}  alt='image' className='text-center' />
                              
                            </div>

                        ))
                    }
                     </Slider>
                     </div>
        </>
    )

}

export default HeroLogo;