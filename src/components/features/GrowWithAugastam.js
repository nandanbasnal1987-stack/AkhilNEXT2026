'use client';

import React from 'react';
import Slider from 'react-slick';
const slideImg = "/images/grow-augastam-image.svg"; // adjust path as needed
const abbas = "/images/cloudimage.png";
const mocimg = "/images/mocimg.png";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from "aos";
import "aos/dist/aos.css";

const slidesData = [
  {
    title: 'Grow with',
    highlight: 'Augastam Clinical EMR',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    image: slideImg,
    imageWidth: 425,
    imageHeight: 380,
  },
  {
    title: 'Grow with',
    highlight: 'Augastam Clinical EMR',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    image: slideImg,
    imageWidth: 400,
    imageHeight: 355,
  },
];
const slidesDatamoc = [
  {
    title: 'Powering Smarter',
    highlight: 'Hospitals in the Cloud',
    description:
      'Miracle On Cloud helps hospitals manage patient records, labs, billing, and daily operations in one secure platform improving efficiency, accuracy, and patient care.',
    image: slideImg,
    imageWidth: 425,
    imageHeight: 380,
  },
  {
    title: 'Run Your Entire',
    highlight: 'Hospital in the Cloud',
    description:
      'Miracle On Cloud gives hospitals a single, secure hub for all clinical records, helping your team work faster and deliver better care without operational bottlenecks.',
    image: mocimg,
    imageWidth: 400,
    imageHeight: 355,
  },
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
};

const GrowWithAugastam = () => {
  return (
    <section style={{ background: '#e3effe' }}>
         <div className='box-grow-panel' data-aos="fade-up">
          <Slider {...sliderSettings} className="mySlick aa">
            {slidesData.map((slide, index) => (
              <div className="slide" key={index}>
                <div className='box-grow-main'>
                <div className="box-grow-left topHead-section box-slider-heading">
                  <h2 className="text-left">
                    {slide.title}
                    <br />
                    {slide.highlight}
                  </h2>
                  <p>{slide.description}</p>
                  <a href="#void" className="getStared text-left">
                    Get Started
                  </a>
                </div>
                <div className="box-grow-right">
                  <img src={slide.image} alt="Grow with Augastam" />
                </div>
                </div>
              </div>
            ))}
          </Slider>

          <Slider {...sliderSettings} className="mySlick bb">
            {slidesDatamoc.map((slide, index) => (
              <div className="slide" key={index}>
                <div className='box-grow-main'>
                <div className="box-grow-left topHead-section box-slider-heading">
                  <h2 className="text-left">
                    {slide.title}
                    <br />
                    {slide.highlight}
                  </h2>
                  <p>{slide.description}</p>
                  <a href="#void" className="getStared text-left">
                    Get Started
                  </a>
                </div>
                <div className="box-grow-right">
                  <img src={abbas} alt="Moc with Augastam" />
                </div>
                </div>
              </div>
            ))}
          </Slider>
          </div>
    </section>
  );
};

export default GrowWithAugastam;
