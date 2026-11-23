'use client';

import React, { useState } from 'react';

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState('moc');

  const mocServices = [
    {
      id: 1,
      icon: 'images/icon-1.png',
      title: 'Technology',
      description: '100% cloud-hosted platform—no servers required, with automatic backups and secure login. Subscription-based (pay-as-you-go) with flexible plans and low implementation cost.',
      readMoreLink: 'services-2.php'
    },
    {
      id: 2,
      icon: 'images/icon-2.png',
      title: 'Core Features',
      description: 'Designed for patients, doctors, and hospital management, enabling seamless collaboration across all stakeholders. Covers IPD/OPD management, billing, analytics, reports, and patient communication in one ecosystem.',
      readMoreLink: 'services-2.php'
    },
    {
      id: 3,
      icon: 'images/icon-3.png',
      title: 'Who it Works For',
      description: 'Ideal for multi-hospital networks or healthcare chains expanding nationally or globally. Ready-to-use solution; requires minimal setup and quick onboarding.',
      readMoreLink: 'services-2.php'
    },
    {
      id: 4,
      icon: 'images/icon-4.png',
      title: 'Technical Capabilities',
      description: 'Includes payment gateways, auto-email, THB analytics, and built-in apps for patients and doctors.',
      readMoreLink: 'services-2.php'
    },
    {
      id: 5,
      icon: 'images/icon-5.png',
      title: 'Why Choose',
      description: 'Delivers cost efficiency, operational visibility, and simplified management through a cloud-based digital ecosystem.',
      readMoreLink: 'services-2.php'
    }
  ];

  const augastamServices = [
    {
      id: 1,
      icon: 'images-1.png',
      title: 'Technology',
      description: 'Modular or licensed model, customizable per user or department. Modular EMR platform with configurable dashboards and tab-based wrapper design for intuitive navigation.',
      readMoreLink: 'service-details-2.html'
    },
    {
      id: 2,
      icon: 'images-2.png',
      title: 'Core Features',
      description: 'Fully configurable dashboards, workflows, and templates tailored to individual doctor preferences. Focuses on clinical workflows—vitals, prescriptions, test orders, patient history, and care protocols.',
      readMoreLink: 'service-details-2.html'
    },
    {
      id: 3,
      icon: 'images-3.png',
      title: 'Who it Work For',
      description: 'Doctor-first UI/UX emphasizing minimal clicks, real-time data visualization, and multilingual printouts. Built exclusively for doctors and clinicians to manage and analyze patient data seamlessly.',
      readMoreLink: 'service-details-2.html'
    },
    {
      id: 4,
      icon: 'images-4.png',
      title: 'Technical Capabilities',
      description: 'Offers interactive graphs, trend analysis, and epidemic-ready care plans for informed clinical decisions. Supports speech-to-text, medical illustrations, and pediatric vitals tracking.',
      readMoreLink: 'service-details-2.html'
    },
    {
      id: 5,
      icon: 'images-5.png',
      title: 'Why Choose',
      description: 'Empowers doctors with a paperless, data-driven environment that reduces administrative effort and enhances patient care.',
      readMoreLink: 'service-details-2.html'
    }
  ];

  return (
    <section className="our_services_section pt-5 pb-5" style={{ background: 'none' }}>
      <div className="container">
        {/* Top Content Heading */}
        <div className="top_content_heading text-center">
          <h1 className="main_heading">
            Why Choose Akhil Systems for <br />Hospital Management Software in India?
          </h1>
          <img src="images/heading.png" alt="Section Divider" className="heading_divider" />
          <p className="pairagraph mt-2">
            At Akhil Systems, we understand that every healthcare setup is different — that&apos;s why we offer adaptable <br />Hospital Information System and Electronic Medical Record Software tailored to your workflow and goals.
          </p>
        </div>

        {/* Tabs Navigation */}
        <ul className="nav nav-tabs justify-content-center" id="servicesTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'moc' ? 'active' : ''}`}
              id="moc-tab"
              onClick={() => setActiveTab('moc')}
              type="button"
              role="tab"
              style={{ fontSize: '22px' }}
            >
              Miracle on Cloud (MoC)
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'augastam' ? 'active' : ''}`}
              id="augastam-tab"
              onClick={() => setActiveTab('augastam')}
              type="button"
              role="tab"
              style={{ fontSize: '22px' }}
            >
              Augastam
            </button>
          </li>
        </ul>

        {/* Tabs Content */}
        <div className="tab-content mt-4" id="servicesTabsContent">
          {/* TAB 1: MOC SECTION */}
          <div className={`tab-pane fade ${activeTab === 'moc' ? 'show active' : ''}`} id="moc-section-tab" role="tabpanel">
            <section className="pb-5" id="moc-section">
              <div className="container">
                {/* Heading */}
                <div className="top_content_heading text-center">
                  <img src="images/heading.png" alt="Section Divider" className="heading_divider" />
                  <p className="pairagraph mt-2">
                    A complete Hospital Information System (HIS) built to digitalize hospital operations end to end. <br />NABH-accredited and compliant with Indian healthcare data standards.
                  </p>
                </div>

                {/* Services Grid */}
                <div className="row mt-5">
                  {mocServices.map((service) => (
                    <div className="col-xl-4 col-lg-4 col-md-6" key={service.id}>
                      <div className="features_box">
                        <div className="features_img">
                          <img src={service.icon} alt={`${service.title} Icon`} />
                        </div>
                        <h4 className="mt-3">{service.title}</h4>
                        <p className="pairagraph mt-2 mb-0">{service.description}</p>
                        <div className="read_more mt-2">
                          <a href={service.readMoreLink}>
                            Read More<i className="fa-solid fa-angles-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* TAB 2: AUGASTAM SECTION */}
          <div className={`tab-pane fade ${activeTab === 'augastam' ? 'show active' : ''}`} id="augastam-section-tab" role="tabpanel">
            <section className="services-style-1 pb-5" id="augastam-section" style={{ background: 'none !important' }}>
              <div className="container">
                {/* Heading */}
                <div className="top_content_heading text-center">
                  <img src="images/heading.png" alt="Section Divider" className="heading_divider" />
                  <p className="pairagraph mt-2">
                    An Electronic Medical Record (EMR) Software and Clinical Dashboard <br />designed to enhance doctors&apos; efficiency and decision-making.
                  </p>
                </div>

                <div className="row mt-5 pt-4">
                  {augastamServices.map((service) => (
                    <div className="col-xl-4 col-lg-4 col-md-6" key={service.id}>
                      <div className="inner-box">
                        <div className="icon-box">
                          <img src={service.icon} alt={`${service.title} Icon`} />
                        </div>
                        <h3>
                          <a href={service.readMoreLink}>{service.title}</a>
                        </h3>
                        <p className="pairagraph mt-2">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabsSection;