'use client';

import React from 'react';
import Slider from 'react-slick';
// import Counter from './Counter';
const clientImage1 = "/images/client-exp-1.jpg";
const clientImage2 = "/images/client-exp-2.jpg";

const VerticalSliderSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    padding: 0,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,

    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          vertical: true,
          dots: false,
          verticalSwiping: true,
        }
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
           dots: false,
          vertical: false,
          verticalSwiping: false,
        }
      }
    ]
  };
  return (
    <section className="lightYellow p-60">
      <div className="container-fluid" data-aos="fade-up">
        <div className="row">
          <div className="col-md-7 topHead-section">
            <h2 className="text-left pt-0">
            Voices From the <br/>Frontline of Care
            </h2>
          </div>

          <div className="col-md-5">
            <p className="para-text">
            Discover how Augastam is transforming clinical workflows, reducing admin overload, and helping providers focus more on what matters most
            </p>
          </div>

          <div className="col-md-12 mt-5">
            <Slider {...settings} className="vertical-slider">

              {/* Slide 1 */}
              <div className="clients-feedback">
                <div className="media">
                  <div className="media-left">
                    <img src={clientImage1} alt="" className="media-object" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">John Doe</h4>
                    <p>At the heart of everything we build is a commitment to trust, innovation, and care...</p>
                    <b style={{ display: 'block' }}>Chief Executive</b>Motherhood Hospital
                  </div>
                  <div className="media-body">
                    <div className="count">7x</div>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="clients-feedback">
                <div className="media">
                  <div className="media-left">
                    <img src={clientImage2} alt="" className="media-object" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">Jane Smith</h4>
                    <p>We believe in building trust with every step...</p>
                    <b style={{ display: 'block' }}>Chief Executive</b>Motherhood Hospital
                  </div>
                  <div className="media-body">
                    <div className="count"><span>100</span>%</div>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="clients-feedback">
                <div className="media">
                  <div className="media-left">
                    <img src={clientImage1} alt="" className="media-object" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">John Doe</h4>
                    <p>Our journey is guided by innovation and care...</p>
                    <b style={{ display: 'block' }}>Chief Executive</b>Motherhood Hospital
                  </div>
                  <div className="media-body">
                    <div className="count">7x</div>
                  </div>
                </div>
              </div>

            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalSliderSection;
