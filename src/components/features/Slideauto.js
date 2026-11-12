'use client';

import React from 'react'
const first = "/images/1st.svg";
const second = "/images/img-sec.svg";
const third = "/images/img-thrd.svg";
import Slider from 'react-slick'

function Slideauto() {

    const AData = [

        {
            "img": first,
        },
        {
            "img": second,
        },
        {
            "img": third,
        }
    ]

    const settings = {

        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 1000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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

            <Slider {...settings}>
                {
                    AData.map((value) => (
                        
                            <img src={value.img} alt='image' />
                   

                    ))
                }
            </Slider>

        </>
    )
}

export default Slideauto;