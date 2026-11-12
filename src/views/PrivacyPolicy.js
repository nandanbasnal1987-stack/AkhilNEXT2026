'use client';

import React, { useState } from "react";
import Link from "next/link";
const blog1 = "/images/blog/doctor-from-future-concept.jpg";
const blog2 = "/images/blog/hand-medical-glove-pointing-virtual-screen-medical-technology.jpg";
const blog3 = "/images/blog/digital-concept-with-skyline.jpg";
const blog4 = "/images/blog/doctor-from-future-concept.jpg";
const blog5 = "/images/blog/hand-medical-glove-pointing-virtual-screen-medical-technology.jpg";
const blog6 = "/images/blog/digital-concept-with-skyline.jpg";
const blog7 = "/images/blog/doctor-from-future-concept.jpg";
const blog8 = "/images/blog/hand-medical-glove-pointing-virtual-screen-medical-technology.jpg";
const blog9 = "/images/blog/digital-concept-with-skyline.jpg";
const blog10 = "/images/blog/digital-concept-with-skyline.jpg";
const bg_career = "/images/bg-career.png";
import PrivacyAccordion from "../components/features/PrivacyAccordion";

function PrivacyPolicy() {
  const [showMore, setShowMore] = useState(false);

  const blogs = [
    { id: 1, title: "Augastam 2025: Redefining Healthcare Excellence", desc: "In today’s rapidly evolving healthcare landscape, innovation is not just an advantage — it’s a necessity.", img: blog1 },
    { id: 2, title: "SMART HEALTHCARE SOLUTIONS", desc: "Discover how smart technology is revolutionizing hospitals and patient care across the globe", img: blog2 },
    { id: 3, title: "DIGITAL TRANSFORMATION", desc: "Exploring the adoption of digital tools in nursing homes and mid-sized hospitals to improve efficiency...", img: blog3 },   
    { id: 4, title: "Augastam 2025: Redefining Healthcare Excellence", desc: "In today’s rapidly evolving healthcare landscape, innovation is not just an advantage — it’s a necessity.", img: blog4 },
    { id: 5, title: "SMART HEALTHCARE SOLUTIONS", desc: "Discover how smart technology is revolutionizing hospitals and patient care across the globe", img: blog5 },
    { id: 6, title: "DIGITAL TRANSFORMATION", desc: "Exploring the adoption of digital tools in nursing homes and mid-sized hospitals to improve efficiency...", img: blog6 },
    { id: 7, title: "Augastam 2025: Redefining Healthcare Excellence", desc: "In today’s rapidly evolving healthcare landscape, innovation is not just an advantage — it’s a necessity.", img: blog7 },
    { id: 8, title: "SMART HEALTHCARE SOLUTIONS", desc: "Discover how smart technology is revolutionizing hospitals and patient care across the globe", img: blog8 },
    { id: 9, title: "DIGITAL TRANSFORMATION", desc: "Exploring the adoption of digital tools in nursing homes and mid-sized hospitals to improve efficiency...", img: blog9 },    
    { id: 10, title: "DIGITAL TRANSFORMATION", desc: "Exploring the adoption of digital tools in nursing homes and mid-sized hospitals to improve efficiency...", img: blog10 }
  ];
 

  const displayedBlogs = showMore ? blogs : blogs.slice(0, 9);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-client mb-5">
        <img src={bg_career} alt="client background" />
        <div className="box-clients-details" data-aos="fade-up">
          <h2>Privacy Policy</h2>
          {/* <p>Discover news, insights, and innovations shaping the future of healthcare technology.</p>
          <a href="#void" className="getStared">Get Started</a> */}
        </div>
      </div>

      {/* Blog Cards */}
      <div className="container mb-5">
        <div className="row">

       <PrivacyAccordion />

         
        </div>

       
      </div>
    </>
  );
}

export default PrivacyPolicy;
