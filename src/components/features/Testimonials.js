'use client';

import React from 'react';
import Slider from 'react-slick';
const slideImg = "/images/grow-augastam-image.svg"; // adjust path as needed
const abbas = "/images/cloudimage.png";
const mocImg2 = "/images/team-p3.png";
const mocImg3 = "/images/clientTestimonials.png";
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
    image: mocImg2,
    imageWidth: 425,
    imageHeight: 380,
  },
  {
    title: 'Run Your Entire',
    highlight: 'Hospital in the Cloud',
    description:
      'Miracle On Cloud gives hospitals a single, secure hub for all clinical records, helping your team work faster and deliver better care without operational bottlenecks.',
    image: mocImg2,
    imageWidth: 400,
    imageHeight: 355,
  },
];

// Testimonials data
const testimonialsData = [
  {
    name: 'Ms. Jennifer',
    role: 'CEO & Founder - Older',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos possimus, labore maiores quaerat adipisci commodi dicta numquam rem accusantium fugit? Dicta in hic neque nemo corporis perferendis nostrum repellendus porro.',
  },
  // Add more testimonials as needed
  {
    name: 'Mr. John Doe',
    role: 'Medical Director - HealthPlus',
    text: 'Excellent service and support. The platform has transformed our hospital operations significantly.',
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
};

// Settings for testimonials slider
const testimonialsSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
};

const Testimonials = () => {
  return (
    <>
     
      {/* Testimonials Section */}
      <section className="testimonials-section-inner">

       
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
<div className='row'>
         
          <div className="testimonials-header" data-aos="fade-up">
            
            <h2 style={{ 
              fontSize: '14px', 
              letterSpacing: '2px', 
              color: '#4a6cf7', 
              textTransform: 'uppercase',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              TESTIMONIALS
            </h2>
            <h1 style={{ 
              fontSize: '36px', 
              color: '#1a202c', 
              fontWeight: '700',
              marginBottom: '60px',
              textAlign: 'center'
            }}>
              What People Say
            </h1>
          </div>

           <div className='col-6'>

          <div className="testimonials-slider" data-aos="fade-up" data-aos-delay="100">
            <Slider {...testimonialsSettings}>
              {testimonialsData.map((testimonial, index) => (

                
                <div key={index} className="testimonial-slide">
                  <div className="testimonial-card" style={{
                   
                    textAlign: 'left'
                  }}>

                     <div className="media">

                      
   <img src={mocImg2} className='mr-3 border rounded-circle' width={60} />
    <div className="media-body">
       <h3 style={{
                          fontSize: '22px',
                          color: '#1a202c',
                          marginBottom: '5px',
                          fontWeight: '600'
                        }}>
                          {testimonial.name}
                        </h3>
      <p style={{
                          fontSize: '16px',
                          color: '#718096',
                          margin: '0'
                        }}>
                          {testimonial.role}
                        </p>
      <p><span className="star-icon full">☆</span>
<span className="star-icon full">☆</span>
<span className="star-icon full">☆</span>
<span className="star-icon half">☆</span>
<span className="star-icon">☆</span></p>  
    </div>
    
    </div>
    <p><p style={{
                        fontSize: '18px',
                        lineHeight: '1.8',
                        color: '#4a5568',
                        marginBottom: '30px',
                        fontStyle: 'italic',
                        position: 'relative'
                      }}>
                        
                        {testimonial.text}
                      </p>           </p>
                    <div className="testimonial-content">
                      <div className="testimonial-author">
                        
                       
                        
                      </div>
                      
                      
                      
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          </div>
          
          <div className='col-6'> <img src={mocImg3} className='img-fluid mr-3' /></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;