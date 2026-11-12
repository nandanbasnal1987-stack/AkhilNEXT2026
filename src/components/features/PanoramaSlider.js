'use client';

// PanoramaSlider.js
import React from 'react';
import Slider from 'react-slick';


const AutoPlay3DCarousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 3, // show partial next image for panoramic feel
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="container panorama-container">
      <Slider {...settings}>
        <div><img src="https://picsum.photos/400/300?random=1" alt="Panorama 1" /></div>
        <div><img src="https://picsum.photos/400/300?random=1" alt="Panorama 2" /></div>
        <div><img src="https://picsum.photos/400/300?random=1" alt="Panorama 3" /></div>
        <div><img src="https://picsum.photos/400/300?random=1" alt="Panorama 1" /></div>
        <div><img src="https://picsum.photos/400/300?random=1" alt="Panorama 2" /></div>
        <div><img src="https://picsum.photos/400/300?random=1" alt="Panorama 3" /></div>
        <div><img src="https://picsum.photos/400/300?random=1" alt="Panorama 1" /></div>
        <div><img src="https://picsum.photos/400/300?random=1" alt="Panorama 2" /></div>
        <div><img src="https://picsum.photos/400/300?random=1" alt="Panorama 3" /></div>
      </Slider>
    </div>
  );
};




export default AutoPlay3DCarousel;
