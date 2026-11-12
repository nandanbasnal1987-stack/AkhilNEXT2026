'use client';

import React, { useState, useRef, useEffect } from 'react';
import '../styles/global.css';
import FaqAccordion from '../components/features/FaqAccordion';
const bg_client = "/images/bg_client.png";
import BlueBanner from '../components/features/BlueBanner';

const care_hospital_akhilsystems = "/images/clients/int/care_hospital_akhilsystems.png";
const aster_group_akhilsystems = "/images/clients/int/aster_group_akhilsystems.png";
const lagoon_akhilsystems = "/images/clients/int/lagoon_akhilsystems.png";
const PHS_akhilsystems = "/images/clients/int/PHS_akhilsystems.png";
const Healthhub_ALFuttaim_akhilsystems = "/images/clients/int/Healthhub_ALFuttaim_akhilsystems.png";
const popular_akhilsystems = "/images/clients/int/popular_akhilsystems.png";
const al_kindi_akhilsystems = "/images/clients/int/al_kindi_akhilsystems.png";
const agh_akhilsystems = "/images/clients/int/agh_akhilsystems.png";

const care_hospital = "/images/clients/doms/care-hospital-akhilsystems.png";
const aster_group = "/images/clients/doms/aster-group-akhilsystems.png";
const moolchand_hospital = "/images/clients/doms/moolchand-hospital-akhilsystems.png";
const qrg_hospital = "/images/clients/doms/qrg-hospital-akhilsystems.png";
const sagar_hospital = "/images/clients/doms/sagar-hospital-akhilsystems.png";
const psri_hospital = "/images/clients/doms/psri-hospital-akhilsystems.png";
const women_motherhod_hospital = "/images/clients/doms/women-motherhod-hospital-akhilsystems.png";
const sahara_hospital = "/images/clients/doms/sahara-hospital-akhilsystems.png";
const regency_hospital = "/images/clients/doms/regency-hospital-akhilsystems.png";
const venkateshwar_hospital = "/images/clients/doms/venkateshwar-hospital-akhilsystems.png";
const yashoda_hospital = "/images/clients/doms/yashoda-hospital-akhilsystems.png";
const sri_balaji_action_medical = "/images/clients/doms/sri-balaji-action-medical-akhilsystems.png";
const NKP_Salve_institute_medicalsciences = "/images/clients/doms/NKP-Salve-institute-medicalsciences.png";
const kiran_hospital = "/images/clients/doms/kiran-hospital.png";
const sehgal_neo_hospital = "/images/clients/doms/sehgal-neo-hospital.png";
const sharda_hospital = "/images/clients/doms/sharda-hospital-akhilsystems.png";
const mission_hospital = "/images/clients/doms/mission-hospital.png";


function OurClients() {


  function Tabs({
    tabs = [],
    defaultIndex = 0,
    lazy = true,
    className = "",
  }) {
    const [active, setActive] = useState(defaultIndex);
    const tabsRef = useRef([]);

    useEffect(() => {
      if (tabsRef.current[active]) tabsRef.current[active].focus();
    }, [active]);

    function onKeyDown(e) {
      const max = tabs.length - 1;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((i) => (i === max ? 0 : i + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((i) => (i === 0 ? max : i - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        setActive(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActive(max);
      }
    }

    return (
      <div className={`w-full ${className}`}>
        <div role="tablist" aria-label="Sample Tabs" className="box-tab-btn">
          {tabs.map((t, i) => (
            <button
              key={t.id ?? i}
              ref={(el) => (tabsRef.current[i] = el)}
              role="tab"
              aria-selected={active === i}
              aria-controls={`panel-${t.id ?? i}`}
              id={`tab-${t.id ?? i}`}
              tabIndex={active === i ? 0 : -1}
              onKeyDown={onKeyDown}
              onClick={() => setActive(i)}
              className={`box-tabtn
                ${active === i ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-gray-700 border"}`}
            >
              <div className="flex items-center gap-2">
                {t.icon ? <span className="w-4 h-4">{t.icon}</span> : null}
                <span className="text-sm font-medium">{t.title}</span>
              </div>
            </button>
          ))}
        </div>

        <div>
          {tabs.map((t, i) => (
            <section
              key={t.id ?? i}
              role="tabpanel"
              id={`panel-${t.id ?? i}`}
              aria-labelledby={`tab-${t.id ?? i}`}
              hidden={active !== i}
              className={`box-ourclient-logo ${active === i ? "block" : "hidden"}`}
            >
              {lazy ? (active === i ? t.content : null) : t.content}
            </section>
          ))}
        </div>
      </div>
    );
  }

  

  // Example data for tabs
  const exampleTabs = [
    { id: 'tab1', title: 'Domestic Clients', content: <div>
          <ul>
            <li><img src={care_hospital} alt='Care Hospital' /></li>
            <li><img src={aster_group} alt='Aster Group' /></li>
            <li><img src={moolchand_hospital} alt='Lagoon' /></li>
            <li><img src={qrg_hospital} alt='PHS' /></li>
            <li><img src={sagar_hospital} alt='Healthhub ALFuttaim' /></li>
            <li><img src={psri_hospital} alt='popular' /></li>
            <li><img src={women_motherhod_hospital} alt='Al Kindi' /></li>
            <li><img src={sahara_hospital} alt='agh' /></li>
            <li><img src={regency_hospital} alt='agh' /></li>
            <li><img src={venkateshwar_hospital} alt='agh' /></li>
            <li><img src={yashoda_hospital} alt='agh' /></li>
            <li><img src={sri_balaji_action_medical} alt='agh' /></li>
            <li><img src={NKP_Salve_institute_medicalsciences} alt='agh' /></li>
            <li><img src={kiran_hospital} alt='agh' /></li>
            <li><img src={sehgal_neo_hospital} alt='agh' /></li>
            <li><img src={mission_hospital} alt='agh' /></li>
            <li><img src={sharda_hospital} alt='agh' /></li>
          </ul>
    </div> },
    { id: 'tab2', title: 'International Clients', content: <div>
        <ul>
            <li><img src={care_hospital_akhilsystems} alt='Care Hospital' /></li>
            <li><img src={aster_group_akhilsystems} alt='Aster Group' /></li>
            <li><img src={lagoon_akhilsystems} alt='Lagoon' /></li>
            <li><img src={PHS_akhilsystems} alt='PHS' /></li>
            <li><img src={Healthhub_ALFuttaim_akhilsystems} alt='Healthhub ALFuttaim' /></li>
            <li><img src={popular_akhilsystems} alt='popular' /></li>
            <li><img src={al_kindi_akhilsystems} alt='Al Kindi' /></li>
            <li><img src={agh_akhilsystems} alt='agh' /></li>
          </ul>
    </div> }
  ];

  return (
    <>

      <div className='bg-client'>
        <img src={bg_client} alt='client background' />
        <div className='box-clients-details' data-aos="fade-up">
          <h2>Our Clients</h2>
          <p>
            From multi-specialty hospitals to diagnostic chains, healthcare providers across 11
            <br />
            countries rely on Akhil Systems to power their digital transformation.
          </p>
        </div>
      </div>

      <section>
        <div className='box-ourclient-panel'>
        <Tabs tabs={exampleTabs} defaultIndex={0} lazy={true} />
        </div>      
      </section>

      <FaqAccordion />
      <BlueBanner />
    </>
  );
}

export default OurClients;