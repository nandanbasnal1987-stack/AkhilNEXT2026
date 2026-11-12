'use client';

import React from 'react';

const Footer = () => {
  const socialLinks = [
    { icon: 'fa-brands fa-facebook-f', href: 'javascript:void(0)' },
    { icon: 'fa-brands fa-instagram', href: 'javascript:void(0)' },
    { icon: 'fa-brands fa-x-twitter', href: 'javascript:void(0)' },
    { icon: 'fa-brands fa-linkedin-in', href: 'javascript:void(0)' },
    { icon: 'fa-brands fa-pinterest', href: 'javascript:void(0)' }
  ];

  const offices = [
    {
      title: "Registered Office",
      content: "#205-206, Vardhman Times Plaza, Plot No. 13, Rd No. 44, Pitampura Commercial Complex, Pitampura, NEW Delhi-110034"
    },
    {
      title: "Development Office",
      content: "Incuspaze Building, 5th Floor, Plot No. 17, Sector 18, Udyog Vihar Phase 4, Gurugram, Haryana 122015"
    },
    {
      title: "Myanmar Office",
      content: "Building 11, Universities' Hlaing Campus, Hlaing Township - 11052, Yangon, Myanmar"
    }
  ];

  const otherOffices = [
    {
      title: "SOUTH INDIA OFFICE",
      content: "Hyderabad/Chennai<br>Contact Person: Mr. Debangshu Sengupta<br>Phone: +91 844 879 9453<br><br>Contact Person: Mr. Ram Kumar<br>Phone: +91 988 451 9358"
    },
    {
      title: "DUBAI OFFICE",
      content: "Rostamani Twin Tower A, 4624+2J7 – 113,22 St – Al Barsha – Al Barsha 2 – Dubai – United Arab Emirates"
    }
  ];

  return (
    <>
      <footer className="footer pt-5 pb-3">
        <div className="container">
          <div className="row">
            {/* Company Info & Social Links */}
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="footer_box">
                <a href="index.php">
                  <img 
                    src="https://akhilsystems.com/static/media/akhil-logo.7b6b526465370149fe8d.png" 
                    alt="Akhil Systems Logo" 
                  />
                </a>
                <p className="mt-3 pairagraph">
                  we understand that every healthcare setup is different — that’s why we offer adaptable Hospital Information System and Electronic Medical Record Software tailored to your workflow and goals.
                </p>
                <ul className="d-flex p-0 m-0 list-unstyled mt-4 pt-2">
                  {socialLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>
                        <i className={link.icon}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Contact Offices */}
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="footer_contact">
                <h5 className="mb-4 pb-2">CONTACT INFO</h5>
              </div>
              {offices.map((office, index) => (
                <div className="footer_box" key={index}>
                  <h6 
                    className="text-white" 
                    style={{ borderBottom: '1px solid white', width: 'fit-content' }}
                  >
                    {office.title}
                  </h6>
                  <p className={index === 0 ? "mt-3 pairagraph" : "pairagraph"}>
                    {office.content}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Additional Offices */}
            <div className="col-xl-4 col-lg-4 col-md-6 footer_regd_ofc">
              {otherOffices.map((office, index) => (
                <div className="footer_box" key={index}>
                  <h6 
                    className="text-white" 
                    style={{ borderBottom: '1px solid white', width: 'fit-content' }}
                  >
                    {office.title}
                  </h6>
                  <p 
                    className={index === 0 ? "mt-3 pairagraph" : "pairagraph"}
                    dangerouslySetInnerHTML={{ __html: office.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Copyright Section */}
      <div className="copyright p-3">
        <div className="container">
          <p className="text-center m-0">
            Copyright © 2025 <a href="index.php">Akhil Systems</a> All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;