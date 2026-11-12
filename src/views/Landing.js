'use client';

import React from 'react';
import '../styles/landing.css';
import Header from '../components/features/landing/header';
import HeroSection from '../components/features/landing/HeroSection';
import AugastamSlider from '../components/features/AugastamSlider';
import AboutUs from '../components/features/landing/AboutUs';
import Footer from '../components/features/landing/footer';
import TabComponent from '../components/features/TabComponent';
import TabsSection from '../components/features/landing/TabsSection';
import MOCSection from '../components/features/landing/MOCSection';
import TrustedByLeaders from '../components/features/landing/TrustedByLeaders';

// import ClientsMarquee from './components/ClientsMarquee';
// import ServicesTabs from './components/ServicesTabs';
// import CounterSection from './components/CounterSection';
// import Testimonials from './components/Testimonials';
// import CTASection from './components/CTASection';
// import ContactSection from './components/ContactSection';
// import Footer from './components/Footer';
// import ContactModal from './components/ContactModal';

function Landing() {
  const domesticClients = [
    { id: 1, image: 'images/aster.png', alt: 'Aster' },
    { id: 2, image: 'images/care-hospital.png', alt: 'Care Hospital' },
    { id: 3, image: 'images/misson-hospital.png', alt: 'Mission Hospital' },
    { id: 4, image: 'images/moolchand.png', alt: 'Moolchand' },
    { id: 5, image: 'images/psri-hospital.png', alt: 'PSRI Hospital' },
    { id: 6, image: 'images/rh-health.png', alt: 'RH Health' },
    { id: 7, image: 'images/sagar-hospital.png', alt: 'Sagar Hospital' },
    { id: 8, image: 'images/sahara-hospital.png', alt: 'Sahara Hospital' },
    { id: 9, image: 'images/seghal-foundation.png', alt: 'Seghal Foundation' },
    { id: 10, image: 'images/sharda-hospital.png', alt: 'Sharda Hospital' },
    { id: 11, image: 'images/sri-balaji-action-medical.png', alt: 'Sri Balaji Action Medical' },
    { id: 12, image: 'images/venkateswar-hospital.png', alt: 'Venkateswar Hospital' },
    { id: 13, image: 'images/women-motherhood.png', alt: 'Women Motherhood' },
    { id: 14, image: 'images/yashoda-hospital.png', alt: 'Yashoda Hospital' }
  ];

  const internationalClients = [
    { id: 1, image: 'images/agh.png', alt: 'AGH' },
    { id: 2, image: 'images/all-kind-hospital.png', alt: 'All Kind Hospital' },
    { id: 3, image: 'images/evercare-hospital.png', alt: 'Evercare Hospital' },
    { id: 4, image: 'images/healthub-solutions.png', alt: 'Healthub Solutions' },
    { id: 5, image: 'images/lagoon.png', alt: 'Lagoon' },
    { id: 6, image: 'images/phs-group.png', alt: 'PHS Group' }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Ms. Hazel",
      role: "CEO & Founder - Okler",
      image: "images/01.jpg",
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos possimus, labore maiores quaerat adipisci commodi dicta numquam rem accusantium fugit? Dicta in hic neque nemo corporis perferendis nostrum repellendus porro."
    },
    {
      id: 2,
      name: "John Smith",
      role: "CEO & Founder - Okler",
      image: "images/02.jpg",
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos possimus, labore maiores quaerat adipisci commodi dicta numquam rem accusantium fugit? Dicta in hic neque nemo corporis perferendis nostrum repellendus porro."
    },
    {
      id: 3,
      name: "Ms. Jennifer",
      role: "CEO & Founder - Okler",
      image: "images/03.jpg",
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos possimus, labore maiores quaerat adipisci commodi dicta numquam rem accusantium fugit? Dicta in hic neque nemo corporis perferendis nostrum repellendus porro."
    }
  ];

  return (
   <div className="App">
      <Header />
      <HeroSection />

<div className='container-fluid logo-section p-60' data-aos="fade-up" style={{background: '#f6f7fe'}}>
    <h4>Trusted by Industry Leader</h4>
   <AugastamSlider />
    
      
    </div>
     
      <TabsSection />

      <MOCSection />

     <TrustedByLeaders />

      <Footer />
      
    </div>

  );
}

export default Landing;