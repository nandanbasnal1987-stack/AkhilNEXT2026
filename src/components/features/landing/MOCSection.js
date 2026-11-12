'use client';

import React from 'react';

const MOCSection = () => {
  // Data array for MoC services
  const mocServices = [
    {
      id: 1,
      icon: 'images-1.png',
      title: 'Technology',
      description: '100% cloud-hosted platform—no servers required, with automatic backups and secure login. Subscription-based (pay-as-you-go) with flexible plans and low implementation cost.',
      altText: 'Technology Icon'
    },
    {
      id: 2,
      icon: 'images-2.png',
      title: 'Core Features',
      description: 'Designed for patients, doctors, and hospital management, enabling seamless collaboration across all stakeholders. Covers IPD/OPD management, billing, analytics, reports, and patient communication in one ecosystem.',
      altText: 'Core Features Icon'
    },
    {
      id: 3,
      icon: 'images-3.png',
      title: 'Who it Works For',
      description: 'Ideal for multi-hospital networks or healthcare chains expanding nationally or globally. Ready-to-use solution; requires minimal setup and quick onboarding.',
      altText: 'Who it Works For Icon'
    },
    {
      id: 4,
      icon: 'images-4.png',
      title: 'Technical Capabilities',
      description: 'Includes payment gateways, auto-email, THB analytics, and built-in apps for patients and doctors.',
      altText: 'Technical Capabilities Icon'
    },
    {
      id: 5,
      icon: 'images-5.png',
      title: 'Why Choose',
      description: 'Delivers cost efficiency, operational visibility, and simplified management through a cloud-based digital ecosystem.',
      altText: 'Why Choose Icon'
    }
  ];

  const handleReadMore = (serviceId) => {
    // You can implement navigation or modal opening logic here
    console.log(`Read more clicked for service ${serviceId}`);
    // Example: navigate to a detailed page
    // navigate(`/services/${serviceId}`);
  };

  return (
    <section className="our_services_section pt-5 pb-5" id="moc-section">
      <div className="container">
        {/* Top Content Heading */}
        <div className="top_content_heading text-center">
          <h1 className="main_heading">Miracle on Cloud (MoC)</h1>
          <img 
            src="images/heading.png" 
            alt="Section Divider" 
            className="heading_divider"
          />
          <p className="pairagraph mt-2">
            A complete Hospital Information System (HIS) built to digitalize hospital operations end to end. <br />
            NABH-accredited and compliant with Indian healthcare data standards.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row mt-5">
          {mocServices.map((service) => (
            <div 
              className="col-xl-4 col-lg-4 col-md-6" 
              key={service.id}
            >
              <div className="features_box">
                <div className="features_img">
                  <img 
                    src={service.icon} 
                    alt={service.altText}
                    className="service-icon"
                  />
                </div>
                <h4 className="mt-3">{service.title}</h4>
                <p className="pairagraph mt-2 mb-0">
                  {service.description}
                </p>
                <div className="read_more mt-2">
                  <button 
                    className="read_more_btn"
                    onClick={() => handleReadMore(service.id)}
                  >
                    Read More <i className="fa-solid fa-angles-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MOCSection;