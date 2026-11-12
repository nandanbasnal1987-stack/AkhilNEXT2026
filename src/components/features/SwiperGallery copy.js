'use client';

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const img1 = "/images/swipe-image1.webp";
const img2 = "/images/swipe-image2.webp";
const img3 = "/images/swipe-image3.webp";
const img4 = "/images/swipe-image4.webp";
const img5 = "/images/swipe-image1.webp";
const img6 = "/images/swipe-image2.webp";
const img7 = "/images/swipe-image3.webp";
const img8 = "/images/swipe-image4.webp";




const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const SwiperGallery = () => {
  return (
    <div className="swiper-container" data-aos="fade-up">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={60}
        loop={true}
        loopedSlides={images.length}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 80,
          depth: 450,
          modifier: 0.2,
          scale: 1,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]} // include Autoplay
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} loading='lazy' alt={`Office-Gallery-Image-${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperGallery;
