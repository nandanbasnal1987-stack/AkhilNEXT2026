'use client';

import React, { useState } from 'react'
const cus1 = "/images/Aster_logo.png";
const cus2 = "/images/motherhood_logo.png";
const cus3 = "/images/Aster_logo.png";
const cus4 = "/images/Regencylogo.png";
const cus5 = "/images/Aster_logo.png";
const cus6 = "/images/motherhood_logo.png";
const cus7 = "/images/Regencylogo.png";
const cus8 = "/images/Aster_logo.png";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

function Cslider() {

    


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
        },
        {
            "image": cus8
        }

    ]
    


    const settings = {
       

        dots: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true, 
        infinite: true,
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
       <section>
            <div className='container-fluid' data-aos="fade-up" data-aos-duration="1500">
                <div className='row clients-slider'>
                <div className='col-md-12'>
                    <div className='box-client-pic'>
                <Slider {...settings}>
                    {
                        CData.map((value,idx) => (
                            <div className='col-md-8'>
                                
                                <img src={value.image} height={50}  alt='image' />
                              
                            </div>

                        ))
                    }
                     </Slider>
                     </div>
                </div>
                
                
                </div>
            </div>
           </section>
        </>
    )

}

export default Cslider;