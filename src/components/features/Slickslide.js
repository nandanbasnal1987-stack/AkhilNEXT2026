'use client';

import React from 'react'

const c1 = "/images/Mobile_screen_img_active.webp";
const c2 = "/images/Mobile_screen_img.webp";
const c3 = "/images/Mobile_screen_img1.webp";
const c4 = "/images/Mobile_screen_img2.webp";
const c5 = "/images/Mobile_screen_img3.webp";
const c7 = "/images/About_us_image3.png";
const c8 = "/images/About_us_image3.png";
const c9 = "/images/About_us_image3.png";
const c10 = "/images/About_us_image3.png";
const c11 = "/images/About_us_image3.png";
const c12 = "/images/About_us_image3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { Navigation } from 'lucide-react'

function Slickslide() {


    const SData = [
 
        {
            "image": c1,
        },
        {
            "image": c2,
        },
        {
            "image": c3,
        },
        {
            "image": c4,
        },
        {
            "image": c5,
        }

    ]



    const settings = {


        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        //autoplay: true,
        arrows: false,
        centerPadding: '10px',
      

    vertical: false,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
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
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]



    };
    return (
        <>




<section className='box-legacy plr-60'>
            <div className='container-fluid box-wrapper'>
                <div className='row'>

                    <div className='col-md-6'>
                        <h2 className='box-heading' data-aos="fade-up">A Legacy of Caring Who Cares</h2>
                        <p className='box-p' data-aos="fade-up">Akhil’s AI-powered platform streamlines operations, boosts billing efficiency, and drives revenue growth.</p>
                    </div>

                    <div className='col-md-6'>
                        <p className='' data-aos="fade-up">
                        We are one of the pioneers Hospital Management Information Systems (HMIS) company with 30+ years of experience in the single domain of healthcare and specialized in delivering management information systems for Hospitals, Medical Colleges, Clinics, Diagnostic Centers and Pharmacy Chains. 
                        </p>
                    </div>
                    </div>
                  
                    <div className='row '>
                    <div className='col-md-12'>
                        <div className='box-legacy-pic' data-aos="zoom-in">
                        <Slider {...settings}>
                            {
                                SData.map((value) => (
                                    
                                        <img key={value.image} src={value.image} alt='Legacy of Caring Images' loading='lazy' />
                                   

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

export default Slickslide;	