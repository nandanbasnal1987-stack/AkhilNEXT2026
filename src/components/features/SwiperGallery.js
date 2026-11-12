
'use client';

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const images = [
  "/images/swipe-image1.webp",
  "/images/swipe-image2.webp",
  "/images/swipe-image3.webp",
  "/images/swipe-image4.webp",
  "/images/swipe-image1.webp",
  "/images/swipe-image2.webp",
  "/images/swipe-image3.webp",
  "/images/swipe-image4.webp",
];

const SwiperGallery = () => {
  return (
    <div className="swiper-container" data-aos="fade-up">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={60}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 80,
          depth: 450,
          modifier: 0.2,
          scale: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[
          EffectCoverflow,
          Pagination,
          Autoplay,
        ]}
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={`${src}-${index}`}>
            <img
              src={src}
              loading="lazy"
              alt={`Office Gallery Image ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperGallery;
